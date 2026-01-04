import { FileCheck, Clock, DollarSign, Calendar} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

interface PendingApproval {
  id: string;
  type: 'timeoff' | 'expense' | 'overtime' | 'training';
  employee: {
    name: string;
    initials: string;
    avatar: string;
  };
  amount?: string;
  days?: number;
  description: string;
  submittedDate: string;
  priority: 'high' | 'medium' | 'low';
}

interface PendingApprovalsCardProps {
  onNavigate?: (page: string) => void;
}

export const PendingApprovalsCard: React.FC<PendingApprovalsCardProps> = ({ onNavigate }) => {
  const pendingApprovals: PendingApproval[] = [
    {
      id: '1',
      type: 'timeoff',
      employee: { name: 'Sarah Johnson', initials: 'SJ', avatar: '/api/placeholder/32/32' },
      days: 3,
      description: 'Family vacation',
      submittedDate: '2 hours ago',
      priority: 'medium'
    },
    {
      id: '2',
      type: 'expense',
      employee: { name: 'Mike Chen', initials: 'MC', avatar: '/api/placeholder/32/32' },
      amount: '$289.50',
      description: 'Client dinner expenses',
      submittedDate: '4 hours ago',
      priority: 'high'
    },
    {
      id: '3',
      type: 'overtime',
      employee: { name: 'Emily Rodriguez', initials: 'ER', avatar: '/api/placeholder/32/32' },
      description: 'Weekend project work - 8 hours',
      submittedDate: '1 day ago',
      priority: 'medium'
    },
    {
      id: '4',
      type: 'training',
      employee: { name: 'James Wilson', initials: 'JW', avatar: '/api/placeholder/32/32' },
      amount: '$1,200',
      description: 'Advanced Analytics Course',
      submittedDate: '2 days ago',
      priority: 'low'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'timeoff': return Calendar;
      case 'expense': return DollarSign;
      case 'overtime': return Clock;
      case 'training': return FileCheck;
      default: return FileCheck;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'timeoff': return 'Time Off';
      case 'expense': return 'Expense';
      case 'overtime': return 'Overtime';
      case 'training': return 'Training';
      default: return type;
    }
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between gap-0">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileCheck className="h-5 w-5 shrink-0" />
              <span className="truncate">Pending Approvals</span>
            </CardTitle>
            <CardDescription className="text-sm">
              {pendingApprovals.length} requests awaiting your approval
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs shrink-0">
            {pendingApprovals.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {pendingApprovals.slice(0, 3).map((approval) => {
            const TypeIcon = getTypeIcon(approval.type);
            return (
              <div key={approval.id} className="flex flex-row items-center justify-between gap-0 p-3 rounded-lg border border-border hover:bg-muted/50">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-full bg-muted shrink-0">
                    <TypeIcon className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <Avatar className="h-6 w-6 shrink-0">
                      <AvatarImage src={approval.employee.avatar} alt={approval.employee.name} />
                      <AvatarFallback className="text-xs">{approval.employee.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{approval.employee.name}</p>
                      <p className="text-xs text-muted-foreground">{getTypeLabel(approval.type)}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  {approval.amount && (
                    <p className="font-semibold text-sm">{approval.amount}</p>
                  )}
                  {approval.days && (
                    <p className="font-semibold text-sm">{approval.days} days</p>
                  )}
                  <p className="text-xs text-muted-foreground">{approval.submittedDate}</p>
                </div>
              </div>
            );
          })}
        </div>

        {pendingApprovals.length > 3 && (
          <div className="text-center text-sm text-muted-foreground">
            +{pendingApprovals.length - 3} more pending approvals
          </div>
        )}
        
        <div className="pt-2 border-t space-y-2">
          <Button 
            className="w-full text-base"
            onClick={() => onNavigate?.('approvals')}
          >
            Review All Approvals
          </Button>
          <Button 
            variant="outline" 
            className="w-full text-base"
            onClick={() => onNavigate?.('approvals')}
          >
            Quick Approve Time Off
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};