import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { 
  Crown,
  TrendingUp,
  BarChart3,
  Monitor,
  Brain,
  Shield,
  Users,
  Target,
  Zap,
  Heart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity
} from 'lucide-react'
import type { ExecutivePage } from '../ExecutiveDashboard'

interface ExecutiveSidebarProps {
  currentPage: ExecutivePage
  onPageChange: (page: ExecutivePage) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

const sidebarItems = [
  {
    id: 'overview' as ExecutivePage,
    label: 'Executive Overview',
    icon: Crown,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Strategic dashboard'
  },
  {
    id: 'strategic-analytics' as ExecutivePage,
    label: 'Strategic Analytics',
    icon: TrendingUp,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Workforce insights'
  },
  {
    id: 'performance-insights' as ExecutivePage,
    label: 'Performance Insights',
    icon: BarChart3,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Performance analytics'
  },
  {
    id: 'iams-overview' as ExecutivePage,
    label: 'IAMS Overview',
    icon: Monitor,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    description: 'Activity monitoring'
  },
  {
    id: 'workforce-intelligence' as ExecutivePage,
    label: 'Workforce Intelligence',
    icon: Brain,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    description: 'AI-powered insights'
  },
  {
    id: 'real-time-monitoring' as ExecutivePage,
    label: 'Real-Time Monitoring',
    icon: Activity,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Live tracking'
  },
  {
    id: 'compliance-center' as ExecutivePage,
    label: 'Compliance Center',
    icon: Shield,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Privacy & ethics'
  },
  {
    id: 'executive-reports' as ExecutivePage,
    label: 'Executive Reports',
    icon: BarChart3,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    description: 'Strategic reports'
  },
  {
    id: 'strategic-planning' as ExecutivePage,
    label: 'Strategic Planning',
    icon: Target,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    description: 'Scenario modeling'
  },
  {
    id: 'talent-analytics' as ExecutivePage,
    label: 'Talent Analytics',
    icon: Users,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    description: 'Retention insights'
  },
  {
    id: 'productivity-optimization' as ExecutivePage,
    label: 'Productivity Optimization',
    icon: Zap,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    description: 'ROI analysis'
  },
  {
    id: 'culture-analytics' as ExecutivePage,
    label: 'Culture Analytics',
    icon: Heart,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    description: 'Culture insights'
  },
  {
    id: 'executive-settings' as ExecutivePage,
    label: 'Executive Settings',
    icon: Settings,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    description: 'System configuration'
  }
]

export function ExecutiveSidebar({ 
  currentPage, 
  onPageChange, 
  collapsed, 
  onToggleCollapse 
}: ExecutiveSidebarProps) {
  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-80'
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Crown className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg text-gray-900">Executive Portal</h2>
                <p className="text-xs text-gray-500">Strategic Intelligence Hub</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>


        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start h-auto p-3 ${
                  isActive 
                    ? `${item.bgColor} ${item.color} shadow-sm` 
                    : 'text-gray-700 hover:bg-gray-50'
                } ${collapsed ? 'px-2' : ''}`}
                onClick={() => onPageChange(item.id)}
              >
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} w-full`}>
                  <Icon className={`h-5 w-5 ${isActive ? item.color : 'text-gray-500'} flex-shrink-0`} />
                  {!collapsed && (
                    <div className="flex-1 text-left">
                      <div className="text-sm">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  )}
                </div>
              </Button>
            )
          })}
        </nav>

      </div>
    </div>
  )
}