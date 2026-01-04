import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Alert, AlertDescription } from "../../ui/alert"
import { 
  Target, 
  TrendingUp, 
  Map,
  Brain,
  Users,
  Zap,
  Flag,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Edit,
  Eye,
  Star,
  Shield
} from 'lucide-react'
import { Line, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Strategic planning data
const strategicObjectives = [
  {
    id: 1,
    objective: 'Scale Engineering Team by 40%',
    priority: 'High',
    status: 'In Progress',
    completion: 68,
    targetDate: '2024-12-31',
    owner: 'CHRO',
    dependencies: ['Hiring Plan', 'Budget Approval', 'Infrastructure'],
    kpis: ['Headcount Growth', 'Time to Productivity', 'Quality Score'],
    budget: '$2.8M',
    risk: 'Medium'
  },
  {
    id: 2,
    objective: 'Implement AI-Driven Analytics Platform',
    priority: 'Critical',
    status: 'Planning',
    completion: 25,
    targetDate: '2024-08-15',
    owner: 'CTO',
    dependencies: ['Technology Selection', 'Data Integration', 'Training'],
    kpis: ['Implementation Timeline', 'User Adoption', 'ROI Achievement'],
    budget: '$1.2M',
    risk: 'High'
  },
  {
    id: 3,
    objective: 'Achieve 98% Employee Satisfaction',
    priority: 'High',
    status: 'On Track',
    completion: 82,
    targetDate: '2024-06-30',
    owner: 'CHRO',
    dependencies: ['Culture Program', 'Benefits Enhancement', 'Recognition System'],
    kpis: ['Satisfaction Score', 'Retention Rate', 'Engagement Index'],
    budget: '$450K',
    risk: 'Low'
  },
  {
    id: 4,
    objective: 'Expand to International Markets',
    priority: 'Medium',
    status: 'Research',
    completion: 15,
    targetDate: '2025-03-31',
    owner: 'CEO',
    dependencies: ['Market Analysis', 'Legal Framework', 'Hiring Strategy'],
    kpis: ['Market Entry', 'Revenue Growth', 'Local Compliance'],
    budget: '$5.5M',
    risk: 'High'
  }
]

const scenarioModeling = [
  {
    scenario: 'Aggressive Growth',
    probability: 25,
    impact: 'High',
    description: 'Rapid expansion with 50% headcount growth',
    assumptions: ['Market demand sustains', 'Funding available', 'Talent acquisition success'],
    outcomes: {
      headcount: 4275,
      revenue: '+65%',
      costs: '+45%',
      timeframe: '18 months'
    },
    risks: ['Operational strain', 'Quality issues', 'Cultural dilution'],
    opportunities: ['Market leadership', 'Economy of scale', 'Innovation acceleration']
  },
  {
    scenario: 'Steady Growth',
    probability: 50,
    impact: 'Medium',
    description: 'Balanced expansion with controlled growth',
    assumptions: ['Stable market conditions', 'Gradual scaling', 'Quality focus'],
    outcomes: {
      headcount: 3560,
      revenue: '+35%',
      costs: '+25%',
      timeframe: '24 months'
    },
    risks: ['Competitor advancement', 'Market saturation', 'Talent shortage'],
    opportunities: ['Sustainable growth', 'Quality maintenance', 'Strong culture']
  },
  {
    scenario: 'Conservative Approach',
    probability: 20,
    impact: 'Low',
    description: 'Cautious growth with efficiency focus',
    assumptions: ['Economic uncertainty', 'Resource constraints', 'Market volatility'],
    outcomes: {
      headcount: 3125,
      revenue: '+18%',
      costs: '+12%',
      timeframe: '36 months'
    },
    risks: ['Missed opportunities', 'Talent loss', 'Competitive disadvantage'],
    opportunities: ['High efficiency', 'Strong margins', 'Risk mitigation']
  },
  {
    scenario: 'Transformation Focus',
    probability: 15,
    impact: 'High',
    description: 'Technology-led transformation with AI integration',
    assumptions: ['AI adoption success', 'Workforce adaptation', 'Technology ROI'],
    outcomes: {
      headcount: 2950,
      revenue: '+42%',
      costs: '+8%',
      timeframe: '30 months'
    },
    risks: ['Implementation challenges', 'Resistance to change', 'Technology obsolescence'],
    opportunities: ['Automation benefits', 'Competitive advantage', 'Innovation leadership']
  }
]

const workforcePlanning = [
  { quarter: 'Q1 2024', current: 2847, planned: 2925, variance: 78, investment: '$850K' },
  { quarter: 'Q2 2024', current: 2925, planned: 3125, variance: 200, investment: '$1.2M' },
  { quarter: 'Q3 2024', current: 3125, planned: 3380, variance: 255, investment: '$1.5M' },
  { quarter: 'Q4 2024', current: 3380, planned: 3650, variance: 270, investment: '$1.8M' }
]

const strategicInitiatives = [
  {
    initiative: 'Digital Transformation Program',
    phase: 'Implementation',
    progress: 72,
    budget: '$3.2M',
    roi: '285%',
    timeline: '18 months',
    team: 'Cross-functional',
    impact: 'High',
    status: 'On Track'
  },
  {
    initiative: 'Global Talent Acquisition',
    phase: 'Planning',
    progress: 35,
    budget: '$1.8M',
    roi: '340%',
    timeline: '24 months',
    team: 'HR + Operations',
    impact: 'High',
    status: 'In Progress'
  },
  {
    initiative: 'Sustainability & ESG Program',
    phase: 'Research',
    progress: 20,
    budget: '$950K',
    roi: '180%',
    timeline: '36 months',
    team: 'Compliance + Operations',
    impact: 'Medium',
    status: 'Planning'
  },
  {
    initiative: 'Innovation Lab Establishment',
    phase: 'Implementation',
    progress: 58,
    budget: '$2.1M',
    roi: '420%',
    timeline: '15 months',
    team: 'Engineering + R&D',
    impact: 'High',
    status: 'On Track'
  }
]

const riskAssessment = [
  {
    risk: 'Talent Shortage in Key Skills',
    probability: 'High',
    impact: 'High',
    mitigation: 'Enhanced training programs, competitive compensation, partnerships with universities',
    owner: 'CHRO',
    status: 'Monitoring'
  },
  {
    risk: 'Economic Downturn Impact',
    probability: 'Medium',
    impact: 'High',
    mitigation: 'Diversified revenue streams, cost flexibility, emergency fund allocation',
    owner: 'CFO',
    status: 'Prepared'
  },
  {
    risk: 'Technology Disruption',
    probability: 'Medium',
    impact: 'Medium',
    mitigation: 'Continuous innovation, technology partnerships, R&D investment',
    owner: 'CTO',
    status: 'Monitoring'
  },
  {
    risk: 'Regulatory Changes',
    probability: 'Low',
    impact: 'Medium',
    mitigation: 'Compliance monitoring, legal consultation, proactive adaptation',
    owner: 'CLO',
    status: 'Prepared'
  }
]

const kpiTracking = [
  { kpi: 'Workforce Growth Rate', target: 25, current: 22.8, trend: 'up', status: 'On Track' },
  { kpi: 'Employee Satisfaction', target: 90, current: 92.1, trend: 'up', status: 'Exceeding' },
  { kpi: 'Digital Transformation ROI', target: 250, current: 285, trend: 'up', status: 'Exceeding' },
  { kpi: 'Skill Gap Reduction', target: 85, current: 86, trend: 'up', status: 'On Track' },
  { kpi: 'Innovation Index', target: 80, current: 82.4, trend: 'up', status: 'On Track' },
  { kpi: 'Cost Efficiency Improvement', target: 15, current: 18.2, trend: 'up', status: 'Exceeding' }
]

export function StrategicPlanning() {

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Strategic Planning Center</h1>
          <p className="text-gray-600">Advanced scenario modeling, workforce planning, and strategic roadmapping tools</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-violet-50 text-violet-700">
            <Target className="h-3 w-3 mr-1" />
            4 Active Objectives
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            68% Avg Progress
          </Badge>
        </div>
      </div>

      {/* Strategic KPIs Overview */}
      <div className="grid grid-cols-2 grid-cols-6 gap-4">
        {kpiTracking.map((kpi, index) => (
          <Card key={index} className={`${
            kpi.status === 'Exceeding' ? 'bg-linear-to-br from-green-50 to-green-100 border-green-200' :
            kpi.status === 'On Track' ? 'bg-linear-to-br from-blue-50 to-blue-100 border-blue-200' :
            'bg-linear-to-br from-amber-50 to-amber-100 border-amber-200'
          }`}>
            <CardHeader className="pb-2">
              <CardTitle className={`text-sm ${
                kpi.status === 'Exceeding' ? 'text-green-700' :
                kpi.status === 'On Track' ? 'text-blue-700' :
                'text-amber-700'
              }`}>
                {kpi.kpi}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl mb-1 ${
                kpi.status === 'Exceeding' ? 'text-green-900' :
                kpi.status === 'On Track' ? 'text-blue-900' :
                'text-amber-900'
              }`}>
                {kpi.current}{kpi.kpi.includes('Rate') || kpi.kpi.includes('Satisfaction') || kpi.kpi.includes('Reduction') || kpi.kpi.includes('Index') ? '%' : kpi.kpi.includes('ROI') ? '%' : ''}
              </div>
              <div className={`flex items-center text-xs ${
                kpi.status === 'Exceeding' ? 'text-green-600' :
                kpi.status === 'On Track' ? 'text-blue-600' :
                'text-amber-600'
              }`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                Target: {kpi.target}
              </div>
              <Progress value={(kpi.current / kpi.target) * 100} className="h-1 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Strategic Planning Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Brain className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <span className="font-medium">Strategic Insight:</span> Current trajectory indicates 22% ahead of schedule on digital transformation. 
          Consider accelerating complementary initiatives for maximum synergy.
          <Button variant="outline" size="sm" className="ml-2 h-6">
            View Recommendations
          </Button>
        </AlertDescription>
      </Alert>

      {/* Main Strategic Planning Dashboard */}
      <Tabs defaultValue="objectives" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="objectives">Strategic Objectives</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Modeling</TabsTrigger>
          <TabsTrigger value="workforce">Workforce Planning</TabsTrigger>
          <TabsTrigger value="initiatives">Key Initiatives</TabsTrigger>
          <TabsTrigger value="risks">Risk Management</TabsTrigger>
        </TabsList>

        <TabsContent value="objectives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Flag className="h-5 w-5 text-purple-600" />
                <span>Strategic Objectives Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategicObjectives.map((objective) => (
                  <Card key={objective.id} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{objective.objective}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              objective.priority === 'Critical' 
                                ? 'bg-red-50 text-red-700'
                                : objective.priority === 'High'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-blue-50 text-blue-700'
                            }
                          >
                            {objective.priority} Priority
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className={
                              objective.status === 'On Track' 
                                ? 'bg-green-50 text-green-700'
                                : objective.status === 'In Progress'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-gray-50 text-gray-700'
                            }
                          >
                            {objective.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Owner:</span>
                          <div className="font-medium">{objective.owner}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Target Date:</span>
                          <div className="font-medium">{objective.targetDate}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Budget:</span>
                          <div className="font-medium text-green-600">{objective.budget}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Risk Level:</span>
                          <div className={`font-medium ${
                            objective.risk === 'High' ? 'text-red-600' :
                            objective.risk === 'Medium' ? 'text-amber-600' :
                            'text-green-600'
                          }`}>{objective.risk}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Progress: {objective.completion}%</span>
                          <span className="text-sm">{objective.completion > 75 ? 'Excellent' : objective.completion > 50 ? 'Good' : 'Needs Attention'}</span>
                        </div>
                        <Progress value={objective.completion} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="text-sm text-gray-500">Dependencies:</span>
                          <div className="space-y-1">
                            {objective.dependencies.map((dep, i) => (
                              <div key={i} className="flex items-center space-x-2 text-xs">
                                <CheckCircle className="h-3 w-3 text-blue-500" />
                                <span>{dep}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-sm text-gray-500">Key KPIs:</span>
                          <div className="space-y-1">
                            {objective.kpis.map((kpi, i) => (
                              <div key={i} className="flex items-center space-x-2 text-xs">
                                <BarChart3 className="h-3 w-3 text-green-500" />
                                <span>{kpi}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Objective ID: #{objective.id}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Update
                          </Button>
                          <Button size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Details
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

        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Map className="h-5 w-5 text-green-600" />
                <span>Strategic Scenario Modeling</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scenarioModeling.map((scenario, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{scenario.scenario}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              scenario.impact === 'High' 
                                ? 'bg-red-50 text-red-700'
                                : scenario.impact === 'Medium'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-green-50 text-green-700'
                            }
                          >
                            {scenario.impact} Impact
                          </Badge>
                          <Badge variant="secondary">{scenario.probability}% Probability</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-700">{scenario.description}</p>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-lg text-blue-900 mb-1">{scenario.outcomes.headcount.toLocaleString()}</div>
                          <div className="text-xs text-blue-700">Target Headcount</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-lg text-green-900 mb-1">{scenario.outcomes.revenue}</div>
                          <div className="text-xs text-green-700">Revenue Growth</div>
                        </div>
                        <div className="text-center p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="text-lg text-amber-900 mb-1">{scenario.outcomes.costs}</div>
                          <div className="text-xs text-amber-700">Cost Increase</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="text-lg text-purple-900 mb-1">{scenario.outcomes.timeframe}</div>
                          <div className="text-xs text-purple-700">Timeline</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <span className="text-sm text-gray-500">Key Assumptions:</span>
                          <div className="space-y-1">
                            {scenario.assumptions.map((assumption, i) => (
                              <div key={i} className="flex items-center space-x-2 text-xs">
                                <CheckCircle className="h-3 w-3 text-blue-500" />
                                <span>{assumption}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-sm text-gray-500">Risk Factors:</span>
                          <div className="space-y-1">
                            {scenario.risks.map((risk, i) => (
                              <div key={i} className="flex items-center space-x-2 text-xs">
                                <AlertTriangle className="h-3 w-3 text-red-500" />
                                <span>{risk}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-sm text-gray-500">Opportunities:</span>
                          <div className="space-y-1">
                            {scenario.opportunities.map((opportunity, i) => (
                              <div key={i} className="flex items-center space-x-2 text-xs">
                                <Star className="h-3 w-3 text-green-500" />
                                <span>{opportunity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Probability: {scenario.probability}%</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Detailed Model</Button>
                          <Button size="sm">Select Scenario</Button>
                        </div>
                      </div>
                      <Progress value={scenario.probability} className="h-1" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workforce" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Strategic Workforce Planning</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={workforcePlanning}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="current" fill="#10B981" name="Current Headcount" />
                  <Bar yAxisId="left" dataKey="planned" fill="#3B82F6" name="Planned Headcount" />
                  <Line yAxisId="left" type="monotone" dataKey="variance" stroke="#EF4444" strokeWidth={3} name="Variance" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-4 gap-4">
            {workforcePlanning.map((quarter, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{quarter.quarter}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Current:</span>
                      <span className="font-medium">{quarter.current.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Planned:</span>
                      <span className="font-medium text-blue-600">{quarter.planned.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Gap:</span>
                      <span className="font-medium text-amber-600">{quarter.variance}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Investment:</span>
                      <span className="font-medium text-green-600">{quarter.investment}</span>
                    </div>
                  </div>
                  <Progress value={(quarter.current / quarter.planned) * 100} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="initiatives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-amber-600" />
                <span>Strategic Initiative Portfolio</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategicInitiatives.map((initiative, index) => (
                  <Card key={index} className="border-l-4 border-l-amber-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{initiative.initiative}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              initiative.status === 'On Track' 
                                ? 'bg-green-50 text-green-700'
                                : initiative.status === 'In Progress'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-gray-50 text-gray-700'
                            }
                          >
                            {initiative.status}
                          </Badge>
                          <Badge variant="secondary">{initiative.phase}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-5 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Progress:</span>
                          <div className="font-medium">{initiative.progress}%</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Budget:</span>
                          <div className="font-medium text-red-600">{initiative.budget}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Expected ROI:</span>
                          <div className="font-medium text-green-600">{initiative.roi}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Timeline:</span>
                          <div className="font-medium">{initiative.timeline}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Team:</span>
                          <div className="font-medium">{initiative.team}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Implementation Progress</span>
                          <span className="text-sm">{initiative.impact} Impact</span>
                        </div>
                        <Progress value={initiative.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Current Phase: {initiative.phase}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View Roadmap</Button>
                          <Button size="sm">Manage Initiative</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-600" />
                <span>Strategic Risk Assessment & Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAssessment.map((risk, index) => (
                  <Card key={index} className="border-l-4 border-l-red-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{risk.risk}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              risk.probability === 'High' 
                                ? 'bg-red-50 text-red-700'
                                : risk.probability === 'Medium'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-green-50 text-green-700'
                            }
                          >
                            {risk.probability} Probability
                          </Badge>
                          <Badge 
                            variant="secondary"
                            className={
                              risk.impact === 'High' 
                                ? 'bg-red-50 text-red-700'
                                : 'bg-amber-50 text-amber-700'
                            }
                          >
                            {risk.impact} Impact
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-sm text-blue-800 mb-1">Mitigation Strategy</h4>
                        <p className="text-xs text-blue-700">{risk.mitigation}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Risk Owner:</span>
                          <div className="font-medium">{risk.owner}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <div className={`font-medium ${
                            risk.status === 'Prepared' ? 'text-green-600' : 'text-amber-600'
                          }`}>{risk.status}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Risk Level: {risk.probability} probability, {risk.impact} impact</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Update Assessment</Button>
                          <Button size="sm">Action Plan</Button>
                        </div>
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