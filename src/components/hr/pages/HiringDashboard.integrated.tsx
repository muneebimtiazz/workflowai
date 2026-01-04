import { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
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
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading hiring dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="p-6 border-red-200 bg-red-50">
          <div className="flex items-center space-x-3">
            <XCircle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Error Loading Data</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
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
        <h2 className="text-2xl font-semibold">Hiring Dashboard</h2>
          <p className="text-gray-600">Manage your recruitment workflow</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={fetchData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.change}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recent Job Openings */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Job Openings</h3>
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
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No job openings yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentJobs.map(job => (
                <div key={job.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.department}</p>
                    </div>
                    <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
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
            <h3 className="text-lg font-semibold text-gray-900">Top Candidates</h3>
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
              <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No candidates yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topCandidates.map(candidate => (
                <div key={candidate.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                      <p className="text-sm text-gray-600">{candidate.job_title}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Rank #{candidate.overall_rank}
                    </Badge>
                  </div>
                  {candidate.resume_score !== undefined && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                          <span>Resume Score</span>
                          <span className="font-medium">{candidate.resume_score}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
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
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h3>
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
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No upcoming interviews</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Candidate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Job</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                </tr>
              </thead>
              <tbody>
                {upcomingInterviews.map(interview => (
                  <tr key={interview.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{interview.candidate_name}</td>
                    <td className="py-4 px-4 text-gray-600">{interview.job_title}</td>
                    <td className="py-4 px-4 text-gray-600">
                      {new Date(interview.interview_date).toLocaleDateString()} at {interview.interview_time}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="secondary">{interview.interview_type}</Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 max-w-xs truncate">
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
