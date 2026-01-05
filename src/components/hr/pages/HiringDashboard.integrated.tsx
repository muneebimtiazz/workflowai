import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  Target,
  Loader2,
  XCircle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { recruitmentService } from '../../../lib/mockServices';
import { toast } from 'sonner';

interface HiringDashboardIntegratedProps {
  onNavigate?: (page: string) => void;
}

export function HiringDashboardIntegrated({ onNavigate }: HiringDashboardIntegratedProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [topCandidates, setTopCandidates] = useState<any[]>([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsData, jobsData, candidatesData, interviewsData] = await Promise.all([
        recruitmentService.getRecruitmentStats(),
        recruitmentService.getJobOpenings({ status: 'open' }),
        recruitmentService.getCandidates(),
        recruitmentService.getInterviews({ status: 'scheduled' })
      ]);

      setStats(statsData);
      setRecentJobs(jobsData.slice(0, 5));
      // Filter to only Candidate type (not CandidateLegacy) and check for overall_rank
      const modernCandidates = candidatesData.filter((c): c is any => 
        'name' in c && 'overall_rank' in c
      );
      setTopCandidates(modernCandidates.filter(c => c.overall_rank && c.overall_rank <= 5).slice(0, 5));
      setUpcomingInterviews(interviewsData.slice(0, 5));
    } catch (err: any) {
      console.error('Error fetching hiring dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-9xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Loading hiring dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-9xl mx-auto space-y-6">
        <Card className="p-6 border-destructive bg-destructive/10">
          <div className="flex items-center gap-2 text-destructive">
            <XCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
          <Button onClick={fetchData} className="mt-4">
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Jobs',
      value: stats?.total_jobs || 0,
      icon: Briefcase,
      color: 'bg-blue-50 text-blue-600',
      change: `${stats?.open_jobs || 0} open`
    },
    {
      label: 'Total Applicants',
      value: stats?.total_applicants || 0,
      icon: Users,
      color: 'bg-green-50 text-green-600',
      change: `${stats?.top_candidates || 0} top candidates`
    },
    {
      label: 'Interviews Scheduled',
      value: stats?.interviews_scheduled || 0,
      icon: Calendar,
      color: 'bg-purple-50 text-purple-600',
      change: 'This month'
    },
    {
      label: 'Avg. Resume Score',
      value: stats?.avg_resume_score || 0,
      icon: Target,
      color: 'bg-orange-50 text-orange-600',
      change: 'Out of 100'
    }
  ];

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Hiring Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your recruitment workflow</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={fetchData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recent Job Openings */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Job Openings</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate?.('job-openings')}
            >
              View All
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
          
          {recentJobs.length === 0 ? (
            <div className="text-center py-8">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No job openings yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentJobs.map(job => (
                <div key={job.id} className="p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.department}</p>
                    </div>
                    <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {job.applicants_count} applicants
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {job.interviews_scheduled} interviews
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Top Candidates */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Top Candidates</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate?.('applying-candidates')}
            >
              View All
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
          
          {topCandidates.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No candidates yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topCandidates.map(candidate => (
                <div key={candidate.id} className="p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{candidate.name}</h4>
                      <p className="text-sm text-muted-foreground">{candidate.job_title}</p>
                    </div>
                    <Badge variant="secondary">
                      Rank #{candidate.overall_rank}
                    </Badge>
                  </div>
                  {candidate.resume_score !== undefined && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Resume Score</span>
                          <span className="font-medium">{candidate.resume_score}/100</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${candidate.resume_score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <Badge variant="secondary" className="text-xs">
                    {candidate.status.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Upcoming Interviews */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Upcoming Interviews</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate?.('interviews')}
          >
            View All
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
        
        {upcomingInterviews.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No upcoming interviews</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Candidate</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Job</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                </tr>
              </thead>
              <tbody>
                {upcomingInterviews.map(interview => (
                  <tr key={interview.id} className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium text-foreground">{interview.candidate_name}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{interview.job_title}</td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {new Date(interview.interview_date).toLocaleDateString()} at {interview.interview_time}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="secondary">{interview.interview_type}</Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground max-w-xs truncate">
                      {interview.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
