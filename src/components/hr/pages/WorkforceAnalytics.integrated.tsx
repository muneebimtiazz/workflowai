import { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import {
  Users,
  BarChart3,
  Activity,
  Target,
  Download,
  Loader2,
  XCircle,
  RefreshCw,
  Building2,
  Briefcase,
  CheckCircle2,
  LineChart,
  PieChart
} from 'lucide-react';
import { userService } from '../../../lib/mockServices';
import { toast } from 'sonner';

export function WorkforceAnalyticsIntegrated() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Data states
  const [stats, setStats] = useState<any>(null);
  const [departmentStats, setDepartmentStats] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [employeesData, statsData] = await Promise.all([
        userService.getAllUsers(),
        userService.getUserStatistics()
      ]);

      setStats(statsData);
      
      // Calculate department statistics
      const deptStats = calculateDepartmentStats(employeesData);
      setDepartmentStats(deptStats);
    } catch (err: any) {
      console.error('Error fetching workforce analytics:', err);
      setError(err.message || 'Failed to load workforce analytics');
      toast.error('Failed to load workforce analytics');
    } finally {
      setLoading(false);
    }
  };

  const calculateDepartmentStats = (users: any[]) => {
    const deptMap = new Map<string, any>();
    
    users.forEach(user => {
      const dept = user.department || 'Unassigned';
      if (!deptMap.has(dept)) {
        deptMap.set(dept, {
          name: dept,
          employees: 0,
          activeEmployees: 0,
          positions: new Set()
        });
      }
      
      const deptData = deptMap.get(dept);
      deptData.employees++;
      if (user.status === 'active') deptData.activeEmployees++;
      if (user.position) deptData.positions.add(user.position);
    });

    return Array.from(deptMap.values())
      .map(dept => ({
        ...dept,
        positions: dept.positions.size,
        activeRate: dept.employees > 0 ? ((dept.activeEmployees / dept.employees) * 100).toFixed(1) : 0
      }))
      .sort((a, b) => b.employees - a.employees);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading workforce analytics...</p>
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

  const activePercentage = stats?.total_users > 0 
    ? ((stats?.active_users / stats?.total_users) * 100).toFixed(1)
    : 0;

  const analyticsMetrics = [
    {
      label: 'Total Workforce',
      value: stats?.total_users || 0,
      change: `${stats?.active_users || 0} active`,
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100'
    },
    {
      label: 'Active Employees',
      value: stats?.active_users || 0,
      change: `${activePercentage}% of total`,
      trend: 'up',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-100'
    },
    {
      label: 'Departments',
      value: stats?.by_department ? Object.keys(stats.by_department).length : 0,
      change: 'Active departments',
      trend: 'neutral',
      icon: Building2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-100'
    },
    {
      label: 'Positions',
      value: stats?.by_position ? Object.keys(stats.by_position).length : 0,
      change: 'Unique roles',
      trend: 'neutral',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-100'
    }
  ];

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Workforce Analytics</h2>
          <p className="text-gray-600 mt-1">Comprehensive workforce insights and trend analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={fetchData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        {analyticsMetrics.map((metric, index) => (
          <Card 
            key={index} 
            className="p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">{metric.change}</p>
              </div>
              <metric.icon className={`w-8 h-8 ${metric.color}`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Department Analytics */}
      <Card className="p-6 border-2 border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Department Overview</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">Employee distribution across departments</p>
          </div>
          <Badge variant="outline">
            {departmentStats.length} Departments
          </Badge>
        </div>
        {departmentStats.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No department data available</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-5 gap-4 pb-3 border-b-2 border-gray-200 mb-4">
                <div className="font-semibold text-gray-700 text-sm">Department</div>
                <div className="font-semibold text-gray-700 text-sm">Total Employees</div>
                <div className="font-semibold text-gray-700 text-sm">Active</div>
                <div className="font-semibold text-gray-700 text-sm">Positions</div>
                <div className="font-semibold text-gray-700 text-sm">Active Rate</div>
              </div>
              <div className="space-y-3">
                {departmentStats.map((dept, index) => (
                  <div 
                    key={index} 
                    className="grid grid-cols-5 gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-semibold text-gray-900">{dept.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-700 font-medium">{dept.employees}</span>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="secondary">
                        {dept.activeEmployees}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{dept.positions}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 max-w-[120px]">
                        <Progress value={parseFloat(dept.activeRate)} className="h-2" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 min-w-[50px]">
                        {dept.activeRate}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Distribution Charts */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 border-2 border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-blue-600" />
                <span>Employees by Department</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">Distribution across all departments</p>
            </div>
          </div>
          {stats?.by_department && Object.keys(stats.by_department).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(stats.by_department)
                .sort(([, a]: any, [, b]: any) => b - a)
                .slice(0, 8)
                .map(([dept, count]: [string, any], index) => {
                  const percentage = stats.total_users > 0 
                    ? ((count / stats.total_users) * 100).toFixed(1)
                    : 0;
                  const colors = [
                    'bg-blue-500',
                    'bg-green-500',
                    'bg-purple-500',
                    'bg-orange-500',
                    'bg-pink-500',
                    'bg-indigo-500',
                    'bg-teal-500',
                    'bg-yellow-500'
                  ];
                  return (
                    <div key={dept} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 ${colors[index % colors.length]} rounded-full`}></div>
                          <span className="font-medium text-gray-900 text-sm">{dept}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-gray-700">{count}</span>
                          <span className="text-xs text-gray-500">({percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`${colors[index % colors.length]} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-12">
              <PieChart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No distribution data</p>
            </div>
          )}
        </Card>

        <Card className="p-6 border-2 border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <LineChart className="w-5 h-5 text-green-600" />
                <span>Employees by Status</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">Current workforce status breakdown</p>
            </div>
          </div>
          {stats?.by_status && Object.keys(stats.by_status).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(stats.by_status).map(([status, count]: [string, any]) => {
                const percentage = stats.total_users > 0 
                  ? ((count / stats.total_users) * 100).toFixed(1)
                  : 0;
                const statusConfig = {
                  active: {
                    color: 'bg-green-500',
                    bg: 'bg-green-50',
                    text: 'text-green-700',
                    label: 'Active',
                    icon: CheckCircle2
                  },
                  inactive: {
                    color: 'bg-gray-500',
                    bg: 'bg-gray-50',
                    text: 'text-gray-700',
                    label: 'Inactive',
                    icon: XCircle
                  },
                  pending: {
                    color: 'bg-yellow-500',
                    bg: 'bg-yellow-50',
                    text: 'text-yellow-700',
                    label: 'Pending',
                    icon: Activity
                  }
                };
                const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
                const Icon = config.icon;
                
                return (
                  <div key={status} className={`p-4 ${config.bg} rounded-lg border border-gray-200`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${config.color} bg-opacity-20 rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${config.text}`} />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-900 block">
                            {config.label}
                          </span>
                          <span className="text-xs text-gray-500">
                            {percentage}% of workforce
                          </span>
                        </div>
                      </div>
                      <Badge variant="default">
                        {count}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`${config.color} h-2.5 rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No status data</p>
            </div>
          )}
        </Card>
      </div>

      {/* Top Positions */}
      <Card className="p-6 border-2 border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-orange-600" />
              <span>Top Positions</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">Most common roles in the organization</p>
          </div>
          <Badge variant="outline">
            {stats?.by_position ? Object.keys(stats.by_position).length : 0} Total
          </Badge>
        </div>
        {stats?.by_position && Object.keys(stats.by_position).length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(stats.by_position)
              .sort(([, a]: any, [, b]: any) => b - a)
              .slice(0, 9)
              .map(([position, count]: [string, any], index) => (
                <div 
                  key={position} 
                  className="p-5 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200 bg-linear-to-br from-white to-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Target className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{position}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{count} {count === 1 ? 'employee' : 'employees'}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ 
                              width: `${stats.total_users > 0 ? ((count / stats.total_users) * 100).toFixed(1) : 0}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {index < 3 && (
                      <Badge variant="secondary">
                        Top {index + 1}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No position data</p>
          </div>
        )}
      </Card>

      {/* Analytics Summary */}
      <Card className="p-6 border-2 border-gray-100 shadow-sm bg-linear-to-br from-gray-50 to-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span>Workforce Summary</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">Key metrics at a glance</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.total_users || 0}</p>
                <p className="text-sm text-gray-500 mt-1">All workforce</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.active_users || 0}</p>
                <p className="text-sm text-gray-500 mt-1">{activePercentage}% active rate</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.by_department ? Object.keys(stats.by_department).length : 0}
                </p>
                <p className="text-sm text-gray-500 mt-1">Active departments</p>
              </div>
              <Building2 className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Positions</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.by_position ? Object.keys(stats.by_position).length : 0}
                </p>
                <p className="text-sm text-gray-500 mt-1">Unique roles</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}
