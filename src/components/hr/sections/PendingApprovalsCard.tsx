import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { Avatar, AvatarFallback } from '../../ui/avatar'
import { Calendar } from 'lucide-react'
import { hrDashboardStats, mockLeaveRequests } from '../../../lib/mockServices'

interface PendingApprovalsCardProps {
  onNavigate?: (page: string) => void
}

export function PendingApprovalsCard({ onNavigate }: PendingApprovalsCardProps) {
  const stats = hrDashboardStats
  const pendingTimeOff = mockLeaveRequests
    .filter(req => req.status === 'pending_hr_approval' || req.status === 'pending_manager_approval')
    .slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 shrink-0" />
              <span className="truncate">Pending Approvals</span>
            </CardTitle>
            <CardDescription className="text-sm">
              {stats.leave.pending_requests} time off requests awaiting review
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs shrink-0">
            {stats.leave.pending_requests}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {pendingTimeOff.length > 0 ? (
            pendingTimeOff.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-xs">
                      {request.employee_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{request.employee_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {request.start_date} - {request.end_date} • {request.days_requested} days
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={request.status === 'pending_hr_approval' ? 'destructive' : 'default'} 
                  className="text-xs shrink-0"
                >
                  {request.status === 'pending_hr_approval' ? 'HR Review' : 'Manager Review'}
                </Badge>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-sm text-muted-foreground">
              No pending approvals
            </div>
          )}
        </div>
        
        <div className="pt-2 border-t space-y-2">
          <Button 
            className="w-full text-base"
            onClick={() => onNavigate?.('time-off-approvals')}
          >
            Review All Approvals
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

