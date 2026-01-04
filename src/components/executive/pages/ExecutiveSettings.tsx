import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Alert, AlertDescription } from "../../ui/alert"
import { Switch } from "../../ui/switch"
import { 
  Settings, 
  User, 
  Bell,
  Shield,
  Eye,
  Lock,
  Globe,
  Database,
  Mail,
  Phone,
  Key,
  Download,
  Upload,
  RefreshCw,
  Clock,
  Users,
  BarChart3,
  Zap,
  Brain,
  Monitor,
  Palette,
  CheckCircle,
  AlertTriangle,
  Info,
  Save,
  Edit,
  Trash,
  Plus
} from 'lucide-react'

// Settings data
const userProfile = {
  name: 'Sarah Chen',
  role: 'Chief Executive Officer',
  email: 'sarah.chen@company.com',
  phone: '+1 (555) 123-4567',
  department: 'Executive',
  location: 'San Francisco, CA',
  timezone: 'Pacific Standard Time',
  lastLogin: '2024-01-02 14:32 PST',
  accountCreated: '2022-03-15',
  permissions: ['Full System Access', 'Data Export', 'User Management', 'System Configuration']
}

const notificationSettings = [
  { 
    category: 'Critical Alerts', 
    email: true, 
    push: true, 
    sms: true, 
    description: 'System failures, security breaches, compliance violations'
  },
  { 
    category: 'Executive Reports', 
    email: true, 
    push: false, 
    sms: false, 
    description: 'Daily/weekly executive summaries and strategic insights'
  },
  { 
    category: 'HR Analytics', 
    email: true, 
    push: true, 
    sms: false, 
    description: 'Talent analytics, retention alerts, performance insights'
  },
  { 
    category: 'Financial Metrics', 
    email: true, 
    push: false, 
    sms: false, 
    description: 'Budget alerts, ROI reports, cost optimization insights'
  },
  { 
    category: 'System Updates', 
    email: false, 
    push: true, 
    sms: false, 
    description: 'Platform updates, maintenance notifications, feature releases'
  }
]

const securitySettings = [
  { setting: 'Two-Factor Authentication', enabled: true, description: 'Additional security layer for account access' },
  { setting: 'Session Timeout', enabled: true, description: 'Automatic logout after 30 minutes of inactivity' },
  { setting: 'IP Address Restrictions', enabled: false, description: 'Limit access to specific IP addresses' },
  { setting: 'Device Authentication', enabled: true, description: 'Require approval for new device access' },
  { setting: 'Audit Logging', enabled: true, description: 'Track all system access and actions' },
  { setting: 'Data Encryption', enabled: true, description: 'End-to-end encryption for sensitive data' }
]

const systemConfiguration = [
  { 
    system: 'Analytics Engine', 
    status: 'Operational', 
    version: 'v2.3.1', 
    lastUpdate: '2024-01-01',
    uptime: '99.98%',
    configuration: 'Production'
  },
  { 
    system: 'IAMS Core', 
    status: 'Operational', 
    version: 'v1.8.4', 
    lastUpdate: '2023-12-28',
    uptime: '99.94%',
    configuration: 'Production'
  },
  { 
    system: 'Compliance Monitor', 
    status: 'Operational', 
    version: 'v1.5.2', 
    lastUpdate: '2024-01-02',
    uptime: '99.87%',
    configuration: 'Production'
  },
  { 
    system: 'Notification Service', 
    status: 'Operational', 
    version: 'v1.2.8', 
    lastUpdate: '2023-12-30',
    uptime: '99.99%',
    configuration: 'Production'
  }
]

const dashboardSettings = [
  { widget: 'Workforce Overview', visible: true, position: 1, refreshRate: '5 minutes' },
  { widget: 'Productivity Metrics', visible: true, position: 2, refreshRate: '15 minutes' },
  { widget: 'Financial KPIs', visible: true, position: 3, refreshRate: '30 minutes' },
  { widget: 'Alert Center', visible: true, position: 4, refreshRate: 'Real-time' },
  { widget: 'Strategic Objectives', visible: true, position: 5, refreshRate: 'Daily' },
  { widget: 'Culture Analytics', visible: false, position: 6, refreshRate: 'Hourly' }
]

const dataManagement = [
  { 
    category: 'Employee Data', 
    records: '2,847', 
    size: '145 MB', 
    retention: '7 years',
    lastBackup: '2024-01-02 03:00',
    encryption: 'AES-256'
  },
  { 
    category: 'Performance Data', 
    records: '156,789', 
    size: '2.3 GB', 
    retention: '5 years',
    lastBackup: '2024-01-02 03:15',
    encryption: 'AES-256'
  },
  { 
    category: 'Analytics Data', 
    records: '2.1M', 
    size: '850 MB', 
    retention: '3 years',
    lastBackup: '2024-01-02 03:30',
    encryption: 'AES-256'
  },
  { 
    category: 'Compliance Logs', 
    records: '89,456', 
    size: '234 MB', 
    retention: '10 years',
    lastBackup: '2024-01-02 03:45',
    encryption: 'AES-256'
  }
]

const integrationSettings = [
  { service: 'Google Workspace', status: 'Connected', lastSync: '2024-01-02 14:30', dataFlow: 'Bidirectional' },
  { service: 'Slack', status: 'Connected', lastSync: '2024-01-02 14:25', dataFlow: 'Outbound' },
  { service: 'Microsoft Teams', status: 'Disconnected', lastSync: 'Never', dataFlow: 'None' },
  { service: 'Salesforce', status: 'Connected', lastSync: '2024-01-02 14:20', dataFlow: 'Inbound' },
  { service: 'Tableau', status: 'Connected', lastSync: '2024-01-02 14:15', dataFlow: 'Outbound' },
  { service: 'AWS S3', status: 'Connected', lastSync: '2024-01-02 14:35', dataFlow: 'Backup' }
]

export function ExecutiveSettings() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Executive Settings & Configuration</h1>
          <p className="text-gray-600">System administration, security settings, and executive dashboard configuration</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-gray-50 text-gray-700">
            <Settings className="h-3 w-3 mr-1" />
            Admin Access
          </Badge>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-2 grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-900 mb-1">99.95%</div>
            <div className="flex items-center text-xs text-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              All systems operational
            </div>
            <Progress value={99.95} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700">Security Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-900 mb-1">A+</div>
            <div className="flex items-center text-xs text-blue-600">
              <Shield className="h-3 w-3 mr-1" />
              Excellent security
            </div>
            <Progress value={95} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-700">Data Backup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-900 mb-1">100%</div>
            <div className="flex items-center text-xs text-purple-600">
              <Database className="h-3 w-3 mr-1" />
              Last backup: 3h ago
            </div>
            <Progress value={100} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-700">Integration Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-amber-900 mb-1">5/6</div>
            <div className="flex items-center text-xs text-amber-600">
              <Globe className="h-3 w-3 mr-1" />
              Services connected
            </div>
            <Progress value={83} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Configuration Notice */}
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <span className="font-medium">Configuration Status:</span> All critical systems are operational. 
          Security settings are optimized and data backups are current.
          <Button variant="outline" size="sm" className="ml-2 h-6">
            View System Health
          </Button>
        </AlertDescription>
      </Alert>

      {/* Main Settings Dashboard */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profile & Access</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="system">System Config</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Executive Profile & Access Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{userProfile.name}</div>
                        <div className="text-sm text-gray-500">{userProfile.role}</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-3 border rounded-lg">
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-medium">{userProfile.email}</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium">{userProfile.phone}</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="font-medium">{userProfile.location}</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="text-sm text-gray-500">Timezone</div>
                        <div className="font-medium">{userProfile.timezone}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg">Access & Permissions</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-gray-500 mb-2">System Permissions</div>
                      <div className="space-y-1">
                        {userProfile.permissions.map((permission, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>{permission}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-gray-500">Last Login</div>
                      <div className="font-medium">{userProfile.lastLogin}</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="text-sm text-gray-500">Account Created</div>
                      <div className="font-medium">{userProfile.accountCreated}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-gray-600">Profile last updated: January 2, 2024</div>
                <div className="flex space-x-2">
                  <Button variant="outline">Reset Password</Button>
                  <Button>
                    <Save className="h-4 w-4 mr-1" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-green-600" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificationSettings.map((setting, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{setting.category}</CardTitle>
                      <p className="text-xs text-gray-500">{setting.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Email</span>
                          </div>
                          <Switch checked={setting.email} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Bell className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Push</span>
                          </div>
                          <Switch checked={setting.push} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">SMS</span>
                          </div>
                          <Switch checked={setting.sms} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-600" />
                <span>Security Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securitySettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{setting.setting}</div>
                      <div className="text-sm text-gray-500">{setting.description}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={setting.enabled} />
                      <Badge 
                        variant="outline" 
                        className={setting.enabled ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}
                      >
                        {setting.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm text-amber-800 mb-1">Security Recommendations</h4>
                    <ul className="text-xs text-amber-700 space-y-1">
                      <li>• Enable IP address restrictions for enhanced security</li>
                      <li>• Regular security audits are scheduled quarterly</li>
                      <li>• All security settings are monitored 24/7</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-5 w-5 text-purple-600" />
                <span>Dashboard Customization</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardSettings.map((widget, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">{widget.widget}</div>
                        <div className="text-sm text-gray-500">Position: {widget.position} • Refresh: {widget.refreshRate}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={widget.visible} />
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-gray-600">Dashboard layout: Executive View</div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Reset Layout
                  </Button>
                  <Button>Save Layout</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <span>System Configuration & Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg">System Components</h3>
                {systemConfiguration.map((system, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{system.system}</div>
                      <div className="text-sm text-gray-500">Version {system.version} • Updated {system.lastUpdate}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">{system.uptime} Uptime</div>
                        <div className="text-xs text-gray-500">{system.configuration} Mode</div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={system.status === 'Operational' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}
                      >
                        {system.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg">Data Management</h3>
                {dataManagement.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{data.category}</div>
                      <div className="text-sm text-gray-500">{data.records} records • {data.size} • Retention: {data.retention}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">Last Backup: {data.lastBackup}</div>
                        <div className="text-xs text-gray-500">Encryption: {data.encryption}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Backup
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <span>External Integrations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrationSettings.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Globe className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{integration.service}</div>
                        <div className="text-sm text-gray-500">Last sync: {integration.lastSync} • Data flow: {integration.dataFlow}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={integration.status === 'Connected' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}
                      >
                        {integration.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {integration.status === 'Connected' ? 'Configure' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm text-blue-800 mb-1">Integration Health</h4>
                    <p className="text-xs text-blue-700">5 of 6 services connected and syncing properly</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Integration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}