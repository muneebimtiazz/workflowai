import { motion } from 'motion/react'
import { TeamOverviewCard } from './sections/TeamOverviewCard'
import { PendingApprovalsCard } from './sections/PendingApprovalsCard'
import { TeamPerformanceCard } from './sections/TeamPerformanceCard'
import { TaskOverviewCard } from './sections/TaskOverviewCard'

interface ManagerDashboardContentProps {
  onNavigate?: (page: string) => void
}

export function ManagerDashboardContent({ onNavigate }: ManagerDashboardContentProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Top Row */}
      <div className="grid grid-cols-2 gap-6">
        <TeamOverviewCard onNavigate={onNavigate} />
        <PendingApprovalsCard onNavigate={onNavigate} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-6">
        <TeamPerformanceCard onNavigate={onNavigate} />
        <TaskOverviewCard onNavigate={onNavigate} />
      </div>
    </motion.div>
  )
}

