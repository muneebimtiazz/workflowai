import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { 
  TrendingUp,
  Users, 
  Brain,
  Activity,
  Crown,
  BarChart3,
  Zap,
  Shield,
  Clock,
  Award,
  Target,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
const productivityTrend = [
  { month: 'Jan', productivity: 85, efficiency: 78, satisfaction: 82 },
  { month: 'Feb', productivity: 87, efficiency: 81, satisfaction: 84 },
  { month: 'Mar', productivity: 91, efficiency: 85, satisfaction: 87 },
  { month: 'Apr', productivity: 89, efficiency: 83, satisfaction: 85 },
  { month: 'May', productivity: 93, efficiency: 88, satisfaction: 89 },
  { month: 'Jun', productivity: 95, efficiency: 91, satisfaction: 92 }
]

const departmentMetrics = [
  { name: 'Engineering', productivity: 94, headcount: 450, efficiency: 92 },
  { name: 'Sales', productivity: 88, headcount: 230, efficiency: 85 },
  { name: 'Marketing', productivity: 91, headcount: 120, efficiency: 89 },
  { name: 'Operations', productivity: 86, headcount: 180, efficiency: 83 },
  { name: 'HR', productivity: 89, headcount: 45, efficiency: 87 },
  { name: 'Finance', productivity: 92, headcount: 65, efficiency: 90 }
]

const workforceBehavior = [
  { name: 'Deep Work', value: 45, color: '#8B5CF6' },
  { name: 'Collaboration', value: 30, color: '#06B6D4' },
  { name: 'Administration', value: 15, color: '#F59E0B' },
  { name: 'Learning', value: 10, color: '#10B981' }
]

const retentionData = [
  { month: 'Jan', retention: 94.2, turnover: 5.8, newHires: 12 },
  { month: 'Feb', retention: 95.1, turnover: 4.9, newHires: 18 },
  { month: 'Mar', retention: 93.8, turnover: 6.2, newHires: 25 },
  { month: 'Apr', retention: 96.3, turnover: 3.7, newHires: 15 },
  { month: 'May', retention: 95.7, turnover: 4.3, newHires: 22 },
  { month: 'Jun', retention: 97.1, turnover: 2.9, newHires: 19 }
]

export function ExecutiveDashboardContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Executive Summary Cards */}
      <div className="grid grid-cols-2 grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-purple-700">Overall Productivity</CardTitle>
            <div className="p-2 bg-purple-200 rounded-full">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-900 mb-1">95.2%</div>
            <p className="text-xs text-purple-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3.2% from last month
            </p>
            <div className="mt-3">
              <Progress value={95.2} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-blue-700">Workforce Efficiency</CardTitle>
            <div className="p-2 bg-blue-200 rounded-full">
              <Zap className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-900 mb-1">91.8%</div>
            <p className="text-xs text-blue-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.8% from last month
            </p>
            <div className="mt-3">
              <Progress value={91.8} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-green-700">Employee Satisfaction</CardTitle>
            <div className="p-2 bg-green-200 rounded-full">
              <Award className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-900 mb-1">92.4%</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +1.9% from last month
            </p>
            <div className="mt-3">
              <Progress value={92.4} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-amber-700">Retention Rate</CardTitle>
            <div className="p-2 bg-amber-200 rounded-full">
              <Users className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-amber-900 mb-1">97.1%</div>
            <p className="text-xs text-amber-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +1.4% from last month
            </p>
            <div className="mt-3">
              <Progress value={97.1} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Insights Row */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>Organizational Productivity Trends</span>
              </CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <Brain className="h-3 w-3 mr-1" />
                AI Insights
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productivityTrend}>
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
                  name="Productivity Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#06B6D4" 
                  strokeWidth={2}
                  name="Efficiency Rate"
                />
                <Line 
                  type="monotone" 
                  dataKey="satisfaction" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Satisfaction Index"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-indigo-600" />
              <span>Workforce Activity Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={workforceBehavior}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {workforceBehavior.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span>Department Performance Overview</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Badge variant="outline">Real-time Data</Badge>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={departmentMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="productivity" fill="#8B5CF6" name="Productivity Score" />
              <Bar dataKey="efficiency" fill="#06B6D4" name="Efficiency Rate" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Insights and Alerts */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>AI Strategic Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="text-sm text-green-800 mb-1">Productivity Optimization Opportunity</h4>
                  <p className="text-xs text-green-700">
                    Engineering department shows 15% improvement potential through task automation. 
                    Estimated ROI: $2.3M annually.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm text-blue-800 mb-1">Talent Retention Prediction</h4>
                  <p className="text-xs text-blue-700">
                    AI models predict 98.2% retention rate for Q3. Marketing team shows highest 
                    satisfaction scores.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="text-sm text-amber-800 mb-1">Work-Life Balance Alert</h4>
                  <p className="text-xs text-amber-700">
                    12% of Sales team working extended hours. Recommend workload rebalancing 
                    to prevent burnout.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-teal-600" />
              <span>Compliance & Privacy Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-800">GDPR Compliance</span>
                </div>
                <div className="text-2xl text-green-900">100%</div>
                <p className="text-xs text-green-700">Fully Compliant</p>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">Privacy Score</span>
                </div>
                <div className="text-2xl text-blue-900">A+</div>
                <p className="text-xs text-blue-700">Excellent</p>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-800">Data Processing</span>
                </div>
                <div className="text-2xl text-purple-900">99.8%</div>
                <p className="text-xs text-purple-700">Uptime</p>
              </div>

              <div className="p-3 bg-indigo-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm text-indigo-800">Real-time Analytics</span>
                </div>
                <div className="text-2xl text-indigo-900">Live</div>
                <p className="text-xs text-indigo-700">Active</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm text-gray-800 mb-2">Recent Audit Results</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Security audit passed (June 2025)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Privacy compliance verified</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Employee consent updated</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-purple-600" />
            <span>Executive Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 grid-cols-4 gap-4">
            <Button className="h-16 flex flex-col items-center justify-center space-y-1">
              <BarChart3 className="h-5 w-5" />
              <span className="text-xs">Generate Executive Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
              <Target className="h-5 w-5" />
              <span className="text-xs">Strategic Planning</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
              <Brain className="h-5 w-5" />
              <span className="text-xs">AI Insights Deep Dive</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
              <Shield className="h-5 w-5" />
              <span className="text-xs">Compliance Review</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}