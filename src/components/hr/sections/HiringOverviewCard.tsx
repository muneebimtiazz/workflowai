import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import { Briefcase } from 'lucide-react'
import { hrDashboardStats, mockJobPostings } from '../../../lib/mockServices'

interface HiringOverviewCardProps {
  onNavigate?: (page: string) => void
}

export function HiringOverviewCard({ onNavigate }: HiringOverviewCardProps) {
  const stats = hrDashboardStats
  const activeJobs = mockJobPostings.filter(job => job.status === 'active').slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="h-5 w-5 shrink-0" />
              <span className="truncate">Hiring Overview</span>
            </CardTitle>
            <CardDescription className="text-sm">
              {stats.recruitment.active_candidates} active candidates across {stats.recruitment.open_positions} positions
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs shrink-0">
            {stats.recruitment.open_positions} Open
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.recruitment.active_candidates}</div>
            <p className="text-xs text-muted-foreground mt-1">Candidates</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.recruitment.interviews_scheduled}</div>
            <p className="text-xs text-muted-foreground mt-1">Interviews</p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{stats.recruitment.offers_pending}</div>
            <p className="text-xs text-muted-foreground mt-1">Offers</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-900">Recent Job Postings</p>
          {activeJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">{job.title}</p>
                <p className="text-xs text-muted-foreground">{job.department} • {job.applications_count} applicants</p>
              </div>
              <Badge variant="secondary" className="text-xs shrink-0">
                {job.status}
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="pt-2 border-t">
          <Button 
            className="w-full text-base"
            onClick={() => onNavigate?.('hiring-dashboard')}
          >
            View All Hiring Activities
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

