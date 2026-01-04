import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, timeService, leaveService, type LeaveRequest } from '../lib/mockServices';

export type UserControlledStatus = 'available' | 'busy' | 'away';
export type SystemControlledStatus = 'active' | 'remote' | 'on_leave' | 'inactive';

interface UserStatusContextType {
  userStatus: UserControlledStatus;
  systemStatus: SystemControlledStatus;
  setUserStatus: (status: UserControlledStatus) => void;
  refreshSystemStatus: () => Promise<void>;
}

const UserStatusContext = createContext<UserStatusContextType | undefined>(undefined);

const STORAGE_KEY = 'user_presence_status';

export function UserStatusProvider({ children }: { children: ReactNode }) {
  const [userStatus, setUserStatusState] = useState<UserControlledStatus>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && ['available', 'busy', 'away'].includes(saved)) {
          return saved as UserControlledStatus;
        }
      } catch (error) {
        console.warn('Failed to read from localStorage:', error);
      }
    }
    return 'available';
  });

  const [systemStatus, setSystemStatus] = useState<SystemControlledStatus>('inactive');

  const setUserStatus = (status: UserControlledStatus) => {
    setUserStatusState(status);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, status);
      } catch (error) {
        console.warn('Failed to save to localStorage:', error);
      }
    }
  };

  const refreshSystemStatus = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        setSystemStatus('inactive');
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      const todayEntries = await timeService.getTimeEntries(user.id, today, today);
      const isClockedIn = todayEntries.some(entry => 
        entry.status === 'clocked_in' && !entry.clock_out
      );

      const leaveRequests = await leaveService.getLeaveRequests(user.id);
      const hasApprovedLeaveToday = leaveRequests.some((req: LeaveRequest) => {
        if (req.status !== 'approved') return false;
        const startDate = new Date(req.start_date).toISOString().split('T')[0];
        const endDate = new Date(req.end_date).toISOString().split('T')[0];
        return today >= startDate && today <= endDate;
      });

      const isRemote = user.location?.toLowerCase().includes('remote') || 
                      (user as any).work_location === 'remote';

      if (hasApprovedLeaveToday) {
        setSystemStatus('on_leave');
      } else if (isRemote) {
        setSystemStatus('remote');
      } else if (isClockedIn) {
        setSystemStatus('active');
      } else {
        setSystemStatus('inactive');
      }
    } catch (error) {
      console.error('Error refreshing system status:', error);
      setSystemStatus('inactive');
    }
  };

  useEffect(() => {
    refreshSystemStatus();
    const interval = setInterval(refreshSystemStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <UserStatusContext.Provider
      value={{
        userStatus,
        systemStatus,
        setUserStatus,
        refreshSystemStatus,
      }}
    >
      {children}
    </UserStatusContext.Provider>
  );
}

export function useUserStatus() {
  const context = useContext(UserStatusContext);
  if (context === undefined) {
    throw new Error('useUserStatus must be used within a UserStatusProvider');
  }
  return context;
}