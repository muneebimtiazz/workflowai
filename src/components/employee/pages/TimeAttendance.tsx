import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import { 
  Clock, 
  Coffee,
  CheckCircle,
  Loader2,
  Download,
  LogIn,
  LogOut,
  Timer
} from 'lucide-react'
import { authService } from '../../../lib/mockServices'
import { toast } from 'sonner'

interface BreakEntry {
  id: string
  type: 'Lunch' | 'Tea' | 'Custom'
  startTime: string
  endTime: string | null
  duration: number
}

interface DailyTimelineEvent {
  id: string
  type: 'clock-in' | 'clock-out' | 'break-start' | 'break-end'
  time: string
  label: string
}

export function TimeAttendance() {
  const WEEKLY_LIMIT = 40 // HR-defined weekly hour limit

  // State
  const [currentTime, setCurrentTime] = useState(new Date())
  const [status, setStatus] = useState<'not-clocked-in' | 'working' | 'on-break'>('not-clocked-in')
  const [clockInTime, setClockInTime] = useState<string | null>(null)
  const [clockOutTime, setClockOutTime] = useState<string | null>(null)
  const [todayHours, setTodayHours] = useState(0)
  const [totalBreakTime, setTotalBreakTime] = useState(0)
  const [currentBreak, setCurrentBreak] = useState<BreakEntry | null>(null)
  const [breakTimer, setBreakTimer] = useState(0)
  const [timeline, setTimeline] = useState<DailyTimelineEvent[]>([])
  const [weeklyData, setWeeklyData] = useState<{ day: string; hours: number }[]>([])
  const [weeklyTotal, setWeeklyTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  // Clock timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      if (status === 'working' && clockInTime) {
        updateWorkingHours()
      }
      if (status === 'on-break' && currentBreak) {
        updateBreakTimer()
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [status, clockInTime, currentBreak])

  // Initialize
  useEffect(() => {
    initializeData()
  }, [])

  async function initializeData() {
    try {
      setLoading(true)
      const user = await authService.getCurrentUser()
      if (!user) throw new Error('Not authenticated')

      // Generate mock weekly data
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      const mockWeeklyData = days.map((day, index) => ({
        day,
        hours: index < 5 ? Math.floor(Math.random() * 3) + 7 : 0 // Mon-Fri: 7-9 hours, Sat-Sun: 0
      }))
      setWeeklyData(mockWeeklyData)
      
      const total = mockWeeklyData.reduce((sum, d) => sum + d.hours, 0)
      setWeeklyTotal(total)
    } catch (err) {
      console.error('Error initializing:', err)
    } finally {
      setLoading(false)
    }
  }

  function updateWorkingHours() {
    if (!clockInTime) return
    const now = new Date()
    const clockIn = new Date()
    const [hours, minutes, seconds] = clockInTime.split(':')
    clockIn.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds))
    
    const diffMs = now.getTime() - clockIn.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)
    setTodayHours(diffHours)
  }

  function updateBreakTimer() {
    if (!currentBreak) return
    const now = new Date()
    const breakStart = new Date()
    const [hours, minutes, seconds] = currentBreak.startTime.split(':')
    breakStart.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds))
    
    const diffMs = now.getTime() - breakStart.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    setBreakTimer(diffMinutes)
  }

  function handleClockIn() {
    const now = new Date().toTimeString().split(' ')[0]
    setClockInTime(now)
    setStatus('working')
    setTimeline([{ id: `event-${Date.now()}`, type: 'clock-in', time: now, label: 'Clocked In' }])
    toast.success('Clocked in successfully!')
  }

  function handleClockOut() {
    if (status === 'on-break') {
      toast.error('Please end your break before clocking out')
      return
    }
    const now = new Date().toTimeString().split(' ')[0]
    setClockOutTime(now)
    setStatus('not-clocked-in')
    setTimeline(prev => [...prev, { id: `event-${Date.now()}`, type: 'clock-out', time: now, label: 'Clocked Out' }])
    toast.success(`Clocked out! Total hours: ${todayHours.toFixed(2)}h`)
  }

  function handleStartBreak(type: 'Lunch' | 'Tea' | 'Custom') {
    if (status !== 'working') {
      toast.error('You must be clocked in to start a break')
      return
    }
    const now = new Date().toTimeString().split(' ')[0]
    const newBreak: BreakEntry = {
      id: `break-${Date.now()}`,
      type,
      startTime: now,
      endTime: null,
      duration: 0
    }
    setCurrentBreak(newBreak)
    setStatus('on-break')
    setBreakTimer(0)
    setTimeline(prev => [...prev, { 
      id: `event-${Date.now()}`, 
      type: 'break-start', 
      time: now, 
      label: `${type} Break Started` 
    }])
    toast.info(`☕ ${type} break started`)
  }

  function handleEndBreak() {
    if (!currentBreak) return
    const now = new Date().toTimeString().split(' ')[0]
    setTotalBreakTime(prev => prev + breakTimer)
    setCurrentBreak(null)
    setStatus('working')
    setBreakTimer(0)
    setTimeline(prev => [...prev, { 
      id: `event-${Date.now()}`, 
      type: 'break-end', 
      time: now, 
      label: `${currentBreak.type} Break Ended (${breakTimer}min)` 
    }])
    toast.success(`Break ended (${breakTimer} minutes)`)
  }

  function exportTimesheet() {
    const csvHeader = 'Date,Clock In,Clock Out,Hours Worked,Break Time\n'
    const csvContent = `${new Date().toISOString().split('T')[0]},${clockInTime || ''},${clockOutTime || ''},${todayHours.toFixed(2)},${totalBreakTime}\n`
    
    const blob = new Blob([csvHeader + csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `timesheet-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    toast.success('Timesheet exported!')
  }

  function getStatusColor() {
    switch (status) {
      case 'working': return 'text-green-600'
      case 'on-break': return 'text-yellow-600'
      default: return 'text-red-600'
    }
  }

  function getStatusIcon() {
    switch (status) {
      case 'working': return <div className="w-4 h-4 rounded-full bg-green-500" />
      case 'on-break': return <div className="w-4 h-4 rounded-full bg-yellow-500" />
      default: return <div className="w-4 h-4 rounded-full bg-red-500" />
    }
  }

  function getStatusText() {
    switch (status) {
      case 'working': return 'Working'
      case 'on-break': return 'On Break'
      default: return 'Not Clocked In'
    }
  }

  function getWeeklyStatusBadge() {
    const diff = weeklyTotal - WEEKLY_LIMIT
    if (Math.abs(diff) < 1) {
      return <Badge {...({ className: "bg-green-100 text-green-800" } as React.ComponentProps<typeof Badge>)}>✓ Met Required Hours</Badge>
    } else if (diff > 0) {
      return <Badge {...({ className: "bg-blue-100 text-blue-800" } as React.ComponentProps<typeof Badge>)}>⬆ Overtime ({diff.toFixed(1)}h)</Badge>
    } else {
      return <Badge {...({ className: "bg-orange-100 text-orange-800" } as React.ComponentProps<typeof Badge>)}>⬇ Worked Less ({Math.abs(diff).toFixed(1)}h short)</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Time & Attendance</h1>
          <p className="text-muted-foreground">Track your work hours and manage breaks</p>
        </div>
        <Button onClick={exportTimesheet} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Today's Status Card */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Today's Status</span>
            </span>
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <span className={`font-semibold ${getStatusColor()}`}>{getStatusText()}</span>
            </div>
          </CardTitle>
          <CardDescription>
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Live Clock */}
          <div className="text-center">
            <div className="text-8xl font-mono font-bold mb-2">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>

          {/* Status Grid */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-gray-50 p-3 rounded-lg w-full max-w-[200px]">
              <p className="text-sm text-muted-foreground mb-1">Clock In</p>
              <p className="text-lg font-semibold">
                {clockInTime ? clockInTime.substring(0, 5) : '--:--'}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg w-full max-w-[200px]">
              <p className="text-sm text-muted-foreground mb-1">Clock Out</p>
              <p className="text-lg font-semibold">
                {clockOutTime ? clockOutTime.substring(0, 5) : status === 'not-clocked-in' ? '--:--' : 'Active'}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg w-full max-w-[200px]">
              <p className="text-sm text-muted-foreground mb-1">Working Hours</p>
              <p className="text-lg font-semibold text-blue-600">
                {todayHours.toFixed(2)}h
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg w-full max-w-[200px]">
              <p className="text-sm text-muted-foreground mb-1">Break Time</p>
              <p className="text-lg font-semibold text-orange-600">
                {totalBreakTime}min
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {status === 'not-clocked-in' ? (
              <>
                <Button 
                  size="default" 
                  onClick={handleClockIn}
                  className="bg-green-600 hover:bg-green-700 w-auto text-base"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Clock In
                </Button>
                <Button 
                  size="default" 
                  variant="outline" 
                  disabled
                  className="w-auto text-base"
                >
                  <Coffee className="w-5 h-5 mr-2" />
                  Start Break
                </Button>
              </>
            ) : status === 'working' ? (
              <>
                <Button 
                  size="default" 
                  onClick={handleClockOut}
                  className="bg-red-600 hover:bg-red-700 w-auto text-base"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Clock Out
                </Button>
                <Button 
                  size="default" 
                  onClick={() => handleStartBreak('Lunch')}
                  className="bg-orange-600 hover:bg-orange-700 w-auto text-base"
                >
                  <Coffee className="w-5 h-5 mr-2" />
                  <span className="inline">Lunch </span>Break
                </Button>
                <Button 
                  size="default" 
                  variant="outline"
                  onClick={() => handleStartBreak('Tea')}
                  className="w-auto text-base"
                >
                  <Coffee className="w-5 h-5 mr-2" />
                  <span className="inline">Tea </span>Break
                </Button>
              </>
            ) : (
              <>
                <Button 
                  size="default" 
                  onClick={handleEndBreak}
                  className="bg-blue-600 hover:bg-blue-700 w-auto text-base"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  End Break
                </Button>
                <div className="flex items-center space-x-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg w-auto justify-center">
                  <Timer className="w-5 h-5 text-orange-600 animate-pulse shrink-0" />
                  <span className="font-semibold text-orange-800 text-base">
                    <span className="inline">{currentBreak?.type} </span>Break: {breakTimer} min
                  </span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Daily Timeline View */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Timeline</CardTitle>
          <CardDescription>Chronological view of your daily activities</CardDescription>
        </CardHeader>
        <CardContent>
          {timeline.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No activities yet today. Clock in to start!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {timeline.map((event, index) => (
                <div key={event.id} className="flex items-center space-x-4">
                  <div className="shrink-0 w-20 text-sm font-mono text-muted-foreground">
                    {event.time.substring(0, 5)}
                  </div>
                  <div className={`shrink-0 w-3 h-3 rounded-full ${
                    event.type === 'clock-in' ? 'bg-green-500' :
                    event.type === 'clock-out' ? 'bg-red-500' :
                    event.type === 'break-start' ? 'bg-orange-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium">{event.label}</p>
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="absolute left-30 mt-8 w-0.5 h-6 bg-gray-200" />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Summary</CardTitle>
          <CardDescription>Your attendance for the current week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Daily Hours Strip */}
          <div className="grid grid-cols-7 gap-2">
            {weeklyData.map((day) => (
              <div key={day.day} className="text-center">
                <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                <div className={`p-3 rounded-lg ${
                  day.hours >= 8 ? 'bg-green-100 text-green-800' :
                  day.hours > 0 ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  <div className="font-bold">{day.hours.toFixed(1)}h</div>
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Weekly Total</p>
              <p className="text-2xl font-bold text-blue-600">{weeklyTotal}h</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Required Hours</p>
              <p className="text-2xl font-bold">{WEEKLY_LIMIT}h</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <div className="mt-2">{getWeeklyStatusBadge()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

