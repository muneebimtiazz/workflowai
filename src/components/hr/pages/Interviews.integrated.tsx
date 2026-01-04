import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Loader2,
  XCircle,
  RefreshCw,
  UserCheck,
  Briefcase,
} from 'lucide-react';
import { recruitmentService, Interview, InterviewTeam } from '../../../lib/mockServices';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface GroupedInterview {
  interview_team_id?: string;
  interview_team_name?: string;
  interview_date: string;
  interview_time: string;
  location: string;
  interviews: Interview[];
}

export function InterviewsIntegrated() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [filteredInterviews, setFilteredInterviews] = useState<Interview[]>([]);
  const [groupedInterviews, setGroupedInterviews] = useState<GroupedInterview[]>([]);
  const [teams, setTeams] = useState<InterviewTeam[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('scheduled');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterInterviews();
  }, [interviews, searchTerm, statusFilter, typeFilter]);

  useEffect(() => {
    groupInterviews();
  }, [filteredInterviews]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [interviewsData, teamsData] = await Promise.all([
        recruitmentService.getInterviews(),
        recruitmentService.getInterviewTeams()
      ]);
      
      setInterviews(interviewsData);
      setTeams(teamsData);
    } catch (err: any) {
      console.error('Error fetching interviews:', err);
      setError(err.message || 'Failed to load interviews');
      toast.error('Failed to load interviews');
    } finally {
      setLoading(false);
    }
  };

  const filterInterviews = () => {
    let filtered = [...interviews];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(interview =>
        interview.candidate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(interview => interview.status === statusFilter);
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(interview => interview.interview_type === typeFilter);
    }

    // Sort by date and time
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.interview_date} ${a.interview_time}`).getTime();
      const dateB = new Date(`${b.interview_date} ${b.interview_time}`).getTime();
      return dateA - dateB;
    });

    setFilteredInterviews(filtered);
  };

  const groupInterviews = () => {
    const groupedMap = new Map<string, GroupedInterview>();

    filteredInterviews.forEach(interview => {
      // Create a unique key based on team_id, date, and time
      // Treat undefined/null team_id as the same group
      const teamKey = interview.interview_team_id || 'no-team';
      const key = `${teamKey}-${interview.interview_date}-${interview.interview_time}`;

      if (groupedMap.has(key)) {
        // Add interview to existing group
        const group = groupedMap.get(key)!;
        group.interviews.push(interview);
      } else {
        // Create new group
        groupedMap.set(key, {
          interview_team_id: interview.interview_team_id,
          interview_team_name: interview.interview_team_name,
          interview_date: interview.interview_date,
          interview_time: interview.interview_time,
          location: interview.location,
          interviews: [interview],
        });
      }
    });

    // Convert map to array and sort by date and time
    const groupedArray = Array.from(groupedMap.values());
    groupedArray.sort((a, b) => {
      const dateA = new Date(`${a.interview_date} ${a.interview_time}`).getTime();
      const dateB = new Date(`${b.interview_date} ${b.interview_time}`).getTime();
      return dateA - dateB;
    });

    setGroupedInterviews(groupedArray);
  };

  const getTeamMembers = (teamId?: string) => {
    if (!teamId) return [];
    const team = teams.find(t => t.id === teamId);
    return team?.members || [];
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Technical':
        return <Badge className="bg-purple-100 text-purple-800">Technical</Badge>;
      case 'HR':
        return <Badge className="bg-orange-100 text-orange-800">HR</Badge>;
      case 'Final':
        return <Badge className="bg-indigo-100 text-indigo-800">Final</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading interviews...</p>
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

  const scheduledCount = interviews.filter(i => i.status === 'scheduled').length;
  const completedCount = interviews.filter(i => i.status === 'completed').length;
  const cancelledCount = interviews.filter(i => i.status === 'cancelled').length;

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Interviews</h2>
          <p className="text-gray-600">View and manage all scheduled interviews</p>
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviews.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{scheduledCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{cancelledCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by candidate, job, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="Technical">Technical</option>
          <option value="HR">HR</option>
          <option value="Final">Final</option>
        </select>
      </div>

      {/* Interviews List */}
      {groupedInterviews.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900">No interviews found</p>
              <p className="text-sm text-gray-600 mt-2">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'No interviews have been scheduled yet'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {groupedInterviews.map((group, groupIndex) => {
            const teamMembers = getTeamMembers(group.interview_team_id);
            const uniqueJobTitles = [...new Set(group.interviews.map(i => i.job_title))];
            const uniqueStatuses = [...new Set(group.interviews.map(i => i.status))];
            const uniqueTypes = [...new Set(group.interviews.map(i => i.interview_type))];
            
            return (
              <Card key={`group-${groupIndex}`} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">
                        {group.interviews.length === 1 
                          ? group.interviews[0].candidate_name
                          : `${group.interviews.length} Candidates`
                        }
                      </CardTitle>
                      <CardDescription className="mt-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Briefcase className="w-4 h-4" />
                          {uniqueJobTitles.length === 1 
                            ? uniqueJobTitles[0]
                            : `${uniqueJobTitles.length} Positions`
                          }
                        </div>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                      {uniqueStatuses.map(status => getStatusBadge(status))}
                      {uniqueTypes.map(type => getTypeBadge(type))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Candidates List */}
                  {group.interviews.length > 1 && (
                    <div className="pb-3 border-b">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Candidates:</p>
                      <div className="space-y-2">
                        {group.interviews.map((interview) => (
                          <div key={interview.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">{interview.candidate_name}</p>
                              <p className="text-xs text-muted-foreground">{interview.job_title}</p>
                            </div>
                            <div className="flex gap-1">
                              {getStatusBadge(interview.status)}
                              {getTypeBadge(interview.interview_type)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Date & Time */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">
                        {format(new Date(group.interview_date), 'EEEE, MMMM d, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{group.interview_time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{group.location}</span>
                    </div>
                  </div>

                  {/* Interview Team */}
                  {group.interview_team_id && teamMembers.length > 0 && (
                    <div className="pt-3 border-t">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Interview Team: {group.interview_team_name || 'Unnamed Team'}</span>
                      </div>
                      <div className="space-y-2">
                        {teamMembers.map((member, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <UserCheck className="w-4 h-4 text-blue-600" />
                              <div>
                                <p className="text-sm font-medium">{member.employee_name}</p>
                                <p className="text-xs text-muted-foreground">{member.employee_email}</p>
                              </div>
                            </div>
                            <Badge variant={member.role === 'Interviewer' ? 'default' : 'secondary'} className="text-xs">
                              {member.role}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!group.interview_team_id && (
                    <div className="pt-3 border-t">
                      <p className="text-sm text-muted-foreground">No interview team assigned</p>
                    </div>
                  )}

                  {/* Notes - Show if any interview has notes */}
                  {group.interviews.some(i => i.notes) && (
                    <div className="pt-3 border-t">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Notes:</p>
                      {group.interviews
                        .filter(i => i.notes)
                        .map((interview) => (
                          <div key={interview.id} className="mb-2">
                            <p className="text-xs text-muted-foreground font-medium">{interview.candidate_name}:</p>
                            <p className="text-sm text-gray-700">{interview.notes}</p>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

