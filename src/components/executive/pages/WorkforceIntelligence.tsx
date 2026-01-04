import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Alert, AlertDescription } from "../../ui/alert"
import { 
  Brain, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Target,
  Zap,
  Eye,
  Clock,
  BarChart3,
  Lightbulb,
  CheckCircle,
  Calendar,
  Star,
  Award,
  Shield
} from 'lucide-react'
import { Line, ComposedChart, Area, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Workforce Intelligence Data
const workforceMetrics = [
  { month: 'Aug', headcount: 2780, productivity: 85.2, utilization: 78.5, satisfaction: 82.1, skillGap: 23, retention: 94.2 },
  { month: 'Sep', headcount: 2805, productivity: 87.3, utilization: 81.2, satisfaction: 84.3, skillGap: 21, retention: 95.1 },
  { month: 'Oct', headcount: 2825, productivity: 91.1, utilization: 85.8, satisfaction: 87.2, skillGap: 18, retention: 93.8 },
  { month: 'Nov', headcount: 2839, productivity: 89.4, utilization: 83.4, satisfaction: 85.8, skillGap: 20, retention: 96.3 },
  { month: 'Dec', headcount: 2845, productivity: 92.8, utilization: 88.1, satisfaction: 89.6, skillGap: 16, retention: 95.7 },
  { month: 'Jan', headcount: 2847, productivity: 95.2, utilization: 91.3, satisfaction: 92.1, skillGap: 14, retention: 97.1 }
]

const predictiveAnalytics = [
  {
    prediction: 'Optimal Workforce Size',
    current: 2847,
    predicted: 3125,
    confidence: 94,
    timeframe: '6 months',
    rationale: 'Based on revenue growth trajectory and productivity trends',
    impact: 'High',
    recommendation: 'Begin hiring for Engineering and Sales roles'
  },
  {
    prediction: 'Skill Gap Evolution',
    current: '14% gap',
    predicted: '8% gap',
    confidence: 89,
    timeframe: '12 months',
    rationale: 'Current training programs and planned skill development initiatives',
    impact: 'Medium',
    recommendation: 'Accelerate AI/ML and data science training programs'
  },
  {
    prediction: 'Retention Risk',
    current: '55 at-risk',
    predicted: '32 at-risk',
    confidence: 92,
    timeframe: '3 months',
    rationale: 'Implementation of targeted retention strategies and culture improvements',
    impact: 'High',
    recommendation: 'Continue focus on recognition and career development'
  },
  {
    prediction: 'Productivity Ceiling',
    current: '95.2%',
    predicted: '98.7%',
    confidence: 87,
    timeframe: '9 months',
    rationale: 'AI automation and process optimization initiatives',
    impact: 'High',
    recommendation: 'Invest in advanced automation tools and workflow optimization'
  }
]

const workforceSegmentation = [
  { segment: 'High Performers', count: 854, percentage: 30, avgTenure: 3.8, retention: 98.5, color: '#10B981' },
  { segment: 'Consistent Contributors', count: 1423, percentage: 50, avgTenure: 2.9, retention: 96.2, color: '#3B82F6' },
  { segment: 'Developing Talent', count: 456, percentage: 16, avgTenure: 1.6, retention: 92.8, color: '#8B5CF6' },
  { segment: 'Performance Concerns', count: 114, percentage: 4, avgTenure: 2.1, retention: 78.3, color: '#F59E0B' }
]

const skillIntelligence = [
  {
    skill: 'Artificial Intelligence',
    demand: 95,
    supply: 32,
    gap: 63,
    growth: '+45%',
    criticality: 'Critical',
    timeToFill: '6 months',
    marketRate: '$145K'
  },
  {
    skill: 'Cloud Architecture',
    demand: 78,
    supply: 58,
    gap: 20,
    growth: '+23%',
    criticality: 'High',
    timeToFill: '3 months',
    marketRate: '$135K'
  },
  {
    skill: 'Data Science',
    demand: 82,
    supply: 45,
    gap: 37,
    growth: '+31%',
    criticality: 'Critical',
    timeToFill: '4 months',
    marketRate: '$125K'
  },
  {
    skill: 'DevOps',
    demand: 65,
    supply: 72,
    gap: -7,
    growth: '+12%',
    criticality: 'Medium',
    timeToFill: '2 months',
    marketRate: '$110K'
  },
  {
    skill: 'Product Management',
    demand: 45,
    supply: 38,
    gap: 7,
    growth: '+18%',
    criticality: 'Medium',
    timeToFill: '4 months',
    marketRate: '$140K'
  }
]

const workforceScenarios = [
  {
    scenario: 'Aggressive Growth',
    targetHeadcount: 3500,
    timeline: '18 months',
    investment: '$45M',
    projectedROI: '285%',
    riskLevel: 'High',
    keyAssumptions: ['Market expansion success', '40% revenue growth', 'Talent availability'],
    outcomes: ['Revenue +65%', 'Market share +25%', 'Operational strain']
  },
  {
    scenario: 'Steady Expansion',
    targetHeadcount: 3125,
    timeline: '12 months',
    investment: '$28M',
    projectedROI: '340%',
    riskLevel: 'Medium',
    keyAssumptions: ['Stable market conditions', '25% revenue growth', 'Balanced hiring'],
    outcomes: ['Revenue +35%', 'Improved efficiency', 'Sustainable growth']
  },
  {
    scenario: 'Optimization Focus',
    targetHeadcount: 2900,
    timeline: '6 months',
    investment: '$12M',
    projectedROI: '450%',
    riskLevel: 'Low',
    keyAssumptions: ['Productivity improvements', 'Automation success', 'Skill development'],
    outcomes: ['Margin improvement', 'Higher productivity', 'Enhanced capabilities']
  }
]

const aiInsights = [
  {
    type: 'workforce-planning',
    title: 'Optimal Hiring Window Detected',
    description: 'AI analysis suggests hiring 45 engineers in Q2 will maximize productivity gains while minimizing training overhead.',
    confidence: 93,
    impact: 'High',
    dataPoints: ['Historical hiring patterns', 'Onboarding efficiency', 'Market talent availability'],
    recommendation: 'Accelerate engineering recruitment for Q2 start dates'
  },
  {
    type: 'skill-gap',
    title: 'Critical Skill Shortage Prediction',
    description: 'Machine learning model predicts severe AI/ML talent shortage by Q3. Current gap will triple without intervention.',
    confidence: 91,
    impact: 'Critical',
    dataPoints: ['Industry trends', 'Internal demand growth', 'Training completion rates'],
    recommendation: 'Launch intensive AI/ML upskilling program immediately'
  },
  {
    type: 'retention',
    title: 'Proactive Retention Opportunity',
    description: 'Predictive model identifies 23 high-value employees with elevated flight risk due to career stagnation.',
    confidence: 88,
    impact: 'High',
    dataPoints: ['Engagement scores', 'Career progression patterns', 'Market movement'],
    recommendation: 'Implement personalized career acceleration plans'
  },
  {
    type: 'productivity',
    title: 'Workforce Productivity Optimization',
    description: 'Cross-team collaboration analysis reveals 18% productivity gain potential through strategic team restructuring.',
    confidence: 85,
    impact: 'Medium',
    dataPoints: ['Collaboration patterns', 'Project success rates', 'Team dynamics'],
    recommendation: 'Pilot new team structures in Engineering and Marketing'
  }
]

const capacityForecasting = [
  { quarter: 'Q1 2024', demand: 2850, capacity: 2847, utilization: 99.9, gap: 3 },
  { quarter: 'Q2 2024', demand: 3100, capacity: 2925, utilization: 94.4, gap: 175 },
  { quarter: 'Q3 2024', demand: 3350, capacity: 3125, utilization: 93.3, gap: 225 },
  { quarter: 'Q4 2024', demand: 3600, capacity: 3280, utilization: 91.1, gap: 320 }
]

export function WorkforceIntelligence() {

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Advanced Workforce Intelligence</h1>
          <p className="text-gray-600">AI-powered workforce analytics, predictive modeling, and strategic planning insights</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            <Brain className="h-3 w-3 mr-1" />
            AI Predictions
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Eye className="h-3 w-3 mr-1" />
            2,847 Analyzed
          </Badge>
        </div>
      </div>

      {/* Key Intelligence Metrics */}
      <div className="grid grid-cols-2 grid-cols-6 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Workforce Score</p>
              <p className="text-3xl font-bold text-gray-900">94.7</p>
              <p className="text-sm text-gray-500 mt-1">+3.2 vs industry</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilization Rate</p>
              <p className="text-3xl font-bold text-gray-900">91.3%</p>
              <p className="text-sm text-gray-500 mt-1">+5.8% improvement</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Skill Gap Index</p>
              <p className="text-3xl font-bold text-gray-900">14%</p>
              <p className="text-sm text-gray-500 mt-1">-9% reduction</p>
            </div>
            <TrendingDown className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Capacity Gap</p>
              <p className="text-3xl font-bold text-gray-900">175</p>
              <p className="text-sm text-gray-500 mt-1">Q2 projected</p>
            </div>
            <Clock className="w-8 h-8 text-amber-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Accuracy</p>
              <p className="text-3xl font-bold text-gray-900">92.4%</p>
              <p className="text-sm text-gray-500 mt-1">Model confidence</p>
            </div>
            <Brain className="w-8 h-8 text-teal-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Future Readiness</p>
              <p className="text-3xl font-bold text-gray-900">87%</p>
              <p className="text-sm text-gray-500 mt-1">Strategic score</p>
            </div>
            <Star className="w-8 h-8 text-rose-600" />
          </div>
        </Card>
      </div>

      {/* AI Intelligence Alert */}
      <Alert className="border-purple-200 bg-purple-50">
        <Brain className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-800">
          <span className="font-medium">Critical AI Insight:</span> Model predicts 63% skill gap in AI/ML capabilities by Q3. 
          Immediate upskilling intervention required to maintain competitive advantage.
          <Button variant="outline" size="sm" className="ml-2 h-6">
            View Action Plan
          </Button>
        </AlertDescription>
      </Alert>

      {/* Main Intelligence Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Intelligence Overview</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="skills">Skill Intelligence</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Planning</TabsTrigger>
          <TabsTrigger value="insights">Strategic Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Workforce Intelligence Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={workforceMetrics}>
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
                      name="Productivity %"
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="utilization" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      name="Utilization %"
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="satisfaction" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      name="Satisfaction %"
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="headcount" 
                      fill="#F59E0B" 
                      name="Headcount"
                      opacity={0.7}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Workforce Segmentation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={workforceSegmentation}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="percentage"
                      label={(entry: any) => `${entry.segment}: ${entry.percentage}%`}
                    >
                      {workforceSegmentation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Workforce Segmentation Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span>Detailed Workforce Segmentation Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 grid-cols-4 gap-4">
                {workforceSegmentation.map((segment, index) => (
                  <Card key={index} className="border-l-4" style={{ borderLeftColor: segment.color }}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{segment.segment}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-center">
                        <div className="text-2xl mb-1" style={{ color: segment.color }}>
                          {segment.count.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">{segment.percentage}% of workforce</div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Avg Tenure:</span>
                          <span>{segment.avgTenure} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Retention:</span>
                          <span className="text-green-600">{segment.retention}%</span>
                        </div>
                      </div>
                      
                      <Progress value={segment.retention} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Capacity Forecasting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-amber-600" />
                <span>Capacity vs Demand Forecasting</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={capacityForecasting}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="capacity" fill="#10B981" name="Available Capacity" />
                  <Bar dataKey="demand" fill="#EF4444" name="Projected Demand" />
                  <Line type="monotone" dataKey="utilization" stroke="#8B5CF6" strokeWidth={3} name="Utilization %" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>AI-Powered Workforce Predictions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictiveAnalytics.map((prediction, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{prediction.prediction}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              prediction.impact === 'Critical' 
                                ? 'bg-red-50 text-red-700'
                                : prediction.impact === 'High'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-blue-50 text-blue-700'
                            }
                          >
                            {prediction.impact} Impact
                          </Badge>
                          <Badge variant="secondary">{prediction.confidence}% Confidence</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <span className="text-gray-500 text-sm">Current State:</span>
                          <div className="text-lg font-medium">{prediction.current}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Predicted:</span>
                          <div className="text-lg font-medium text-blue-600">{prediction.predicted}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Timeframe:</span>
                          <div className="text-lg font-medium">{prediction.timeframe}</div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-sm text-blue-800 mb-1">AI Rationale</h4>
                        <p className="text-xs text-blue-700">{prediction.rationale}</p>
                      </div>

                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="text-sm text-green-800 mb-1">Recommended Action</h4>
                        <p className="text-xs text-green-700">{prediction.recommendation}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Prediction Confidence: {prediction.confidence}%</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View Model</Button>
                          <Button size="sm">Create Action Plan</Button>
                        </div>
                      </div>
                      <Progress value={prediction.confidence} className="h-1" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-amber-600" />
                <span>Strategic Skill Intelligence & Gap Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillIntelligence.map((skill, index) => (
                  <Card key={index} className="border-l-4 border-l-amber-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{skill.skill}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              skill.criticality === 'Critical' 
                                ? 'bg-red-50 text-red-700'
                                : skill.criticality === 'High'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-blue-50 text-blue-700'
                            }
                          >
                            {skill.criticality}
                          </Badge>
                          <Badge variant="secondary">{skill.gap > 0 ? `${skill.gap}% Gap` : `${Math.abs(skill.gap)}% Surplus`}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="text-2xl text-red-900 mb-1">{skill.demand}%</div>
                          <div className="text-xs text-red-700">Demand</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-2xl text-green-900 mb-1">{skill.supply}%</div>
                          <div className="text-xs text-green-700">Supply</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-2xl text-blue-900 mb-1">{skill.timeToFill}</div>
                          <div className="text-xs text-blue-700">Time to Fill</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="text-2xl text-purple-900 mb-1">{skill.marketRate}</div>
                          <div className="text-xs text-purple-700">Market Rate</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-sm text-gray-500">Market Growth:</span>
                          <div className="text-sm font-medium text-green-600">{skill.growth}</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Skill Plan</Button>
                          <Button size="sm">Start Training</Button>
                        </div>
                      </div>
                      
                      <Progress value={skill.supply} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <span>Strategic Workforce Scenario Planning</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workforceScenarios.map((scenario, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{scenario.scenario}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              scenario.riskLevel === 'High' 
                                ? 'bg-red-50 text-red-700'
                                : scenario.riskLevel === 'Medium'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-green-50 text-green-700'
                            }
                          >
                            {scenario.riskLevel} Risk
                          </Badge>
                          <Badge variant="secondary">{scenario.projectedROI} ROI</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <span className="text-gray-500 text-sm">Target Headcount:</span>
                          <div className="text-lg font-medium">{scenario.targetHeadcount.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Timeline:</span>
                          <div className="text-lg font-medium">{scenario.timeline}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Investment:</span>
                          <div className="text-lg font-medium text-red-600">{scenario.investment}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">Projected ROI:</span>
                          <div className="text-lg font-medium text-green-600">{scenario.projectedROI}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="text-sm text-gray-500">Key Assumptions:</span>
                          <div className="space-y-1">
                            {scenario.keyAssumptions.map((assumption, i) => (
                              <div key={i} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="h-3 w-3 text-blue-500" />
                                <span>{assumption}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-sm text-gray-500">Expected Outcomes:</span>
                          <div className="space-y-1">
                            {scenario.outcomes.map((outcome, i) => (
                              <div key={i} className="flex items-center space-x-2 text-sm">
                                <Star className="h-3 w-3 text-amber-500" />
                                <span>{outcome}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Risk Level: {scenario.riskLevel}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Detailed Analysis</Button>
                          <Button size="sm">Model Scenario</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <span>Strategic AI Insights & Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{insight.title}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              insight.impact === 'Critical' 
                                ? 'bg-red-50 text-red-700'
                                : insight.impact === 'High'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-blue-50 text-blue-700'
                            }
                          >
                            {insight.impact} Impact
                          </Badge>
                          <Badge variant="secondary">{insight.confidence}% Confidence</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-700">{insight.description}</p>
                      
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <h4 className="text-sm text-gray-800 mb-2">AI Analysis Based On:</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {insight.dataPoints.map((point, i) => (
                            <div key={i} className="flex items-center space-x-2 text-xs">
                              <Shield className="h-3 w-3 text-gray-500" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Zap className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-800">Strategic Recommendation</span>
                        </div>
                        <p className="text-xs text-green-700">{insight.recommendation}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">AI Model: {insight.type}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Deep Analysis</Button>
                          <Button size="sm">Execute Plan</Button>
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