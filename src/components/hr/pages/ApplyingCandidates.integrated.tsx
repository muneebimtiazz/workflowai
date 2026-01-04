import { useState, useEffect } from 'react';
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
  List
} from 'lucide-react';
import { recruitmentService, Candidate } from '../../../lib/mockServices';
import { toast } from 'sonner';
import { ScheduleInterviewModal } from '../modals/ScheduleInterviewModal';

export function ApplyingCandidatesIntegrated() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobFilter, setJobFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterCandidates();
  }, [candidates, searchTerm, jobFilter, statusFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [candidatesData, jobsData] = await Promise.all([
        recruitmentService.getCandidates(),
        recruitmentService.getJobOpenings()
      ]);
      // Filter to only Candidate type (not CandidateLegacy)
      const modernCandidates = candidatesData.filter((c): c is Candidate => 
        'name' in c && 'job_title' in c
      );
      setCandidates(modernCandidates);
      setJobs(jobsData);
    } catch (err: any) {
      console.error('Error fetching candidates:', err);
      setError(err.message || 'Failed to load candidates');
      toast.error('Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  const filterCandidates = () => {
    let filtered = [...candidates];

    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.job_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (jobFilter !== 'all') {
      filtered = filtered.filter(c => {
        // Match by job title since Candidate doesn't have job_id
        const job = jobs.find(j => j.id === jobFilter);
        return job && c.job_title === job.title;
      });
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    setFilteredCandidates(filtered);
  };

  const handleScheduleInterview = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowInterviewModal(true);
  };

  const handleInterviewSubmit = async (interviewData: any) => {
    try {
      if (!selectedCandidate) return;

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

      toast.success('Interview scheduled successfully. Email sent to candidate.');
      setShowInterviewModal(false);
      setSelectedCandidate(null);
      fetchData();
    } catch (err: any) {
      console.error('Error scheduling interview:', err);
      toast.error('Failed to schedule interview');
    }
  };

  const handleUpdateStatus = async (candidateId: string, newStatus: Candidate['status']) => {
    try {
      await recruitmentService.updateCandidateStatus(candidateId, newStatus);
      toast.success('Candidate status updated');
      fetchData();
    } catch (err: any) {
      console.error('Error updating status:', err);
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading candidates...</p>
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

  const stats = {
    total: candidates.length,
    applied: candidates.filter(c => c.status === 'new').length,
    shortlisted: candidates.filter(c => c.status === 'screening').length,
    top20: candidates.filter(c => c.overall_rank && c.overall_rank <= 20).length
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

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
        <h2 className="text-2xl font-semibold">Applying Candidates</h2>
          <p className="text-gray-600">Review and rank candidates from CV Analyzer</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-gray-300 rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3x3 className="w-4 h-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none border-l border-gray-300"
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
          <Button variant="outline" onClick={fetchData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Total Candidates</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">New Applications</p>
          <p className="text-2xl font-bold text-blue-600">{stats.applied}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Shortlisted</p>
          <p className="text-2xl font-bold text-green-600">{stats.shortlisted}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Top 20 Candidates</p>
          <p className="text-2xl font-bold text-purple-600">{stats.top20}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Jobs</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="screening">Screening</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offer</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Candidate List/Grid */}
      {filteredCandidates.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-600">
              {searchTerm || jobFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search filters'
                : 'Candidates will appear here when they apply via CV Analyzer link'}
            </p>
          </div>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-6">
          {filteredCandidates.map(candidate => {
            const isTopCandidate = candidate.overall_rank && candidate.overall_rank <= 20;
            
            return (
              <Card 
                key={candidate.id} 
                className={`p-6 hover:shadow-lg transition-all ${
                  isTopCandidate ? 'border-2 border-green-300 bg-green-50/50' : 'border border-gray-200'
                }`}
              >
                <div className="space-y-4">
                  {/* Name and Rank */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{candidate.name}</h3>
                      {candidate.overall_rank && candidate.overall_rank <= 20 && (
                        <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 border-yellow-200">
                          <Award className="w-3 h-3 mr-1" />
                          Top 20
                        </span>
                      )}
                    </div>
                    {candidate.overall_rank && (
                      <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium mb-2 ${
                        candidate.overall_rank <= 20 ? 'bg-green-600 text-white border-green-700' : 'bg-gray-600 text-white border-gray-700'
                      }`}>
                        Rank #{candidate.overall_rank}
                      </span>
                    )}
                  </div>

                  {/* Applying Position */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Applying Position</p>
                    <p className="text-sm font-semibold text-gray-900">{candidate.job_title}</p>
                  </div>

                  {/* Email */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Email</p>
                    <div className="flex items-center text-sm text-gray-700">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="truncate">{candidate.email}</span>
                    </div>
                  </div>

                  {/* Cell/Phone */}
                  {candidate.phone && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Cell</p>
                      <div className="flex items-center text-sm text-gray-700">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{candidate.phone}</span>
                      </div>
                    </div>
                  )}

                  {/* Applied Date */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Applied Date</p>
                    <div className="flex items-center text-sm text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{new Date(candidate.applied_date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Resume Score */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-gray-500">Resume Score</p>
                      <span className={`text-lg font-bold ${candidate.resume_score ? getScoreColor(candidate.resume_score) : 'text-gray-400'}`}>
                        {candidate.resume_score ? `${candidate.resume_score}%` : 'N/A'}
                      </span>
                    </div>
                    {candidate.resume_score !== undefined && (
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${getScoreBgColor(candidate.resume_score)}`}
                          style={{ width: `${candidate.resume_score}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Status Dropdown */}
                  <div className="pt-3 border-t border-gray-200">
                    <label className="text-xs font-medium text-gray-500 mb-2 block">Status</label>
                    <select
                      value={candidate.status}
                      onChange={(e) => handleUpdateStatus(candidate.id, e.target.value as Candidate['status'])}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="new">New</option>
                      <option value="screening">Screening</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="offer">Offer</option>
                      <option value="hired">Hired</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  {/* Interview Button */}
                  {isTopCandidate && candidate.status !== 'interviewing' && candidate.status !== 'hired' && candidate.status !== 'rejected' && (
                    <Button
                      size="sm"
                      onClick={() => handleScheduleInterview(candidate)}
                      className="w-full"
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
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Resume Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map(candidate => (
                  <tr 
                    key={candidate.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          candidate.overall_rank && candidate.overall_rank <= 20 
                            ? 'bg-linear-to-br from-green-400 to-green-600' 
                            : 'bg-linear-to-br from-blue-400 to-blue-600'
                        }`}>
                          {candidate.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{candidate.name}</p>
                          {candidate.overall_rank && (
                            <p className="text-xs text-gray-500">Rank #{candidate.overall_rank}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        {candidate.resume_score !== undefined ? (
                          <>
                            <span className={`text-lg font-bold ${getScoreColor(candidate.resume_score)}`}>
                              {candidate.resume_score}%
                            </span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getScoreBgColor(candidate.resume_score)}`}
                                style={{ width: `${candidate.resume_score}%` }}
                              />
                            </div>
                          </>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={candidate.status}
                        onChange={(e) => handleUpdateStatus(candidate.id, e.target.value as Candidate['status'])}
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm min-w-[180px]"
                      >
                        <option value="new">New</option>
                        <option value="screening">Screening</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="offer">Offer</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
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
            setShowInterviewModal(false);
            setSelectedCandidate(null);
          }}
          onSubmit={handleInterviewSubmit}
          candidate={selectedCandidate}
        />
      )}
    </div>
  );
}
