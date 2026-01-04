import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Progress } from "../../ui/progress"
import { CheckCircle2, Clock, AlertTriangle, TrendingUp, Target, Calendar } from 'lucide-react'
import { authService, taskService, Task } from '../../../lib/mockServices'

export function TaskSummaryCard() {
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

  // Calculate task statistics
  const totalTasks = assignedTasks.length;
  const completedTasks = assignedTasks.filter(task => task.status === 'completed' || task.status === 'review_completed').length;
  const inProgressTasks = assignedTasks.filter(task => task.status === 'under_review').length;
  const pendingTasks = assignedTasks.filter(task => task.status === 'pending').length;
  
  const overdueTasks = assignedTasks.filter(task => {
    const isOverdue = new Date(task.due_date) < new Date();
    return isOverdue && task.status !== 'completed' && task.status !== 'review_completed';
  }).length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get upcoming deadline (next 7 days)
  const upcomingTasks = assignedTasks.filter(task => {
    const deadline = new Date(task.due_date);
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return deadline >= now && deadline <= weekFromNow && task.status !== 'completed' && task.status !== 'review_completed';
  }).length;

  const getCompletionRateColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Task Summary
          </div>
          <Badge variant="outline">
            {totalTasks} total
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {totalTasks === 0 ? (
          <div className="text-center py-8">
            <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No tasks assigned</p>
            <p className="text-sm text-muted-foreground mt-1">Your assigned tasks will appear here</p>
          </div>
        ) : (
          <>
            {/* Task Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                <div className="text-sm text-green-700">Completed</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
                <div className="text-sm text-blue-700">In Progress</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">{pendingTasks}</div>
                <div className="text-sm text-gray-700">Pending</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
                <div className="text-sm text-red-700">Overdue</div>
              </div>
            </div>

            {/* Completion Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className={`text-sm font-bold ${getCompletionRateColor(completionRate)}`}>
                  {completionRate}%
                </span>
              </div>
              <Progress value={completionRate} className="h-3" />
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              {upcomingTasks > 0 && (
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Upcoming Deadlines</span>
                  </div>
                  <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                    {upcomingTasks} tasks this week
                  </Badge>
                </div>
              )}

              {overdueTasks > 0 && (
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">Overdue Tasks</span>
                  </div>
                  <Badge variant="destructive">
                    {overdueTasks} need attention
                  </Badge>
                </div>
              )}

              {inProgressTasks > 0 && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Active Tasks</span>
                  </div>
                  <Badge variant="outline" className="text-blue-700 border-blue-300">
                    {inProgressTasks} in progress
                  </Badge>
                </div>
              )}
            </div>

            {/* Performance Insight */}
            {completionRate >= 80 && (
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Great job! You're maintaining a high completion rate.
                </span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}