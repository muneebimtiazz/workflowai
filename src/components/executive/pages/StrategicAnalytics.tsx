import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign, 
  Target,
  Brain,
  Activity,
  BarChart3,
  Zap,
  Globe,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Enhanced strategic analytics data
const organizationalMetrics = [
  { month: 'Jan', productivity: 85, efficiency: 78, revenue: 2.1, satisfaction: 82, retention: 94.2 },
  { month: 'Feb', productivity: 87, efficiency: 81, revenue: 2.3, satisfaction: 84, retention: 95.1 },
  { month: 'Mar', productivity: 91, efficiency: 85, revenue: 2.7, satisfaction: 87, retention: 93.8 },
  { month: 'Apr', productivity: 89, efficiency: 83, revenue: 2.5, satisfaction: 85, retention: 96.3 },
  { month: 'May', productivity: 93, efficiency: 88, revenue: 2.9, satisfaction: 89, retention: 95.7 },
  { month: 'Jun', productivity: 95, efficiency: 91, revenue: 3.2, satisfaction: 92, retention: 97.1 }
]

const predictiveInsights = [
  { month: 'Jul', predicted: 97, confidence: 85, actual: null },
  { month: 'Aug', predicted: 98, confidence: 82, actual: null },
  { month: 'Sep', predicted: 96, confidence: 88, actual: null },
  { month: 'Oct', predicted: 99, confidence: 79, actual: null },
  { month: 'Nov', predicted: 98, confidence: 83, actual: null },
  { month: 'Dec', predicted: 100, confidence: 80, actual: null }
]

const departmentAnalytics = [
  { 
    name: 'Engineering', 
    productivity: 94, 
    headcount: 450, 
    efficiency: 92,
    innovation: 88,
    collaboration: 85,
    revenue_per_employee: 285000,
    growth_potential: 15
  },
  { 
    name: 'Sales', 
    productivity: 88, 
    headcount: 230, 
    efficiency: 85,
    innovation: 72,
    collaboration: 92,
    revenue_per_employee: 425000,
    growth_potential: 22
  },
  { 
    name: 'Marketing', 
    productivity: 91, 
    headcount: 120, 
    efficiency: 89,
    innovation: 95,
    collaboration: 88,
    revenue_per_employee: 320000,
    growth_potential: 18
  },
  { 
    name: 'Operations', 
    productivity: 86, 
    headcount: 180, 
    efficiency: 83,
    innovation: 65,
    collaboration: 78,
    revenue_per_employee: 180000,
    growth_potential: 12
  }
]

const roiAnalysis = [
  { initiative: 'AI Automation', investment: 500000, projected_savings: 2300000, roi: 360, timeline: '12 months' },
  { initiative: 'Remote Work Tools', investment: 150000, projected_savings: 890000, roi: 493, timeline: '6 months' },
  { initiative: 'Training Programs', investment: 300000, projected_savings: 1200000, roi: 300, timeline: '18 months' },
  { initiative: 'Wellness Initiative', investment: 100000, projected_savings: 450000, roi: 350, timeline: '24 months' }
]

export function StrategicAnalytics() {
  return (
    <div className="p-6 space-y-6">
      {/* Strategic Overview Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Enhanced Strategic Workforce Analytics</h1>
          <p className="text-gray-600">High-level workforce metrics with predictive insights and ROI analysis</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            <Brain className="h-3 w-3 mr-1" />
            AI-Powered Insights
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <Activity className="h-3 w-3 mr-1" />
            Real-time Data
          </Badge>
        </div>
      </div>

      {/* Executive KPI Cards */}
      <div className="grid grid-cols-2 grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-700">Overall Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-900 mb-1">95.2%</div>
            <div className="flex items-center text-xs text-purple-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3.2% vs target
            </div>
            <Progress value={95.2} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700">Revenue per Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-900 mb-1">$285K</div>
            <div className="flex items-center text-xs text-blue-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.8% YoY
            </div>
            <Progress value={78} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700">Innovation Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-900 mb-1">82.4</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.6% improvement
            </div>
            <Progress value={82.4} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-700">Retention Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-amber-900 mb-1">97.8%</div>
            <div className="flex items-center text-xs text-amber-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              Q3 forecast
            </div>
            <Progress value={97.8} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-teal-700">ROI Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-teal-900 mb-1">376%</div>
            <div className="flex items-center text-xs text-teal-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              Productivity initiatives
            </div>
            <Progress value={76} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Dashboard */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Productivity Trends</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="departments">Department Insights</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Organization-wide Productivity Analytics</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Export Data</Button>
                  <Button size="sm">Generate Report</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={organizationalMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="productivity" 
                    fill="#8B5CF6" 
                    fillOpacity={0.2}
                    stroke="#8B5CF6"
                    name="Productivity Score"
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#06B6D4" 
                    strokeWidth={3}
                    name="Efficiency Rate"
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="revenue" 
                    fill="#10B981" 
                    name="Revenue (M$)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Engagement and Satisfaction */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <span>Employee Satisfaction Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={organizationalMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="satisfaction" 
                      fill="#10B981" 
                      fillOpacity={0.6}
                      stroke="#10B981"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Talent Retention Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={organizationalMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="retention" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      dot={{ fill: '#8B5CF6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>AI-Powered Predictive Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="col-span-2">
                  <h3 className="text-lg mb-4">6-Month Productivity Forecast</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={[...organizationalMetrics, ...predictiveInsights]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="productivity" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        name="Historical Productivity"
                        connectNulls={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#F59E0B" 
                        strokeWidth={3}
                        strokeDasharray="5,5"
                        name="AI Prediction"
                        connectNulls={false}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="confidence" 
                        fill="#F59E0B" 
                        fillOpacity={0.1}
                        name="Confidence Interval"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-sm text-blue-800 mb-2">Key Predictions</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• 97.8% productivity by Q3</li>
                      <li>• 15% efficiency gain potential</li>
                      <li>• 98.2% retention forecast</li>
                      <li>• $2.3M automation savings</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="text-sm text-green-800 mb-2">Growth Opportunities</h4>
                    <ul className="text-xs text-green-700 space-y-1">
                      <li>• Engineering: 15% growth potential</li>
                      <li>• Sales: 22% improvement opportunity</li>
                      <li>• Marketing: Innovation leader</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="text-sm text-amber-800 mb-2">Risk Factors</h4>
                    <ul className="text-xs text-amber-700 space-y-1">
                      <li>• Operations efficiency lag</li>
                      <li>• Potential burnout in Sales</li>
                      <li>• Skills gap in emerging tech</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <span>Department Performance Deep Dive</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={departmentAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="productivity" fill="#8B5CF6" name="Productivity" />
                  <Bar dataKey="efficiency" fill="#06B6D4" name="Efficiency" />
                  <Bar dataKey="innovation" fill="#10B981" name="Innovation" />
                  <Bar dataKey="collaboration" fill="#F59E0B" name="Collaboration" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-2 grid-cols-4 gap-4">
                {departmentAnalytics.map((dept) => (
                  <Card key={dept.name} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{dept.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Revenue/Employee:</span>
                        <span className="text-green-600">${(dept.revenue_per_employee / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Growth Potential:</span>
                        <span className="text-blue-600">{dept.growth_potential}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Team Size:</span>
                        <span>{dept.headcount}</span>
                      </div>
                      <Progress value={dept.productivity} className="h-1" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span>ROI Analysis of Productivity Initiatives</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  {roiAnalysis.map((initiative, index) => (
                    <Card key={index} className="border-l-4 border-l-green-500">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center justify-between">
                          <span>{initiative.initiative}</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {initiative.roi}% ROI
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Investment:</span>
                          <span className="text-red-600">-${(initiative.investment / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Projected Savings:</span>
                          <span className="text-green-600">+${(initiative.projected_savings / 1000000).toFixed(1)}M</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Timeline:</span>
                          <span>{initiative.timeline}</span>
                        </div>
                        <Progress value={Math.min(initiative.roi / 5, 100)} className="h-1" />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-sm text-green-800">Total ROI Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl text-green-900 mb-2">$4.84M</div>
                      <p className="text-xs text-green-700 mb-3">Total projected annual savings</p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Total Investment:</span>
                          <span>$1.05M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average ROI:</span>
                          <span className="text-green-600">361%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payback Period:</span>
                          <span>3.2 months</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Strategic Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="text-xs text-blue-800 mb-1">Priority: AI Automation</h4>
                            <p className="text-xs text-blue-700">Highest ROI potential with 360% return</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Target className="h-4 w-4 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="text-xs text-green-800 mb-1">Quick Win: Remote Tools</h4>
                            <p className="text-xs text-green-700">Fast implementation, immediate impact</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Brain className="h-4 w-4 text-purple-600 mt-0.5" />
                          <div>
                            <h4 className="text-xs text-purple-800 mb-1">Long-term: Training</h4>
                            <p className="text-xs text-purple-700">Sustainable productivity improvements</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}