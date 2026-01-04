import { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import {
  UserPlus,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,

  Settings,
  Loader2,
  XCircle
} from 'lucide-react';
import { onboardingService } from '../../../lib/mockServices';
import { NewWorkflowModal } from '../modals/NewWorkflowModal';
import { toast } from 'sonner';

export function OnboardingWorkflowsIntegrated() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processes, setProcesses] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [showNewWorkflowModal, setShowNewWorkflowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [processesData, statsData] = await Promise.all([
        onboardingService.getOnboardingProcesses({ status: 'in-progress' }),
        onboardingService.getOnboardingStats()
      ]);

      setProcesses(processesData);
      setStats(statsData);
    } catch (err: any) {
      console.error('Error fetching onboarding data:', err);
      setError(err.message || 'Failed to load onboarding data');
      toast.error('Failed to load onboarding data');
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
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading onboarding workflows...</p>
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

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Onboarding Workflows</h2>
          <p className="text-gray-600">Automated onboarding processes with progress tracking</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button onClick={() => setShowNewWorkflowModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Onboarding</p>
              <p className="text-3xl font-bold text-blue-600">{stats?.active_processes || 0}</p>
            </div>
            <UserPlus className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{stats?.completed_processes || 0}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Completion</p>
              <p className="text-3xl font-bold text-purple-600">{stats?.average_completion_rate?.toFixed(0) || 0}%</p>
            </div>
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue Tasks</p>
              <p className="text-3xl font-bold text-red-600">{stats?.overdue_tasks || 0}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Workflows</h3>
          {processes.length === 0 ? (
            <div className="text-center py-8">
              <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No active onboarding processes</p>
            </div>
          ) : (
            <div className="space-y-4">
              {processes.map((process) => (
                <div key={process.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {process.user?.full_name || 'Unknown Employee'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {process.user?.email || 'No email'}
                      </p>
                    </div>
                    <Badge variant="outline">{process.completion_percentage}%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all" 
                      style={{ width: `${process.completion_percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Started: {formatDate(process.start_date)}</span>
                    {process.target_completion_date && (
                      <span>Target: {formatDate(process.target_completion_date)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Statistics</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">Total Processes</span>
                <span className="text-2xl font-bold text-blue-600">{stats?.total_processes || 0}</span>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-900">Pending Tasks</span>
                <span className="text-2xl font-bold text-green-600">{stats?.pending_tasks || 0}</span>
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-900">Completed Tasks</span>
                <span className="text-2xl font-bold text-purple-600">{stats?.completed_tasks || 0}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* New Workflow Modal */}
      <NewWorkflowModal
        isOpen={showNewWorkflowModal}
        onClose={() => setShowNewWorkflowModal(false)}
        onSuccess={fetchData}
      />
    </div>
  );
}