import { useState } from 'react'
import { UnifiedSidebar } from './shared/UnifiedSidebar'
import { UnifiedHeader } from './shared/UnifiedHeader'
import { ManagerDashboardContent } from './manager/ManagerDashboardContent'
import { ApprovalWorkflows } from './manager/pages/ApprovalWorkflows'
import { UnifiedSettings } from './Settings.unified'
import { PerformanceManagement } from './manager/pages/PerformanceManagement'
import { TaskAssignment } from './manager/pages/TaskAssignment'
import { TeamActivityOversight } from './manager/pages/TeamActivityOversight'
import { Policies } from './shared/pages/Policies'
import { TimeOffRequests } from './manager/pages/TimeOffRequests'
import { MyProfile } from './MyProfile'
import { TimeAttendance } from './manager/pages/TimeAttendance'
import { MyTeam } from './manager/pages/MyTeam'

export function ManagerDashboard({ onLogout }: { onLogout?: () => void }) {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <ManagerDashboardContent onNavigate={setActivePage} />
      case 'performance':
        return <PerformanceManagement />
      case 'task-assignment':
        return <TaskAssignment />
      case 'approvals':
        return <ApprovalWorkflows />
      case 'activity-oversight':
        return <TeamActivityOversight />
      case 'settings':
        return <UnifiedSettings />
      case 'time-off':
        return <TimeOffRequests />
      case 'policies':
        return <Policies />
      case 'my-team':
        return <MyTeam />
      case 'time-attendance':
        return <TimeAttendance />
      case 'my-profile':
        return <MyProfile />
      default:
        return <ManagerDashboardContent onNavigate={setActivePage} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <UnifiedSidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <UnifiedHeader onPageChange={setActivePage} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}