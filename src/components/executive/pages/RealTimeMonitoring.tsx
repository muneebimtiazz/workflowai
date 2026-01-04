import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Alert, AlertDescription } from "../../ui/alert"
import { 
  Activity, 
  Monitor, 
  Eye,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  Zap,
  Shield,
  Bell,
  TrendingUp,
  TrendingDown,
  Globe,
  Wifi,
  Server,
  Database,
  Settings,
  BarChart3,
  Calendar,
  MapPin,
  Coffee,
  Laptop
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Real-time monitoring data
const liveMetrics = [
  { time: '09:00', activeUsers: 2784, productivity: 82, alertsCount: 3, systemHealth: 99.8 },
  { time: '09:15', activeUsers: 2834, productivity: 85, alertsCount: 2, systemHealth: 99.9 },
  { time: '09:30', activeUsers: 2847, productivity: 88, alertsCount: 1, systemHealth: 99.7 },
  { time: '09:45', activeUsers: 2843, productivity: 91, alertsCount: 0, systemHealth: 99.9 },
  { time: '10:00', activeUsers: 2856, productivity: 89, alertsCount: 2, systemHealth: 99.8 },
  { time: '10:15', activeUsers: 2871, productivity: 92, alertsCount: 1, systemHealth: 99.9 },
  { time: '10:30', activeUsers: 2868, productivity: 95, alertsCount: 0, systemHealth: 100.0 },
  { time: '10:45', activeUsers: 2849, productivity: 93, alertsCount: 1, systemHealth: 99.8 }
]

const departmentStatus = [
  { 
    department: 'Engineering', 
    online: 442, 
    total: 450, 
    productivity: 94, 
    alerts: 1,
    status: 'Optimal',
    lastUpdate: '2 min ago',
    avgHours: 7.2,
    topLocation: 'San Francisco Office'
  },
  { 
    department: 'Sales', 
    online: 224, 
    total: 230, 
    productivity: 87, 
    alerts: 3,
    status: 'Good',
    lastUpdate: '1 min ago',
    avgHours: 8.1,
    topLocation: 'Remote - East Coast'
  },
  { 
    department: 'Marketing', 
    online: 118, 
    total: 120, 
    productivity: 91, 
    alerts: 0,
    status: 'Optimal',
    lastUpdate: '30 sec ago',
    avgHours: 7.8,
    topLocation: 'Austin Office'
  },
  { 
    department: 'Operations', 
    online: 173, 
    total: 180, 
    productivity: 83, 
    alerts: 2,
    status: 'Monitor',
    lastUpdate: '45 sec ago',
    avgHours: 8.3,
    topLocation: 'Chicago Office'
  }
]

const systemStatus = [
  { system: 'IAMS Core', status: 'Operational', uptime: 99.94, response: '0.2s', load: 23 },
  { system: 'Analytics Engine', status: 'Operational', uptime: 99.87, response: '0.4s', load: 67 },
  { system: 'Data Pipeline', status: 'Operational', uptime: 99.99, response: '0.1s', load: 45 },
  { system: 'Notification Service', status: 'Operational', uptime: 99.92, response: '0.3s', load: 12 },
  { system: 'Compliance Monitor', status: 'Warning', uptime: 99.45, response: '1.2s', load: 89 },
  { system: 'Dashboard API', status: 'Operational', uptime: 99.98, response: '0.2s', load: 34 }
]

const realtimeAlerts = [
  {
    id: 1,
    type: 'performance',
    severity: 'medium',
    title: 'Productivity Dip in Sales Team',
    description: 'Sales team productivity dropped 8% in the last hour. 12 members showing extended break patterns.',
    timestamp: '2 minutes ago',
    affected: 12,
    department: 'Sales',
    action: 'Monitor for 30 more minutes'
  },
  {
    id: 2,
    type: 'system',
    severity: 'low',
    title: 'Compliance Monitor Load High',
    description: 'Compliance monitoring system experiencing high load due to data processing batch job.',
    timestamp: '5 minutes ago',
    affected: 'System',
    department: 'All',
    action: 'Auto-scaling initiated'
  },
  {
    id: 3,
    type: 'security',
    severity: 'medium',
    title: 'Unusual Access Pattern Detected',
    description: '3 users accessing systems outside normal hours. All have manager approval.',
    timestamp: '8 minutes ago',
    affected: 3,
    department: 'Engineering',
    action: 'Verified - No action needed'
  },
  {
    id: 4,
    type: 'wellness',
    severity: 'low',
    title: 'Extended Work Session Alert',
    description: '7 employees in Operations have been active for over 6 hours without significant breaks.',
    timestamp: '12 minutes ago',
    affected: 7,
    department: 'Operations',
    action: 'Break reminders sent'
  }
]

const globalActivity = [
  { location: 'San Francisco Office', active: 892, capacity: 950, utilization: 94, timezone: 'PST' },
  { location: 'Austin Office', active: 234, capacity: 280, utilization: 84, timezone: 'CST' },
  { location: 'Chicago Office', active: 187, capacity: 220, utilization: 85, timezone: 'CST' },
  { location: 'Remote - East Coast', active: 756, capacity: 800, utilization: 95, timezone: 'EST' },
  { location: 'Remote - West Coast', active: 445, capacity: 500, utilization: 89, timezone: 'PST' },
  { location: 'Remote - Central', active: 298, capacity: 350, utilization: 85, timezone: 'CST' },
  { location: 'International', active: 78, capacity: 100, utilization: 78, timezone: 'Various' }
]

const complianceStatus = [
  { metric: 'Data Processing Compliance', status: 'Compliant', score: 100, details: 'All processing within approved parameters' },
  { metric: 'Privacy Protection', status: 'Compliant', score: 100, details: 'GDPR requirements met, anonymization active' },
  { metric: 'Work Hours Monitoring', status: 'Monitor', score: 96, details: '7 employees exceeding recommended hours' },
  { metric: 'Break Time Compliance', status: 'Compliant', score: 98, details: '94% taking recommended breaks' },
  { metric: 'System Access Controls', status: 'Compliant', score: 100, details: 'All access properly authenticated' }
]

const currentActiveUsers = liveMetrics[liveMetrics.length - 1]?.activeUsers || 2847
const currentProductivity = liveMetrics[liveMetrics.length - 1]?.productivity || 93
const currentSystemHealth = liveMetrics[liveMetrics.length - 1]?.systemHealth || 99.8

export function RealTimeMonitoring() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Real-Time Monitoring Center</h1>
          <p className="text-gray-600">Live workforce activity tracking, system monitoring, and instant alert management</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <Activity className="h-3 w-3 mr-1" />
            {currentActiveUsers.toLocaleString()} Active
          </Badge>
        </div>
      </div>

      {/* Live Status Overview */}
      <div className="grid grid-cols-2 grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-900 mb-1">{currentActiveUsers.toLocaleString()}</div>
            <div className="text-xs text-green-600">of 2,847 total employees</div>
            <Progress value={(currentActiveUsers / 2847) * 100} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700 flex items-center">
              <BarChart3 className="h-4 w-4 mr-1" />
              Live Productivity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-900 mb-1">{currentProductivity}%</div>
            <div className="text-xs text-blue-600">real-time average</div>
            <Progress value={currentProductivity} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-700 flex items-center">
              <Server className="h-4 w-4 mr-1" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-900 mb-1">{currentSystemHealth}%</div>
            <div className="text-xs text-purple-600">all systems operational</div>
            <Progress value={currentSystemHealth} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-700 flex items-center">
              <Bell className="h-4 w-4 mr-1" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-amber-900 mb-1">{realtimeAlerts.length}</div>
            <div className="text-xs text-amber-600">requiring attention</div>
            <Progress value={Math.max(25, (4 - realtimeAlerts.length) * 25)} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-teal-700 flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-teal-900 mb-1">98.8%</div>
            <div className="text-xs text-teal-600">all checks passed</div>
            <Progress value={98.8} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* System Control Panel */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-gray-600" />
              <span>Monitoring Control Panel</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
              <Button size="sm">
                <Bell className="h-4 w-4 mr-1" />
                Alert Settings
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Data Retention</div>
              <div className="text-lg font-medium">7 days</div>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Alert Threshold</div>
              <div className="text-lg font-medium">Medium+</div>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Last Backup</div>
              <div className="text-lg font-medium">2 min ago</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Monitoring Dashboard */}
      <Tabs defaultValue="live" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="live">Live Activity</TabsTrigger>
          <TabsTrigger value="departments">Department Status</TabsTrigger>
          <TabsTrigger value="systems">System Health</TabsTrigger>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Monitor</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span>Live Activity Stream (Last 2 Hours)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={liveMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="activeUsers" 
                    fill="#10B981" 
                    fillOpacity={0.2}
                    stroke="#10B981"
                    name="Active Users"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="productivity" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Productivity %"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="systemHealth" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    name="System Health %"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Global Activity Map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <span>Global Activity Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 grid-cols-3 gap-4">
                {globalActivity.map((location, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{location.location}</CardTitle>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {location.timezone}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Active/Capacity:</span>
                        <span className="text-sm font-medium">{location.active}/{location.capacity}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Utilization:</span>
                        <span className="text-sm font-medium text-blue-600">{location.utilization}%</span>
                      </div>
                      <Progress value={location.utilization} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>Department-Level Monitoring</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStatus.map((dept, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{dept.department}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              dept.status === 'Optimal' 
                                ? 'bg-green-50 text-green-700'
                                : dept.status === 'Good'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-amber-50 text-amber-700'
                            }
                          >
                            {dept.status}
                          </Badge>
                          {dept.alerts > 0 && (
                            <Badge variant="secondary">{dept.alerts} Alert{dept.alerts > 1 ? 's' : ''}</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 grid-cols-4 gap-4">
                        <div>
                          <span className="text-gray-500 text-sm">Online/Total:</span>
                          <div className="text-lg font-medium">{dept.online}/{dept.total}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Productivity:</span>
                          <div className="text-lg font-medium text-blue-600">{dept.productivity}%</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Avg Hours:</span>
                          <div className="text-lg font-medium">{dept.avgHours.toFixed(1)}h</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Top Location:</span>
                          <div className="text-sm">{dept.topLocation}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Last Update: {dept.lastUpdate}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          {dept.alerts > 0 && (
                            <Button size="sm">
                              <Bell className="h-4 w-4 mr-1" />
                              View Alerts
                            </Button>
                          )}
                        </div>
                      </div>
                      <Progress value={(dept.online / dept.total) * 100} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="systems" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Server className="h-5 w-5 text-green-600" />
                <span>System Health Monitoring</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStatus.map((system, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{system.system}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              system.status === 'Operational' 
                                ? 'bg-green-50 text-green-700'
                                : system.status === 'Warning'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-red-50 text-red-700'
                            }
                          >
                            {system.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-lg text-green-900 mb-1">{system.uptime}%</div>
                          <div className="text-xs text-green-700">Uptime</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-lg text-blue-900 mb-1">{system.response}</div>
                          <div className="text-xs text-blue-700">Response Time</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="text-lg text-purple-900 mb-1">{system.load}%</div>
                          <div className="text-xs text-purple-700">Load</div>
                        </div>
                      </div>
                      <Progress value={system.uptime} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <span>Active Alerts & Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {realtimeAlerts.map((alert) => (
                  <Card key={alert.id} className="border-l-4 border-l-amber-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{alert.title}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              alert.severity === 'high' 
                                ? 'bg-red-50 text-red-700'
                                : alert.severity === 'medium'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-blue-50 text-blue-700'
                            }
                          >
                            {alert.severity} priority
                          </Badge>
                          <Badge variant="secondary">{alert.department}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-700">{alert.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Affected:</span>
                          <div className="font-medium">{alert.affected} {typeof alert.affected === 'number' ? 'employees' : ''}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Timestamp:</span>
                          <div className="font-medium">{alert.timestamp}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Type:</span>
                          <div className="font-medium capitalize">{alert.type}</div>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="text-sm text-blue-800 mb-1">Recommended Action:</div>
                        <div className="text-xs text-blue-700">{alert.action}</div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Alert ID: #{alert.id}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Acknowledge</Button>
                          <Button size="sm">Resolve</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-teal-600" />
                <span>Real-Time Compliance Monitoring</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceStatus.map((compliance, index) => (
                  <Card key={index} className="border-l-4 border-l-teal-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{compliance.metric}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              compliance.status === 'Compliant' 
                                ? 'bg-green-50 text-green-700'
                                : compliance.status === 'Monitor'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-red-50 text-red-700'
                            }
                          >
                            {compliance.status}
                          </Badge>
                          <Badge variant="secondary">{compliance.score}%</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-700">{compliance.details}</p>
                      <Progress value={compliance.score} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}