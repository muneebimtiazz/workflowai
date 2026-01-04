import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Alert, AlertDescription } from "../../ui/alert"
import { 
  Shield,
  Brain,
  Activity,
  Clock,
  Eye,
  CheckCircle,
  AlertTriangle,
  Users,
  BarChart3,
  Bell,
  Settings
} from 'lucide-react'
import { Line, Area, Bar, PieChart, Pie, Cell, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// IAMS real-time data
const realTimeActivity = [
  { time: '09:00', active_sessions: 2847, productivity_score: 85, focus_sessions: 1248, break_time: 15 },
  { time: '10:00', active_sessions: 2892, productivity_score: 89, focus_sessions: 1456, break_time: 12 },
  { time: '11:00', active_sessions: 2865, productivity_score: 92, focus_sessions: 1623, break_time: 18 },
  { time: '12:00', active_sessions: 2234, productivity_score: 78, focus_sessions: 945, break_time: 45 },
  { time: '13:00', active_sessions: 2456, productivity_score: 83, focus_sessions: 1124, break_time: 25 },
  { time: '14:00', active_sessions: 2789, productivity_score: 88, focus_sessions: 1389, break_time: 20 },
  { time: '15:00', active_sessions: 2823, productivity_score: 91, focus_sessions: 1512, break_time: 16 },
  { time: '16:00', active_sessions: 2758, productivity_score: 87, focus_sessions: 1334, break_time: 22 }
]

const activityBreakdown = [
  { name: 'Deep Work', value: 45, minutes: 216, color: '#8B5CF6' },
  { name: 'Collaboration', value: 28, minutes: 134, color: '#06B6D4' },
  { name: 'Administrative', value: 15, minutes: 72, color: '#F59E0B' },
  { name: 'Learning', value: 8, minutes: 38, color: '#10B981' },
  { name: 'Authorized Breaks', value: 4, minutes: 19, color: '#94A3B8' }
]

const departmentActivity = [
  { 
    department: 'Engineering', 
    total_employees: 450,
    active_now: 432,
    avg_productivity: 94,
    avg_focus_time: 6.2,
    break_compliance: 98,
    deep_work_ratio: 52
  },
  { 
    department: 'Sales', 
    total_employees: 230,
    active_now: 218,
    avg_productivity: 88,
    avg_focus_time: 4.8,
    break_compliance: 94,
    deep_work_ratio: 35
  },
  { 
    department: 'Marketing', 
    total_employees: 120,
    active_now: 115,
    avg_productivity: 91,
    avg_focus_time: 5.5,
    break_compliance: 96,
    deep_work_ratio: 42
  },
  { 
    department: 'Operations', 
    total_employees: 180,
    active_now: 172,
    avg_productivity: 86,
    avg_focus_time: 4.2,
    break_compliance: 92,
    deep_work_ratio: 38
  }
]

const privacyMetrics = [
  { category: 'Data Minimization', score: 100, status: 'Compliant', description: 'Only essential metadata collected' },
  { category: 'User Consent', score: 100, status: 'Verified', description: 'All employees have active consent' },
  { category: 'Transparency', score: 98, status: 'Excellent', description: 'Clear monitoring communication' },
  { category: 'Access Controls', score: 100, status: 'Secure', description: 'Role-based data access enforced' },
  { category: 'Audit Trail', score: 100, status: 'Complete', description: 'Full compliance logging active' }
]

const aiInsights = [
  {
    type: 'productivity',
    title: 'Peak Productivity Pattern Detected',
    description: 'Engineering team shows 15% higher productivity between 10-11 AM. Consider scheduling complex tasks during this window.',
    confidence: 94,
    impact: 'high',
    department: 'Engineering'
  },
  {
    type: 'collaboration',
    title: 'Optimal Collaboration Window',
    description: 'Cross-team meetings are 23% more effective when scheduled between 2-4 PM based on attention patterns.',
    confidence: 89,
    impact: 'medium',
    department: 'All'
  },
  {
    type: 'wellness',
    title: 'Break Pattern Optimization',
    description: 'Sales team members taking 15-minute breaks every 90 minutes show 12% higher afternoon productivity.',
    confidence: 87,
    impact: 'medium',
    department: 'Sales'
  },
  {
    type: 'efficiency',
    title: 'Task Switching Reduction Opportunity',
    description: 'Marketing team could improve efficiency by 18% through focused work blocks and reduced context switching.',
    confidence: 92,
    impact: 'high',
    department: 'Marketing'
  }
]

export function IAMSOverview() {

  return (
    <div className="p-6 space-y-6">
      {/* IAMS Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Intelligent Activity Monitoring System (IAMS)</h1>
          <p className="text-gray-600">Privacy-first workforce analytics with AI-driven insights and real-time monitoring</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">System Active</span>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <Shield className="h-3 w-3 mr-1" />
            GDPR Compliant
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Brain className="h-3 w-3 mr-1" />
            AI Analytics
          </Badge>
        </div>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-2 grid-cols-5 gap-4">
        <Card className="bg-linear-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700 flex items-center">
              <Activity className="h-4 w-4 mr-1" />
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-900 mb-1">2,847</div>
            <div className="text-xs text-green-600">employees currently tracked</div>
            <Progress value={94.5} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700 flex items-center">
              <Brain className="h-4 w-4 mr-1" />
              AI Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-900 mb-1">99.8%</div>
            <div className="text-xs text-blue-600">uptime & accuracy</div>
            <Progress value={99.8} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-700 flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              Focus Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-900 mb-1">1,512</div>
            <div className="text-xs text-purple-600">deep work periods active</div>
            <Progress value={68.2} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-700 flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Privacy Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-amber-900 mb-1">A+</div>
            <div className="text-xs text-amber-600">100% compliant</div>
            <Progress value={100} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-teal-700 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Avg Productivity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-teal-900 mb-1">91.2%</div>
            <div className="text-xs text-teal-600">organization-wide</div>
            <Progress value={91.2} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Privacy & Compliance Alert */}
      <Alert className="border-green-200 bg-green-50">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <span className="font-medium">Privacy-First Design Active:</span> IAMS operates with full GDPR compliance, 
          collecting only essential activity metadata while ensuring complete user transparency and control.
          <Button variant="outline" size="sm" className="ml-2 h-6">
            View Privacy Dashboard
          </Button>
        </AlertDescription>
      </Alert>

      {/* Main IAMS Dashboard */}
      <Tabs defaultValue="realtime" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="realtime">Real-Time Monitoring</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Analysis Engine</TabsTrigger>
          <TabsTrigger value="compliance">Compliance & Privacy</TabsTrigger>
          <TabsTrigger value="department">Department Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  <span>Live Activity Monitoring Dashboard</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-1" />
                    Configure Alerts
                  </Button>
                  <Button size="sm">
                    <Bell className="h-4 w-4 mr-1" />
                    View Notifications
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={realTimeActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="active_sessions" 
                    fill="#10B981" 
                    fillOpacity={0.2}
                    stroke="#10B981"
                    name="Active Sessions"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="productivity_score" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    name="Productivity Score"
                  />
                  <Bar 
                    yAxisId="left"
                    dataKey="focus_sessions" 
                    fill="#06B6D4" 
                    name="Focus Sessions"
                    opacity={0.7}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Activity Breakdown */}
          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <span>Current Activity Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={activityBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {activityBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Activity Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activityBreakdown.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: activity.color }}
                      ></div>
                      <span className="text-sm">{activity.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{activity.value}%</div>
                      <div className="text-xs text-gray-500">{activity.minutes}min avg</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Real-time Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-amber-600" />
                <span>Real-Time System Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm text-green-800 mb-1">System Health: Optimal</h4>
                      <p className="text-xs text-green-700">
                        All monitoring components operating normally. 99.8% uptime maintained.
                      </p>
                      <div className="text-xs text-green-600 mt-1">Last checked: 2 minutes ago</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm text-blue-800 mb-1">AI Analysis: Active</h4>
                      <p className="text-xs text-blue-700">
                        Processing 2,847 activity streams. 15 new insights generated in the last hour.
                      </p>
                      <div className="text-xs text-blue-600 mt-1">Processing latency: 0.3s</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm text-amber-800 mb-1">Attention Required</h4>
                      <p className="text-xs text-amber-700">
                        12 employees in Sales showing extended work hours. Consider break reminders.
                      </p>
                      <div className="text-xs text-amber-600 mt-1">Detected: 15 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>AI-Powered Pattern Recognition & Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg mb-4">Latest AI Insights</h3>
                  {aiInsights.map((insight, index) => (
                    <Card key={index} className="border-l-4 border-l-purple-500">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">{insight.title}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant="outline" 
                              className={
                                insight.impact === 'high' 
                                  ? 'bg-red-50 text-red-700 border-red-200'
                                  : 'bg-blue-50 text-blue-700 border-blue-200'
                              }
                            >
                              {insight.impact} impact
                            </Badge>
                            <Badge variant="secondary">
                              {insight.confidence}% confidence
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Department: {insight.department}</span>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                        <Progress value={insight.confidence} className="h-1 mt-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg mb-4">AI Engine Status</h3>
                  
                  <Card className="bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-purple-800">Processing Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Data Points Analyzed:</span>
                        <span className="text-purple-600">2.3M per hour</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pattern Recognition:</span>
                        <span className="text-purple-600">94.7% accuracy</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Insights Generated:</span>
                        <span className="text-purple-600">127 today</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Model Version:</span>
                        <span className="text-purple-600">v2.3.1</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-blue-800">Behavioral Analytics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-white rounded-lg border">
                        <h4 className="text-xs text-blue-800 mb-1">Work Rhythm Analysis</h4>
                        <p className="text-xs text-blue-700">Identifying optimal work patterns across 2,847 employees</p>
                        <Progress value={87} className="h-1 mt-2" />
                      </div>
                      <div className="p-3 bg-white rounded-lg border">
                        <h4 className="text-xs text-blue-800 mb-1">Productivity Optimization</h4>
                        <p className="text-xs text-blue-700">AI recommendations improving efficiency by 12.3% average</p>
                        <Progress value={94} className="h-1 mt-2" />
                      </div>
                      <div className="p-3 bg-white rounded-lg border">
                        <h4 className="text-xs text-blue-800 mb-1">Anomaly Detection</h4>
                        <p className="text-xs text-blue-700">Real-time identification of concerning patterns</p>
                        <Progress value={99} className="h-1 mt-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-linear-to-br from-green-50 to-green-100 border-green-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-green-800">Predictive Capabilities</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Burnout Risk Prediction:</span>
                        <span className="text-green-600">91% accuracy</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Productivity Forecasting:</span>
                        <span className="text-green-600">87% accuracy</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Optimal Break Timing:</span>
                        <span className="text-green-600">94% accuracy</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Peak Performance Windows:</span>
                        <span className="text-green-600">89% accuracy</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-teal-600" />
                <span>Privacy & Ethics Compliance Framework</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg mb-4">Privacy Compliance Metrics</h3>
                  {privacyMetrics.map((metric, index) => (
                    <Card key={index} className="border-l-4 border-l-teal-500">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">{metric.category}</CardTitle>
                          <Badge 
                            variant="outline" 
                            className={
                              metric.score === 100 
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : metric.score >= 95
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }
                          >
                            {metric.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl text-teal-900">{metric.score}%</span>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{metric.description}</p>
                        <Progress value={metric.score} className="h-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg mb-4">Compliance Framework Details</h3>
                  
                  <Card className="bg-linear-to-br from-green-50 to-green-100 border-green-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-green-800">GDPR Compliance Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-white border border-green-200 rounded-lg">
                        <h4 className="text-xs text-green-800 mb-1">Data Processing</h4>
                        <p className="text-xs text-green-700">
                          Lawful basis: Legitimate interest with employee consent. 
                          Processing limited to productivity analytics only.
                        </p>
                      </div>
                      <div className="p-3 bg-white border border-green-200 rounded-lg">
                        <h4 className="text-xs text-green-800 mb-1">Data Retention</h4>
                        <p className="text-xs text-green-700">
                          Activity metadata retained for 90 days maximum. 
                          Aggregated insights stored for 2 years.
                        </p>
                      </div>
                      <div className="p-3 bg-white border border-green-200 rounded-lg">
                        <h4 className="text-xs text-green-800 mb-1">Employee Rights</h4>
                        <p className="text-xs text-green-700">
                          Full data access, rectification, erasure, and portability rights active.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-blue-800">Ethical Monitoring Standards</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Respectful surveillance practices enforced</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>No content monitoring - metadata only</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Employee well-being prioritized</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Bias-free algorithmic decisions</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Transparent monitoring processes</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-purple-800">Audit & Verification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Last External Audit:</span>
                        <span className="text-purple-600">May 2025</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Compliance Score:</span>
                        <span className="text-purple-600">99.6%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Security Certification:</span>
                        <span className="text-purple-600">ISO 27001</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Next Review:</span>
                        <span className="text-purple-600">July 2025</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="department" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Department Activity Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                {departmentActivity.map((dept, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{dept.department}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {dept.active_now}/{dept.total_employees} active
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {dept.avg_productivity}% productivity
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 grid-cols-4 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm text-blue-800 mb-1">Focus Time</div>
                          <div className="text-2xl text-blue-900">{dept.avg_focus_time}h</div>
                          <div className="text-xs text-blue-600">daily average</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-sm text-green-800 mb-1">Break Compliance</div>
                          <div className="text-2xl text-green-900">{dept.break_compliance}%</div>
                          <div className="text-xs text-green-600">following guidelines</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-sm text-purple-800 mb-1">Deep Work</div>
                          <div className="text-2xl text-purple-900">{dept.deep_work_ratio}%</div>
                          <div className="text-xs text-purple-600">of total time</div>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-lg">
                          <div className="text-sm text-amber-800 mb-1">Active Rate</div>
                          <div className="text-2xl text-amber-900">{Math.round((dept.active_now / dept.total_employees) * 100)}%</div>
                          <div className="text-xs text-amber-600">currently online</div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Department Productivity Score</span>
                          <span>{dept.avg_productivity}%</span>
                        </div>
                        <Progress value={dept.avg_productivity} className="h-2" />
                      </div>
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