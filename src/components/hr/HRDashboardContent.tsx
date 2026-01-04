import { motion } from 'motion/react'
import { KeyMetricsCard } from './sections/KeyMetricsCard'
import { HiringOverviewCard } from './sections/HiringOverviewCard'
import { PendingApprovalsCard } from './sections/PendingApprovalsCard'
import { EmployeeLifecycleCard } from './sections/EmployeeLifecycleCard'
import { WorkforceSummaryCard } from './sections/WorkforceSummaryCard'
import { AttendanceComplianceCard } from './sections/AttendanceComplianceCard'

interface HRDashboardContentProps {
  onNavigate?: (page: string) => void
}

export function HRDashboardContent({ onNavigate }: HRDashboardContentProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Key Metrics Row */}
      <KeyMetricsCard onNavigate={onNavigate} />

      {/* Informative Cards Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        <HiringOverviewCard onNavigate={onNavigate} />
        <PendingApprovalsCard onNavigate={onNavigate} />
      </div>

      {/* Informative Cards Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        <EmployeeLifecycleCard onNavigate={onNavigate} />
        <WorkforceSummaryCard onNavigate={onNavigate} />
      </div>

      {/* Summary Card */}
      <AttendanceComplianceCard />
    </motion.div>
  )
}
