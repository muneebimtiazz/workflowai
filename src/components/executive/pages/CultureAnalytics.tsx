import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Alert, AlertDescription } from "../../ui/alert"
import { 
  Heart, 
  Users, 
  Smile,
  TrendingUp,
  TrendingDown,
  MessageCircle,
  Award,
  Coffee,
  Clock,
  Target,
  Brain,
  ThumbsUp,
  ThumbsDown,
  Handshake,
  Calendar,
  Globe,
  Zap,
  Lightbulb,
  Shield,
  Star
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Culture analytics data
const cultureHealth = [
  { month: 'Aug', overall: 78, collaboration: 82, innovation: 75, wellbeing: 79, recognition: 74, workLife: 81 },
  { month: 'Sep', overall: 81, collaboration: 84, innovation: 78, wellbeing: 82, recognition: 77, workLife: 83 },
  { month: 'Oct', overall: 85, collaboration: 87, innovation: 83, wellbeing: 86, recognition: 82, workLife: 86 },
  { month: 'Nov', overall: 83, collaboration: 85, innovation: 81, wellbeing: 84, recognition: 80, workLife: 84 },
  { month: 'Dec', overall: 87, collaboration: 89, innovation: 86, wellbeing: 88, recognition: 85, workLife: 87 },
  { month: 'Jan', overall: 92, collaboration: 94, innovation: 91, wellbeing: 93, recognition: 89, workLife: 90 }
]

const sentimentAnalysis = [
  { department: 'Engineering', positive: 74, neutral: 21, negative: 5, sentiment: 8.3, change: '+0.6' },
  { department: 'Sales', positive: 68, neutral: 24, negative: 8, sentiment: 7.8, change: '+0.2' },
  { department: 'Marketing', positive: 82, neutral: 15, negative: 3, sentiment: 8.9, change: '+0.8' },
  { department: 'Operations', positive: 71, neutral: 23, negative: 6, sentiment: 8.1, change: '+0.4' },
  { department: 'HR', positive: 79, neutral: 18, negative: 3, sentiment: 8.7, change: '+0.5' },
  { department: 'Finance', positive: 73, neutral: 22, negative: 5, sentiment: 8.2, change: '+0.3' }
]

const collaborationMetrics = [
  { type: 'Cross-Department Projects', value: 48, trend: '+12%', color: '#10B981' },
  { type: 'Knowledge Sharing Sessions', value: 156, trend: '+23%', color: '#3B82F6' },
  { type: 'Mentorship Relationships', value: 89, trend: '+18%', color: '#8B5CF6' },
  { type: 'Team Building Activities', value: 34, trend: '+8%', color: '#F59E0B' },
  { type: 'Innovation Workshops', value: 22, trend: '+15%', color: '#EF4444' }
]

const culturalValues = [
  { value: 'Innovation', strength: 91, importance: 95, gap: -4, feedback: 'Strong innovation culture with room for experimentation' },
  { value: 'Collaboration', strength: 94, importance: 92, gap: 2, feedback: 'Excellent cross-team collaboration and knowledge sharing' },
  { value: 'Work-Life Balance', strength: 87, importance: 89, gap: -2, feedback: 'Good balance with flexible work arrangements' },
  { value: 'Transparency', strength: 83, importance: 88, gap: -5, feedback: 'Regular communication but room for improvement in decision transparency' },
  { value: 'Recognition', strength: 79, importance: 85, gap: -6, feedback: 'Recognition programs exist but could be more frequent and visible' },
  { value: 'Learning & Growth', strength: 88, importance: 91, gap: -3, feedback: 'Strong learning culture with professional development opportunities' }
]

const cultureRadarData = [
  { subject: 'Innovation', Engineering: 92, Sales: 78, Marketing: 95, Operations: 82, fullMark: 100 },
  { subject: 'Collaboration', Engineering: 88, Sales: 91, Marketing: 94, Operations: 85, fullMark: 100 },
  { subject: 'Autonomy', Engineering: 94, Sales: 86, Marketing: 89, Operations: 78, fullMark: 100 },
  { subject: 'Recognition', Engineering: 81, Sales: 74, Marketing: 87, Operations: 79, fullMark: 100 },
  { subject: 'Work-Life Balance', Engineering: 89, Sales: 82, Marketing: 91, Operations: 85, fullMark: 100 },
  { subject: 'Learning', Engineering: 93, Sales: 79, Marketing: 86, Operations: 84, fullMark: 100 }
]

const wellbeingMetrics = [
  { metric: 'Stress Level', current: 3.2, target: 2.5, status: 'Needs Attention', color: 'amber' },
  { metric: 'Work Satisfaction', current: 8.7, target: 8.5, status: 'Excellent', color: 'green' },
  { metric: 'Burnout Risk', current: 15, target: 10, status: 'Monitor', color: 'amber' },
  { metric: 'Engagement Score', current: 87, target: 85, status: 'Excellent', color: 'green' },
  { metric: 'Wellness Participation', current: 64, target: 70, status: 'Good', color: 'blue' }
]

const cultureInsights = [
  {
    type: 'positive',
    title: 'Innovation Culture Thriving',
    description: 'Marketing and Engineering teams show exceptional innovation scores (95% and 92%). Cross-pollination of ideas increasing.',
    confidence: 94,
    action: 'Expand innovation workshops to all departments'
  },
  {
    type: 'concern',
    title: 'Recognition Gap in Sales',
    description: 'Sales team shows lowest recognition satisfaction (74%). High performers may be at risk of disengagement.',
    confidence: 89,
    action: 'Implement peer-to-peer recognition program'
  },
  {
    type: 'opportunity',
    title: 'Remote Culture Success',
    description: 'Remote work policies show 18% increase in work-life balance satisfaction across all departments.',
    confidence: 92,
    action: 'Standardize flexible work policies company-wide'
  },
  {
    type: 'trend',
    title: 'Learning Culture Growth',
    description: 'Knowledge sharing sessions up 23% this quarter. High correlation with job satisfaction increases.',
    confidence: 88,
    action: 'Invest in learning management platform expansion'
  }
]

const teamDynamics = [
  { 
    team: 'Engineering', 
    cohesion: 92, 
    psychological_safety: 89, 
    communication: 87, 
    trust: 93,
    diversity_inclusion: 88,
    leadership_satisfaction: 91
  },
  { 
    team: 'Sales', 
    cohesion: 84, 
    psychological_safety: 81, 
    communication: 83, 
    trust: 86,
    diversity_inclusion: 82,
    leadership_satisfaction: 78
  },
  { 
    team: 'Marketing', 
    cohesion: 95, 
    psychological_safety: 93, 
    communication: 94, 
    trust: 96,
    diversity_inclusion: 94,
    leadership_satisfaction: 92
  },
  { 
    team: 'Operations', 
    cohesion: 87, 
    psychological_safety: 85, 
    communication: 86, 
    trust: 89,
    diversity_inclusion: 85,
    leadership_satisfaction: 84
  }
]

export function CultureAnalytics() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Comprehensive Culture Analytics</h1>
          <p className="text-gray-600">AI-powered culture analysis through behavioral patterns, sentiment analysis, and team dynamics</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-rose-50 text-rose-700">
            <Heart className="h-3 w-3 mr-1" />
            Culture Score: 92%
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <TrendingUp className="h-3 w-3 mr-1" />
            +11% Growth
          </Badge>
        </div>
      </div>

      {/* Culture Health Overview */}
      <div className="grid grid-cols-2 grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-rose-700">Overall Culture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-rose-900 mb-1">92%</div>
            <div className="flex items-center text-xs text-rose-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5% this quarter
            </div>
            <Progress value={92} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-700">Collaboration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-900 mb-1">94%</div>
            <div className="flex items-center text-xs text-blue-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +7% improvement
            </div>
            <Progress value={94} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-700">Innovation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-900 mb-1">91%</div>
            <div className="flex items-center text-xs text-purple-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +16% growth
            </div>
            <Progress value={91} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-700">Wellbeing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-900 mb-1">93%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +7% increase
            </div>
            <Progress value={93} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-amber-700">Recognition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-amber-900 mb-1">89%</div>
            <div className="flex items-center text-xs text-amber-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% growth
            </div>
            <Progress value={89} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-teal-700">Work-Life Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-teal-900 mb-1">90%</div>
            <div className="flex items-center text-xs text-teal-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +9% improvement
            </div>
            <Progress value={90} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Culture Insights Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Brain className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <span className="font-medium">AI Culture Insight:</span> Innovation culture shows exceptional growth (+16%). 
          Marketing team leading innovation practices - recommend cross-team knowledge sharing sessions.
          <Button variant="outline" size="sm" className="ml-2 h-6">
            View Detailed Analysis
          </Button>
        </AlertDescription>
      </Alert>

      {/* Main Culture Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Culture Overview</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="collaboration">Team Dynamics</TabsTrigger>
          <TabsTrigger value="values">Cultural Values</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-rose-600" />
                  <span>Culture Health Trends (6 Months)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={cultureHealth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="overall" stroke="#E11D48" strokeWidth={3} name="Overall Culture" />
                    <Line type="monotone" dataKey="collaboration" stroke="#3B82F6" strokeWidth={2} name="Collaboration" />
                    <Line type="monotone" dataKey="innovation" stroke="#8B5CF6" strokeWidth={2} name="Innovation" />
                    <Line type="monotone" dataKey="wellbeing" stroke="#10B981" strokeWidth={2} name="Wellbeing" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Department Culture Radar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={cultureRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar dataKey="Engineering" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Engineering" />
                    <Radar dataKey="Marketing" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} name="Marketing" />
                    <Radar dataKey="Sales" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Sales" />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Collaboration Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Handshake className="h-5 w-5 text-green-600" />
                <span>Collaboration & Engagement Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 grid-cols-5 gap-4">
                {collaborationMetrics.map((metric, index) => (
                  <Card key={index} className="text-center p-4">
                    <div className="text-2xl font-semibold mb-1" style={{ color: metric.color }}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{metric.type}</div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {metric.trend}
                    </Badge>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Wellbeing Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-600" />
                <span>Employee Wellbeing Dashboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 grid-cols-5 gap-4">
                {wellbeingMetrics.map((metric, index) => (
                  <Card key={index} className={`border-l-4 ${
                    metric.color === 'green' ? 'border-l-green-500' :
                    metric.color === 'amber' ? 'border-l-amber-500' :
                    'border-l-blue-500'
                  }`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{metric.metric}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl mb-1">{metric.current}</div>
                      <div className="text-xs text-gray-500 mb-2">Target: {metric.target}</div>
                      <Badge 
                        variant="outline" 
                        className={
                          metric.color === 'green' ? 'bg-green-50 text-green-700' :
                          metric.color === 'amber' ? 'bg-amber-50 text-amber-700' :
                          'bg-blue-50 text-blue-700'
                        }
                      >
                        {metric.status}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <span>Department Sentiment Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sentimentAnalysis.map((dept, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{dept.department}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {dept.sentiment}/10 Sentiment
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className={
                              dept.change.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }
                          >
                            {dept.change}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-2xl text-green-900 mb-1">{dept.positive}%</div>
                          <div className="text-xs text-green-700 flex items-center justify-center">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Positive
                          </div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="text-2xl text-gray-900 mb-1">{dept.neutral}%</div>
                          <div className="text-xs text-gray-700">Neutral</div>
                        </div>
                        <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="text-2xl text-red-900 mb-1">{dept.negative}%</div>
                          <div className="text-xs text-red-700 flex items-center justify-center">
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            Negative
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Overall Sentiment Score: {dept.sentiment}/10</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View Feedback</Button>
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

        <TabsContent value="collaboration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>Team Dynamics & Psychological Safety</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamDynamics.map((team, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{team.team} Team</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Team Cohesion</span>
                            <span className="text-sm font-medium">{team.cohesion}%</span>
                          </div>
                          <Progress value={team.cohesion} className="h-1" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Psychological Safety</span>
                            <span className="text-sm font-medium">{team.psychological_safety}%</span>
                          </div>
                          <Progress value={team.psychological_safety} className="h-1" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Communication</span>
                            <span className="text-sm font-medium">{team.communication}%</span>
                          </div>
                          <Progress value={team.communication} className="h-1" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Trust Level</span>
                            <span className="text-sm font-medium">{team.trust}%</span>
                          </div>
                          <Progress value={team.trust} className="h-1" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Diversity & Inclusion</span>
                            <span className="text-sm font-medium">{team.diversity_inclusion}%</span>
                          </div>
                          <Progress value={team.diversity_inclusion} className="h-1" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs">Leadership Satisfaction</span>
                            <span className="text-sm font-medium">{team.leadership_satisfaction}%</span>
                          </div>
                          <Progress value={team.leadership_satisfaction} className="h-1" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">
                          Overall Team Health: {Math.round((team.cohesion + team.psychological_safety + team.communication + team.trust) / 4)}%
                        </span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Team Report</Button>
                          <Button size="sm">Improve Dynamics</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="values" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-amber-600" />
                <span>Cultural Values Assessment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {culturalValues.map((value, index) => (
                  <Card key={index} className="border-l-4 border-l-amber-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{value.value}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              value.gap >= 0 
                                ? 'bg-green-50 text-green-700'
                                : Math.abs(value.gap) <= 3
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-red-50 text-red-700'
                            }
                          >
                            {value.gap >= 0 ? '+' : ''}{value.gap} Gap
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Current Strength</span>
                            <span className="text-sm font-medium">{value.strength}%</span>
                          </div>
                          <Progress value={value.strength} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Employee Importance</span>
                            <span className="text-sm font-medium">{value.importance}%</span>
                          </div>
                          <Progress value={value.importance} className="h-2 bg-blue-100" />
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-700">{value.feedback}</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">
                          Alignment: {value.gap >= 0 ? 'Exceeds' : 'Below'} Expectations
                        </span>
                        <Button variant="outline" size="sm">Develop Action Plan</Button>
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
                <Brain className="h-5 w-5 text-purple-600" />
                <span>AI-Powered Culture Insights & Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cultureInsights.map((insight, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{insight.title}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              insight.type === 'positive' 
                                ? 'bg-green-50 text-green-700'
                                : insight.type === 'concern'
                                ? 'bg-red-50 text-red-700'
                                : insight.type === 'opportunity'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-purple-50 text-purple-700'
                            }
                          >
                            {insight.type === 'positive' ? 'Positive' :
                             insight.type === 'concern' ? 'Needs Attention' :
                             insight.type === 'opportunity' ? 'Opportunity' : 'Trend'}
                          </Badge>
                          <Badge variant="secondary">{insight.confidence}% Confidence</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-700">{insight.description}</p>
                      
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Lightbulb className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-800">Recommended Action</span>
                        </div>
                        <p className="text-xs text-green-700">{insight.action}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">AI Confidence: {insight.confidence}%</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View Analysis</Button>
                          <Button size="sm">Implement</Button>
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