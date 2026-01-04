import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import NotificationBell from '../NotificationBell'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu"
import { Badge } from "../ui/badge"
import { 
  LogOut, 
  Settings, 
  User, 
  Crown,
  TrendingUp,
  Shield,
  Monitor,
  Users,
  BarChart3,
  Brain
} from 'lucide-react'
import type { ExecutivePage } from '../ExecutiveDashboard'

interface ExecutiveHeaderProps {
  onLogout?: () => void
  currentPage: ExecutivePage
}

const pageConfig = {
  'overview': {
    title: 'Executive Overview',
    subtitle: 'Strategic workforce intelligence and organizational insights',
    icon: Crown
  },
  'strategic-analytics': {
    title: 'Strategic Analytics',
    subtitle: 'High-level workforce metrics with predictive insights',
    icon: TrendingUp
  },
  'performance-insights': {
    title: 'Performance Insights',
    subtitle: 'Organization-wide performance trends and optimization',
    icon: BarChart3
  },
  'iams-overview': {
    title: 'IAMS Overview',
    subtitle: 'Intelligent Activity Monitoring System dashboard',
    icon: Monitor
  },
  'workforce-intelligence': {
    title: 'Workforce Intelligence',
    subtitle: 'AI-powered workforce analytics and predictions',
    icon: Brain
  },
  'real-time-monitoring': {
    title: 'Real-Time Monitoring',
    subtitle: 'Live activity tracking and compliance monitoring',
    icon: Monitor
  },
  'compliance-center': {
    title: 'Compliance Center',
    subtitle: 'Privacy, ethics, and regulatory compliance management',
    icon: Shield
  },
  'executive-reports': {
    title: 'Executive Reports',
    subtitle: 'Strategic reports and automated trend analysis',
    icon: BarChart3
  },
  'strategic-planning': {
    title: 'Strategic Planning',
    subtitle: 'Scenario modeling and strategic planning tools',
    icon: TrendingUp
  },
  'talent-analytics': {
    title: 'Talent Analytics',
    subtitle: 'Talent retention predictions and intervention strategies',
    icon: Users
  },
  'productivity-optimization': {
    title: 'Productivity Optimization',
    subtitle: 'ROI analysis and productivity improvement recommendations',
    icon: TrendingUp
  },
  'culture-analytics': {
    title: 'Culture Analytics',
    subtitle: 'Work culture analysis through activity patterns',
    icon: Users
  },
  'executive-settings': {
    title: 'Executive Settings',
    subtitle: 'System configuration and privacy preferences',
    icon: Settings
  }
}

export function ExecutiveHeader({ onLogout, currentPage }: ExecutiveHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-xl text-gray-900">Executive</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">

          <NotificationBell />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/executive.png" alt="Executive" />
                  <AvatarFallback className="bg-purple-600 text-white">
                    <Crown className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none">Jane CEO</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    jane.ceo@company.com
                  </p>
                  <Badge variant="secondary" className="w-fit mt-1">
                    <Crown className="h-3 w-3 mr-1" />
                    Executive
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Executive Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                <span>Privacy Controls</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}