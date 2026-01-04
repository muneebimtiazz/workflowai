import { useState, useEffect } from 'react'
import { Card, CardContent } from '../../ui/card'
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import { 
  CheckCircle2, 
  Circle, 
  Clock,
  CalendarDays,
  Loader2
} from 'lucide-react'
import { authService, mockEmployeeTasks, Task } from '../../../lib/mockServices'
import { toast } from 'sonner'

export function TodayTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodayTasks()
  }, [])

  async function fetchTodayTasks() {
    try {
      setLoading(true)
      const user = await authService.getCurrentUser()
      if (!user) throw new Error('Not authenticated')
      
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      // Filter tasks assigned to current user and due today
      const todayTasks = mockEmployeeTasks.filter(task => {
        if (task.assigned_to_id !== user.id) return false
        const dueDate = new Date(task.due_date)
        return dueDate >= today && dueDate < tomorrow
      })

      setTasks(todayTasks)
    } catch (err: any) {
      console.error('Error fetching today tasks:', err)
      toast.error('Failed to load today\'s tasks')
    } finally {
      setLoading(false)
    }
  }

  async function updateTaskStatus(taskId: string, newStatus: 'pending' | 'completed' | 'under_review' | 'review_completed') {
    try {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? { ...task, status: newStatus, completed_date: newStatus === 'completed' ? new Date().toISOString() : undefined }
            : task
        )
      )
      toast.success('Task status updated')
    } catch (err: any) {
      console.error('Error updating task:', err)
      toast.error('Failed to update task')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge variant="default">Completed</Badge>
      case 'review_completed': return <Badge variant="default">Review Completed</Badge>
      case 'under_review': return <Badge variant="outline">Under Review</Badge>
      case 'pending': return <Badge variant="secondary">Pending</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Badge variant="destructive">Urgent</Badge>
      case 'high': return <Badge variant="outline">High</Badge>
      case 'medium': return <Badge variant="secondary">Medium</Badge>
      case 'low': return <Badge variant="secondary">Low</Badge>
      default: return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-primary" />
      case 'under_review': return <Clock className="w-5 h-5 text-primary" />
      case 'review_completed': return <CheckCircle2 className="w-5 h-5 text-primary" />
      default: return <Circle className="w-5 h-5 text-muted-foreground" />
    }
  }

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'under_review').length,
    completed: tasks.filter(t => t.status === 'completed' || t.status === 'review_completed').length,
  }

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Today's Tasks</h2>
          <p className="text-sm text-muted-foreground">Tasks due today - {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Today</p>
                <p className="text-3xl font-bold text-foreground">{taskStats.total}</p>
              </div>
              <CalendarDays className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-3xl font-bold text-foreground">{taskStats.pending}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-3xl font-bold text-foreground">{taskStats.inProgress}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-3xl font-bold text-foreground">{taskStats.completed}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <CalendarDays className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No tasks due today</h3>
                <p className="text-sm text-muted-foreground">You're all caught up for today!</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          tasks.map(task => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-row items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 w-full">
                    <div className="mt-1">
                      {getStatusIcon(task.status)}
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground">{task.title}</h3>
                        {getPriorityBadge(task.priority)}
                        {getStatusBadge(task.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-foreground text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Due: {new Date(task.due_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                        </span>
                        <span>Assigned by: {task.assigned_by_name}</span>
                        {task.category && (
                          <Badge variant="outline">{task.category}</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Update Buttons */}
                  <div className="flex flex-row gap-2">
                    {task.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => updateTaskStatus(task.id, 'under_review')}
                        className="w-auto"
                      >
                        Start Task
                      </Button>
                    )}
                    {task.status === 'under_review' && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => updateTaskStatus(task.id, 'completed')}
                        className="w-auto"
                      >
                        Mark Complete
                      </Button>
                    )}
                    {(task.status === 'completed' || task.status === 'review_completed') && task.completed_date && (
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-xs text-foreground">Done</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Productivity Message */}
      {tasks.length > 0 && taskStats.completed === tasks.length && (
        <Card className="bg-muted border-border">
          <CardContent className="pt-6">
            <div className="text-center py-4">
              <CheckCircle2 className="w-12 h-12 mx-auto text-primary mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-1">All Tasks Completed!</h3>
              <p className="text-sm text-foreground">Great job! You've completed all your tasks for today.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}