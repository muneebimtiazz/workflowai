import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card'
import { Progress } from '../../ui/progress'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { authService, mockEmployeeTasks } from '../../../lib/mockServices'

export function TaskProgressCard() {
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
    completionRate: 0
  })

  useEffect(() => {
    fetchTaskStats()
  }, [])

  async function fetchTaskStats() {
    try {
      const user = await authService.getCurrentUser()
      if (!user) return

      const userTasks = mockEmployeeTasks.filter(task => task.assigned_to_id === user.id)
      const completed = userTasks.filter(t => t.status === 'completed').length
      const inProgress = userTasks.filter(t => t.status === 'under_review' || t.status === 'review_completed').length
      const pending = userTasks.filter(t => t.status === 'pending').length

      setTaskStats({
        total: userTasks.length,
        completed,
        inProgress,
        pending,
        completionRate: userTasks.length > 0 ? Math.round((completed / userTasks.length) * 100) : 0
      })
    } catch (err) {
      console.error('Error fetching task stats:', err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span>Task Progress</span>
        </CardTitle>
        <CardDescription>Your overall task completion</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Completion Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Overall Completion</span>
            <span className="text-sm font-semibold">{taskStats.completionRate}%</span>
          </div>
          <Progress value={taskStats.completionRate} className="h-2" />
        </div>

        {/* Task Breakdown */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Completed</span>
            </div>
            <span className="text-lg font-bold text-green-700">{taskStats.completed}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">In Progress</span>
            </div>
            <span className="text-lg font-bold text-blue-700">{taskStats.inProgress}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Pending</span>
            </div>
            <span className="text-lg font-bold text-gray-700">{taskStats.pending}</span>
          </div>
        </div>

        {/* Total Summary */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Tasks</span>
            <span className="text-xl font-bold">{taskStats.total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
