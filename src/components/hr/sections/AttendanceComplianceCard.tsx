import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import { Clock4 } from 'lucide-react'
import { hrDashboardStats } from '../../../lib/mockServices'

export function AttendanceComplianceCard() {
  const stats = hrDashboardStats

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock4 className="h-5 w-5" />
          Attendance & Compliance Overview
        </CardTitle>
        <CardDescription className="text-sm">
          Daily attendance and compliance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.attendance.average_attendance_rate}%</div>
            <p className="text-sm text-muted-foreground mt-1">Attendance Rate</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.attendance.present_today}</div>
            <p className="text-sm text-muted-foreground mt-1">Present Today</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{stats.attendance.on_leave_today}</div>
            <p className="text-sm text-muted-foreground mt-1">On Leave Today</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

