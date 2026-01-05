import  { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Loader2,
  XCircle,
  RefreshCw,

  Trash2,
  ExternalLink,
  Users,
  Calendar,
  MapPin,
  Link as LinkIcon
} from 'lucide-react';
import { recruitmentService, JobOpening } from '../../../lib/mockServices';
import { toast } from 'sonner';
import { CreateJobOpeningModal } from '../modals/CreateJobOpeningModal';

export function JobOpeningsIntegrated() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobOpening[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, statusFilter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await recruitmentService.getJobOpenings();
      setJobs(data);
    } catch (err: any) {
      console.error('Error fetching job openings:', err);
      setError(err.message || 'Failed to load job openings');
      toast.error('Failed to load job openings');
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    setFilteredJobs(filtered);
  };

  const handleCreateJob = async (jobData: any) => {
    try {
      await recruitmentService.createJobOpening(jobData);
      toast.success('Job opening created successfully');
      setShowCreateModal(false);
      fetchJobs();
    } catch (err: any) {
      console.error('Error creating job:', err);
      toast.error('Failed to create job opening');
    }
  };

  const handlePublishJob = async (jobId: string) => {
    try {
      await recruitmentService.publishJobOpening(jobId);
      toast.success('Job published successfully and posted to LinkedIn (via CV Analyzer)');
      fetchJobs();
    } catch (err: any) {
      console.error('Error publishing job:', err);
      toast.error('Failed to publish job');
    }
  };

  const handleCloseJob = async (jobId: string) => {
    try {
      await recruitmentService.closeJobOpening(jobId);
      toast.success('Job closed successfully');
      fetchJobs();
    } catch (err: any) {
      console.error('Error closing job:', err);
      toast.error('Failed to close job');
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!window.confirm('Are you sure you want to delete this job opening?')) return;

    try {
      await recruitmentService.deleteJobOpening(jobId);
      toast.success('Job deleted successfully');
      fetchJobs();
    } catch (err: any) {
      console.error('Error deleting job:', err);
      toast.error('Failed to delete job');
    }
  };

  if (loading) {
    return (
      <div className="max-w-9xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Loading job openings...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-9xl mx-auto space-y-6">
        <Card className="p-6 border-destructive bg-destructive/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-destructive">
              <XCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
            <Button onClick={fetchJobs} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = {
    total: jobs.length,
    open: jobs.filter(j => j.status === 'open').length,
    draft: jobs.filter(j => j.status === 'draft').length,
    closed: jobs.filter(j => j.status === 'closed').length
  };

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Job Opening</h2>
          <p className="text-sm text-muted-foreground mt-1">Create and manage job postings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchJobs}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Job Opening
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Jobs</p>
              <p className="text-3xl font-bold text-foreground">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Open</p>
              <p className="text-3xl font-bold text-foreground">{stats.open}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Draft</p>
              <p className="text-3xl font-bold text-foreground">{stats.draft}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Closed</p>
              <p className="text-3xl font-bold text-foreground">{stats.closed}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-input rounded-md px-3 py-2 text-sm bg-background"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Job Listings */}
      {filteredJobs.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No job openings found</h3>
              <p className="text-sm text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search filters'
                : 'Create your first job opening to get started'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Job Opening
              </Button>
            )}
          </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map(job => (
            <Card key={job.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                    <Badge variant={
                      job.status === 'open' ? 'default' :
                      job.status === 'draft' ? 'secondary' :
                      'outline'
                    }>
                      {job.status}
                    </Badge>
                    {job.posted_to_linkedin && (
                      <Badge className="bg-blue-100 text-blue-800">
                        Posted to LinkedIn
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{job.department} • {job.experience_level}</p>
                  <p className="text-sm text-foreground mb-4 line-clamp-2">{job.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {job.applicants_count} applicants
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {job.interviews_scheduled} interviews
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {job.required_skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                    <LinkIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">CV Analyzer Link:</span>
                    <a 
                      href={job.cv_analyzer_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      {job.cv_analyzer_link}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Created: {new Date(job.created_at).toLocaleDateString()}
                  {job.published_at && ` • Published: ${new Date(job.published_at).toLocaleDateString()}`}
                </div>
                <div className="flex items-center space-x-2">
                  {job.status === 'draft' && (
                    <Button
                      size="sm"
                      onClick={() => handlePublishJob(job.id)}
                    >
                      Publish Job
                    </Button>
                  )}
                  {job.status === 'open' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCloseJob(job.id)}
                    >
                      Close Job
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteJob(job.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Job Modal */}
      {showCreateModal && (
        <CreateJobOpeningModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateJob}
        />
      )}
    </div>
  );
}
