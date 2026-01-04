import { useState } from 'react';
import { CheckCircle, XCircle, Clock, FileText, Calendar, DollarSign, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId?: string;
}

interface ApprovalRequest {
  id: string;
  type: 'timeoff' | 'expense' | 'overtime' | 'training' | 'equipment';
  title: string;
  submittedBy: {
    name: string;
    initials: string;
    role: string;
    avatar: string;
  };
  submittedDate: string;
  urgency: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'rejected';
  details: any;
  attachments?: string[];
  comments?: Array<{
    author: string;
    content: string;
    timestamp: string;
  }>;
}

export const ApprovalModal = ({ isOpen, onClose, requestId }: ApprovalModalProps) => {
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [comments, setComments] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data - in real app this would come from props or API
  const requests: ApprovalRequest[] = [
    {
      id: '1',
      type: 'timeoff',
      title: 'Vacation Request - 5 Days',
      submittedBy: {
        name: 'Sarah Johnson',
        initials: 'SJ',
        role: 'Senior Developer',
        avatar: '/api/placeholder/40/40'
      },
      submittedDate: '2024-02-15',
      urgency: 'medium',
      status: 'pending',
      details: {
        startDate: '2024-03-15',
        endDate: '2024-03-19',
        totalDays: 5,
        reason: 'Family vacation to Europe',
        coverage: 'Emily Rodriguez will handle critical tasks',
        remainingBalance: 12
      }
    },
    {
      id: '2',
      type: 'expense',
      title: 'Conference Attendance - React Summit',
      submittedBy: {
        name: 'Mike Chen',
        initials: 'MC',
        role: 'UI/UX Designer',
        avatar: '/api/placeholder/40/40'
      },
      submittedDate: '2024-02-14',
      urgency: 'high',
      status: 'pending',
      details: {
        amount: 2500,
        category: 'Professional Development',
        description: 'React Summit 2024 - Amsterdam',
        businessJustification: 'Stay updated with latest React trends and networking opportunities',
        receiptAttached: true
      },
      attachments: ['receipt-react-summit.pdf', 'conference-agenda.pdf']
    },
    {
      id: '3',
      type: 'overtime',
      title: 'Overtime Request - Project Deadline',
      submittedBy: {
        name: 'Emily Rodriguez',
        initials: 'ER',
        role: 'Full Stack Developer',
        avatar: '/api/placeholder/40/40'
      },
      submittedDate: '2024-02-13',
      urgency: 'high',
      status: 'pending',
      details: {
        date: '2024-02-20',
        hours: 6,
        reason: 'Critical bug fixes for production release',
        projectImpact: 'Delays product launch if not completed',
        compensation: 'time-off'
      }
    }
  ];

  const currentRequest = requests.find(r => r.id === requestId) || requests[0];

  const handleDecision = async (action: 'approve' | 'reject') => {
    setIsProcessing(true);
    setDecision(action);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Request ${action}d successfully! The team member will be notified.`);
      onClose();
    }, 2000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'timeoff': return <Calendar className="h-5 w-5" />;
      case 'expense': return <DollarSign className="h-5 w-5" />;
      case 'overtime': return <Clock className="h-5 w-5" />;
      case 'training': return <FileText className="h-5 w-5" />;
      case 'equipment': return <FileText className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const renderRequestDetails = () => {
    switch (currentRequest.type) {
      case 'timeoff':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <p className="text-sm font-medium">{new Date(currentRequest.details.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <Label>End Date</Label>
                <p className="text-sm font-medium">{new Date(currentRequest.details.endDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Total Days</Label>
                <p className="text-sm font-medium">{currentRequest.details.totalDays} working days</p>
              </div>
              <div>
                <Label>Remaining Balance</Label>
                <p className="text-sm font-medium">{currentRequest.details.remainingBalance} days</p>
              </div>
            </div>
            <div>
              <Label>Reason</Label>
              <p className="text-sm">{currentRequest.details.reason}</p>
            </div>
            <div>
              <Label>Coverage Plan</Label>
              <p className="text-sm">{currentRequest.details.coverage}</p>
            </div>
          </div>
        );

      case 'expense':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Amount</Label>
                <p className="text-sm font-medium">${currentRequest.details.amount.toLocaleString()}</p>
              </div>
              <div>
                <Label>Category</Label>
                <p className="text-sm font-medium">{currentRequest.details.category}</p>
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <p className="text-sm">{currentRequest.details.description}</p>
            </div>
            <div>
              <Label>Business Justification</Label>
              <p className="text-sm">{currentRequest.details.businessJustification}</p>
            </div>
            {currentRequest.attachments && (
              <div>
                <Label>Attachments</Label>
                <div className="space-y-1">
                  {currentRequest.attachments.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4" />
                      <span>{file}</span>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'overtime':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <p className="text-sm font-medium">{new Date(currentRequest.details.date).toLocaleDateString()}</p>
              </div>
              <div>
                <Label>Hours</Label>
                <p className="text-sm font-medium">{currentRequest.details.hours} hours</p>
              </div>
            </div>
            <div>
              <Label>Reason</Label>
              <p className="text-sm">{currentRequest.details.reason}</p>
            </div>
            <div>
              <Label>Project Impact</Label>
              <p className="text-sm">{currentRequest.details.projectImpact}</p>
            </div>
            <div>
              <Label>Compensation</Label>
              <p className="text-sm font-medium capitalize">{currentRequest.details.compensation.replace('-', ' ')}</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Request details not available</p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getTypeIcon(currentRequest.type)}
            Approval Request
          </DialogTitle>
          <DialogDescription>
            Review and process the approval request below
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Request Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={currentRequest.submittedBy.avatar} alt={currentRequest.submittedBy.name} />
                    <AvatarFallback>{currentRequest.submittedBy.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{currentRequest.title}</CardTitle>
                    <CardDescription>
                      Submitted by {currentRequest.submittedBy.name} • {currentRequest.submittedBy.role}
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mt-1">
                      Submitted on {new Date(currentRequest.submittedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getUrgencyColor(currentRequest.urgency)}>
                    {currentRequest.urgency} priority
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {currentRequest.type.replace('timeoff', 'time off')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Request Details</TabsTrigger>
              <TabsTrigger value="impact">Team Impact</TabsTrigger>
              <TabsTrigger value="history">Request History</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Request Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderRequestDetails()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Team Impact Analysis</CardTitle>
                  <CardDescription>Potential effects on team and projects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentRequest.type === 'timeoff' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">Workload Impact</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        Sarah's absence will require redistribution of Authentication Module tasks. 
                        Emily Rodriguez has agreed to handle critical components.
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Coverage Arranged</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        Full coverage plan in place with Emily Rodriguez for critical tasks.
                      </p>
                    </div>
                  )}

                  {currentRequest.type === 'expense' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Budget Impact</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        $2,500 expense against Training budget (75% remaining).
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Team Benefit</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        Knowledge sharing session planned post-conference for team skill development.
                      </p>
                    </div>
                  )}

                  {currentRequest.type === 'overtime' && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Critical Timeline</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        Production release scheduled for Feb 21. Bugs must be fixed to avoid delays.
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Resource Planning</span>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        Emily will use compensatory time off next week instead of monetary compensation.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Request History</CardTitle>
                  <CardDescription>Timeline of actions and comments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Request submitted</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(currentRequest.submittedDate).toLocaleDateString()} by {currentRequest.submittedBy.name}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">Pending manager approval</p>
                        <p className="text-xs text-muted-foreground">
                          Current status - awaiting your decision
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Decision Section */}
          <Card>
            <CardHeader>
              <CardTitle>Manager Decision</CardTitle>
              <CardDescription>Add comments and approve or reject this request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="comments">Comments (optional)</Label>
                <Textarea
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Add any comments about your decision..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                  onClick={() => handleDecision('approve')}
                  disabled={isProcessing}
                >
                  {isProcessing && decision === 'approve' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Request
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                  onClick={() => handleDecision('reject')}
                  disabled={isProcessing}
                >
                  {isProcessing && decision === 'reject' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Request
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Decision will be recorded and the team member will be notified immediately
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};