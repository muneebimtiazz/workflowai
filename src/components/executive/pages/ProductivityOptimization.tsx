import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Alert, AlertDescription } from "../../ui/alert"
import { 
  Zap, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Target,
  Brain,
  Clock,
  Users,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Calculator,
  Gauge,
  ArrowRight,
  Timer,
  Cog
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, ComposedChart, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Productivity data
const productivityMetrics = [
  { month: 'Aug', overall: 85.2, engineering: 88.1, sales: 82.4, marketing: 86.7, operations: 79.8, revenue: 2.1 },
  { month: 'Sep', overall: 87.3, engineering: 89.5, sales: 84.1, marketing: 88.2, operations: 81.3, revenue: 2.3 },
  { month: 'Oct', overall: 91.1, engineering: 93.2, sales: 87.8, marketing: 92.1, operations: 85.6, revenue: 2.7 },
  { month: 'Nov', overall: 89.4, engineering: 91.8, sales: 86.2, marketing: 90.5, operations: 83.7, revenue: 2.5 },
  { month: 'Dec', overall: 92.8, engineering: 95.1, sales: 89.6, marketing: 94.2, operations: 87.9, revenue: 2.9 },
  { month: 'Jan', overall: 95.2, engineering: 97.3, sales: 92.1, marketing: 96.8, operations: 90.4, revenue: 3.2 }
]

const roiInitiatives = [
  {
    name: 'AI Automation Implementation',
    investment: 500000,
    projectedSavings: 2300000,
    actualSavings: 2450000,
    roi: 390,
    status: 'Completed',
    timeline: '12 months',
    impact: 'High',
    description: 'Automated routine tasks across all departments',
    kpis: ['45% reduction in manual tasks', '23% faster processing', '15% error reduction']
  },
  {
    name: 'Remote Work Infrastructure',
    investment: 150000,
    projectedSavings: 890000,
    actualSavings: 920000,
    roi: 513,
    status: 'Completed',
    timeline: '6 months',
    impact: 'High',
    description: 'Enhanced remote work capabilities and tools',
    kpis: ['30% reduction in office costs', '18% productivity increase', '25% employee satisfaction']
  },
  {
    name: 'Advanced Training Programs',
    investment: 300000,
    projectedSavings: 1200000,
    actualSavings: 980000,
    roi: 227,
    status: 'Ongoing',
    timeline: '18 months',
    impact: 'Medium',
    description: 'Comprehensive skill development and upskilling',
    kpis: ['35% skill improvement', '22% faster task completion', '12% promotion rate']
  },
  {
    name: 'Wellness & Mental Health',
    investment: 100000,
    projectedSavings: 450000,
    actualSavings: 520000,
    roi: 420,
    status: 'Ongoing',
    timeline: '24 months',
    impact: 'Medium',
    description: 'Employee wellness programs and mental health support',
    kpis: ['28% reduction in sick days', '19% stress level decrease', '31% engagement increase']
  },
  {
    name: 'Process Optimization',
    investment: 75000,
    projectedSavings: 380000,
    actualSavings: 0,
    roi: 407,
    status: 'Planning',
    timeline: '9 months',
    impact: 'High',
    description: 'Workflow optimization and lean process implementation',
    kpis: ['Projected 35% time savings', 'Reduced handoffs by 40%', '20% faster delivery']
  }
]

const efficiencyAnalysis = [
  {
    department: 'Engineering',
    currentEfficiency: 94.2,
    potential: 97.8,
    gap: 3.6,
    topBottlenecks: ['Code reviews', 'Meeting overhead', 'Context switching'],
    solutions: ['Automated reviews', 'Meeting optimization', 'Focus blocks'],
    estimatedGain: '$450K annually'
  },
  {
    department: 'Sales',
    currentEfficiency: 88.7,
    potential: 94.2,
    gap: 5.5,
    topBottlenecks: ['Lead qualification', 'CRM updates', 'Proposal generation'],
    solutions: ['AI lead scoring', 'Auto-sync tools', 'Template system'],
    estimatedGain: '$680K annually'
  },
  {
    department: 'Marketing',
    currentEfficiency: 91.3,
    potential: 95.6,
    gap: 4.3,
    topBottlenecks: ['Content creation', 'Campaign analysis', 'Cross-team coordination'],
    solutions: ['AI content tools', 'Automated reporting', 'Unified platforms'],
    estimatedGain: '$320K annually'
  },
  {
    department: 'Operations',
    currentEfficiency: 85.9,
    potential: 92.4,
    gap: 6.5,
    topBottlenecks: ['Manual reporting', 'Data entry', 'Approval workflows'],
    solutions: ['Dashboard automation', 'RPA implementation', 'Digital approvals'],
    estimatedGain: '$290K annually'
  }
]

const timeAllocation = [
  { activity: 'Deep Work', current: 42, optimal: 55, gap: 13, impact: 'High' },
  { activity: 'Collaboration', current: 28, optimal: 25, gap: -3, impact: 'Medium' },
  { activity: 'Administrative', current: 18, optimal: 12, gap: -6, impact: 'High' },
  { activity: 'Meetings', current: 12, optimal: 8, gap: -4, impact: 'Medium' }
]

const productivityDrivers = [
  {
    driver: 'Tool Optimization',
    impact: 23,
    confidence: 94,
    description: 'Upgrading to integrated productivity tools',
    recommendation: 'Implement unified workspace platform'
  },
  {
    driver: 'Flexible Scheduling',
    impact: 18,
    confidence: 89,
    description: 'Peak performance time alignment',
    recommendation: 'Personalized schedule optimization'
  },
  {
    driver: 'Skill Development',
    impact: 15,
    confidence: 87,
    description: 'Targeted upskilling programs',
    recommendation: 'AI-recommended learning paths'
  },
  {
    driver: 'Process Automation',
    impact: 31,
    confidence: 92,
    description: 'Eliminating repetitive manual tasks',
    recommendation: 'Expand RPA across all departments'
  }
]

const totalInvestment = roiInitiatives.reduce((sum, init) => sum + init.investment, 0)
const totalSavings = roiInitiatives.reduce((sum, init) => sum + init.actualSavings, 0)
const avgROI = totalSavings > 0 ? ((totalSavings - totalInvestment) / totalInvestment * 100) : 
              roiInitiatives.reduce((sum, init) => sum + init.roi, 0) / roiInitiatives.length

export function ProductivityOptimization() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Advanced Productivity Optimization</h1>
          <p className="text-gray-600">ROI analysis, efficiency improvements, and AI-powered productivity recommendations</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <DollarSign className="h-3 w-3 mr-1" />
            {avgROI.toFixed(0)}% Avg ROI
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Brain className="h-3 w-3 mr-1" />
            AI Insights
          </Badge>
        </div>
      </div>

      {/* Key Productivity Metrics */}
      <div className="grid grid-cols-2 grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700">Overall Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-900 mb-1">95.2%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3.2% vs target
            </div>
            <Progress value={95.2} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700">Revenue Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-900 mb-1">$3.2M</div>
            <div className="flex items-center text-xs text-blue-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +52% YoY growth
            </div>
            <Progress value={78} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-700">Efficiency Gain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-900 mb-1">+28%</div>
            <div className="flex items-center text-xs text-purple-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              Since automation
            </div>
            <Progress value={85} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-700">Time Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-amber-900 mb-1">1,247h</div>
            <div className="flex items-center text-xs text-amber-600">
              <Clock className="h-3 w-3 mr-1" />
              Per week saved
            </div>
            <Progress value={72} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-teal-700">Cost Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-teal-900 mb-1">$4.87M</div>
            <div className="flex items-center text-xs text-teal-600">
              <DollarSign className="h-3 w-3 mr-1" />
              Annual savings
            </div>
            <Progress value={91} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Productivity Insights Alert */}
      <Alert className="border-amber-200 bg-amber-50">
        <Lightbulb className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <span className="font-medium">Optimization Opportunity:</span> Process automation could yield an additional 
          $1.74M in annual savings across all departments. Sales department shows highest potential ROI.
          <Button variant="outline" size="sm" className="ml-2 h-6">
            View Recommendations
          </Button>
        </AlertDescription>
      </Alert>

      {/* Main Productivity Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Productivity Overview</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency Gaps</TabsTrigger>
          <TabsTrigger value="optimization">AI Optimization</TabsTrigger>
          <TabsTrigger value="recommendations">Action Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Productivity Trends by Department</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={productivityMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="overall" 
                      fill="#8B5CF6" 
                      fillOpacity={0.2}
                      stroke="#8B5CF6"
                      name="Overall Productivity"
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="engineering" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      name="Engineering"
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      name="Sales"
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="revenue" 
                      fill="#F59E0B" 
                      name="Revenue ($M)"
                      opacity={0.7}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gauge className="h-5 w-5 text-purple-600" />
                  <span>Current vs Optimal Time Allocation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeAllocation.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.activity}</span>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              item.impact === 'High' 
                                ? 'bg-red-50 text-red-700'
                                : 'bg-blue-50 text-blue-700'
                            }
                          >
                            {item.impact}
                          </Badge>
                          <span className="text-sm">
                            {item.current}% → {item.optimal}%
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <div className="text-xs text-gray-500">Current</div>
                          <Progress value={item.current * 2} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-gray-500">Optimal</div>
                          <Progress value={item.optimal * 2} className="h-2 bg-green-100" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Productivity Drivers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-amber-600" />
                <span>Top Productivity Enhancement Drivers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {productivityDrivers.map((driver, index) => (
                  <Card key={index} className="border-l-4 border-l-amber-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{driver.driver}</CardTitle>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700">
                          +{driver.impact}% Impact
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-gray-600">{driver.description}</p>
                      <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-700">{driver.recommendation}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{driver.confidence}% confidence</span>
                        <Button variant="outline" size="sm">Implement</Button>
                      </div>
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
                <Calculator className="h-5 w-5 text-green-600" />
                <span>Comprehensive ROI Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Investment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-green-900 mb-1">${(totalInvestment / 1000000).toFixed(1)}M</div>
                    <p className="text-xs text-gray-600">Across all initiatives</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Returns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-blue-900 mb-1">${(totalSavings / 1000000).toFixed(1)}M</div>
                    <p className="text-xs text-gray-600">Realized + projected</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Average ROI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-purple-900 mb-1">{avgROI.toFixed(0)}%</div>
                    <p className="text-xs text-gray-600">Portfolio performance</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {roiInitiatives.map((initiative, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{initiative.name}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              initiative.status === 'Completed' 
                                ? 'bg-green-50 text-green-700'
                                : initiative.status === 'Ongoing'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-amber-50 text-amber-700'
                            }
                          >
                            {initiative.status}
                          </Badge>
                          <Badge variant="secondary">{initiative.roi}% ROI</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-700">{initiative.description}</p>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Investment:</span>
                          <div className="text-red-600">-${(initiative.investment / 1000).toFixed(0)}K</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Projected Savings:</span>
                          <div className="text-blue-600">${(initiative.projectedSavings / 1000000).toFixed(1)}M</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Actual Savings:</span>
                          <div className="text-green-600">
                            {initiative.actualSavings > 0 
                              ? `${(initiative.actualSavings / 1000000).toFixed(1)}M`
                              : 'TBD'
                            }
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Timeline:</span>
                          <div>{initiative.timeline}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-sm text-gray-500">Key Performance Indicators:</span>
                        <div className="grid grid-cols-3 gap-2">
                          {initiative.kpis.map((kpi, i) => (
                            <div key={i} className="p-2 bg-gray-50 border rounded text-xs">
                              {kpi}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Impact Level: {initiative.impact}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          {initiative.status === 'Planning' && (
                            <Button size="sm">Approve Initiative</Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Department Efficiency Analysis & Improvement Opportunities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {efficiencyAnalysis.map((dept, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{dept.department}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {dept.gap.toFixed(1)}% Gap
                          </Badge>
                          <Badge variant="secondary">{dept.estimatedGain}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-2xl text-blue-900 mb-1">{dept.currentEfficiency}%</div>
                          <div className="text-xs text-blue-700">Current Efficiency</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-2xl text-green-900 mb-1">{dept.potential}%</div>
                          <div className="text-xs text-green-700">Potential Efficiency</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="text-2xl text-purple-900 mb-1">+{dept.gap.toFixed(1)}%</div>
                          <div className="text-xs text-purple-700">Improvement Opportunity</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="text-sm text-gray-500">Top Bottlenecks:</span>
                          <div className="space-y-1">
                            {dept.topBottlenecks.map((bottleneck, i) => (
                              <div key={i} className="flex items-center space-x-2 text-sm">
                                <AlertTriangle className="h-3 w-3 text-amber-500" />
                                <span>{bottleneck}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-sm text-gray-500">Recommended Solutions:</span>
                          <div className="space-y-1">
                            {dept.solutions.map((solution, i) => (
                              <div key={i} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span>{solution}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Est. Annual Value: {dept.estimatedGain}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Analyze Bottlenecks</Button>
                          <Button size="sm">Create Action Plan</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>AI-Powered Productivity Optimization</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg">Machine Learning Insights</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Brain className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm text-purple-800 mb-1">Pattern Recognition</h4>
                          <p className="text-xs text-purple-700">
                            AI identified optimal work patterns for each department. Engineering peaks 
                            at 10-11 AM, Sales at 2-4 PM.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm text-blue-800 mb-1">Predictive Recommendations</h4>
                          <p className="text-xs text-blue-700">
                            Model predicts 23% productivity increase with flexible scheduling 
                            implementation across all teams.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Target className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm text-green-800 mb-1">Optimization Targets</h4>
                          <p className="text-xs text-green-700">
                            Focus on reducing context switching (18% time loss) and improving 
                            deep work blocks (35% efficiency gain).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg">Automated Optimization Actions</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-amber-800">Smart Meeting Scheduler</h4>
                        <Badge variant="outline" className="bg-amber-100 text-amber-700">Active</Badge>
                      </div>
                      <p className="text-xs text-amber-700 mb-2">
                        AI automatically schedules meetings during low-productivity windows
                      </p>
                      <Progress value={87} className="h-1" />
                    </div>

                    <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-teal-800">Focus Time Protection</h4>
                        <Badge variant="outline" className="bg-teal-100 text-teal-700">Active</Badge>
                      </div>
                      <p className="text-xs text-teal-700 mb-2">
                        Automatically blocks distractions during peak performance hours
                      </p>
                      <Progress value={94} className="h-1" />
                    </div>

                    <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm text-pink-800">Workload Balancer</h4>
                        <Badge variant="outline" className="bg-pink-100 text-pink-700">Beta</Badge>
                      </div>
                      <p className="text-xs text-pink-700 mb-2">
                        Intelligently redistributes tasks based on capacity and skills
                      </p>
                      <Progress value={76} className="h-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cog className="h-5 w-5 text-gray-600" />
                <span>Strategic Action Plans & Implementation Roadmap</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-red-800">Immediate (0-30 days)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="text-xs text-red-800 mb-1">Process Automation - Sales</h4>
                      <p className="text-xs text-red-700">Implement CRM automation for lead scoring</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-red-600">ROI: 340%</span>
                        <Button variant="outline" size="sm">Start</Button>
                      </div>
                    </div>
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="text-xs text-red-800 mb-1">Meeting Optimization</h4>
                      <p className="text-xs text-red-700">Reduce meeting overhead by 25%</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-red-600">Impact: High</span>
                        <Button variant="outline" size="sm">Plan</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-blue-800">Short-term (1-3 months)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="text-xs text-blue-800 mb-1">AI Tool Integration</h4>
                      <p className="text-xs text-blue-700">Deploy unified productivity platform</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-blue-600">ROI: 280%</span>
                        <Button variant="outline" size="sm">Prepare</Button>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="text-xs text-blue-800 mb-1">Flexible Scheduling</h4>
                      <p className="text-xs text-blue-700">Implement personalized work schedules</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-blue-600">Impact: Medium</span>
                        <Button variant="outline" size="sm">Design</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-green-800">Long-term (3-12 months)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="text-xs text-green-800 mb-1">Advanced AI Analytics</h4>
                      <p className="text-xs text-green-700">Predictive workforce optimization</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-green-600">ROI: 450%</span>
                        <Button variant="outline" size="sm">Research</Button>
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="text-xs text-green-800 mb-1">Culture Transformation</h4>
                      <p className="text-xs text-green-700">Productivity-focused culture shift</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-green-600">Impact: High</span>
                        <Button variant="outline" size="sm">Plan</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">Implementation Timeline</h3>
                  <Badge variant="outline" className="bg-gray-100 text-gray-700">
                    Total Projected ROI: 367%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Q1 2024: Immediate wins implementation ($680K potential savings)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Q2-Q3 2024: Technology platform rollout ($1.2M investment, $3.1M ROI)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Q4 2024 - Q1 2025: Advanced AI implementation ($890K investment, $4.0M ROI)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}