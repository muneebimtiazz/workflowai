import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { UnifiedSidebar } from './shared/UnifiedSidebar'
import { UnifiedHeader } from './shared/UnifiedHeader'
import { EmployeeDashboardContent } from './employee/EmployeeDashboardContent'
import { UnifiedSettings } from './Settings.unified'
import { HelpSupport } from './employee/pages/HelpSupport'
import { TimeOffRequests } from './employee/pages/TimeOffRequests'
import { MyTasks } from './employee/pages/MyTasks'
import { TodayTasks } from './employee/pages/TodayTasks'
import { RecognitionHub } from './employee/pages/RecognitionHub'
import { Policies } from './shared/pages/Policies'
import { MyProfile } from './MyProfile'
import { TimeAttendance } from './employee/pages/TimeAttendance'
import { MyTeam } from './employee/pages/MyTeam'

export function EmployeeDashboard({ onLogout }: { onLogout: () => void }) {
  const [activePage, setActivePage] = useState('dashboard')
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({})

  const handleTaskToggle = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }))
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <EmployeeDashboardContent completedTasks={completedTasks} onTaskToggle={handleTaskToggle} onNavigate={setActivePage} />
      case 'settings':
        return <UnifiedSettings />
      case 'help':
        return <HelpSupport />
      case 'time-off':
        return <TimeOffRequests />
      case 'my-tasks':
        return <MyTasks />
      case 'today-tasks':
        return <TodayTasks />
      case 'policies':
        return <Policies />
      case 'recognition':
        return <RecognitionHub />
      case 'team':
        return <MyTeam />
      case 'attendance':
        return <TimeAttendance />
      case 'my-profile':
        return <MyProfile />
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Page Not Found</CardTitle>
              <CardDescription>The page "{activePage}" is under development.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Please select another option from the menu.</p>
            </CardContent>
          </Card>
        )
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