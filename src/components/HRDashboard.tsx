import { useState } from 'react'
import { UnifiedSidebar } from './shared/UnifiedSidebar'
import { UnifiedHeader } from './shared/UnifiedHeader'
import { HRDashboardContent } from './hr/HRDashboardContent'
import { UnifiedSettings } from './Settings.unified'
import { EmailTemplates } from './hr/pages/EmailTemplates.integrated'
import { WeeklyAttendanceReportsIntegrated } from './hr/pages/WeeklyAttendanceReports.integrated'
import { MyProfile } from './MyProfile'
import { HiringDashboardIntegrated } from './hr/pages/HiringDashboard.integrated'
import { JobOpeningsIntegrated } from './hr/pages/JobOpenings.integrated'
import { ApplyingCandidatesIntegrated } from './hr/pages/ApplyingCandidates.integrated'
import { InterviewsIntegrated } from './hr/pages/Interviews.integrated'
import { InterviewTeamsIntegrated } from './hr/pages/InterviewTeams.integrated'
import { EmployeeLifecycleIntegrated } from './hr/pages/EmployeeLifecycle.integrated'
import { OnboardingWorkflowsIntegrated } from './hr/pages/OnboardingWorkflows.integrated'
import { OffboardingManagementIntegrated } from './hr/pages/OffboardingManagement.integrated'
import { PolicyComplianceIntegrated } from './hr/pages/PolicyCompliance.integrated'
import { WorkforceAnalyticsIntegrated } from './hr/pages/WorkforceAnalytics.integrated'
import { TimeOffApprovalsIntegrated } from './hr/pages/TimeOffApprovals.integrated'

export function HRDashboard({ onLogout }: { onLogout: () => void }) {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <HRDashboardContent onNavigate={setActivePage} />
      case 'hiring-dashboard':
        return <HiringDashboardIntegrated onNavigate={setActivePage} />
      case 'job-openings':
        return <JobOpeningsIntegrated />
      case 'applying-candidates':
        return <ApplyingCandidatesIntegrated />
      case 'interviews':
        return <InterviewsIntegrated />
      case 'interview-teams':
        return <InterviewTeamsIntegrated />
      case 'employee-lifecycle':
        return <EmployeeLifecycleIntegrated />
      case 'onboarding':
        return <OnboardingWorkflowsIntegrated />
      case 'offboarding':
        return <OffboardingManagementIntegrated />
      case 'policy-compliance':
        return <PolicyComplianceIntegrated />
      case 'workforce-analytics':
        return <WorkforceAnalyticsIntegrated />
      case 'weekly-attendance':
        return <WeeklyAttendanceReportsIntegrated />
      case 'email-templates':
        return <EmailTemplates />
      case 'time-off-approvals':
        return <TimeOffApprovalsIntegrated />
      case 'settings':
        return <UnifiedSettings />
      case 'my-profile':
        return <MyProfile />
      default:
        return <HRDashboardContent onNavigate={setActivePage} />
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