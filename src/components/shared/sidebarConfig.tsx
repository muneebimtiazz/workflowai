import {
  Users,
  FileText,
  Shield,
  TrendingUp,
  UserPlus,
  UserMinus,
  Settings,
  Home,
  Mail,
  Briefcase,
  Calendar,
  Clock4,
  Clock,
  CheckSquare,
  CalendarDays,
  Award,
  HelpCircle,
  Star,
  Target,
  FileCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  subItems?: SidebarMenuItem[];
}

export type UserRole = 'employee' | 'manager' | 'hr';

export const sidebarMenuConfig: Record<UserRole, SidebarMenuItem[]> = {
  hr: [
    { id: 'dashboard', label: 'HR Dashboard', icon: Home },
    {
      id: 'hiring',
      label: 'Hiring',
      icon: Briefcase,
      subItems: [
        { id: 'hiring-dashboard', label: 'Hiring Dashboard', icon: Home },
        { id: 'job-openings', label: 'Job Openings', icon: Briefcase },
        { id: 'applying-candidates', label: 'Applying Candidates', icon: Users },
        { id: 'interviews', label: 'Interviews', icon: Calendar },
        { id: 'interview-teams', label: 'Interview Teams', icon: Users },
      ],
    },
    {
      id: 'employee-lifecycle',
      label: 'Employee Lifecycle',
      icon: Users,
      subItems: [
        { id: 'employee-lifecycle', label: 'Overview', icon: Users },
        { id: 'onboarding', label: 'Onboarding Workflows', icon: UserPlus },
        { id: 'offboarding', label: 'Offboarding Management', icon: UserMinus },
      ],
    },
    { id: 'time-off-approvals', label: 'Time Off Approvals', icon: Calendar },
    { id: 'policy-compliance', label: 'Policy & Compliance', icon: Shield },
    { id: 'workforce-analytics', label: 'Workforce Analytics', icon: TrendingUp },
    { id: 'weekly-attendance', label: 'Weekly Attendance Reports', icon: Clock4 },
    { id: 'email-templates', label: 'Email Templates', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ],
  manager: [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'my-team', label: 'My Team', icon: Users },
    { id: 'time-attendance', label: 'Time & Attendance', icon: Clock },
    { id: 'time-off', label: 'Time Off Requests', icon: Calendar },
    { id: 'performance', label: 'Performance', icon: Star },
    { id: 'task-assignment', label: 'Task Assignment', icon: Target },
    { id: 'approvals', label: 'Approvals', icon: FileCheck},
    { id: 'activity-oversight', label: 'Activity Oversight', icon: Clock4 },
    { id: 'policies', label: 'Policies', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ],
  employee: [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'team', label: 'My Team', icon: Users },
    { id: 'attendance', label: 'Time & Attendance', icon: Clock },
    { id: 'time-off', label: 'Time Off Requests', icon: Calendar },
    { id: 'my-tasks', label: 'My Tasks', icon: CheckSquare },
    { id: 'today-tasks', label: "Today's Tasks", icon: CalendarDays },
    { id: 'policies', label: 'Policies', icon: FileText },
    { id: 'recognition', label: 'Recognition', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ],
};

export const getRoleFromPath = (pathname: string): UserRole | null => {
  if (pathname.startsWith('/hr')) return 'hr';
  if (pathname.startsWith('/manager')) return 'manager';
  if (pathname.startsWith('/employee')) return 'employee';
  return null;
};

export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case 'hr':
      return 'HR Portal';
    case 'manager':
      return 'Manager Portal';
    case 'employee':
      return 'Employee Portal';
  }
};