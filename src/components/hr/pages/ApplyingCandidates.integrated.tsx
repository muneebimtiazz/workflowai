import { useState, useEffect, useMemo } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import {
  Users,
  Search,
  Filter,
  Loader2,
  XCircle,
  RefreshCw,
  Award,
  Calendar,
  Mail,
  Phone,
  Grid3x3,
  List,
  UserPlus,
  CheckCircle2,
  X
} from 'lucide-react';
import { recruitmentService, Candidate, Interview } from '../../../lib/mockServices';
import { toast } from 'sonner';
import { ScheduleInterviewModal } from '../modals/ScheduleInterviewModal';

// Safe toast wrapper
const safeToast = {
  error: (message: string) => {
    try {
      toast.error(message);
    } catch (err) {
      console.error('Toast error:', message, err);
    }
  },
  success: (message: string) => {
    try {
      toast.success(message);
    } catch (err) {
      console.error('Toast success:', message, err);
    }
  }
};

export function ApplyingCandidatesIntegrated() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [existingInterviews, setExistingInterviews] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobFilter, setJobFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [conflictError, setConflictError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [candidatesData, jobsData, interviewsData] = await Promise.all([
        recruitmentService.getCandidates(),
        recruitmentService.getJobOpenings(),
        recruitmentService.getInterviews()
      ]);
      // Filter to only Candidate type (not CandidateLegacy)
      const modernCandidates = (candidatesData || []).filter((c): c is Candidate => 
        c && typeof c === 'object' && 'name' in c && 'job_title' in c
      );
      setCandidates(modernCandidates || []);
      setJobs(jobsData || []);
      setExistingInterviews(interviewsData || []);
    } catch (err: any) {
      console.error('Error fetching candidates:', err);
      const errorMessage = err?.message || 'Failed to load candidates';
      setError(errorMessage);
      safeToast.error(errorMessage);
      // Set empty arrays on error to prevent further issues
      setCandidates([]);
      setJobs([]);
      setExistingInterviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    fetchData().catch(err => {
      if (mounted) {
        console.error('Unhandled error in fetchData:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Use useMemo for better performance
  const filteredCandidates = useMemo(() => {
    try {
      if (!candidates || !Array.isArray(candidates)) {
        return [];
      }
      let filtered = [...candidates];

      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(c =>
          c?.name?.toLowerCase().includes(searchLower) ||
          c?.email?.toLowerCase().includes(searchLower) ||
          c?.job_title?.toLowerCase().includes(searchLower)
        );
      }

      if (jobFilter !== 'all' && jobs && Array.isArray(jobs)) {
        const job = jobs.find(j => j?.id === jobFilter);
        if (job?.title) {
          filtered = filtered.filter(c => c?.job_title === job.title);
        }
      }

      if (statusFilter !== 'all') {
        filtered = filtered.filter(c => c?.status === statusFilter);
      }

      return filtered;
    } catch (err) {
      console.error('Error filtering candidates:', err);
      return [];
    }
  }, [candidates, searchTerm, jobFilter, statusFilter, jobs]);

  const clearFilters = () => {
    setSearchTerm('');
    setJobFilter('all');
    setStatusFilter('all');
  };

  const handleScheduleInterview = async (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setConflictError(null);
    
    // Check for conflicts when opening the modal
    try {
      const interviewsData = await recruitmentService.getInterviews();
      const conflictingInterview = interviewsData.find((interview: Interview) => {
        const isSameCandidate = interview.candidate_id === candidate.id;
        const isScheduled = interview.status === 'scheduled';
        return isSameCandidate && isScheduled;
      });

      if (conflictingInterview) {
        const conflictMessage = `This candidate (${candidate.name}) already has a scheduled interview.\n\nExisting Interview Details:\n- Date: ${conflictingInterview.interview_date}\n- Time: ${conflictingInterview.interview_time}\n- Team: ${conflictingInterview.interview_team_name || 'No team assigned'}\n- Type: ${conflictingInterview.interview_type}\n- Location: ${conflictingInterview.location}`;
        setConflictError(conflictMessage);
      }
    } catch (err) {
      console.error('Error checking for conflicts:', err);
    }
    
    setShowInterviewModal(true);
  };

  const handleInterviewSubmit = async (interviewData: any) => {
    try {
      if (!selectedCandidate || conflictError) return;

      // Double-check for scheduling conflicts with the specific date and time
      const conflictingInterview = existingInterviews.find((interview: Interview) => {
        const isSameCandidate = interview.candidate_id === selectedCandidate.id;
        const isSameDate = interview.interview_date === interviewData.interview_date;
        const isSameTime = interview.interview_time === interviewData.interview_time;
        const isScheduled = interview.status === 'scheduled';
        
        return isSameCandidate && isSameDate && isSameTime && isScheduled;
      });

      if (conflictingInterview) {
        const conflictMessage = `This candidate (${selectedCandidate.name}) is already assigned to an interview at the same date (${interviewData.interview_date}) and time (${interviewData.interview_time}).\n\nExisting Interview Details:\n- Team: ${conflictingInterview.interview_team_name || 'No team assigned'}\n- Type: ${conflictingInterview.interview_type}\n- Location: ${conflictingInterview.location}`;
        setConflictError(conflictMessage);
        return;
      }

      // Find the job by matching job_title
      const matchingJob = jobs.find(j => j.title === selectedCandidate.job_title);
      
      await recruitmentService.scheduleInterview({
        candidate_id: selectedCandidate.id,
        candidate_name: selectedCandidate.name,
        job_id: matchingJob?.id || '',
        job_title: selectedCandidate.job_title,
        interview_date: interviewData.interview_date,
        interview_time: interviewData.interview_time,
        location: interviewData.location,
        interview_type: interviewData.interview_type,
        interview_team_id: interviewData.interview_team_id,
        interview_team_name: interviewData.interview_team_name,
        status: 'scheduled'
      });

      safeToast.success('Interview scheduled successfully. Email sent to candidate.');
      setShowInterviewModal(false);
      setSelectedCandidate(null);
      setConflictError(null);
      fetchData();
    } catch (err: any) {
      console.error('Error scheduling interview:', err);
      safeToast.error('Failed to schedule interview');
    }
  };

  const handleUpdateStatus = async (candidateId: string, newStatus: Candidate['status']) => {
    try {
      await recruitmentService.updateCandidateStatus(candidateId, newStatus);
      safeToast.success('Candidate status updated');
      fetchData();
    } catch (err: any) {
      console.error('Error updating status:', err);
      safeToast.error('Failed to update status');
    }
  };

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const stats = useMemo(() => {
    try {
      if (!candidates || !Array.isArray(candidates)) {
        return { total: 0, applied: 0, shortlisted: 0, top20: 0, filtered: 0 };
      }
      return {
        total: candidates.length,
        applied: candidates.filter(c => c?.status === 'new').length,
        shortlisted: candidates.filter(c => c?.status === 'screening').length,
        top20: candidates.filter(c => c?.overall_rank && c.overall_rank <= 20).length,
        filtered: filteredCandidates?.length || 0
      };
    } catch (err) {
      console.error('Error calculating stats:', err);
      return { total: 0, applied: 0, shortlisted: 0, top20: 0, filtered: 0 };
    }
  }, [candidates, filteredCandidates]);

  // Now we can do conditional returns AFTER all hooks
  if (loading) {
    return (
      <div className="max-w-9xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Loading candidates...</span>
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

  const getStatusBadgeColor = (status: Candidate['status']) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800 border-blue-200',
      screening: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      interviewing: 'bg-purple-100 text-purple-800 border-purple-200',
      offer: 'bg-green-100 text-green-800 border-green-200',
      hired: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusLabel = (status: Candidate['status']) => {
    const labels = {
      new: 'New',
      screening: 'Screening',
      interviewing: 'Interviewing',
      offer: 'Offer',
      hired: 'Hired',
      rejected: 'Rejected'
    };
    return labels[status] || status;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const hasActiveFilters = Boolean((searchTerm || '').trim() || jobFilter !== 'all' || statusFilter !== 'all');

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Applying Candidates</h2>
          <p className="text-sm text-muted-foreground mt-1">Review and rank candidates from CV Analyzer</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none border-0"
            >
              <Grid3x3 className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Grid</span>
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none border-0"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">List</span>
            </Button>
          </div>
          <Button variant="outline" onClick={fetchData} size="sm">
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Candidates</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">New Applications</p>
              <p className="text-3xl font-bold text-blue-600">{stats.applied}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Shortlisted</p>
              <p className="text-3xl font-bold text-green-600">{stats.shortlisted}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Top 20 Candidates</p>
              <p className="text-3xl font-bold text-purple-600">{stats.top20}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name, email, or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm h-10 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
              >
                <option value="all">All Jobs</option>
                {(jobs || []).map(job => job ? (
                  <option key={job.id || Math.random()} value={job.id}>{job.title || 'Unknown'}</option>
                ) : null)}
              </select>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm h-10 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="screening">Screening</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offer</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-10 text-gray-600 hover:text-gray-900"
              >
                <X className="w-4 h-4 mr-1" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
        {hasActiveFilters && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{stats.filtered}</span> of <span className="font-semibold text-gray-900">{stats.total}</span> candidates
            </p>
          </div>
        )}
      </Card>

      {/* Candidate List/Grid */}
      {!filteredCandidates || filteredCandidates.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-600 mb-4">
              {hasActiveFilters
                ? 'Try adjusting your search filters to see more results'
                : 'Candidates will appear here when they apply via CV Analyzer link'}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            )}
          </div>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.filter(c => c && c.id).map(candidate => {
            const isTopCandidate = candidate?.overall_rank && candidate.overall_rank <= 20;
            
            return (
              <Card 
                key={candidate.id} 
                className={`p-6 hover:shadow-lg transition-all duration-200 ${
                  isTopCandidate ? 'border-2 border-green-400 bg-gradient-to-br from-green-50 to-white' : 'border border-gray-200 bg-white'
                }`}
              >
                <div className="space-y-4">
                  {/* Name and Rank */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 truncate">{candidate?.name || 'Unknown'}</h3>
                      {candidate?.overall_rank && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                            candidate.overall_rank <= 20 
                              ? 'bg-green-600 text-white border-green-700' 
                              : 'bg-gray-600 text-white border-gray-700'
                          }`}>
                            Rank #{candidate.overall_rank}
                          </span>
                          {isTopCandidate && (
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 border-yellow-300">
                              <Award className="w-3 h-3 mr-1" />
                              Top 20
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Applying Position */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Applying Position</p>
                    <p className="text-sm font-semibold text-gray-900">{candidate?.job_title || 'N/A'}</p>
                  </div>

                  {/* Email */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Email</p>
                    <div className="flex items-center text-sm text-gray-700">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="truncate">{candidate?.email || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Cell/Phone */}
                  {candidate.phone && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Cell</p>
                      <div className="flex items-center text-sm text-gray-700">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{candidate?.phone || 'N/A'}</span>
                      </div>
                    </div>
                  )}

                  {/* Applied Date */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Applied Date</p>
                    <div className="flex items-center text-sm text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{candidate?.applied_date ? new Date(candidate.applied_date).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>

                  {/* Resume Score */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-gray-500">Resume Score</p>
                      <span className={`text-lg font-bold ${candidate?.resume_score ? getScoreColor(candidate.resume_score) : 'text-gray-400'}`}>
                        {candidate?.resume_score ? `${candidate.resume_score}%` : 'N/A'}
                      </span>
                    </div>
                    {candidate?.resume_score !== undefined && (
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${getScoreBgColor(candidate.resume_score)}`}
                          style={{ width: `${candidate.resume_score}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="pt-3 border-t border-gray-200">
                    <label className="text-xs font-medium text-gray-500 mb-2 block">Status</label>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${getStatusBadgeColor(candidate?.status || 'new')}`}>
                        {getStatusLabel(candidate?.status || 'new')}
                      </span>
                      <select
                        value={candidate?.status || 'new'}
                        onChange={(e) => candidate?.id && handleUpdateStatus(candidate.id, e.target.value as Candidate['status'])}
                        className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="new">New</option>
                        <option value="screening">Screening</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="offer">Offer</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  {/* Interview Button */}
                  {isTopCandidate && candidate?.status !== 'interviewing' && candidate?.status !== 'hired' && candidate?.status !== 'rejected' && (
                    <Button
                      size="sm"
                      onClick={() => candidate && handleScheduleInterview(candidate)}
                      className="w-full mt-2"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Interview
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Candidate</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Position</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Resume Score</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Applied Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.filter(c => c && c.id).map(candidate => {
                  const isTopCandidate = candidate?.overall_rank && candidate.overall_rank <= 20;
                  return (
                    <tr 
                      key={candidate.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        isTopCandidate ? 'bg-green-50/30' : ''
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                            isTopCandidate 
                              ? 'bg-linear-to-br from-green-500 to-green-600' 
                              : 'bg-linear-to-br from-blue-500 to-blue-600'
                          }`}>
                            {(candidate?.name || 'U').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{candidate?.name || 'Unknown'}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {candidate?.overall_rank && (
                                <span className={`text-xs font-medium ${
                                  isTopCandidate ? 'text-green-700' : 'text-gray-500'
                                }`}>
                                  Rank #{candidate.overall_rank}
                                </span>
                              )}
                              {isTopCandidate && (
                                <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                                  <Award className="w-3 h-3" />
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 truncate mt-1">{candidate?.email || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-medium text-gray-900">{candidate?.job_title || 'N/A'}</p>
                        <p className="text-xs text-gray-500">{candidate?.department || 'N/A'}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          {candidate?.resume_score !== undefined ? (
                            <>
                              <span className={`text-lg font-bold min-w-12 ${getScoreColor(candidate.resume_score)}`}>
                                {candidate.resume_score}%
                              </span>
                              <div className="w-32 bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className={`h-2.5 rounded-full ${getScoreBgColor(candidate.resume_score)} transition-all`}
                                  style={{ width: `${candidate.resume_score}%` }}
                                />
                              </div>
                            </>
                          ) : (
                            <span className="text-gray-400 text-sm">N/A</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${getStatusBadgeColor(candidate?.status || 'new')}`}>
                            {getStatusLabel(candidate?.status || 'new')}
                          </span>
                          <select
                            value={candidate?.status || 'new'}
                            onChange={(e) => candidate?.id && handleUpdateStatus(candidate.id, e.target.value as Candidate['status'])}
                            className="border border-gray-300 rounded-md px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="new">New</option>
                            <option value="screening">Screening</option>
                            <option value="interviewing">Interviewing</option>
                            <option value="offer">Offer</option>
                            <option value="hired">Hired</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {candidate?.applied_date ? new Date(candidate.applied_date).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {isTopCandidate && candidate?.status !== 'interviewing' && candidate?.status !== 'hired' && candidate?.status !== 'rejected' && (
                          <Button
                            size="sm"
                            onClick={() => candidate && handleScheduleInterview(candidate)}
                            variant="outline"
                          >
                            <Calendar className="w-4 h-4 mr-1" />
                            Schedule
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Schedule Interview Modal */}
      {showInterviewModal && selectedCandidate && (
        <ScheduleInterviewModal
          isOpen={showInterviewModal}
          onClose={() => {
            try {
              setShowInterviewModal(false);
              setSelectedCandidate(null);
              setConflictError(null);
            } catch (err) {
              console.error('Error closing modal:', err);
            }
          }}
          onSubmit={handleInterviewSubmit}
          candidate={selectedCandidate}
          conflictError={conflictError}
        />
      )}
    </div>
  );
}

