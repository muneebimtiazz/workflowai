import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, Search, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { leaveService, LeaveRequest, authService } from '../../../lib/mockServices';
import { toast } from 'sonner';
import { format } from 'date-fns';

export const ApprovalWorkflows = () => {
  const [allRequests, setAllRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [processing, setProcessing] = useState(false);
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
        // Get all time off requests from manager's team
        const allTeamRequests = await leaveService.getAllLeaveRequests();
        const teamMemberIds = await getTeamMemberIds(user.id);
        const teamRequests = allTeamRequests.filter(req => 
          teamMemberIds.includes(req.employee_id)
        );
        setAllRequests(teamRequests);
      }
    } catch (error: any) {
      console.error('Error fetching time off requests:', error);
      toast.error('Failed to load time off requests');
    } finally {
      setLoading(false);
    }
  }

  async function getTeamMemberIds(managerId: string): Promise<string[]> {
    const { mockUsers } = await import('../../../lib/mockServices');
    return mockUsers
      .filter(u => u.manager_id === managerId)
      .map(u => u.id);
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

  const getFilteredRequests = () => {
    let filtered = allRequests.filter(request => {
      const matchesSearch = 
        request.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.leave_type.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Filter by tab
    switch (selectedTab) {
      case 'pending':
        return filtered.filter(r => r.status === 'pending_manager_approval');
      case 'approved':
        return filtered.filter(r => r.status === 'approved' || r.status === 'pending_hr_approval');
      case 'rejected':
        return filtered.filter(r => r.status === 'rejected');
      default:
        return filtered;
    }
  };

  const filteredRequests = getFilteredRequests();
  const pendingCount = allRequests.filter(r => r.status === 'pending_manager_approval').length;
  const approvedCount = allRequests.filter(r => r.status === 'approved' || r.status === 'pending_hr_approval').length;
  const rejectedCount = allRequests.filter(r => r.status === 'rejected').length;

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
          <p className="text-sm text-muted-foreground">Review and manage time off requests from your team</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting your review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">Approved by you</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <XCircle className="w-4 h-4 text-destructive" />
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">Rejected requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{allRequests.length}</div>
            <p className="text-xs text-muted-foreground">All requests</p>
          </CardContent>
        </Card>
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

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">
            All Requests ({allRequests.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({pendingCount})
            {pendingCount > 0 && <Badge variant="destructive" className="ml-2">!</Badge>}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <RequestList 
            requests={filteredRequests}
            onReview={(req) => {
              setSelectedRequest(req);
              setShowDetailsDialog(true);
            }}
            onApprove={(req) => {
              setSelectedRequest(req);
              setShowApproveDialog(true);
            }}
            onReject={(req) => {
              setSelectedRequest(req);
              setShowRejectDialog(true);
            }}
            getStatusBadge={getStatusBadge}
            getTypeColor={getTypeColor}
          />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <RequestList 
            requests={filteredRequests}
            onReview={(req) => {
              setSelectedRequest(req);
              setShowDetailsDialog(true);
            }}
            onApprove={(req) => {
              setSelectedRequest(req);
              setShowApproveDialog(true);
            }}
            onReject={(req) => {
              setSelectedRequest(req);
              setShowRejectDialog(true);
            }}
            getStatusBadge={getStatusBadge}
            getTypeColor={getTypeColor}
          />
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <RequestList 
            requests={filteredRequests}
            onReview={(req) => {
              setSelectedRequest(req);
              setShowDetailsDialog(true);
            }}
            onApprove={(req) => {
              setSelectedRequest(req);
              setShowApproveDialog(true);
            }}
            onReject={(req) => {
              setSelectedRequest(req);
              setShowRejectDialog(true);
            }}
            getStatusBadge={getStatusBadge}
            getTypeColor={getTypeColor}
          />
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <RequestList 
            requests={filteredRequests}
            onReview={(req) => {
              setSelectedRequest(req);
              setShowDetailsDialog(true);
            }}
            onApprove={(req) => {
              setSelectedRequest(req);
              setShowApproveDialog(true);
            }}
            onReject={(req) => {
              setSelectedRequest(req);
              setShowRejectDialog(true);
            }}
            getStatusBadge={getStatusBadge}
            getTypeColor={getTypeColor}
          />
        </TabsContent>
      </Tabs>

      {/* Request Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Time Off Request Details</DialogTitle>
            <DialogDescription>
              Review the complete details of this time off request
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Employee</Label>
                  <p className="font-medium">{selectedRequest.employee_name}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Leave Type</Label>
                  <Badge className={getTypeColor(selectedRequest.leave_type)}>
                    {selectedRequest.leave_type}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Start Date</Label>
                  <p className="font-medium">
                    {format(new Date(selectedRequest.start_date), 'MMM dd, yyyy')}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">End Date</Label>
                  <p className="font-medium">
                    {format(new Date(selectedRequest.end_date), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Duration</Label>
                <p className="font-medium">{selectedRequest.days_requested} day{selectedRequest.days_requested > 1 ? 's' : ''}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Reason</Label>
                <p className="text-sm mt-1">{selectedRequest.reason}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Submitted</Label>
                  <p className="text-sm">{format(new Date(selectedRequest.submitted_date), 'MMM dd, yyyy')}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                </div>
              </div>
              {selectedRequest.approver_name && (
                <div>
                  <Label className="text-xs text-muted-foreground">Approved By</Label>
                  <p className="text-sm">{selectedRequest.approver_name}</p>
                </div>
              )}
              {selectedRequest.notes && (
                <div>
                  <Label className="text-xs text-muted-foreground">Notes</Label>
                  <p className="text-sm text-foreground mt-1 p-2 bg-muted rounded">{selectedRequest.notes}</p>
                </div>
              )}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDetailsDialog(false);
                    setSelectedRequest(null);
                  }}
                  className="flex-1"
                >
                  Close
                </Button>
                {selectedRequest.status === 'pending_manager_approval' && (
                  <>
                    <Button
                      onClick={() => {
                        setShowDetailsDialog(false);
                        setShowApproveDialog(true);
                      }}
                      className="flex-1"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setShowDetailsDialog(false);
                        setShowRejectDialog(true);
                      }}
                      className="flex-1"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
                  className="flex-1 bg-green-600 hover:bg-green-700"
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

// Request List Component
interface RequestListProps {
  requests: LeaveRequest[];
  onReview: (request: LeaveRequest) => void;
  onApprove: (request: LeaveRequest) => void;
  onReject: (request: LeaveRequest) => void;
  getStatusBadge: (status: string) => React.ReactNode;
  getTypeColor: (type: string) => string;
}

const RequestList: React.FC<RequestListProps> = ({ 
  requests, 
  onReview, 
  onApprove, 
  onReject,
  getStatusBadge,
  getTypeColor
}) => {
  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl font-semibold text-foreground mb-2">No requests found</p>
            <p className="text-sm text-muted-foreground">No time off requests match the current filter</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {requests.map((request) => (
        <Card key={request.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {request.employee_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base font-semibold text-foreground">{request.employee_name}</CardTitle>
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
            <div className="space-y-4">
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
                <p className="text-sm text-foreground mt-1 line-clamp-2">{request.reason}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => onReview(request)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Review
              </Button>
              {request.status === 'pending_manager_approval' && (
                <>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => onApprove(request)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1"
                    onClick={() => onReject(request)}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </>
              )}
              {(request.status === 'approved' || request.status === 'rejected' || request.status === 'pending_hr_approval') && (
                <div className="flex-1 text-xs text-muted-foreground flex items-center justify-center">
                  {request.status === 'pending_hr_approval' 
                    ? 'Approved by you, pending HR review'
                    : request.status === 'approved'
                    ? 'Approved by HR'
                    : 'Rejected'}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
