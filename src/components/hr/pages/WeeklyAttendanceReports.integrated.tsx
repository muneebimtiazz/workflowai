import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import {
  Clock,
  Search,
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Lock,
  Unlock,
  Loader2,
  Filter,
  FileSpreadsheet,
  Eye,
  Mail,
  Clock4,
  Users,
  BarChart3,
  XCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { overtimeService } from '../../../lib/mockServices';
import { toast } from 'sonner';

export function WeeklyAttendanceReportsIntegrated() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('2025-12-15');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'finalized' | 'paid'>('all');

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    try {
      setLoading(true);
      const overtimeRecords = await overtimeService.getWeeklyOvertimeRecords();
      setReports(overtimeRecords);
    } catch (err) {
      console.error('Error fetching reports:', err);
      toast.error('Failed to load attendance reports');
    } finally {
      setLoading(false);
    }
  }

  function handleFinalizeOvertime(recordId: string, employeeName: string) {
    overtimeService.finalizeWeeklyOvertime(recordId).then(() => {
      toast.success(`Overtime finalized for ${employeeName}`);
      fetchReports();
    }).catch(err => {
      toast.error('Failed to finalize overtime');
      console.log(err)
    });
  }

  function handleExportReport() {
    toast.success('Report exported successfully');
  }

  function handleSendEmail(employeeName: string) {
    toast.success(`Report sent to ${employeeName}`);
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'finalized':
        return <Badge variant="secondary">Finalized</Badge>;
      case 'paid':
        return <Badge variant="outline">Paid</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  }


  const filteredReports = reports.filter(report => {
    const matchesSearch = report.employee_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalOvertime: reports.reduce((sum, r) => sum + r.overtime_hours, 0),
    employeesWithOT: reports.filter(r => r.overtime_hours > 0).length,
    finalized: reports.filter(r => r.status === 'finalized').length,
    active: reports.filter(r => r.status === 'active').length,
    avgOvertime: reports.length > 0 
      ? reports.reduce((sum, r) => sum + r.overtime_hours, 0) / reports.filter(r => r.overtime_hours > 0).length 
      : 0
  };

  if (loading) {
    return (
      <div className="max-w-9xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Loading attendance reports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Weekly Attendance Reports</h2>
          <p className="text-sm text-muted-foreground mt-1">Monitor employee attendance, working hours, and overtime</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={fetchReports}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExportReport}>
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Overtime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-foreground">{stats.totalOvertime.toFixed(1)}h</p>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">Across all employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">With Overtime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-foreground">{stats.employeesWithOT}</p>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">Employees this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average OT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-foreground">
                {isNaN(stats.avgOvertime) ? '0.0' : stats.avgOvertime.toFixed(1)}h
              </p>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">Per employee</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Finalized</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-foreground">{stats.finalized}</p>
              <Lock className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">Locked reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-foreground">{stats.active}</p>
              <Unlock className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">Pending reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search employee name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Week Selector */}
          <div className="w-64">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-background appearance-none cursor-pointer hover:border-gray-400 transition-colors"
              >
                <option value="2025-12-15">Dec 15-21, 2025</option>
                <option value="2025-12-08">Dec 8-14, 2025</option>
                <option value="2025-12-01">Dec 1-7, 2025</option>
                <option value="2025-11-24">Nov 24-30, 2025</option>
              </select>
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-background appearance-none cursor-pointer hover:border-gray-400 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="finalized">Finalized</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || statusFilter !== 'all') && (
          <div className="flex items-center space-x-2 mt-4 pt-4 border-t">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchTerm}
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-1 hover:opacity-70"
                >
                  <XCircle className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {statusFilter !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Status: {statusFilter}
                <button
                  onClick={() => setStatusFilter('all')}
                  className="ml-1 hover:opacity-70"
                >
                  <XCircle className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>
                Showing {filteredReports.length} of {reports.length} reports
              </CardDescription>
            </div>
            <Badge variant="outline">
              Week: {selectedWeek}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          {filteredReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <Clock4 className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="font-medium text-foreground text-lg">No reports found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredReports.map((report) => {
                const weeklyLimit = 40;
                const difference = report.total_hours - weeklyLimit;
                
                return (
                  <Card 
                    key={report.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                            {report.employee_name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          <div>
                            <CardTitle className="text-base">{report.employee_name}</CardTitle>
                            <CardDescription>ID: {report.employee_id}</CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(report.status)}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Week Period */}
                      <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">
                          {report.week_start} → {report.week_end.substring(5)}
                        </span>
                      </div>

                      {/* Hours Grid */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Clock className="w-4 h-4 text-blue-600" />
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">Regular</p>
                          <p className="font-bold text-blue-600">{report.regular_hours.toFixed(1)}h</p>
                        </div>

                        <div className={`p-3 rounded-lg text-center ${
                          report.overtime_hours > 5 ? 'bg-red-50' : 
                          report.overtime_hours > 0 ? 'bg-orange-50' : 'bg-muted'
                        }`}>
                          <div className="flex items-center justify-center mb-1">
                            <TrendingUp className={`w-4 h-4 ${
                              report.overtime_hours > 5 ? 'text-red-600' : 
                              report.overtime_hours > 0 ? 'text-orange-600' : 'text-muted-foreground'
                            }`} />
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">Overtime</p>
                          <p className={`font-bold ${
                            report.overtime_hours > 5 ? 'text-red-600' : 
                            report.overtime_hours > 0 ? 'text-orange-600' : 'text-muted-foreground'
                          }`}>
                            {report.overtime_hours.toFixed(1)}h
                          </p>
                        </div>

                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                          <div className="flex items-center justify-center mb-1">
                            <CheckCircle className="w-4 h-4 text-purple-600" />
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">Total</p>
                          <p className="font-bold text-purple-600">{report.total_hours.toFixed(1)}h</p>
                        </div>
                      </div>

                      {/* Variance Indicator */}
                      {difference > 0 ? (
                        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-5 h-5 text-orange-600" />
                            <span className="text-sm font-medium text-orange-900">Overtime Work</span>
                          </div>
                          <span className="font-bold text-orange-600">+{difference.toFixed(1)}h</span>
                        </div>
                      ) : difference < 0 ? (
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-2">
                            <TrendingDown className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-medium text-blue-900">Under Target</span>
                          </div>
                          <span className="font-bold text-blue-600">{difference.toFixed(1)}h</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-green-900">Target Met</span>
                          </div>
                          <span className="font-bold text-green-600">40h</span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center space-x-2 pt-4 border-t">
                        {report.status === 'active' && report.overtime_hours > 0 ? (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSendEmail(report.employee_name)}
                              className="flex-1"
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Email
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleFinalizeOvertime(report.id, report.employee_name)}
                              className="flex-1"
                            >
                              <Lock className="w-4 h-4 mr-2" />
                              Finalize
                            </Button>
                          </>
                        ) : report.status === 'finalized' ? (
                          <div className="flex items-center justify-center space-x-2 w-full p-3 bg-green-50 rounded-lg">
                            <Lock className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-700">Finalized & Locked</span>
                          </div>
                        ) : report.status === 'paid' ? (
                          <div className="flex items-center justify-center space-x-2 w-full p-3 bg-muted rounded-lg">
                            <CheckCircle className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">Processed & Paid</span>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-6">
        {/* Guidelines */}
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2">Weekly Attendance Guidelines</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                    <span>Standard weekly working hours: <strong>40 hours</strong></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                    <span>Overtime calculated automatically beyond the limit</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                    <span>Use "Finalize" to lock data and prepare for processing</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overtime Alert */}
        {stats.employeesWithOT > 2 && (
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">High Overtime Alert</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>{stats.employeesWithOT} employees</strong> have worked overtime this week, 
                    totaling <strong>{stats.totalOvertime.toFixed(1)} hours</strong>.
                  </p>
                  <Button size="sm" variant="outline">
                    Review Overtime Policy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}