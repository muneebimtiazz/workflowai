import { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
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
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading interview teams...</p>
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
          
          <h2 className="text-2xl font-semibold">Interview Teams</h2>
          <p className="text-gray-600">Manage interview panels and interviewers</p>
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
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Total Teams</p>
          <p className="text-2xl font-bold text-gray-900">{teams.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Total Interviewers</p>
          <p className="text-2xl font-bold text-blue-600">
            {teams.reduce((sum, team) => sum + team.members.length, 0)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Avg. Team Size</p>
          <p className="text-2xl font-bold text-green-600">
            {teams.length > 0 
              ? Math.round(teams.reduce((sum, team) => sum + team.members.length, 0) / teams.length)
              : 0}
          </p>
        </Card>
      </div>

      {/* Teams List */}
      {teams.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No interview teams yet</h3>
            <p className="text-gray-600 mb-4">
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{team.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
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
                <p className="text-sm font-medium text-gray-700 mb-2">Team Members:</p>
                {team.members.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.employee_name}</p>
                        <div className="flex items-center text-sm text-gray-600">
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
