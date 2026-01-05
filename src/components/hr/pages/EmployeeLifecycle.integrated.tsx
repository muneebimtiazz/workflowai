import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import {
  Users,
  UserPlus,
  UserMinus,
  Search,
  Eye,
  CheckCircle,
  Circle,
  Calendar,
  Briefcase,
  TrendingUp,
  XCircle,
  Loader2,
  ChevronRight,
  Filter
} from 'lucide-react';
import { userService, onboardingService, offboardingService } from '../../../lib/mockServices';
import { toast } from 'sonner';
import { InitiateOffboardingModal } from '../modals/InitiateOffboardingModal';

// Lifecycle state badge component
const LifecycleStateBadge = ({ state }: { state: string }) => {
  const config = {
    applied: { color: 'bg-gray-100 text-gray-700', label: 'Applied' },
    hired: { color: 'bg-blue-100 text-blue-700', label: 'Hired' },
    onboarding: { color: 'bg-yellow-100 text-yellow-700', label: 'Onboarding' },
    active: { color: 'bg-green-100 text-green-700', label: 'Active' },
    notice: { color: 'bg-orange-100 text-orange-700', label: 'Notice Period' },
    offboarded: { color: 'bg-red-100 text-red-700', label: 'Offboarded' }
  };
  
  const { color, label } = config[state as keyof typeof config] || config.active;
  
  return (
    <Badge {...({ className: `${color} border-0` } as React.ComponentProps<typeof Badge>)}>
      {label}
    </Badge>
  );
};

// Employee row component
const EmployeeRow = ({ employee, onViewDetails }: { employee: any; onViewDetails: (id: string) => void; [key: string]: any }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
            {getInitials(employee.full_name)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{employee.full_name}</p>
            <p className="text-sm text-gray-500">{employee.employee_id}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-gray-600">{employee.job_title || 'N/A'}</td>
      <td className="py-4 px-4 text-gray-600">{employee.department || 'N/A'}</td>
      <td className="py-4 px-4">
        <LifecycleStateBadge state={employee.lifecycle_state || 'active'} />
      </td>
      <td className="py-4 px-4 text-gray-600">{formatDate(employee.hire_date)}</td>
      <td className="py-4 px-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onViewDetails(employee.id)}
          className="flex items-center space-x-1"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </Button>
      </td>
    </tr>
  );
};

// Checklist component
const ChecklistView = ({ items }: { items: any[]; onToggle?: (id: string) => void }) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div 
          key={item.id} 
          className={`p-4 border rounded-lg flex items-start space-x-3 ${
            item.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
          }`}
        >
          <div className="mt-0.5">
            {item.status === 'completed' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <p className={`font-medium ${item.status === 'completed' ? 'text-green-900' : 'text-gray-900'}`}>
                  {item.title}
                </p>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-gray-500">
                    Assigned to: <span className="font-medium capitalize">{item.assigned_to}</span>
                  </span>
                  {item.completed_date && (
                    <span className="text-xs text-gray-500">
                      Completed: {new Date(item.completed_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export function EmployeeLifecycleIntegrated() {
  const [activeTab, setActiveTab] = useState('all-employees');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showOffboardingModal, setShowOffboardingModal] = useState(false);

  // Data states
  const [employees, setEmployees] = useState<any[]>([]);
  const [onboardingStats, setOnboardingStats] = useState<any>(null);
  const [offboardingStats, setOffboardingStats] = useState<any>(null);
  const [onboardingProcesses, setOnboardingProcesses] = useState<any[]>([]);
  const [offboardingProcesses, setOffboardingProcesses] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        employeesData,
        onboardingStatsData,
        offboardingStatsData,
        onboardingProcessesData,
        offboardingProcessesData
      ] = await Promise.all([
        userService.getAllUsers(),
        onboardingService.getOnboardingStats(),
        offboardingService.getOffboardingStats(),
        onboardingService.getOnboardingProcesses({ status: 'in_progress' }),
        offboardingService.getOffboardingProcesses({ status: 'in_progress' })
      ]);

      setEmployees(employeesData);
      setOnboardingStats(onboardingStatsData);
      setOffboardingStats(offboardingStatsData);
      setOnboardingProcesses(onboardingProcessesData);
      setOffboardingProcesses(offboardingProcessesData);
    } catch (err: any) {
      console.error('Error fetching employee lifecycle data:', err);
      setError(err.message || 'Failed to load employee lifecycle data');
      toast.error('Failed to load employee lifecycle data');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    setSelectedEmployee(employee);
  };

  const handleCloseDetails = () => {
    setSelectedEmployee(null);
  };

  const getEmployeesByLifecycleState = (state: string) => {
    return employees.filter(e => (e.lifecycle_state || 'active') === state);
  };

  const filteredEmployees = employees.filter(emp => 
    emp.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.employee_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-9xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Loading employee lifecycle data...</span>
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

  // Employee detail view
  if (selectedEmployee) {
    const onboardingWorkflow = onboardingProcesses.find(p => p.employee_id === selectedEmployee.id);
    const offboardingWorkflow = offboardingProcesses.find(p => p.employee_id === selectedEmployee.id);
    
    return (
      <div className="p-6 space-y-6">
        {/* Back button */}
        <Button variant="ghost" onClick={handleCloseDetails} className="mb-4">
          <ChevronRight className="w-4 h-4 rotate-180 mr-2" />
          Back to Employee List
        </Button>

        {/* Employee Header */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                {selectedEmployee.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{selectedEmployee.full_name}</h2>
                <p className="text-muted-foreground">{selectedEmployee.job_title}</p>
                <p className="text-sm text-muted-foreground">{selectedEmployee.employee_id}</p>
                <div className="mt-2">
                  <LifecycleStateBadge state={selectedEmployee.lifecycle_state || 'active'} />
                </div>
              </div>
            </div>
            {selectedEmployee.lifecycle_state === 'active' && (
              <Button 
                variant="outline" 
                onClick={() => setShowOffboardingModal(true)}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <UserMinus className="w-4 h-4 mr-2" />
                Initiate Offboarding
              </Button>
            )}
          </div>
        </Card>

        {/* Employee Details */}
        <div className="grid grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              Employment Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium text-gray-900">{selectedEmployee.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Hire Date</p>
                <p className="font-medium text-gray-900">
                  {new Date(selectedEmployee.hire_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900">{selectedEmployee.location || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge>{selectedEmployee.status}</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6 col-span-2">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              Lifecycle Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Hired</p>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedEmployee.hire_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              {selectedEmployee.lifecycle_state === 'onboarding' && (
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Onboarding Started</p>
                    <p className="text-sm text-gray-500">Currently in progress</p>
                  </div>
                </div>
              )}
              {selectedEmployee.lifecycle_state === 'notice' && (
                <>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Notice Period Started</p>
                      <p className="text-sm text-gray-500">
                        Last working day: {selectedEmployee.notice_period_end ? new Date(selectedEmployee.notice_period_end).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Onboarding Checklist */}
        {onboardingWorkflow && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <UserPlus className="w-5 h-5 mr-2 text-green-600" />
                Onboarding Checklist
              </h3>
              <Badge variant="outline">{onboardingWorkflow.progress}% Complete</Badge>
            </div>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all" 
                  style={{ width: `${onboardingWorkflow.progress}%` }}
                />
              </div>
            </div>
            <ChecklistView items={onboardingWorkflow.checklist || []} />
          </Card>
        )}

        {/* Offboarding Checklist */}
        {offboardingWorkflow && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <UserMinus className="w-5 h-5 mr-2 text-orange-600" />
                Offboarding Checklist
              </h3>
              <Badge variant="outline">{offboardingWorkflow.progress}% Complete</Badge>
            </div>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-600 h-2 rounded-full transition-all" 
                  style={{ width: `${offboardingWorkflow.progress}%` }}
                />
              </div>
            </div>
            <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-orange-900">Last Working Day</p>
                  <p className="text-sm text-orange-700">
                    {new Date(offboardingWorkflow.last_working_day).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-orange-900">Reason</p>
                  <p className="text-sm text-orange-700 capitalize">{offboardingWorkflow.reason.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
            <ChecklistView items={offboardingWorkflow.checklist || []} />
          </Card>
        )}

        {showOffboardingModal && (
          <InitiateOffboardingModal
            isOpen={showOffboardingModal}
            onClose={() => {
              setShowOffboardingModal(false);
              fetchData();
            }}
            employeeId={selectedEmployee.id}
            employeeName={selectedEmployee.full_name}
          />
        )}
      </div>
    );
  }

  // Main view
  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Employee Lifecycle Management</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage employee journey from hiring to offboarding</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <p className="text-3xl font-bold text-foreground">{employees.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Onboarding</p>
              <p className="text-3xl font-bold text-foreground">
                {getEmployeesByLifecycleState('onboarding').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-3xl font-bold text-foreground">
                {getEmployeesByLifecycleState('active').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Notice Period</p>
              <p className="text-3xl font-bold text-foreground">
                {getEmployeesByLifecycleState('notice').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all-employees">All Employees</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding ({onboardingProcesses.length})</TabsTrigger>
          <TabsTrigger value="offboarding">Offboarding ({offboardingProcesses.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all-employees" className="space-y-6">
          {/* Search */}
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search employees by name, ID, or department..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </Button>
            </div>
          </Card>

          {/* Employee List */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Employee Directory</h3>
              <Badge variant="outline">{filteredEmployees.length} employees</Badge>
            </div>
            
            {filteredEmployees.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Employees Found</h3>
                <p className="text-gray-600">
                  {searchQuery ? 'Try adjusting your search criteria' : 'Start by adding your first employee'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Employee</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Position</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Department</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Lifecycle State</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Hire Date</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <EmployeeRow 
                        key={employee.id} 
                        employee={employee} 
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Onboarding Stats</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Active Processes</p>
                  <p className="text-2xl font-bold text-green-600">{onboardingStats?.active_processes || 0}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Pending Tasks</p>
                  <p className="text-2xl font-bold text-blue-600">{onboardingStats?.pending_tasks || 0}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-900">Completion Rate</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {onboardingStats?.average_completion_rate?.toFixed(0) || 0}%
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 col-span-2">
              <h3 className="font-semibold text-foreground mb-4">Active Onboarding Processes</h3>
              {onboardingProcesses.length === 0 ? (
                <div className="text-center py-8">
                  <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-muted-foreground">No active onboarding processes</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {onboardingProcesses.map((process) => (
                    <div 
                      key={process.id} 
                      className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors cursor-pointer"
                      onClick={() => {
                        const emp = employees.find(e => e.id === process.employee_id);
                        if (emp) handleViewDetails(emp.id);
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{process.employee_name}</h4>
                          <p className="text-sm text-gray-600">Started: {new Date(process.start_date).toLocaleDateString()}</p>
                        </div>
                        <Badge variant="outline">{process.progress}%</Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all" 
                          style={{ width: `${process.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="offboarding" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Offboarding Stats</h3>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm font-medium text-orange-900">Active Processes</p>
                  <p className="text-2xl font-bold text-orange-600">{offboardingStats?.active_processes || 0}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Exit Interviews</p>
                  <p className="text-2xl font-bold text-blue-600">{offboardingStats?.exit_interviews_scheduled || 0}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{offboardingStats?.completed_processes || 0}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 col-span-2">
              <h3 className="font-semibold text-foreground mb-4">Active Offboarding Processes</h3>
              {offboardingProcesses.length === 0 ? (
                <div className="text-center py-8">
                  <UserMinus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-muted-foreground">No active offboarding processes</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {offboardingProcesses.map((process) => (
                    <div 
                      key={process.id} 
                      className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors cursor-pointer"
                      onClick={() => {
                        const emp = employees.find(e => e.id === process.employee_id);
                        if (emp) handleViewDetails(emp.id);
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{process.employee_name}</h4>
                          <p className="text-sm text-gray-600">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            Last day: {new Date(process.last_working_day).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="outline">{process.progress}%</Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full transition-all" 
                          style={{ width: `${process.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
