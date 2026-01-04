import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Checkbox } from "../../ui/checkbox"
import { Badge } from "../../ui/badge"
import { Calendar, AlertCircle, CheckCircle2 } from 'lucide-react'
import { authService, taskService, Task } from '../../../lib/mockServices'
import { toast } from 'sonner'

interface PendingTasksCardProps {
  completedTasks: Record<string, boolean>
  onTaskToggle: (taskId: string) => void
}

export function PendingTasksCard({ completedTasks, onTaskToggle }: PendingTasksCardProps) {
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([])

  useEffect(() => {
    async function fetchTasks() {
      try {
        const user = await authService.getCurrentUser()
        if (user) {
          const tasks = await taskService.getTasksByEmployee(user.id)
          setAssignedTasks(tasks)
        }
      } catch (err) {
        console.error('Error fetching tasks:', err)
      }
    }
    fetchTasks()
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'review_completed': return 'text-green-700 bg-green-100';
      case 'under_review': return 'text-blue-700 bg-blue-100';
      case 'pending': return 'text-orange-700 bg-orange-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await taskService.updateTask(taskId, { 
        status: 'completed',
        completed_date: new Date().toISOString()
      });
      const tasks = await taskService.getTasksByEmployee((await authService.getCurrentUser()).id)
      setAssignedTasks(tasks)
      onTaskToggle(taskId);
      toast.success('Task marked as completed')
    } catch (err: any) {
      toast.error(err.message || 'Failed to complete task')
    }
  };

  if (assignedTasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            My Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No tasks assigned yet</p>
            <p className="text-sm text-muted-foreground mt-1">New tasks will appear here when assigned by your manager</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            My Tasks
          </div>
          <Badge variant="outline">
            {assignedTasks.length} tasks
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {assignedTasks.map((task) => {
          const taskIsOverdue = isOverdue(task.due_date);
          const isCompleted = task.status === 'completed' || task.status === 'review_completed';
          
          return (
            <div key={task.id} className="border rounded-lg p-4 space-y-3 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={isCompleted || completedTasks[task.id] || false}
                      onCheckedChange={() => handleCompleteTask(task.id)}
                      className="mt-1"
                      disabled={isCompleted}
                    />
                    <div className="flex-1">
                      <h4 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                      {task.priority}
                    </Badge>
                    <Badge className={getStatusColor(task.status)} variant="outline">
                      {task.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {task.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className={taskIsOverdue ? 'text-red-600 font-medium' : ''}>
                        {new Date(task.due_date).toLocaleDateString()}
                      </span>
                    </div>
                    {taskIsOverdue && !isCompleted && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        <span className="font-medium">Overdue</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  )
}