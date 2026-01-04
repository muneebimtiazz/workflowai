import { useState, useEffect } from 'react'
import { Card, CardContent } from '../../ui/card'
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { 
  CheckCircle2, 
  Circle, 
  Clock,
  Loader2,
  Eye,
  FileCheck
} from 'lucide-react'
import { authService } from '../../../lib/mockServices'
import { taskService, Task } from '../../../lib/mockServices'
import { toast } from 'sonner'

export function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    try {
      setLoading(true)
      const user = await authService.getCurrentUser()
      if (!user) throw new Error('Not authenticated')
      
      const userTasks = await taskService.getTasksByEmployee(user.id)
      setTasks(userTasks)
    } catch (err: any) {
      console.error('Error fetching tasks:', err)
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  async function markTaskCompleted(taskId: string) {
    try {
      const user = await authService.getCurrentUser()
      if (!user) throw new Error('Not authenticated')
      
      await taskService.updateTask(taskId, { 
        status: 'completed',
        completed_date: new Date().toISOString()
      })
      await fetchTasks() // Refresh tasks
      toast.success('Task marked as completed')
    } catch (err: any) {
      console.error('Error completing task:', err)
      toast.error(err.message || 'Failed to complete task')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': 
        return <Badge variant="secondary">Pending</Badge>
      case 'completed': 
        return <Badge variant="default">Completed</Badge>
      case 'under_review': 
        return <Badge variant="outline">Under Review</Badge>
      case 'review_completed': 
        return <Badge variant="default">Review Completed</Badge>
      default: 
        return <Badge variant="secondary">{status}</Badge>
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
      case 'completed': 
        return <CheckCircle2 className="w-5 h-5 text-primary" />
      case 'under_review': 
        return <Eye className="w-5 h-5 text-primary" />
      case 'review_completed': 
        return <FileCheck className="w-5 h-5 text-primary" />
      default: 
        return <Circle className="w-5 h-5 text-muted-foreground" />
    }
  }

  const filteredTasks = selectedStatus === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === selectedStatus)

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    underReview: tasks.filter(t => t.status === 'under_review').length,
    reviewCompleted: tasks.filter(t => t.status === 'review_completed').length,
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
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
          <h2 className="text-2xl font-semibold text-foreground">My Tasks</h2>
          <p className="text-sm text-muted-foreground">View and manage tasks assigned to you</p>
        </div>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Tasks</p>
              <p className="text-3xl font-bold text-foreground">{taskStats.total}</p>
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
              <p className="text-sm text-muted-foreground">Under Review</p>
              <p className="text-3xl font-bold text-blue-600">{taskStats.underReview}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Review Completed</p>
              <p className="text-3xl font-bold text-purple-600">{taskStats.reviewCompleted}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Tabs */}
      <Tabs defaultValue="all" onValueChange={setSelectedStatus}>
        <TabsList>
          <TabsTrigger value="all">All Tasks ({tasks.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({taskStats.pending})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({taskStats.completed})</TabsTrigger>
          <TabsTrigger value="under_review">Under Review ({taskStats.underReview})</TabsTrigger>
          <TabsTrigger value="review_completed">Review Completed ({taskStats.reviewCompleted})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedStatus} className="space-y-4 mt-6">
          {filteredTasks.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8 text-muted-foreground">
                  No tasks found in this category
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map(task => (
              <Card key={task.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-row items-start justify-between gap-4">
                    <div className="flex items-start space-x-4 flex-1 w-full">
                      <div className="mt-1 shrink-0">
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold ">{task.title}</h3>
                          {getPriorityBadge(task.priority)}
                          {getStatusBadge(task.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 shrink-0" />
                            <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                          </span>
                          <span className="inline">Assigned: {new Date(task.assigned_date).toLocaleDateString()}</span>
                          <span>By: {task.assigned_by_name}</span>
                          {task.category && (
                            <Badge variant="outline">{task.category}</Badge>
                          )}
                        </div>
                        {task.completed_date && (
                          <div className="text-xs text-muted-foreground">
                            Completed: {new Date(task.completed_date).toLocaleDateString()}
                          </div>
                        )}
                        {task.status === 'under_review' && task.review_started_date && (
                          <div className="text-xs text-blue-600">
                            Review started: {new Date(task.review_started_date).toLocaleDateString()}
                          </div>
                        )}
                        {task.status === 'review_completed' && task.review_completed_date && (
                          <div className="text-xs text-purple-600">
                            Review completed: {new Date(task.review_completed_date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2 ml-4 w-auto">
                      {task.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => markTaskCompleted(task.id)}
                          className="w-auto"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Mark as Completed
                        </Button>
                      )}
                      {(task.status === 'completed' || task.status === 'under_review' || task.status === 'review_completed') && (
                        <div className="text-xs text-muted-foreground text-center">
                          {task.status === 'completed' && 'Awaiting manager review'}
                          {task.status === 'under_review' && 'Manager is reviewing'}
                          {task.status === 'review_completed' && 'Review completed'}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}