import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Target,
  Brain,
  Activity,
  BarChart3,
  Zap,
  Award,
  AlertTriangle,
  CheckCircle,
  Heart,
  Clock,
  Eye
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Advanced performance data
const performanceTrends = [
  { 
    month: 'Jan', 
    overall: 85, 
    individual: 83, 
    team: 87, 
    cross_functional: 82,
    benchmark: 80,
    industry_avg: 78,
    productivity_score: 85,
    quality_score: 88,
    speed_score: 82
  },
  { 
    month: 'Feb', 
    overall: 87, 
    individual: 85, 
    team: 89, 
    cross_functional: 84,
    benchmark: 81,
    industry_avg: 79,
    productivity_score: 87,
    quality_score: 89,
    speed_score: 85
  },
  { 
    month: 'Mar', 
    overall: 91, 
    individual: 89, 
    team: 93, 
    cross_functional: 88,
    benchmark: 83,
    industry_avg: 80,
    productivity_score: 91,
    quality_score: 92,
    speed_score: 89
  },
  { 
    month: 'Apr', 
    overall: 89, 
    individual: 87, 
    team: 91, 
    cross_functional: 86,
    benchmark: 84,
    industry_avg: 81,
    productivity_score: 89,
    quality_score: 90,
    speed_score: 87
  },
  { 
    month: 'May', 
    overall: 93, 
    individual: 91, 
    team: 95, 
    cross_functional: 90,
    benchmark: 85,
    industry_avg: 82,
    productivity_score: 93,
    quality_score: 94,
    speed_score: 91
  },
  { 
    month: 'Jun', 
    overall: 95, 
    individual: 93, 
    team: 97, 
    cross_functional: 92,
    benchmark: 87,
    industry_avg: 83,
    productivity_score: 95,
    quality_score: 96,
    speed_score: 93
  }
]

const benchmarkComparisons = [
  { category: 'Code Quality', internal: 94, industry: 78, topPerformer: 96, target: 95 },
  { category: 'Delivery Speed', internal: 91, industry: 82, topPerformer: 94, target: 93 },
  { category: 'Innovation Rate', internal: 88, industry: 75, topPerformer: 92, target: 90 },
  { category: 'Collaboration', internal: 93, industry: 80, topPerformer: 95, target: 94 },
  { category: 'Customer Satisfaction', internal: 96, industry: 85, topPerformer: 98, target: 97 },
  { category: 'Employee Engagement', internal: 92, industry: 76, topPerformer: 94, target: 93 }
]

const workCultureInsights = [
  { 
    pattern: 'Deep Focus Sessions',
    percentage: 45,
    trend: 'increasing',
    impact: 'high',
    description: 'Extended periods of uninterrupted work',
    color: '#8B5CF6'
  },
  { 
    pattern: 'Collaborative Sprints',
    percentage: 30,
    trend: 'stable',
    impact: 'medium',
    description: 'Team-based intensive work periods',
    color: '#06B6D4'
  },
  { 
    pattern: 'Creative Exploration',
    percentage: 15,
    trend: 'increasing',
    impact: 'high',
    description: 'Innovation and experimentation time',
    color: '#10B981'
  },
  { 
    pattern: 'Learning & Development',
    percentage: 10,
    trend: 'increasing',
    impact: 'medium',
    description: 'Skill development activities',
    color: '#F59E0B'
  }
]

const retentionPredictions = [
  { 
    department: 'Engineering',
    current_retention: 97.2,
    predicted_6month: 96.8,
    risk_level: 'low',
    intervention_needed: false,
    key_factors: ['compensation', 'growth_opportunities', 'work_life_balance']
  },
  { 
    department: 'Sales',
    current_retention: 89.4,
    predicted_6month: 85.2,
    risk_level: 'medium',
    intervention_needed: true,
    key_factors: ['workload', 'commission_structure', 'team_dynamics']
  },
  { 
    department: 'Marketing',
    current_retention: 94.1,
    predicted_6month: 95.3,
    risk_level: 'low',
    intervention_needed: false,
    key_factors: ['creativity_freedom', 'technology_tools', 'recognition']
  },
  { 
    department: 'Operations',
    current_retention: 91.8,
    predicted_6month: 90.5,
    risk_level: 'medium',
    intervention_needed: true,
    key_factors: ['process_improvement', 'automation', 'career_development']
  }
]

export function PerformanceInsights() {

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Advanced Performance & Productivity Insights</h1>
          <p className="text-gray-600">Organization-wide performance trends with benchmark comparisons and ROI analysis</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Activity className="h-3 w-3 mr-1" />
            Analytics
          </Badge>
        </div>
      </div>

      {/* Performance KPIs */}
      <div className={`grid grid-cols-2 grid-cols-4 ${spacing.gap}`}>
        <Card className="bg-muted border-border">
          <CardHeader className="pb-2">
            <CardTitle className={`${typography.label} flex items-center`}>
              <BarChart3 className={`${iconSizes.sm} mr-1`} />
              Overall Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`${typography.stat} mb-1`}>95.2%</div>
            <div className={`flex items-center ${typography.helper} mb-2`}>
              <TrendingUp className={`${iconSizes.xs} mr-1`} />
              +8.7% vs industry avg
            </div>
            <Progress value={95.2} className="h-1" />
          </CardContent>
        </Card>

        <Card className="bg-muted border-border">
          <CardHeader className="pb-2">
            <CardTitle className={`${typography.label} flex items-center`}>
              <Target className={`${iconSizes.sm} mr-1`} />
              Quality Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`${typography.stat} mb-1`}>96.1%</div>
            <div className={`flex items-center ${typography.helper} mb-2`}>
              <TrendingUp className={`${iconSizes.xs} mr-1`} />
              Top 5% globally
            </div>
            <Progress value={96.1} className="h-1" />
          </CardContent>
        </Card>

        <Card className="bg-muted border-border">
          <CardHeader className="pb-2">
            <CardTitle className={`${typography.label} flex items-center`}>
              <Zap className={`${iconSizes.sm} mr-1`} />
              Speed Index
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`${typography.stat} mb-1`}>93.4%</div>
            <div className={`flex items-center ${typography.helper} mb-2`}>
              <TrendingUp className={`${iconSizes.xs} mr-1`} />
              +12.3% improvement
            </div>
            <Progress value={93.4} className="h-1" />
          </CardContent>
        </Card>

        <Card className="bg-muted border-border">
          <CardHeader className="pb-2">
            <CardTitle className={`${typography.label} flex items-center`}>
              <Award className={`${iconSizes.sm} mr-1`} />
              Innovation Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`${typography.stat} mb-1`}>88.7%</div>
            <div className={`flex items-center ${typography.helper} mb-2`}>
              <TrendingUp className={`${iconSizes.xs} mr-1`} />
              Leading industry
            </div>
            <Progress value={88.7} className="h-1" />
          </CardContent>
        </Card>
      </div>

      {/* Main Insights Dashboard */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmark Comparisons</TabsTrigger>
          <TabsTrigger value="culture">Work Culture Analysis</TabsTrigger>
          <TabsTrigger value="retention">Retention Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Performance Trends with ROI Analysis</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Export Analysis</Button>
                  <Button size="sm">Generate Deep Dive Report</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={performanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="overall" 
                    fill="#8B5CF6" 
                    fillOpacity={0.2}
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    name="Overall Performance"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="benchmark" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    strokeDasharray="5,5"
                    name="Internal Benchmark"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="industry_avg" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    strokeDasharray="3,3"
                    name="Industry Average"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Breakdown */}
          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-600" />
                  Individual Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={performanceTrends}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="individual" 
                      fill="#06B6D4" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Target className="h-4 w-4 mr-2 text-green-600" />
                  Team Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={performanceTrends}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="team" 
                      fill="#10B981" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-purple-600" />
                  Cross-Functional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={performanceTrends}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="cross_functional" 
                      fill="#8B5CF6" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <span>Benchmark Comparisons with Industry Standards</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={benchmarkComparisons} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="internal" fill="#8B5CF6" name="Our Performance" />
                  <Bar dataKey="industry" fill="#94A3B8" name="Industry Average" />
                  <Bar dataKey="topPerformer" fill="#10B981" name="Top Performer" />
                  <Bar dataKey="target" fill="#F59E0B" name="Our Target" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-green-800">Above Industry Average</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-green-900 mb-1">5/6</div>
                    <p className="text-xs text-green-700">categories outperforming</p>
                    <div className="mt-2 text-xs text-green-600">
                      Leading in Customer Satisfaction, Code Quality, and Collaboration
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-blue-800">Performance Gap</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-blue-900 mb-1">+12.4%</div>
                    <p className="text-xs text-blue-700">above industry average</p>
                    <div className="mt-2 text-xs text-blue-600">
                      Strongest advantages in Quality and Engagement
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-purple-800">Improvement Opportunity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-purple-900 mb-1">Innovation</div>
                    <p className="text-xs text-purple-700">highest growth potential</p>
                    <div className="mt-2 text-xs text-purple-600">
                      4.5% gap to top performer level
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="culture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-600" />
                <span>Work Culture Analysis Through Activity Patterns</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg mb-4">Cultural Work Patterns</h3>
                  {workCultureInsights.map((pattern, index) => (
                    <Card key={index} className="border-l-4" style={{ borderLeftColor: pattern.color }}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">{pattern.pattern}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant="outline" 
                              className={
                                pattern.trend === 'increasing' 
                                  ? 'bg-green-50 text-green-700 border-green-200'
                                  : 'bg-gray-50 text-gray-700 border-gray-200'
                              }
                            >
                              {pattern.trend === 'increasing' ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <Activity className="h-3 w-3 mr-1" />
                              )}
                              {pattern.trend}
                            </Badge>
                            <Badge 
                              variant="outline"
                              className={
                                pattern.impact === 'high'
                                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                                  : 'bg-blue-50 text-blue-700 border-blue-200'
                              }
                            >
                              {pattern.impact} impact
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl" style={{ color: pattern.color }}>{pattern.percentage}%</span>
                          <span className="text-xs text-gray-600">of total work time</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{pattern.description}</p>
                        <Progress value={pattern.percentage} className="h-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg mb-4">Cultural Health Metrics</h3>
                  
                  <Card className="bg-linear-to-br from-green-50 to-green-100 border-green-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-green-800">Collaboration Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl text-green-900 mb-1">93.2%</div>
                      <p className="text-xs text-green-700 mb-2">Excellent cross-team integration</p>
                      <Progress value={93.2} className="h-2" />
                      <div className="mt-2 text-xs text-green-600">
                        <CheckCircle className="h-3 w-3 inline mr-1" />
                        30% of time spent in collaborative activities
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-purple-800">Focus Quality</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl text-purple-900 mb-1">89.7%</div>
                      <p className="text-xs text-purple-700 mb-2">High-quality deep work sessions</p>
                      <Progress value={89.7} className="h-2" />
                      <div className="mt-2 text-xs text-purple-600">
                        <Eye className="h-3 w-3 inline mr-1" />
                        45% of time in uninterrupted focus
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-blue-800">Innovation Index</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl text-blue-900 mb-1">85.4%</div>
                      <p className="text-xs text-blue-700 mb-2">Creative exploration time</p>
                      <Progress value={85.4} className="h-2" />
                      <div className="mt-2 text-xs text-blue-600">
                        <Brain className="h-3 w-3 inline mr-1" />
                        15% dedicated to innovation activities
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-linear-to-br from-amber-50 to-amber-100 border-amber-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-amber-800">Work-Life Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl text-amber-900 mb-1">91.8%</div>
                      <p className="text-xs text-amber-700 mb-2">Healthy work patterns</p>
                      <Progress value={91.8} className="h-2" />
                      <div className="mt-2 text-xs text-amber-600">
                        <Clock className="h-3 w-3 inline mr-1" />
                        Optimal break patterns observed
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Talent Retention Predictions with Intervention Strategies</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg mb-4">Department Retention Forecasts</h3>
                  {retentionPredictions.map((dept, index) => (
                    <Card 
                      key={index} 
                      className={`border-l-4 ${
                        dept.risk_level === 'low' 
                          ? 'border-l-green-500 bg-green-50' 
                          : dept.risk_level === 'medium'
                          ? 'border-l-amber-500 bg-amber-50'
                          : 'border-l-red-500 bg-red-50'
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">{dept.department}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant="outline"
                              className={
                                dept.risk_level === 'low'
                                  ? 'bg-green-100 text-green-800 border-green-300'
                                  : dept.risk_level === 'medium'
                                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                                  : 'bg-red-100 text-red-800 border-red-300'
                              }
                            >
                              {dept.risk_level} risk
                            </Badge>
                            {dept.intervention_needed && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Action needed
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <span className="text-xs text-gray-600">Current:</span>
                            <div className="text-lg text-gray-900">{dept.current_retention}%</div>
                          </div>
                          <div>
                            <span className="text-xs text-gray-600">6M Forecast:</span>
                            <div className={`text-lg ${
                              dept.predicted_6month >= dept.current_retention 
                                ? 'text-green-600' 
                                : 'text-amber-600'
                            }`}>
                              {dept.predicted_6month}%
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mb-2">Key factors:</div>
                        <div className="flex flex-wrap gap-1">
                          {dept.key_factors.map((factor, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {factor.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                        <Progress 
                          value={dept.predicted_6month} 
                          className="h-2 mt-3" 
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg mb-4">Intervention Strategies</h3>
                  
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-blue-800 flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        Sales Department Action Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-white border border-blue-200 rounded-lg">
                        <h4 className="text-xs text-blue-800 mb-1">Immediate (30 days)</h4>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li>• Workload rebalancing initiative</li>
                          <li>• One-on-one retention interviews</li>
                          <li>• Commission structure review</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-white border border-blue-200 rounded-lg">
                        <h4 className="text-xs text-blue-800 mb-1">Short-term (90 days)</h4>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li>• Team dynamics workshop</li>
                          <li>• Flexible work arrangements</li>
                          <li>• Performance support program</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-amber-50 border-amber-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-amber-800 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Operations Department Action Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-white border border-amber-200 rounded-lg">
                        <h4 className="text-xs text-amber-800 mb-1">Process Improvement</h4>
                        <ul className="text-xs text-amber-700 space-y-1">
                          <li>• Automation opportunities assessment</li>
                          <li>• Workflow optimization project</li>
                          <li>• Technology upgrade roadmap</li>
                        </ul>
                      </div>
                      <div className="p-3 bg-white border border-amber-200 rounded-lg">
                        <h4 className="text-xs text-amber-800 mb-1">Career Development</h4>
                        <ul className="text-xs text-amber-700 space-y-1">
                          <li>• Skills development program</li>
                          <li>• Leadership training track</li>
                          <li>• Cross-functional exposure</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-green-800">Overall Retention Outlook</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl text-green-900 mb-1">95.8%</div>
                      <p className="text-xs text-green-700 mb-2">Predicted org-wide retention (6M)</p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Target retention rate:</span>
                          <span className="text-green-600">96.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gap to target:</span>
                          <span className="text-amber-600">-0.7%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Departments at risk:</span>
                          <span className="text-blue-600">2 of 4</span>
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