import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback} from '../../ui/avatar';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { leaveService, LeaveRequest, authService } from '../../../lib/mockServices';
import { toast } from 'sonner';
import { format } from 'date-fns';

export const TimeOffApprovals = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [processing, setProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
      
      if (user.role === 'manager') {
        const pendingRequests = await leaveService.getPendingManagerApprovalRequests(user.id);
        setRequests(pendingRequests);
      }
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
      await leaveService.approveLeaveRequest(selectedRequest.id, currentUser.id, 'manager');
      toast.success('Time off request approved. It will now be reviewed by HR.');
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
      await leaveService.rejectLeaveRequest(selectedRequest.id, currentUser.id, rejectReason, 'manager');
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
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.leave_type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Clock className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">Loading time off requests...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Time Off Approvals</h2>
          <p className="text-sm text-muted-foreground">Review and approve time off requests from your team</p>
        </div>
        <Badge variant="outline" className="text-base text-foreground px-3 py-1">
          {requests.length} Pending
        </Badge>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by employee name, reason, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl font-semibold text-foreground mb-2">
                {searchTerm ? 'No matching requests found' : 'No pending time off requests'}
              </p>
              <p className="text-sm text-muted-foreground">
                {searchTerm ? 'Try adjusting your search terms' : 'All time off requests have been processed'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredRequests.map((request) => (
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
                      <CardTitle className="text-base font-semibold text-foreground">{request.employee_name}</CardTitle>
                      <CardDescription>{request.leave_type}</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">
                      {format(new Date(request.start_date), 'MMM dd, yyyy')} - {format(new Date(request.end_date), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{request.days_requested} day{request.days_requested > 1 ? 's' : ''}</span>
                  </div>
                  <div className="pt-2">
                    <Label className="text-xs text-muted-foreground">Reason</Label>
                    <p className="text-sm text-foreground mt-1">{request.reason}</p>
                  </div>
                  <div className="pt-2">
                    <Label className="text-xs text-muted-foreground">Submitted</Label>
                    <p className="text-sm text-foreground mt-1">{format(new Date(request.submitted_date), 'MMM dd, yyyy')}</p>
                  </div>
                </div>

                {request.status === 'pending_manager_approval' && (
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
                )}

                {(request.status === 'approved' || request.status === 'rejected' || request.status === 'pending_hr_approval') && (
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      {request.status === 'pending_hr_approval' 
                        ? 'Approved by you, pending HR review'
                        : request.status === 'approved'
                        ? 'Approved by HR'
                        : 'Rejected'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Time Off Request</DialogTitle>
            <DialogDescription>
              This request will be sent to HR for final approval.
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
};

