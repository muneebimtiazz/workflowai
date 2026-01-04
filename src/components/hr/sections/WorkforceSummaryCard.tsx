import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import { Button } from '../../ui/button'
import { TrendingUp, Clock4, Shield, Users } from 'lucide-react'
import { hrDashboardStats } from '../../../lib/mockServices'

interface WorkforceSummaryCardProps {
  onNavigate?: (page: string) => void
}

export function WorkforceSummaryCard({ onNavigate }: WorkforceSummaryCardProps) {
  const stats = hrDashboardStats

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 shrink-0" />
              <span className="truncate">Workforce Summary</span>
            </CardTitle>
            <CardDescription className="text-sm">
              Key workforce metrics and analytics
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.employees.total}</div>
            <p className="text-xs text-muted-foreground mt-1">Total Employees</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.performance.average_rating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground mt-1">Avg Performance</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Clock4 className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium">Attendance Rate</span>
            </div>
            <span className="text-sm font-bold text-teal-600">{stats.attendance.average_attendance_rate}%</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Compliance Score</span>
            </div>
            <span className="text-sm font-bold text-green-600">94%</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">High Performers</span>
            </div>
            <span className="text-sm font-bold text-blue-600">{stats.performance.high_performers}</span>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <Button 
            variant="outline" 
            className="w-full text-base"
            onClick={() => onNavigate?.('workforce-analytics')}
          >
            View Detailed Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

