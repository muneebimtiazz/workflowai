import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Alert, AlertDescription } from "../../ui/alert"
import { 
  Users, 
  TrendingUp, 
  TrendingDown,
  UserCheck,
  Brain,
  Target,
  Award,
  Star,
  Zap,
  Eye,
  UserPlus,
  Briefcase
} from 'lucide-react'
import { Line, PieChart, Pie, Cell, ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Talent analytics data
const talentOverview = [
  { month: 'Aug', retention: 94.2, satisfaction: 82, engagement: 78, performance: 85, hiringRate: 3.2 },
  { month: 'Sep', retention: 95.1, satisfaction: 84, engagement: 81, performance: 87, hiringRate: 2.8 },
  { month: 'Oct', retention: 93.8, satisfaction: 87, engagement: 85, performance: 89, hiringRate: 4.1 },
  { month: 'Nov', retention: 96.3, satisfaction: 85, engagement: 83, performance: 91, hiringRate: 2.3 },
  { month: 'Dec', retention: 95.7, satisfaction: 89, engagement: 88, performance: 93, hiringRate: 1.8 },
  { month: 'Jan', retention: 97.1, satisfaction: 92, engagement: 91, performance: 95, hiringRate: 3.5 }
]

const retentionRiskAnalysis = [
  { 
    department: 'Engineering', 
    totalEmployees: 450,
    atRisk: 12,
    riskLevel: 'Low',
    avgTenure: 3.2,
    satisfactionScore: 89,
    topReasons: ['Career Growth', 'Compensation', 'Work-Life Balance'],
    interventions: 8,
    successRate: 87
  },
  { 
    department: 'Sales', 
    totalEmployees: 230,
    atRisk: 23,
    riskLevel: 'Medium',
    avgTenure: 2.1,
    satisfactionScore: 76,
    topReasons: ['Burnout', 'Commission Structure', 'Management'],
    interventions: 15,
    successRate: 73
  },
  { 
    department: 'Marketing', 
    totalEmployees: 120,
    atRisk: 5,
    riskLevel: 'Low',
    avgTenure: 2.8,
    satisfactionScore: 92,
    topReasons: ['Remote Work', 'Skill Development', 'Recognition'],
    interventions: 3,
    successRate: 100
  },
  { 
    department: 'Operations', 
    totalEmployees: 180,
    atRisk: 15,
    riskLevel: 'Medium',
    avgTenure: 4.1,
    satisfactionScore: 81,
    topReasons: ['Process Inefficiency', 'Technology', 'Growth'],
    interventions: 9,
    successRate: 78
  }
]

const performanceDistribution = [
  { level: 'Exceptional', count: 285, percentage: 10, color: '#10B981' },
  { level: 'Exceeds Expectations', count: 854, percentage: 30, color: '#3B82F6' },
  { level: 'Meets Expectations', count: 1423, percentage: 50, color: '#8B5CF6' },
  { level: 'Below Expectations', count: 228, percentage: 8, color: '#F59E0B' },
  { level: 'Underperforming', count: 57, percentage: 2, color: '#EF4444' }
]

const successionPlanning = [
  { role: 'VP Engineering', incumbent: 'Sarah Chen', readyNow: 2, developing: 4, identified: 8 },
  { role: 'VP Sales', incumbent: 'Michael Torres', readyNow: 1, developing: 3, identified: 6 },
  { role: 'VP Marketing', incumbent: 'Emily Rodriguez', readyNow: 3, developing: 2, identified: 7 },
  { role: 'VP Operations', incumbent: 'David Park', readyNow: 1, developing: 5, identified: 5 }
]


const predictiveInsights = [
  {
    type: 'retention',
    title: 'High Retention Risk Detected',
    description: 'Sales team showing 15% higher turnover risk due to extended work hours and commission concerns.',
    confidence: 92,
    department: 'Sales',
    impact: 'High',
    recommendation: 'Implement flexible schedules and review commission structure'
  },
  {
    type: 'performance',
    title: 'Performance Improvement Opportunity',
    description: 'Engineering team members with mentorship show 23% higher performance scores.',
    confidence: 88,
    department: 'Engineering',
    impact: 'Medium',
    recommendation: 'Expand mentorship program organization-wide'
  },
  {
    type: 'succession',
    title: 'Succession Gap Identified',
    description: 'VP Operations role has limited ready-now successors. Accelerated development recommended.',
    confidence: 95,
    department: 'Operations',
    impact: 'High',
    recommendation: 'Fast-track 3 high-potential candidates'
  },
  {
    type: 'engagement',
    title: 'Engagement Driver Analysis',
    description: 'Remote work flexibility correlates with 18% higher engagement scores across all departments.',
    confidence: 85,
    department: 'All',
    impact: 'Medium',
    recommendation: 'Standardize flexible work policies'
  }
]

export function TalentAnalytics() {

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Advanced Talent Analytics</h1>
          <p className="text-gray-600">AI-powered talent retention predictions, succession planning, and intervention strategies</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-cyan-50 text-cyan-700">
            <Users className="h-3 w-3 mr-1" />
            2,847 Employees
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            <Brain className="h-3 w-3 mr-1" />
            AI Predictions
          </Badge>
        </div>
      </div>

      {/* Key Talent Metrics */}
      <div className="grid grid-cols-2 grid-cols-5 gap-4">
        <Card className="bg-linear-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700">Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-900 mb-1">97.1%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +1.8% vs last quarter
            </div>
            <Progress value={97.1} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700">At-Risk Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-900 mb-1">55</div>
            <div className="flex items-center text-xs text-blue-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -12 vs last month
            </div>
            <Progress value={80} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-700">Avg Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-900 mb-1">8.7/10</div>
            <div className="flex items-center text-xs text-purple-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.3 improvement
            </div>
            <Progress value={87} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-700">Time to Hire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-amber-900 mb-1">25 days</div>
            <div className="flex items-center text-xs text-amber-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -7 days improved
            </div>
            <Progress value={75} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-teal-700">Engagement Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-teal-900 mb-1">91%</div>
            <div className="flex items-center text-xs text-teal-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +6% increase
            </div>
            <Progress value={91} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Alert */}
      <Alert className="border-purple-200 bg-purple-50">
        <Brain className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-800">
          <span className="font-medium">AI Talent Insights:</span> 4 new high-confidence predictions available. 
          Sales team intervention recommended for retention optimization.
          <Button variant="outline" size="sm" className="ml-2 h-6">
            View All Insights
          </Button>
        </AlertDescription>
      </Alert>

      {/* Main Talent Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Talent Overview</TabsTrigger>
          <TabsTrigger value="retention">Retention Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance Insights</TabsTrigger>
          <TabsTrigger value="succession">Succession Planning</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Talent Metrics Trends (6 Months)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={talentOverview}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="retention" 
                      fill="#10B981" 
                      fillOpacity={0.2}
                      stroke="#10B981"
                      name="Retention %"
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="satisfaction" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      name="Satisfaction"
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="performance" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      name="Performance"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-amber-600" />
                  <span>Performance Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={performanceDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="percentage"
                      label={(entry: any) => `${entry.level}: ${entry.percentage}%`}
                    >
                      {performanceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Talent Acquisition Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5 text-green-600" />
                <span>Talent Acquisition Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Hiring Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-green-900 mb-1">92%</div>
                    <p className="text-xs text-gray-600">Offer acceptance rate</p>
                    <Progress value={92} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Quality Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-blue-900 mb-1">8.1/10</div>
                    <p className="text-xs text-gray-600">90-day performance rating</p>
                    <Progress value={81} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-amber-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Cost Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-amber-900 mb-1">$7.2K</div>
                    <p className="text-xs text-gray-600">Average cost per hire</p>
                    <Progress value={78} className="h-2 mt-2" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5 text-cyan-600" />
                <span>Retention Risk Analysis by Department</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {retentionRiskAnalysis.map((dept, index) => (
                  <Card key={index} className="border-l-4 border-l-cyan-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{dept.department}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              dept.riskLevel === 'Low' 
                                ? 'bg-green-50 text-green-700'
                                : dept.riskLevel === 'Medium'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-red-50 text-red-700'
                            }
                          >
                            {dept.riskLevel} Risk
                          </Badge>
                          <Badge variant="secondary">{dept.atRisk} at risk</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Total Employees:</span>
                          <div className="text-lg font-medium">{dept.totalEmployees}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Avg Tenure:</span>
                          <div className="text-lg font-medium">{dept.avgTenure} years</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Satisfaction:</span>
                          <div className="text-lg font-medium">{dept.satisfactionScore}%</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Intervention Success:</span>
                          <div className="text-lg font-medium">{dept.successRate}%</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <span className="text-sm text-gray-500">Top Risk Factors:</span>
                        <div className="flex flex-wrap gap-2">
                          {dept.topReasons.map((reason, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">{dept.interventions} active interventions</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm">
                            Plan Intervention
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    <span>Performance Distribution Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceDistribution.map((level, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: level.color }}
                          ></div>
                          <div>
                            <div className="font-medium">{level.level}</div>
                            <div className="text-sm text-gray-500">{level.count.toLocaleString()} employees</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-medium">{level.percentage}%</div>
                          <Progress value={level.percentage * 2} className="h-1 w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">High Performers</span>
                  </div>
                  <p className="text-xs text-green-700">
                    40% of workforce exceeds expectations. 15% higher than industry average.
                  </p>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-800">Improvement Opportunity</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    10% underperforming. Targeted development programs show 78% success rate.
                  </p>
                </div>

                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-800">AI Recommendation</span>
                  </div>
                  <p className="text-xs text-purple-700">
                    Personalized development plans could move 67% of "meets expectations" to "exceeds".
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="succession" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-green-600" />
                <span>Executive Succession Planning Matrix</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {successionPlanning.map((role, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-sm">{role.role}</CardTitle>
                          <p className="text-xs text-gray-500">Current: {role.incumbent}</p>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {role.readyNow + role.developing + role.identified} Candidates
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-2xl text-green-900 mb-1">{role.readyNow}</div>
                          <div className="text-xs text-green-700">Ready Now</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-2xl text-blue-900 mb-1">{role.developing}</div>
                          <div className="text-xs text-blue-700">Developing</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="text-2xl text-purple-900 mb-1">{role.identified}</div>
                          <div className="text-xs text-purple-700">Identified</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Succession strength: {
                          role.readyNow >= 2 ? 'Strong' : role.readyNow >= 1 ? 'Adequate' : 'Needs Development'
                        }</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View Candidates</Button>
                          <Button size="sm">Develop Plan</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>AI-Powered Talent Predictions & Interventions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictiveInsights.map((insight, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{insight.title}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              insight.impact === 'High' 
                                ? 'bg-red-50 text-red-700'
                                : 'bg-blue-50 text-blue-700'
                            }
                          >
                            {insight.impact} Impact
                          </Badge>
                          <Badge variant="secondary">{insight.confidence}% Confidence</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-700">{insight.description}</p>
                      
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Zap className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-800">Recommended Action</span>
                        </div>
                        <p className="text-xs text-blue-700">{insight.recommendation}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Department: {insight.department}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View Analysis</Button>
                          <Button size="sm">Implement Action</Button>
                        </div>
                      </div>
                      <Progress value={insight.confidence} className="h-1" />
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