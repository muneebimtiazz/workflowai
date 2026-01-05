import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  Users,
  Plus,
  Loader2,
  XCircle,
  RefreshCw,
  Trash2,
  Mail,
  UserCheck
} from 'lucide-react';
import { recruitmentService, InterviewTeam } from '../../../lib/mockServices';
import { toast } from 'sonner';
import { CreateInterviewTeamModal } from '../modals/CreateInterviewTeamModal';

export function InterviewTeamsIntegrated() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [teams, setTeams] = useState<InterviewTeam[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await recruitmentService.getInterviewTeams();
      setTeams(data);
    } catch (err: any) {
      console.error('Error fetching interview teams:', err);
      setError(err.message || 'Failed to load interview teams');
      toast.error('Failed to load interview teams');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (teamData: any) => {
    try {
      await recruitmentService.createInterviewTeam(teamData);
      toast.success('Interview team created successfully');
      setShowCreateModal(false);
      fetchTeams();
    } catch (err: any) {
      console.error('Error creating team:', err);
      toast.error('Failed to create interview team');
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    if (!window.confirm('Are you sure you want to delete this interview team?')) return;

    try {
      await recruitmentService.deleteInterviewTeam(teamId);
      toast.success('Interview team deleted successfully');
      fetchTeams();
    } catch (err: any) {
      console.error('Error deleting team:', err);
      toast.error('Failed to delete interview team');
    }
  };

  if (loading) {
    return (
      <div className="max-w-9xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Loading interview teams...</span>
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
          <Button onClick={fetchTeams} className="mt-4">
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Interview Teams</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage interview panels and interviewers</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={fetchTeams}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Team
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Teams</p>
              <p className="text-3xl font-bold text-foreground">{teams.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Interviewers</p>
              <p className="text-3xl font-bold text-foreground">
                {teams.reduce((sum, team) => sum + team.members.length, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Avg. Team Size</p>
              <p className="text-3xl font-bold text-foreground">
                {teams.length > 0 
                  ? Math.round(teams.reduce((sum, team) => sum + team.members.length, 0) / teams.length)
                  : 0}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teams List */}
      {teams.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No interview teams yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first interview team to assign interviewers
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {teams.map(team => (
            <Card key={team.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{team.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Users className="w-4 h-4 mr-1" />
                    {team.members.length} {team.members.length === 1 ? 'member' : 'members'}
                    <span className="mx-2">•</span>
                    Created {new Date(team.created_at).toLocaleDateString()}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeleteTeam(team.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>

              {/* Team Members */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground mb-2">Team Members:</p>
                {team.members.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{member.employee_name}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="w-3 h-3 mr-1" />
                          {member.employee_email}
                        </div>
                      </div>
                    </div>
                    <Badge variant={member.role === 'Interviewer' ? 'default' : 'secondary'}>
                      {member.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Team Modal */}
      {showCreateModal && (
        <CreateInterviewTeamModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateTeam}
        />
      )}
    </div>
  );
}
