import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import {
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Plus,
  Eye,
  Archive,
  Edit,
  RefreshCw,
  TrendingUp,
  Loader2,
  XCircle
} from 'lucide-react';
import { policyService } from '../../../lib/mockServices';
import { toast } from 'sonner';

export function PolicyComplianceIntegrated() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<any | null>(null);

  // Data states
  const [policies, setPolicies] = useState<any[]>([]);
  const [violations, setViolations] = useState<any[]>([]);
  const [frameworks, setFrameworks] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'other' as 'workplace' | 'compliance' | 'benefits' | 'hr' | 'safety' | 'other',
    description: '',
    content: '',
    version: '1.0',
    status: 'active' as 'active' | 'archived',
    effective_date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        policiesData,
        violationsData,
        frameworksData,
        statsData
      ] = await Promise.all([
        policyService.getPolicies(), // Get all policies, not just active
        policyService.getPolicyViolations({ status: 'open' }),
        policyService.getComplianceFrameworks(),
        policyService.getPolicyStatistics()
      ]);

      setPolicies(policiesData);
      setViolations(violationsData);
      setFrameworks(frameworksData);
      setStats(statsData);
    } catch (err: any) {
      console.error('Error fetching policy compliance data:', err);
      setError(err.message || 'Failed to load policy compliance data');
      toast.error('Failed to load policy compliance data');
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

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'other',
      description: '',
      content: '',
      version: '1.0',
      status: 'active',
      effective_date: new Date().toISOString().split('T')[0],
    });
  };

  const handleCreatePolicy = async () => {
    if (!formData.title.trim()) {
      toast.error('Policy title is required');
      return;
    }

    try {
      setCreating(true);
      await policyService.createPolicy(formData);
      toast.success('Policy created successfully');
      setShowCreateDialog(false);
      resetForm();
      fetchData(); // Refresh the list
    } catch (err: any) {
      console.error('Error creating policy:', err);
      toast.error(err.message || 'Failed to create policy');
    } finally {
      setCreating(false);
    }
  };

  const handleArchivePolicy = async (policyId: string, currentStatus: string) => {
    const isArchiving = currentStatus !== 'archived';
    const action = isArchiving ? 'archive' : 'unarchive';
    
    if (!window.confirm(`Are you sure you want to ${action} this policy? ${isArchiving ? 'Archived policies will not be visible to managers and employees.' : 'This will make the policy visible again.'}`)) {
      return;
    }

    try {
      await policyService.updatePolicy(policyId, { status: isArchiving ? 'archived' : 'active' });
      toast.success(`Policy ${action}d successfully`);
      fetchData(); // Refresh the list
    } catch (err: any) {
      console.error(`Error ${action}ing policy:`, err);
      toast.error(err.message || `Failed to ${action} policy`);
    }
  };

  const handleEditPolicy = (policy: any) => {
    setSelectedPolicy(policy);
    setFormData({
      title: policy.title || policy.name,
      category: policy.category,
      description: policy.description,
      content: policy.content,
      version: policy.version, // Will be auto-incremented
      status: policy.status,
      effective_date: policy.effective_date,
    });
    setShowEditDialog(true);
  };

  const handleUpdatePolicy = async () => {
    if (!formData.title.trim() || !selectedPolicy) {
      toast.error('Policy title is required');
      return;
    }

    try {
      setUpdating(true);
      // Auto-increment version
      const currentVersion = parseFloat(selectedPolicy.version) || 1.0;
      const newVersion = (currentVersion + 0.1).toFixed(1);
      
      await policyService.updatePolicy(selectedPolicy.id, {
        ...formData,
        version: newVersion,
      });
      toast.success('Policy updated successfully');
      setShowEditDialog(false);
      resetForm();
      setSelectedPolicy(null);
      fetchData(); // Refresh the list
    } catch (err: any) {
      console.error('Error updating policy:', err);
      toast.error(err.message || 'Failed to update policy');
    } finally {
      setUpdating(false);
    }
  };

  const handleViewPolicy = (policy: any) => {
    setSelectedPolicy(policy);
    setShowViewDialog(true);
  };

  if (loading) {
    return (
      <div className="max-w-9xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Loading policy compliance data...</span>
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

  const complianceMetrics = [
    {
      label: 'Overall Compliance',
      value: `${stats?.average_compliance_score?.toFixed(1) || 0}%`,
      change: 'Across all policies',
      trend: 'up',
      icon: Shield,
      color: 'text-green-600'
    },
    {
      label: 'Active Policies',
      value: stats?.active_policies || 0,
      change: `${stats?.total_policies || 0} total`,
      trend: 'neutral',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      label: 'Open Violations',
      value: stats?.open_violations || 0,
      change: `${stats?.resolved_violations || 0} resolved`,
      trend: stats?.open_violations > 0 ? 'down' : 'neutral',
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      label: 'High Risk',
      value: stats?.high_severity_violations || 0,
      change: 'Requires attention',
      trend: 'neutral',
      icon: Clock,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Policy & Compliance Management</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage organizational policies and ensure regulatory compliance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={fetchData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="w-4 h-4 mr-2" />
                Create Policy
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Create New Policy</DialogTitle>
                <DialogDescription>
                  Create a new organizational policy. Fill in all required fields to get started.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-semibold">
                      Policy Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., Remote Work Policy"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-semibold">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workplace">Workplace</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="benefits">Benefits</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the policy..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-semibold">
                    Policy Content <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="Enter the full policy content here..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    className="resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="version" className="text-sm font-semibold">
                      Version
                    </Label>
                    <Input
                      id="version"
                      placeholder="1.0"
                      value={formData.version}
                      onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-semibold">
                      Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="effective_date" className="text-sm font-semibold">
                      Effective Date
                    </Label>
                    <Input
                      id="effective_date"
                      type="date"
                      value={formData.effective_date}
                      onChange={(e) => setFormData({ ...formData, effective_date: e.target.value })}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowCreateDialog(false);
                    resetForm();
                  }}
                  disabled={creating}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreatePolicy}
                  disabled={creating || !formData.title.trim()}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  {creating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Policy
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Policy Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Edit Policy</DialogTitle>
                <DialogDescription>
                  Update the policy. Version will be automatically incremented.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-title" className="text-sm font-semibold">
                      Policy Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="edit-title"
                      placeholder="e.g., Remote Work Policy"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-category" className="text-sm font-semibold">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workplace">Workplace</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="benefits">Benefits</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-description" className="text-sm font-semibold">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="edit-description"
                    placeholder="Brief description of the policy..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-content" className="text-sm font-semibold">
                    Policy Content <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="edit-content"
                    placeholder="Enter the full policy content here..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    className="resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-version" className="text-sm font-semibold">
                      Current Version (Auto-increments on save)
                    </Label>
                    <Input
                      id="edit-version"
                      value={selectedPolicy?.version || formData.version}
                      className="h-11 bg-gray-100"
                      disabled
                    />
                    <p className="text-xs text-gray-500">Will become: {(parseFloat(selectedPolicy?.version || formData.version) + 0.1).toFixed(1)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status" className="text-sm font-semibold">
                      Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-effective_date" className="text-sm font-semibold">
                      Effective Date
                    </Label>
                    <Input
                      id="edit-effective_date"
                      type="date"
                      value={formData.effective_date}
                      onChange={(e) => setFormData({ ...formData, effective_date: e.target.value })}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowEditDialog(false);
                    resetForm();
                    setSelectedPolicy(null);
                  }}
                  disabled={updating}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdatePolicy}
                  disabled={updating || !formData.title.trim()}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  {updating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Update Policy
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* View Policy Dialog */}
          <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedPolicy?.title || selectedPolicy?.name}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="outline">v{selectedPolicy?.version}</Badge>
                    <Badge variant="secondary">
                      <span className="capitalize">{selectedPolicy?.category}</span>
                    </Badge>
                    <Badge variant={
                      selectedPolicy?.status === 'active' ? 'default' :
                      'outline'
                    }>
                      <span className="capitalize">{selectedPolicy?.status}</span>
                    </Badge>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedPolicy?.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Policy Content</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedPolicy?.content}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <span className="text-sm text-gray-500">Effective Date: </span>
                    <span className="text-sm font-medium">{formatDate(selectedPolicy?.effective_date)}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Last Updated: </span>
                    <span className="text-sm font-medium">{formatDate(selectedPolicy?.last_updated || selectedPolicy?.updated_at)}</span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {complianceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{metric.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Policies by Category</h3>
              {stats?.by_category && Object.keys(stats.by_category).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(stats.by_category).map(([category, count]: [string, any]) => (
                    <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                      <Badge>{count} policies</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No policy data available</p>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Violations by Severity</h3>
              {stats?.violations_by_severity && Object.keys(stats.violations_by_severity).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(stats.violations_by_severity).map(([severity, count]: [string, any]) => (
                    <div key={severity} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className={`w-4 h-4 ${
                          severity === 'critical' ? 'text-red-600' :
                          severity === 'high' ? 'text-orange-600' :
                          severity === 'medium' ? 'text-yellow-600' :
                          'text-gray-600'
                        }`} />
                        <span className="text-sm font-medium text-gray-700 capitalize">{severity}</span>
                      </div>
                      <Badge variant={
                        severity === 'critical' || severity === 'high' ? 'destructive' : 'outline'
                      }>
                        {count}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-3" />
                  <p className="text-gray-600">No violations recorded</p>
                </div>
              )}
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Compliance Status Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900">Active Policies</p>
                <p className="text-2xl font-bold text-green-600">{stats?.active || 0}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium text-orange-900">Archived Policies</p>
                <p className="text-2xl font-bold text-orange-600">{stats?.archived || 0}</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Policy Management ({policies.length})</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Search policies..." className="pl-10 w-64" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {policies.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Policies</h3>
                <p className="text-gray-600">Create your first policy to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {policies.map((policy) => (
                  <div key={policy.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-foreground">{policy.title || policy.name}</h4>
                          <Badge variant={
                            policy.status === 'active' ? 'default' :
                            'outline'
                          }>
                            {policy.status.replace('-', ' ')}
                          </Badge>
                          <Badge variant="outline">v{policy.version}</Badge>
                          <Badge variant="secondary">
                            <span className="capitalize">{policy.category}</span>
                          </Badge>
                          {policy.compliance_score && (
                            <Badge variant={policy.compliance_score >= 90 ? 'default' : 'destructive'}>
                              {policy.compliance_score.toFixed(0)}% compliant
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{policy.description}</p>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Status: </span>
                            <span className="font-medium capitalize">{policy.status.replace('-', ' ')}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Effective: </span>
                            <span className="font-medium">{formatDate(policy.effective_date)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Last Updated: </span>
                            <span className="font-medium">{formatDate(policy.last_updated)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Owner: </span>
                            <span className="font-medium">{policy.owner?.full_name || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewPolicy(policy)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Policy
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleArchivePolicy(policy.id, policy.status)}
                        className={policy.status === 'archived' 
                          ? "text-green-600 hover:text-green-700 hover:bg-green-50" 
                          : "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        }
                      >
                        <Archive className="w-4 h-4 mr-1" />
                        {policy.status === 'archived' ? 'Unarchive' : 'Archive'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditPolicy(policy)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="violations" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Policy Violations ({violations.length})</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Report Violation
              </Button>
            </div>

            {violations.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Open Violations</h3>
                <p className="text-gray-600">All policy violations have been resolved</p>
              </div>
            ) : (
              <div className="space-y-4">
                {violations.map((violation) => (
                  <div key={violation.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{violation.policy?.name || 'Unknown Policy'}</h4>
                          <Badge variant={
                            violation.severity === 'critical' || violation.severity === 'high' 
                              ? 'destructive' 
                              : violation.severity === 'medium'
                              ? 'secondary'
                              : 'outline'
                          }>
                            {violation.severity}
                          </Badge>
                          <Badge variant="outline">{violation.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{violation.description}</p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Employee: </span>
                            <span className="font-medium">{violation.employee?.full_name || 'Unknown'}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Department: </span>
                            <span className="font-medium">{violation.employee?.department || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Reported: </span>
                            <span className="font-medium">{formatDate(violation.reported_date)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      {violation.status === 'open' && (
                        <Button size="sm" variant="default">
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Regulatory Frameworks</h3>
              <Button onClick={fetchData}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Status
              </Button>
            </div>

            {frameworks.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Frameworks Configured</h3>
                <p className="text-gray-600">Add compliance frameworks to track regulatory requirements</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {frameworks.map((framework) => (
                  <div key={framework.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-1">{framework.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{framework.description}</p>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant={
                            framework.status === 'compliant' ? 'default' :
                            framework.status === 'partial' ? 'secondary' :
                            'destructive'
                          }>
                            {framework.status}
                          </Badge>
                          {framework.compliance_score && (
                            <span className="text-sm font-medium text-gray-900">
                              {framework.compliance_score}% compliant
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          Last Audit: {formatDate(framework.last_audit_date)}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-1" />
                      View Requirements
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Compliance Trends</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Compliance trends visualization</p>
                  <p className="text-sm text-gray-500 mt-1">Coming soon</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Key Metrics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Total Policies</span>
                  <span className="text-lg font-bold text-gray-900">{stats?.total_policies || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Active Policies</span>
                  <span className="text-lg font-bold text-gray-900">{stats?.active_policies || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Total Violations</span>
                  <span className="text-lg font-bold text-gray-900">{stats?.total_violations || 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Avg. Compliance</span>
                  <span className="text-lg font-bold text-gray-900">{stats?.average_compliance_score?.toFixed(1) || 0}%</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
