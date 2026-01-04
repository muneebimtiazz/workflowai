import { Check, Circle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import { useUserStatus, UserControlledStatus } from '../../contexts/UserStatusContext';

const statusConfig: Record<UserControlledStatus, { label: string; color: string; dotColor: string }> = {
  available: { label: 'Available', color: 'text-green-600', dotColor: 'bg-green-500' },
  busy: { label: 'Busy', color: 'text-orange-600', dotColor: 'bg-orange-500' },
  away: { label: 'Away', color: 'text-gray-600', dotColor: 'bg-gray-500' },
};

export function StatusSelector() {
  const { userStatus, setUserStatus } = useUserStatus();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 h-auto py-1.5 px-2">
          <div className={`w-2 h-2 rounded-full ${statusConfig[userStatus].dotColor}`} />
          <span className="text-xs text-muted-foreground">{statusConfig[userStatus].label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        {(Object.keys(statusConfig) as UserControlledStatus[]).map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => setUserStatus(status)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className={`w-2 h-2 rounded-full ${statusConfig[status].dotColor}`} />
            <span className="flex-1">{statusConfig[status].label}</span>
            {userStatus === status && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

