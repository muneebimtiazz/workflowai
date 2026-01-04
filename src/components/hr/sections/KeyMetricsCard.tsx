import { Card, CardContent } from '../../ui/card'
import { Briefcase, UserPlus, Calendar, Shield } from 'lucide-react'
import { hrDashboardStats } from '../../../lib/mockServices'

interface KeyMetricsCardProps {
  onNavigate?: (page: string) => void
}

export function KeyMetricsCard({ onNavigate }: KeyMetricsCardProps) {
  const stats = hrDashboardStats

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card 
        className="hover:shadow-md transition-shadow cursor-pointer" 
        onClick={() => onNavigate?.('hiring-dashboard')}
      >
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <div className="text-2xl font-bold">{stats.recruitment.open_positions}</div>
              <p className="text-sm text-muted-foreground">Active Job Openings</p>
              <p className="text-xs text-green-600">↑ {stats.recruitment.interviews_scheduled} interviews scheduled</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className="hover:shadow-md transition-shadow cursor-pointer" 
        onClick={() => onNavigate?.('onboarding')}
      >
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-green-600 shrink-0" />
            <div className="min-w-0">
              <div className="text-2xl font-bold">{stats.employees.new_this_month}</div>
              <p className="text-sm text-muted-foreground">New This Month</p>
              <p className="text-xs text-blue-600">{stats.employees.active} active employees</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className="hover:shadow-md transition-shadow cursor-pointer" 
        onClick={() => onNavigate?.('time-off-approvals')}
      >
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-orange-600 shrink-0" />
            <div className="min-w-0">
              <div className="text-2xl font-bold">{stats.leave.pending_requests}</div>
              <p className="text-sm text-muted-foreground">Pending Approvals</p>
              <p className="text-xs text-orange-600">Requires attention</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card 
        className="hover:shadow-md transition-shadow cursor-pointer" 
        onClick={() => onNavigate?.('policy-compliance')}
      >
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-purple-600 shrink-0" />
            <div className="min-w-0">
              <div className="text-2xl font-bold">94%</div>
              <p className="text-sm text-muted-foreground">Compliance Score</p>
              <p className="text-xs text-green-600">↑ Above target</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

