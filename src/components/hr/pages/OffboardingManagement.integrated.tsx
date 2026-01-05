import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  UserMinus,
  CheckCircle,
  Clock,
  FileText,
  Calendar,
  Plus,
  Loader2,
  XCircle,
} from 'lucide-react';
import { offboardingService } from '../../../lib/mockServices';
import { InitiateOffboardingModal } from '../modals/InitiateOffboardingModal';
import { toast } from 'sonner';

export function OffboardingManagementIntegrated() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processes, setProcesses] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [showOffboardingModal, setShowOffboardingModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [processesData, statsData] = await Promise.all([
        offboardingService.getOffboardingProcesses({ status: 'in-progress' }),
        offboardingService.getOffboardingStats()
      ]);

      setProcesses(processesData);
      setStats(statsData);
    } catch (err: any) {
      console.error('Error fetching offboarding data:', err);
      setError(err.message || 'Failed to load offboarding data');
      toast.error('Failed to load offboarding data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="max-w-9xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Loading offboarding data...</span>
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

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Offboarding Management</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage employee departures with compliance checklists</p>
        </div>
        <Button onClick={() => setShowOffboardingModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Initiate Offboarding
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Active Offboarding</p>
              <p className="text-3xl font-bold text-foreground">{stats?.active_processes || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-3xl font-bold text-foreground">{stats?.completed_processes || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Pending Tasks</p>
              <p className="text-3xl font-bold text-foreground">{stats?.pending_tasks || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Exit Interviews</p>
              <p className="text-3xl font-bold text-foreground">{stats?.exit_interviews_scheduled || 0}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Active Offboarding</h3>
          {processes.length === 0 ? (
            <div className="text-center py-8">
              <UserMinus className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No active offboarding processes</p>
            </div>
          ) : (
            <div className="space-y-4">
              {processes.map((process) => (
                <div key={process.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {process.user?.full_name || 'Unknown Employee'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {process.user?.department || 'No department'} • {process.user?.position || 'No position'}
                      </p>
                    </div>
                    <Badge variant="outline">{process.completion_percentage}%</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${process.completion_percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Last day: {formatDate(process.last_working_day)}
                    </p>
                    {process.exit_interview_scheduled && (
                      <Badge variant="secondary" className="text-xs">
                        Interview Scheduled
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Offboarding Statistics</h3>
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-orange-900">Total Processes</span>
                <span className="text-2xl font-bold text-orange-600">{stats?.total_processes || 0}</span>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">Initiated</span>
                <span className="text-2xl font-bold text-blue-600">{stats?.initiated_processes || 0}</span>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-yellow-900">In Progress Tasks</span>
                <span className="text-2xl font-bold text-yellow-600">{stats?.in_progress_tasks || 0}</span>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-900">Completed Tasks</span>
                <span className="text-2xl font-bold text-green-600">{stats?.completed_tasks || 0}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Exit Interview Management</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-foreground">{stats?.exit_interviews_scheduled || 0}</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{stats?.exit_interviews_completed || 0}</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Completion</p>
                <p className="text-2xl font-bold text-foreground">{stats?.average_completion_rate?.toFixed(0) || 0}%</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Initiate Offboarding Modal */}
      <InitiateOffboardingModal
        isOpen={showOffboardingModal}
        onClose={() => setShowOffboardingModal(false)}
        onSuccess={fetchData}
      />
    </div>
  );
}