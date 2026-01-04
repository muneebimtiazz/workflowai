import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Calendar } from "../../ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Separator } from "../../ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Search,
  Download,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  FileText,
  Loader2
} from 'lucide-react'
import { format } from 'date-fns'
import { leaveService } from '../../../lib/mockServices';
import { authService } from '../../../lib/mockServices';
import { toast } from 'sonner'

// Local type definitions for time off requests
interface TimeOffRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: string;
  reason: string;
  submittedDate: string;
  approver: string;
  approvedDate?: string;
  comments?: string;
  returnDate: string;
  isHalfDay?: boolean;
}

interface TimeOffBalance {
  type: string;
  total: number;
  used: number;
  pending: number;
  available: number;
  accrualRate: number;
  carryOver: number;
  expiry?: string;
}

export function TimeOffRequests() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [showNewRequestForm, setShowNewRequestForm] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<TimeOffRequest | null>(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Add popover control states
  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)
  
  // Real data states
  const [timeOffBalances, setTimeOffBalances] = useState<TimeOffBalance[]>([])
  const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>([])
  const [leaveTypes, setLeaveTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Team calendar data - could be fetched from API in future
  const teamCalendar = [
    { name: 'Sarah Johnson', dates: '2025-08-20 - 2025-08-22', type: 'vacation' },
    { name: 'Mike Chen', dates: '2025-09-02 - 2025-09-06', type: 'vacation' },
    { name: 'Lisa Rodriguez', dates: '2025-09-15 - 2025-09-15', type: 'personal' }
  ]

  const [newRequest, setNewRequest] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
    isHalfDay: false,
    emergencyContact: ''
  })

  // Fetch data on component mount
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading(true)
      setError(null)

      // Get current user
      const user = await authService.getCurrentUser()
      if (!user) {
        throw new Error('Not authenticated. Please log in.')
      }
      setCurrentUser(user)

      // Fetch leave types, requests, and balances in parallel
      const [types, requests, balances] = await Promise.all([
        leaveService.getLeaveTypes(),
        leaveService.getLeaveRequests(user.id),
        leaveService.getLeaveBalances(user.id)
      ])

      setLeaveTypes(types)
      
      // Transform requests to match frontend interface
      const transformedRequests = requests.map((req: any) => {
        // Map leave_type string to code (vacation, sick, personal, etc.)
        const leaveTypeCode = typeof req.leave_type === 'string' 
          ? req.leave_type 
          : req.leave_type?.code || 'vacation';
        
        return {
          id: req.id,
          type: leaveTypeCode,
          startDate: req.start_date,
          endDate: req.end_date,
          days: req.days_requested,
          status: req.status,
          reason: req.reason,
          submittedDate: req.submitted_date,
          approver: req.approver_name || 'Pending',
          approvedDate: req.approved_date,
          comments: req.notes,
          returnDate: req.end_date
        };
      });
      setTimeOffRequests(transformedRequests)

      // Transform balances to match frontend interface
      const transformedBalances = balances.map((bal: any) => {
        // Find the leave type by leave_type_id
        const leaveType = types.find((lt: any) => lt.id === bal.leave_type_id);
        
        // Calculate pending days from pending requests for this leave type
        // Match by leave type code (e.g., 'vacation', 'sick', 'personal')
        const leaveTypeCode = leaveType?.code?.toLowerCase() || '';
        const pendingDays = requests
          .filter((req: any) => {
            const reqLeaveType = typeof req.leave_type === 'string' 
              ? req.leave_type.toLowerCase() 
              : req.leave_type?.code?.toLowerCase() || '';
            // Match leave type and check if status is pending
            return reqLeaveType === leaveTypeCode && 
                   (req.status === 'pending_manager_approval' || 
                    req.status === 'pending_hr_approval' || 
                    req.status === 'pending');
          })
          .reduce((sum: number, req: any) => sum + (req.days_requested || 0), 0);
        
        return {
          type: leaveType?.name || 'Unknown',
          total: bal.total_days,
          used: bal.used_days,
          pending: pendingDays,
          available: bal.remaining_days,
          accrualRate: leaveType?.days_per_year ? Math.round((leaveType.days_per_year / 12) * 100) / 100 : 0,
          carryOver: 0
        };
      });
      setTimeOffBalances(transformedBalances)

    } catch (err: any) {
      console.error('Error fetching time off data:', err)
      setError(err.message || 'Failed to load time off data')
      toast.error(err.message || 'Failed to load time off data')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_manager_approval':
        return <Badge variant="secondary">Pending Manager Approval</Badge>
      case 'pending_hr_approval':
        return <Badge variant="outline">Pending HR Approval</Badge>
      case 'approved':
        return <Badge variant="default">Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>
      case 'cancelled':
        return <Badge variant="outline">Cancelled</Badge>
      // Legacy status support
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
      case 'denied':
        return <Badge variant="destructive">Denied</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeColor = (type: string) => {
    // Use semantic variants instead of hardcoded colors
    switch (type) {
      case 'vacation':
        return 'bg-secondary text-secondary-foreground'
      case 'sick':
        return 'bg-destructive/10 text-destructive'
      case 'personal':
        return 'bg-muted text-muted-foreground'
      case 'bereavement':
        return 'bg-muted text-muted-foreground'
      case 'jury-duty':
        return 'bg-secondary text-secondary-foreground'
      case 'parental':
        return 'bg-muted text-muted-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }



  const calculateBusinessDays = (startDate: Date, endDate: Date) => {
    let count = 0
    const current = new Date(startDate)
    while (current <= endDate) {
      const dayOfWeek = current.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not weekend
        count++
      }
      current.setDate(current.getDate() + 1)
    }
    return count
  }

  const handleSubmitRequest = async () => {
    if (!newRequest.type || !newRequest.startDate || !newRequest.endDate || !newRequest.reason) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!currentUser) {
      toast.error('You must be logged in to submit a request')
      return
    }

    try {
      setSubmitting(true)

      // Calculate business days
      const start = new Date(newRequest.startDate)
      const end = new Date(newRequest.endDate)
      const days = newRequest.isHalfDay ? 0.5 : calculateBusinessDays(start, end)

      // Find leave type by code
      const leaveType = leaveTypes.find(lt => lt.code === newRequest.type)
      if (!leaveType) {
        throw new Error('Invalid leave type selected')
      }

      // Map leave type code to the string value expected by LeaveRequest interface
      // The interface expects: 'vacation' | 'sick' | 'personal' | 'parental' | 'unpaid'
      const leaveTypeMap: Record<string, 'vacation' | 'sick' | 'personal' | 'parental' | 'unpaid'> = {
        'vacation': 'vacation',
        'sick': 'sick',
        'personal': 'personal',
        'parental': 'parental',
        'unpaid': 'unpaid',
        'ANNUAL': 'vacation',
        'SICK': 'sick',
        'PERSONAL': 'personal'
      };
      
      const leaveTypeValue = leaveTypeMap[newRequest.type] || leaveTypeMap[leaveType.code] || 'vacation';

      // Create leave request
      await leaveService.createLeaveRequest({
        employee_id: currentUser.id,
        employee_name: currentUser.full_name,
        leave_type: leaveTypeValue,
        start_date: newRequest.startDate,
        end_date: newRequest.endDate,
        days_requested: days,
        reason: newRequest.reason,
        status: 'pending_manager_approval'
      })

      toast.success('Time off request submitted successfully!')
      
      // Reset form
      setNewRequest({
        type: '',
        startDate: '',
        endDate: '',
        reason: '',
        isHalfDay: false,
        emergencyContact: ''
      })
      setShowNewRequestForm(false)
      setSelectedDate(undefined)
      setEndDate(undefined)

      // Refresh data
      await fetchData()

    } catch (err: any) {
      console.error('Error submitting request:', err)
      toast.error(err.message || 'Failed to submit request')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancelRequest = async (requestId: string) => {
    if (!confirm('Are you sure you want to cancel this request?')) {
      return
    }

    try {
      await leaveService.updateLeaveRequest(requestId, { status: 'cancelled' })
      toast.success('Request cancelled successfully')
      
      // Refresh data
      await fetchData()
    } catch (err: any) {
      console.error('Error cancelling request:', err)
      toast.error(err.message || 'Failed to cancel request')
    }
  }

  const filteredRequests = timeOffRequests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter
    const matchesSearch = request.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.type.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-9xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Loading time off data...</span>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-9xl mx-auto space-y-6">
        <Card className="p-6 border-destructive bg-destructive/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
            <Button onClick={fetchData} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Time Off</h2>
          <p className="text-sm text-muted-foreground">Manage your time off requests and view team availability</p>
        </div>
        <Button onClick={() => setShowNewRequestForm(true)} className="w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Request Time Off
        </Button>
      </div>

      <Tabs defaultValue="balances" className="space-y-4">
        <TabsList>
          <TabsTrigger value="balances">My Balances</TabsTrigger>
          <TabsTrigger value="requests">My Requests</TabsTrigger>
          <TabsTrigger value="team">Team Calendar</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="balances">
          {/* Header Section with Explanation */}
          <Card className={`mb-6 bg-muted border-border`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Your Time Off Balances
                  </h3>
                  <p className="text-sm text-foreground mb-3">
                    View your available leave days, track usage, and see pending requests. These balances show how many days you can take off for each leave type. 
                    <span className="font-medium"> Available days = Total allocated - Used - Pending requests.</span>
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-foreground">
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      Balances reset annually
                    </Badge>
                    <Badge variant="outline">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Pending requests reduce available days
                    </Badge>
                    {timeOffBalances.some(b => b.accrualRate > 0) && (
                      <Badge variant="outline">
                        <FileText className="w-3 h-3 mr-1" />
                        Some leave types accrue monthly
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leave Type Cards */}
          <div className="flex flex-wrap justify-center gap-6">
            {timeOffBalances.map((balance, index) => {
              const usagePercentage = balance.total > 0 ? (balance.used / balance.total) * 100 : 0
              
              return (
                <Card key={index} className="w-full max-w-[280px] hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-1">
                      <CardTitle className="text-lg font-semibold">{balance.type}</CardTitle>
                      {balance.expiry && (
                        <Badge variant="outline" {...({ className: "text-xs" } as React.ComponentProps<typeof Badge>)}>
                          Expires {balance.expiry}
                        </Badge>
                      )}
                    </div>
                    {balance.accrualRate > 0 && (
                      <CardDescription className="text-xs flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        Accrues {balance.accrualRate.toFixed(2)} days/month
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Available Days - Prominent Display */}
                    <div className="text-center bg-linear-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                      <div className="text-4xl font-bold text-blue-600 mb-1">
                        {balance.available}
                      </div>
                      <div className="text-sm font-medium text-gray-700">Days Available</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Ready to use now
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Usage</span>
                        <span>{usagePercentage.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  
                    {/* Breakdown Details */}
                    <div className="space-y-2.5 text-sm pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center">
                          <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                          Total Allocated:
                        </span>
                        <span className="font-semibold text-gray-900">{balance.total} days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center">
                          <XCircle className="w-3.5 h-3.5 mr-1.5 text-red-400" />
                          Used:
                        </span>
                        <span className="font-semibold text-red-600">{balance.used} days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground flex items-center">
                          <AlertCircle className="w-3.5 h-3.5 mr-1.5 text-yellow-400" />
                          Pending:
                        </span>
                        <span className="font-semibold text-yellow-600">{balance.pending} days</span>
                      </div>
                      {balance.carryOver > 0 && (
                        <div className="flex justify-between items-center pt-1 border-t">
                          <span className="text-muted-foreground flex items-center">
                            <FileText className="w-3.5 h-3.5 mr-1.5 text-green-400" />
                            Carry Over:
                          </span>
                          <span className="font-semibold text-green-600">+{balance.carryOver} days</span>
                        </div>
                      )}
                    </div>

                    {/* Quick Action */}
                    {balance.available > 0 && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-3"
                        onClick={() => setShowNewRequestForm(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Request {balance.type}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Quick Stats Summary */}
          <Card className="mt-6 border-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Summary Overview
              </CardTitle>
              <CardDescription>
                Your overall time off status across all leave types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {timeOffBalances.reduce((sum, b) => sum + b.available, 0)}
                  </div>
                  <div className="text-sm font-medium text-gray-700">Total Available Days</div>
                  <div className="text-xs text-muted-foreground mt-1">Across all leave types</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {timeOffBalances.reduce((sum, b) => sum + b.used, 0)}
                  </div>
                  <div className="text-sm font-medium text-gray-700">Used This Year</div>
                  <div className="text-xs text-muted-foreground mt-1">Approved requests</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">
                    {timeOffBalances.reduce((sum, b) => sum + b.pending, 0)}
                  </div>
                  <div className="text-sm font-medium text-gray-700">Pending Approval</div>
                  <div className="text-xs text-muted-foreground mt-1">Awaiting manager review</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {Math.round((timeOffBalances.reduce((sum, b) => sum + b.used, 0) / 
                    Math.max(timeOffBalances.reduce((sum, b) => sum + b.total, 0), 1)) * 100)}%
                  </div>
                  <div className="text-sm font-medium text-gray-700">Usage Rate</div>
                  <div className="text-xs text-muted-foreground mt-1">Of total allocation</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Time Off Requests</CardTitle>
                  <CardDescription>View and manage your time off history</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      placeholder="Search requests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending_manager_approval">Pending Manager Approval</SelectItem>
                      <SelectItem value="pending_hr_approval">Pending HR Approval</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge {...({ className: getTypeColor(request.type) } as React.ComponentProps<typeof Badge>)}>
                              {request.type}
                            </Badge>
                            {getStatusBadge(request.status)}
                            {request.isHalfDay && (
                              <Badge variant="outline">Half Day</Badge>
                            )}
                          </div>
                          <h4 className="font-semibold">
                            {format(new Date(request.startDate), 'MMM dd')} - {format(new Date(request.endDate), 'MMM dd, yyyy')}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {request.days} day{request.days > 1 ? 's' : ''} • {request.reason}
                          </p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Submitted:</span>
                              <span className="ml-2">{format(new Date(request.submittedDate), 'MMM dd, yyyy')}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Approver:</span>
                              <span className="ml-2">{request.approver}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Return Date:</span>
                              <span className="ml-2">{format(new Date(request.returnDate), 'MMM dd, yyyy')}</span>
                            </div>
                          </div>
                          {request.approvedDate && (
                            <div className="text-sm mt-2">
                              <span className="text-muted-foreground">
                                {request.status === 'approved' ? 'Approved' : 'Processed'} on:
                              </span>
                              <span className="ml-2">{format(new Date(request.approvedDate), 'MMM dd, yyyy')}</span>
                            </div>
                          )}
                          {request.comments && (
                            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                              <p className="text-sm">{request.comments}</p>
                            </div>
                          )}
                          {request.status === 'rejected' && request.comments && (
                            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                              <p className="text-sm font-medium text-red-800">Rejection Reason: {request.comments}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline" onClick={() => setSelectedRequest(request)} className="flex-initial">
                            <Eye className="w-4 h-4 mr-0" />
                            <span className="hidden">View</span>
                          </Button>
                          {(request.status === 'pending_manager_approval' || request.status === 'pending_hr_approval' || request.status === 'pending') && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleCancelRequest(request.id)}
                                className="flex-initial"
                              >
                                <Trash2 className="w-4 h-4 mr-0" />
                                <span className="hidden">Cancel</span>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Team Availability</span>
              </CardTitle>
              <CardDescription>See who's out when you're planning time off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamCalendar.length > 0 ? (
                  teamCalendar.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{member.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.dates}</p>
                        </div>
                      </div>
                      <Badge {...({ className: getTypeColor(member.type) } as React.ComponentProps<typeof Badge>)}>
                        {member.type}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No team members on leave at this time</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Time Off Policies</CardTitle>
                <CardDescription>Company policies and guidelines for time off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Vacation Time</h4>
                    <ul className="mt-1 text-sm text-muted-foreground space-y-1">
                      <li>• Accrues at 2.08 days per month</li>
                      <li>• Maximum carryover: 5 days</li>
                      <li>• Requests must be submitted 2 weeks in advance</li>
                      <li>• Expires December 31st annually</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium">Sick Leave</h4>
                    <ul className="mt-1 text-sm text-muted-foreground space-y-1">
                      <li>• 10 days annually, no carryover</li>
                      <li>• Can be used for personal illness or family care</li>
                      <li>• Doctor's note required for 3+ consecutive days</li>
                      <li>• Does not expire</li>
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium">Personal Time</h4>
                    <ul className="mt-1 text-sm text-muted-foreground space-y-1">
                      <li>• 5 days annually</li>
                      <li>• For personal matters that can't be scheduled outside work</li>
                      <li>• Subject to manager approval</li>
                      <li>• Expires December 31st</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
                <CardDescription>Key details about time off management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-900">Blackout Dates</h4>
                        <p className="text-sm text-yellow-800 mt-1">
                          December 15-31: Limited vacation approvals due to year-end activities
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Request Process</h4>
                    <ol className="mt-1 text-sm text-muted-foreground space-y-1">
                      <li>1. Submit request through HR portal</li>
                      <li>2. Manager reviews and approves/denies</li>
                      <li>3. HR processes approved requests</li>
                      <li>4. Calendar updated automatically</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Contact Information</h4>
                    <div className="mt-1 text-sm text-muted-foreground space-y-1">
                      <p>HR Team: hr@company.com</p>
                      <p>Manager: sarah.johnson@company.com</p>
                      <p>Emergency: +1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Request Modal */}
      {showNewRequestForm && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto border shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Request Time Off</CardTitle>
                <Button variant="ghost" onClick={() => setShowNewRequestForm(false)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type of Leave *</Label>
                  <Select value={newRequest.type} onValueChange={(value) => setNewRequest({...newRequest, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      {leaveTypes.map((type) => (
                        <SelectItem key={type.id} value={type.code}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Half Day Request</Label>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={newRequest.isHalfDay}
                      onChange={(e) => setNewRequest({...newRequest, isHalfDay: e.target.checked})}
                    />
                    <span className="text-sm">This is a half-day request</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          if (date && date instanceof Date) {
                            setSelectedDate(date)
                            setNewRequest({...newRequest, startDate: format(date, 'yyyy-MM-dd')})
                            setStartDateOpen(false)
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={(date) => {
                          if (date && date instanceof Date) {
                            setEndDate(date)
                            setNewRequest({...newRequest, endDate: format(date, 'yyyy-MM-dd')})
                            setEndDateOpen(false)
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {selectedDate && endDate && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Duration: {calculateBusinessDays(selectedDate, endDate)} business day(s)
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="reason">Reason *</Label>
                <Textarea
                  id="reason"
                  value={newRequest.reason}
                  onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                  placeholder="Please provide a brief reason for your time off request"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency-contact">Emergency Contact (Optional)</Label>
                <Input
                  id="emergency-contact"
                  value={newRequest.emergencyContact}
                  onChange={(e) => setNewRequest({...newRequest, emergencyContact: e.target.value})}
                  placeholder="Contact information while you're away"
                />
              </div>

              <div className="p-3 bg-gray-50 border rounded-lg">
                <h4 className="font-medium mb-2">Before You Submit</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Ensure you have sufficient balance for this request</li>
                  <li>• Arrange coverage for your responsibilities</li>
                  <li>• Set up your out-of-office message</li>
                  <li>• Notify your team and key stakeholders</li>
                </ul>
              </div>

              <div className="flex flex-row gap-2 pt-4">
                <Button onClick={handleSubmitRequest} className="flex-1 w-auto" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </Button>
                <Button variant="outline" onClick={() => setShowNewRequestForm(false)} className="w-auto">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full border shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Time Off Request Details</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedRequest(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Request ID</Label>
                  <p className="font-medium">{selectedRequest.id}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Type</Label>
                  <Badge {...({ className: getTypeColor(selectedRequest.type) } as React.ComponentProps<typeof Badge>)}>
                    {selectedRequest.type}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Duration</Label>
                  <p className="font-medium">{selectedRequest.days} day(s)</p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Dates</Label>
                <p className="font-medium">
                  {format(new Date(selectedRequest.startDate), 'MMMM dd, yyyy')} - {format(new Date(selectedRequest.endDate), 'MMMM dd, yyyy')}
                </p>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Reason</Label>
                <p className="font-medium">{selectedRequest.reason}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Submitted</Label>
                  <p className="font-medium">{format(new Date(selectedRequest.submittedDate), 'MMMM dd, yyyy')}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Approver</Label>
                  <p className="font-medium">{selectedRequest.approver}</p>
                </div>
              </div>

              {selectedRequest.approvedDate && (
                <div>
                  <Label className="text-sm text-muted-foreground">
                    {selectedRequest.status === 'approved' ? 'Approved Date' : 'Decision Date'}
                  </Label>
                  <p className="font-medium">{format(new Date(selectedRequest.approvedDate), 'MMMM dd, yyyy')}</p>
                </div>
              )}

              {selectedRequest.comments && (
                <div>
                  <Label className="text-sm text-muted-foreground">Comments</Label>
                  <div className="mt-1 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm">{selectedRequest.comments}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-row gap-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedRequest(null)} className="w-auto">
                  Close
                </Button>
                {selectedRequest.status === 'approved' && (
                  <Button variant="outline" className="w-auto">
                    <Download className="w-4 h-4 mr-2" />
                    Download Approval
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  )
}