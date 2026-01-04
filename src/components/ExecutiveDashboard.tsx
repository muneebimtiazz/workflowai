import { useState } from 'react'
import { UnifiedSidebar } from './shared/UnifiedSidebar'
import { UnifiedHeader } from './shared/UnifiedHeader'
import { ExecutiveDashboardContent } from './executive/ExecutiveDashboardContent'
import { StrategicAnalytics } from './executive/pages/StrategicAnalytics'
import { WorkforceIntelligence } from './executive/pages/WorkforceIntelligence'
import { TalentAnalytics } from './executive/pages/TalentAnalytics'
import { PerformanceInsights } from './executive/pages/PerformanceInsights'
import { StrategicPlanning } from './executive/pages/StrategicPlanning'
import { ProductivityOptimization } from './executive/pages/ProductivityOptimization'
import { RealTimeMonitoring } from './executive/pages/RealTimeMonitoring'
import { CultureAnalytics } from './executive/pages/CultureAnalytics'
import { IAMSOverview } from './executive/pages/IAMSOverview'
import { ComplianceCenter } from './executive/pages/ComplianceCenter'
import { ExecutiveReports } from './executive/pages/ExecutiveReports'
import { ExecutiveSettings } from './executive/pages/ExecutiveSettings'

export function ExecutiveDashboard({ onLogout }: { onLogout?: () => void }) {
  const [activePage, setActivePage] = useState('overview')

  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <ExecutiveDashboardContent />
      case 'strategic-analytics':
        return <StrategicAnalytics />
      case 'workforce-intelligence':
        return <WorkforceIntelligence />
      case 'talent-analytics':
        return <TalentAnalytics />
      case 'performance-insights':
        return <PerformanceInsights />
      case 'strategic-planning':
        return <StrategicPlanning />
      case 'productivity-optimization':
        return <ProductivityOptimization />
      case 'real-time-monitoring':
        return <RealTimeMonitoring />
      case 'culture-analytics':
        return <CultureAnalytics />
      case 'iams-overview':
        return <IAMSOverview />
      case 'compliance-center':
        return <ComplianceCenter />
      case 'executive-reports':
        return <ExecutiveReports />
      case 'executive-settings':
        return <ExecutiveSettings />
      default:
        return <ExecutiveDashboardContent />
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