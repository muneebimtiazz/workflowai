import { Badge } from './badge';
import { useUserStatus, SystemControlledStatus } from '../../contexts/UserStatusContext';
import type { HTMLAttributes } from 'react';

const systemStatusConfig: Record<SystemControlledStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string }> = {
  active: { 
    label: 'Active', 
    variant: 'default',
    className: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-100' 
  },
  remote: { 
    label: 'Remote', 
    variant: 'secondary',
    className: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100' 
  },
  on_leave: { 
    label: 'On Leave', 
    variant: 'outline',
    className: 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100' 
  },
  inactive: { 
    label: 'Inactive', 
    variant: 'secondary',
    className: 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-100' 
  },
};

export function SystemStatusBadge() {
  // Use the hook - it will throw if not in provider, which is expected behavior
  // The provider should wrap all components that use this
  const { systemStatus } = useUserStatus();
  const config = systemStatusConfig[systemStatus];

  return (
    <Badge 
      variant={config.variant} 
      {...({ className: `${config.className} text-xs font-medium cursor-default` } as HTMLAttributes<HTMLSpanElement>)}
    >
      {config.label}
    </Badge>
  );
}