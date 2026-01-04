import { Users, UserCheck} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

interface TeamOverviewCardProps {
  onNavigate?: (page: string) => void;
}

export const TeamOverviewCard: React.FC<TeamOverviewCardProps> = ({ onNavigate }) => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Senior Developer',
      status: 'online',
      avatar: '/api/placeholder/32/32',
      initials: 'SJ'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'UI/UX Designer',
      status: 'away',
      avatar: '/api/placeholder/32/32',
      initials: 'MC'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Marketing Specialist',
      status: 'online',
      avatar: '/api/placeholder/32/32',
      initials: 'ER'
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Data Analyst',
      status: 'offline',
      avatar: '/api/placeholder/32/32',
      initials: 'JW'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const onlineCount = teamMembers.filter(member => member.status === 'online').length;
  const totalMembers = teamMembers.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 ">
              <Users className="shrink-0" />
              <span className="truncate">Team Overview</span>
            </CardTitle>
            <CardDescription >
              {onlineCount} of {totalMembers} members online
            </CardDescription>
          </div>
          <div className="flex gap-2 shrink-0">
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              <UserCheck className="h-3 w-3" />
              {onlineCount} Online
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Users className="h-3 w-3" />
              {totalMembers} Total
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-muted/50">
              <div className="flex items-center flex-1 min-w-0">
                <div className="relative shrink-0">
                  <Avatar >
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
                </div>
                <div className="min-w-0">
                  <p className="font-medium  truncate">{member.name}</p>
                  <p className=" text-muted-foreground truncate">{member.role}</p>
                </div>
              </div>
              <Badge variant={member.status === 'online' ? 'default' : 'secondary'} className="text-xs shrink-0">
                {member.status}
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="pt-2 border-t">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onNavigate?.('my-team')}
          >
            View Full Team Directory
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};