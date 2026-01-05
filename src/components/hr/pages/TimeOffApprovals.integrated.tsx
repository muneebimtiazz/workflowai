import  { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, AlertCircle, Search, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { leaveService, LeaveRequest, authService } from '../../../lib/mockServices';
import { toast } from 'sonner';
import { format } from 'date-fns';

export function TimeOffApprovalsIntegrated() {
  const [pendingRequests, setPendingRequests] = useState<LeaveRequest[]>([]);
  const [allRequests, setAllRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [processing, setProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('pending');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
      
      // Get pending HR approval requests
      const pending = await leaveService.getPendingHRApprovalRequests();
      setPendingRequests(pending);
      
      // Get all requests for history
      const all = await leaveService.getAllLeaveRequests();
      setAllRequests(all);
    } catch (error: any) {
      console.error('Error fetching time off requests:', error);
      toast.error('Failed to load time off requests');
    } finally {
      setLoading(false);
    }
  }

  const handleApprove = async () => {
    if (!selectedRequest || !currentUser) return;

    try {
      setProcessing(true);
      await leaveService.approveLeaveRequest(selectedRequest.id, currentUser.id, 'hr');
      toast.success('Time off request approved');
      setShowApproveDialog(false);
      setSelectedRequest(null);
      await fetchData();
    } catch (error: any) {
      console.error('Error approving request:', error);
      toast.error(error.message || 'Failed to approve request');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedRequest || !currentUser || !rejectReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }

    try {
      setProcessing(true);
      await leaveService.rejectLeaveRequest(selectedRequest.id, currentUser.id, rejectReason, 'hr');
      toast.success('Time off request rejected');
      setShowRejectDialog(false);
      setSelectedRequest(null);
      setRejectReason('');
      await fetchData();
    } catch (error: any) {
      console.error('Error rejecting request:', error);
      toast.error(error.message || 'Failed to reject request');
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_manager_approval':
        return <Badge variant="secondary">Pending Manager Approval</Badge>;
      case 'pending_hr_approval':
        return <Badge variant="outline">Pending HR Approval</Badge>;
      case 'approved':
        return <Badge variant="default">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'cancelled':
        return <Badge variant="outline">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vacation':
        return 'bg-secondary text-secondary-foreground';
      case 'sick':
        return 'bg-destructive/10 text-destructive';
      case 'personal':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredPendingRequests = pendingRequests.filter(request => {
    const matchesSearch = 
      request.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.leave_type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredAllRequests = allRequests.filter(request => {
    const matchesSearch = 
      request.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.leave_type.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === 'pending') {
      return matchesSearch && request.status === 'pending_hr_approval';
    } else if (selectedTab === 'approved') {
      return matchesSearch && request.status === 'approved';
    } else if (selectedTab === 'rejected') {
      return matchesSearch && request.status === 'rejected';
    }
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="max-w-9xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Loading time off requests...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Time Off Approvals</h2>
          <p className="text-sm text-muted-foreground mt-1">Review and approve time off requests pending HR approval</p>
        </div>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {pendingRequests.length} Pending HR Approval
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Pending HR Approval</p>
              <p className="text-3xl font-bold text-foreground">{pendingRequests.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Requires your review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-3xl font-bold text-foreground">
                {allRequests.filter(r => r.status === 'approved').length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Rejected</p>
              <p className="text-3xl font-bold text-foreground">
                {allRequests.filter(r => r.status === 'rejected').length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Pending Manager</p>
              <p className="text-3xl font-bold text-foreground">
                {allRequests.filter(r => r.status === 'pending_manager_approval').length}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Awaiting manager</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="pending">
              Pending HR Approval ({pendingRequests.length})
              {pendingRequests.length > 0 && <Badge variant="destructive" className="ml-2">!</Badge>}
            </TabsTrigger>
            <TabsTrigger value="approved">Approved ({allRequests.filter(r => r.status === 'approved').length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({allRequests.filter(r => r.status === 'rejected').length})</TabsTrigger>
            <TabsTrigger value="all">All Requests ({allRequests.length})</TabsTrigger>
          </TabsList>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TabsContent value="pending" className="space-y-4">
          {filteredPendingRequests.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-xl font-semibold text-foreground mb-2">
                    {searchTerm ? 'No matching requests found' : 'No pending HR approvals'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm ? 'Try adjusting your search terms' : 'All requests have been processed'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredPendingRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {request.employee_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{request.employee_name}</CardTitle>
                          <CardDescription>
                            <Badge className={getTypeColor(request.leave_type)}>
                              {request.leave_type}
                            </Badge>
                          </CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">
                          {format(new Date(request.start_date), 'MMM dd, yyyy')} - {format(new Date(request.end_date), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{request.days_requested} day{request.days_requested > 1 ? 's' : ''}</span>
                      </div>
                      <div className="pt-2">
                        <Label className="text-xs text-muted-foreground">Reason</Label>
                        <p className="text-sm mt-1">{request.reason}</p>
                      </div>
                      <div className="pt-2">
                        <Label className="text-xs text-muted-foreground">Manager Approval</Label>
                        <p className="text-sm mt-1">
                          Approved by {request.approver_name || 'Manager'} on{' '}
                          {request.approved_date ? format(new Date(request.approved_date), 'MMM dd, yyyy') : 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowApproveDialog(true);
                      }}
                    >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowRejectDialog(true);
                        }}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredAllRequests.filter(r => r.status === 'approved').map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {request.employee_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-semibold text-lg">{request.employee_name}</CardTitle>
                        <CardDescription>
                          <Badge className={getTypeColor(request.leave_type)}>
                            {request.leave_type}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {format(new Date(request.start_date), 'MMM dd, yyyy')} - {format(new Date(request.end_date), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{request.days_requested} day{request.days_requested > 1 ? 's' : ''}</span>
                    </div>
                    {request.approved_date && (
                      <div className="text-xs text-muted-foreground pt-2">
                        Approved on {format(new Date(request.approved_date), 'MMM dd, yyyy')}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredAllRequests.filter(r => r.status === 'rejected').map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {request.employee_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{request.employee_name}</CardTitle>
                        <CardDescription>
                          <Badge className={getTypeColor(request.leave_type)}>
                            {request.leave_type}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {format(new Date(request.start_date), 'MMM dd, yyyy')} - {format(new Date(request.end_date), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    {request.notes && (
                      <div className="pt-2 p-2 bg-red-50 border border-red-200 rounded">
                        <Label className="text-xs text-red-800">Rejection Reason</Label>
                        <p className="text-sm text-red-800 mt-1">{request.notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {filteredAllRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {request.employee_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{request.employee_name}</CardTitle>
                        <CardDescription>
                          <Badge className={getTypeColor(request.leave_type)}>
                            {request.leave_type}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {format(new Date(request.start_date), 'MMM dd, yyyy')} - {format(new Date(request.end_date), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{request.days_requested} day{request.days_requested > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Time Off Request</DialogTitle>
            <DialogDescription>
              This will finalize the approval and notify the employee.
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <Label>Employee</Label>
                <p className="font-medium">{selectedRequest.employee_name}</p>
              </div>
              <div>
                <Label>Dates</Label>
                <p className="font-medium">
                  {format(new Date(selectedRequest.start_date), 'MMM dd, yyyy')} - {format(new Date(selectedRequest.end_date), 'MMM dd, yyyy')}
                </p>
              </div>
              <div>
                <Label>Duration</Label>
                <p className="font-medium">{selectedRequest.days_requested} day{selectedRequest.days_requested > 1 ? 's' : ''}</p>
              </div>
              <div>
                <Label>Reason</Label>
                <p className="text-sm">{selectedRequest.reason}</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleApprove}
                  disabled={processing}
                  className="flex-1"
                >
                  {processing ? 'Processing...' : 'Confirm Approval'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowApproveDialog(false);
                    setSelectedRequest(null);
                  }}
                  disabled={processing}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Time Off Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this request.
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <Label>Employee</Label>
                <p className="font-medium">{selectedRequest.employee_name}</p>
              </div>
              <div>
                <Label>Dates</Label>
                <p className="font-medium">
                  {format(new Date(selectedRequest.start_date), 'MMM dd, yyyy')} - {format(new Date(selectedRequest.end_date), 'MMM dd, yyyy')}
                </p>
              </div>
              <div>
                <Label htmlFor="reject-reason">Rejection Reason *</Label>
                <Textarea
                  id="reject-reason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Please provide a reason for rejection..."
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={processing || !rejectReason.trim()}
                  className="flex-1"
                >
                  {processing ? 'Processing...' : 'Confirm Rejection'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowRejectDialog(false);
                    setSelectedRequest(null);
                    setRejectReason('');
                  }}
                  disabled={processing}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

