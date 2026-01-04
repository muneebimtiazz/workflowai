import { motion } from 'motion/react'
import { TimeOffCard } from './sections/TimeOffCard'
import { PendingTasksCard } from './sections/PendingTasksCard'
import { AnnouncementsCard } from './sections/AnnouncementsCard'
import { TodayTasksCard } from './sections/TodayTasksCard'
import { RecognitionCard } from './sections/RecognitionCard'
import { TaskSummaryCard } from './sections/TaskSummaryCard'
import { TaskProgressCard } from './sections/TaskProgressCard'

interface EmployeeDashboardContentProps {
  completedTasks: Record<string, boolean>
  onTaskToggle: (taskId: string) => void
  onNavigate?: (page: string) => void
}

export function EmployeeDashboardContent({ completedTasks, onTaskToggle, onNavigate }: EmployeeDashboardContentProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Top Row */}
      <div className="grid grid-cols-2 gap-6">
        <TimeOffCard onNavigate={onNavigate} />
        <TaskProgressCard />
      </div>

      {/* Enhanced Features Row */}
      <div className="grid grid-cols-2 gap-6">
        <TaskSummaryCard />
        <TodayTasksCard onNavigate={onNavigate} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <PendingTasksCard 
            completedTasks={completedTasks}
            onTaskToggle={onTaskToggle}
          />
        </div>
        <div className="space-y-6">
          <AnnouncementsCard />
          <RecognitionCard onNavigate={onNavigate} />
        </div>
      </div>
    </motion.div>
  )
}

