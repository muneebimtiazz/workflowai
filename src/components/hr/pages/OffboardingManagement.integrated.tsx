import { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
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
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading offboarding data...</p>
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
          <h2 className="text-2xl font-semibold ">Offboarding Management</h2>
          <p className="text-gray-600">Manage employee departures with compliance checklists</p>
        </div>
        <Button onClick={() => setShowOffboardingModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Initiate Offboarding
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Offboarding</p>
              <p className="text-3xl font-bold text-orange-600">{stats?.active_processes || 0}</p>
            </div>
            <UserMinus className="w-8 h-8 text-orange-600" />
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
              <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
              <p className="text-3xl font-bold text-yellow-600">{stats?.pending_tasks || 0}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Exit Interviews</p>
              <p className="text-3xl font-bold text-blue-600">{stats?.exit_interviews_scheduled || 0}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Offboarding</h3>
          {processes.length === 0 ? (
            <div className="text-center py-8">
              <UserMinus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No active offboarding processes</p>
            </div>
          ) : (
            <div className="space-y-4">
              {processes.map((process) => (
                <div key={process.id} className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {process.user?.full_name || 'Unknown Employee'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {process.user?.department || 'No department'} • {process.user?.position || 'No position'}
                      </p>
                    </div>
                    <Badge variant="outline">{process.completion_percentage}%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full transition-all" 
                      style={{ width: `${process.completion_percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 flex items-center">
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Offboarding Statistics</h3>
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Exit Interview Management</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.exit_interviews_scheduled || 0}</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.exit_interviews_completed || 0}</p>
              </div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Completion</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.average_completion_rate?.toFixed(0) || 0}%</p>
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