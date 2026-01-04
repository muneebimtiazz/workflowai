import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card'
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import { CalendarDays, CheckCircle2, Clock, Circle } from 'lucide-react'
import { authService, mockEmployeeTasks, Task } from '../../../lib/mockServices'

interface TodayTasksCardProps {
  onNavigate?: (page: string) => void
}

export function TodayTasksCard({ onNavigate }: TodayTasksCardProps) {
  const [todayTasks, setTodayTasks] = useState<Task[]>([])

  useEffect(() => {
    fetchTodayTasks()
  }, [])

  async function fetchTodayTasks() {
    try {
      const user = await authService.getCurrentUser()
      if (!user) return

      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      const tasks = mockEmployeeTasks.filter(task => {
        if (task.assigned_to_id !== user.id) return false
        const dueDate = new Date(task.due_date)
        return dueDate >= today && dueDate < tomorrow
      })

      setTodayTasks(tasks.slice(0, 3)) // Show max 3 tasks
    } catch (err) {
      console.error('Error fetching today tasks:', err)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case 'under_review':
      case 'review_completed': return <Clock className="w-4 h-4 text-blue-600" />
      default: return <Circle className="w-4 h-4 text-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <CalendarDays className="w-5 h-5 text-blue-600" />
          <span>Today's Tasks</span>
        </CardTitle>
        <CardDescription>Tasks due today</CardDescription>
      </CardHeader>
      <CardContent>
        {todayTasks.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <CalendarDays className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No tasks due today</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayTasks.map(task => (
              <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className={`w-1 h-full rounded-full ${getPriorityColor(task.priority)}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(task.status)}
                    <h4 className="text-sm font-medium truncate">{task.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(task.due_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <Badge variant={task.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                  {task.status === 'completed' ? 'Done' : (task.status === 'under_review' || task.status === 'review_completed') ? 'In Progress' : 'Pending'}
                </Badge>
              </div>
            ))}
          </div>
        )}

        <Button 
          className="w-full mt-4" 
          size="sm" 
          variant="outline"
          onClick={() => onNavigate?.('my-tasks')}
        >
          View All Tasks
        </Button>
      </CardContent>
    </Card>
  )
}
