import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { Users, UserPlus, UserMinus } from 'lucide-react'
import { hrDashboardStats } from '../../../lib/mockServices'

interface EmployeeLifecycleCardProps {
  onNavigate?: (page: string) => void
}

export function EmployeeLifecycleCard({ onNavigate }: EmployeeLifecycleCardProps) {
  const stats = hrDashboardStats

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 shrink-0" />
              <span className="truncate">Employee Lifecycle</span>
            </CardTitle>
            <CardDescription className="text-sm">
              Onboarding and offboarding activities
            </CardDescription>
          </div>
          <div className="flex gap-2 shrink-0">
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              <UserPlus className="h-3 w-3" />
              {stats.employees.new_this_month} New
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.employees.new_this_month}</div>
            <p className="text-xs text-muted-foreground mt-1">New This Month</p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{stats.employees.on_leave}</div>
            <p className="text-xs text-muted-foreground mt-1">On Leave</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-green-50/50">
            <div className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Active Onboarding</span>
            </div>
            <Badge variant="default" className="bg-green-600">8 in progress</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50/50">
            <div className="flex items-center gap-2">
              <UserMinus className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">Offboarding</span>
            </div>
            <Badge variant="secondary">2 pending</Badge>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <Button 
            variant="outline" 
            className="w-full text-base"
            onClick={() => onNavigate?.('employee-lifecycle')}
          >
            Manage Employee Lifecycle
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

