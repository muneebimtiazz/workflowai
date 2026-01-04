import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Alert, AlertDescription } from "../../ui/alert"
import { 
  BarChart3, 
  FileText, 
  Download,
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Award,
  Zap,
  Brain,
  Eye,
  Send,
  Settings,
  Filter,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Plus,
  Edit,
  Share,
  Printer,
  Star
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, ComposedChart, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Executive reports data
const reportCategories = [
  {
    category: 'Workforce Analytics',
    reports: 12,
    lastGenerated: '2 hours ago',
    frequency: 'Daily',
    subscribers: 8,
    status: 'Active'
  },
  {
    category: 'Financial Performance',
    reports: 8,
    lastGenerated: '1 day ago',
    frequency: 'Weekly',
    subscribers: 12,
    status: 'Active'
  },
  {
    category: 'Operational Metrics',
    reports: 15,
    lastGenerated: '4 hours ago',
    frequency: 'Daily',
    subscribers: 6,
    status: 'Active'
  },
  {
    category: 'Strategic Insights',
    reports: 6,
    lastGenerated: '3 days ago',
    frequency: 'Monthly',
    subscribers: 15,
    status: 'Active'
  }
]

const scheduledReports = [
  {
    id: 1,
    name: 'Weekly Executive Summary',
    type: 'Executive Dashboard',
    nextRun: '2024-01-08 09:00',
    frequency: 'Weekly',
    recipients: ['CEO', 'COO', 'CHRO', 'CFO'],
    lastGenerated: '2024-01-01 09:00',
    status: 'Scheduled',
    format: 'PDF + Email',
    size: '2.4 MB'
  },
  {
    id: 2,
    name: 'Monthly Workforce Analytics',
    type: 'Detailed Analytics',
    nextRun: '2024-02-01 08:00',
    frequency: 'Monthly',
    recipients: ['CHRO', 'VP HR', 'Department Heads'],
    lastGenerated: '2024-01-01 08:00',
    status: 'Scheduled',
    format: 'Excel + Dashboard',
    size: '5.7 MB'
  },
  {
    id: 3,
    name: 'Daily Operations Brief',
    type: 'Operational Summary',
    nextRun: '2024-01-03 07:30',
    frequency: 'Daily',
    recipients: ['COO', 'Operations Team'],
    lastGenerated: '2024-01-02 07:30',
    status: 'Running',
    format: 'Email Summary',
    size: '0.8 MB'
  },
  {
    id: 4,
    name: 'Quarterly Strategic Review',
    type: 'Strategic Analysis',
    nextRun: '2024-04-01 10:00',
    frequency: 'Quarterly',
    recipients: ['Board Members', 'C-Suite'],
    lastGenerated: '2024-01-01 10:00',
    status: 'Scheduled',
    format: 'Presentation + PDF',
    size: '12.3 MB'
  }
]

const reportTemplates = [
  {
    name: 'Executive Dashboard',
    description: 'Comprehensive overview of key business metrics and KPIs',
    sections: ['Workforce Overview', 'Productivity Metrics', 'Financial Summary', 'Risk Assessment'],
    estimatedTime: '15 minutes',
    popularity: 95
  },
  {
    name: 'Talent Analytics Deep Dive',
    description: 'Detailed analysis of talent acquisition, retention, and development',
    sections: ['Hiring Trends', 'Retention Analysis', 'Skill Gaps', 'Performance Distribution'],
    estimatedTime: '25 minutes',
    popularity: 87
  },
  {
    name: 'Productivity Optimization Report',
    description: 'ROI analysis and productivity improvement recommendations',
    sections: ['Efficiency Metrics', 'Automation Impact', 'Cost Analysis', 'Recommendations'],
    estimatedTime: '20 minutes',
    popularity: 82
  },
  {
    name: 'Culture & Engagement Analysis',
    description: 'Employee sentiment, culture health, and engagement insights',
    sections: ['Sentiment Analysis', 'Culture Metrics', 'Engagement Trends', 'Action Items'],
    estimatedTime: '18 minutes',
    popularity: 78
  },
  {
    name: 'Compliance & Risk Assessment',
    description: 'GDPR compliance status, risk factors, and mitigation strategies',
    sections: ['Compliance Status', 'Risk Matrix', 'Audit Results', 'Remediation Plans'],
    estimatedTime: '22 minutes',
    popularity: 90
  }
]

const recentReports = [
  {
    id: 'RPT-2024-001',
    name: 'Q4 2023 Executive Summary',
    type: 'Executive Dashboard',
    generated: '2024-01-02 09:15',
    size: '3.2 MB',
    format: 'PDF',
    downloads: 47,
    status: 'Completed'
  },
  {
    id: 'RPT-2024-002',
    name: 'January Workforce Analytics',
    type: 'Talent Analytics',
    generated: '2024-01-02 08:30',
    size: '5.8 MB',
    format: 'Excel',
    downloads: 23,
    status: 'Completed'
  },
  {
    id: 'RPT-2024-003',
    name: 'Daily Operations Brief - Jan 2',
    type: 'Operational Summary',
    generated: '2024-01-02 07:30',
    size: '0.9 MB',
    format: 'Email',
    downloads: 156,
    status: 'Delivered'
  },
  {
    id: 'RPT-2024-004',
    name: 'Culture Analytics - December',
    type: 'Culture Analysis',
    generated: '2024-01-01 16:20',
    size: '4.1 MB',
    format: 'PDF',
    downloads: 31,
    status: 'Completed'
  }
]

const reportMetrics = [
  { metric: 'Total Reports Generated', value: '1,247', change: '+12%', period: 'This quarter' },
  { metric: 'Automated Reports', value: '89%', change: '+8%', period: 'Automation rate' },
  { metric: 'Average Generation Time', value: '3.4 min', change: '-15%', period: 'Faster processing' },
  { metric: 'Report Delivery Success', value: '99.7%', change: '+0.2%', period: 'Success rate' }
]

const keyInsights = [
  {
    insight: 'Productivity Surge',
    description: 'Q4 productivity increased 12% across all departments, with Engineering leading at 18% growth.',
    impact: 'High',
    confidence: 94,
    trend: 'up'
  },
  {
    insight: 'Talent Retention Success',
    description: 'Retention strategies implemented in Q3 resulted in 97.1% retention rate, exceeding target.',
    impact: 'High',
    confidence: 98,
    trend: 'up'
  },
  {
    insight: 'Cost Optimization Achievement',
    description: 'Automation initiatives delivered $4.87M in annual savings, 23% above projections.',
    impact: 'High',
    confidence: 91,
    trend: 'up'
  },
  {
    insight: 'Skills Gap Reduction',
    description: 'Training programs reduced critical skills gap from 23% to 14% in key technical areas.',
    impact: 'Medium',
    confidence: 87,
    trend: 'up'
  }
]

export function ExecutiveReports() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Executive Reporting Center</h1>
          <p className="text-gray-600">Automated strategic reports, business intelligence, and executive-level analytics</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-orange-50 text-orange-700">
            <BarChart3 className="h-3 w-3 mr-1" />
            41 Reports
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            89% Automated
          </Badge>
        </div>
      </div>

      {/* Report Metrics Overview */}
      <div className="grid grid-cols-2 grid-cols-4 gap-4">
        {reportMetrics.map((metric, index) => (
          <Card key={index} className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-orange-700">{metric.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-orange-900 mb-1">{metric.value}</div>
              <div className="flex items-center text-xs text-orange-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                {metric.change} {metric.period}
              </div>
              <Progress value={75} className="h-1 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-amber-600" />
            <span>Quick Report Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Plus className="h-5 w-5" />
              <span className="text-sm">Generate Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Schedule Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Settings className="h-5 w-5" />
              <span className="text-sm">Configure Templates</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Share className="h-5 w-5" />
              <span className="text-sm">Distribution Lists</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Brain className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <span className="font-medium">Latest Insights:</span> Q4 analysis shows 12% productivity surge and 97.1% retention success. 
          Automation initiatives exceeded savings targets by 23%.
          <Button variant="outline" size="sm" className="ml-2 h-6">
            View Full Analysis
          </Button>
        </AlertDescription>
      </Alert>

      {/* Main Reports Dashboard */}
      <Tabs defaultValue="scheduled" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="insights">Key Insights</TabsTrigger>
          <TabsTrigger value="analytics">Report Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span>Scheduled Report Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report) => (
                  <Card key={report.id} className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{report.name}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              report.status === 'Running' 
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-green-50 text-green-700'
                            }
                          >
                            {report.status}
                          </Badge>
                          <Badge variant="secondary">{report.frequency}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Next Run:</span>
                          <div className="font-medium">{report.nextRun}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Format:</span>
                          <div className="font-medium">{report.format}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Size:</span>
                          <div className="font-medium">{report.size}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Recipients:</span>
                          <div className="font-medium">{report.recipients.length} people</div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <span className="text-sm text-gray-500">Recipients: </span>
                        <span className="text-sm">{report.recipients.join(', ')}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Last Generated: {report.lastGenerated}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm">
                            <Send className="h-4 w-4 mr-1" />
                            Run Now
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

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>Executive Report Templates</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.map((template, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{template.name}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            <Star className="h-3 w-3 mr-1" />
                            {template.popularity}% Popular
                          </Badge>
                          <Badge variant="secondary">{template.estimatedTime}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-700">{template.description}</p>
                      
                      <div className="space-y-2">
                        <span className="text-sm text-gray-500">Report Sections:</span>
                        <div className="grid grid-cols-2 grid-cols-4 gap-2">
                          {template.sections.map((section, i) => (
                            <div key={i} className="p-2 bg-gray-50 border rounded text-xs text-center">
                              {section}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Estimated Generation Time: {template.estimatedTime}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Use Template
                          </Button>
                        </div>
                      </div>
                      <Progress value={template.popularity} className="h-1" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <span>Recently Generated Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <Card key={report.id} className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{report.name}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              report.status === 'Completed' 
                                ? 'bg-green-50 text-green-700'
                                : 'bg-blue-50 text-blue-700'
                            }
                          >
                            {report.status}
                          </Badge>
                          <Badge variant="secondary">{report.format}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Report ID:</span>
                          <div className="font-medium">{report.id}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Generated:</span>
                          <div className="font-medium">{report.generated}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">File Size:</span>
                          <div className="font-medium">{report.size}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Downloads:</span>
                          <div className="font-medium text-blue-600">{report.downloads}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Type: {report.type}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm">
                            <Share className="h-4 w-4 mr-1" />
                            Share
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

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-amber-600" />
                <span>AI-Generated Key Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keyInsights.map((insight, index) => (
                  <Card key={index} className="border-l-4 border-l-amber-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{insight.insight}</CardTitle>
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
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center space-x-2">
                          {insight.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span className="text-sm text-gray-600">Trending {insight.trend}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Deep Analysis</Button>
                          <Button size="sm">Create Report</Button>
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

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <span>Report Generation Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={reportCategories}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reports" fill="#10B981" name="Reports Generated" />
                    <Line type="monotone" dataKey="subscribers" stroke="#3B82F6" strokeWidth={3} name="Subscribers" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Report Categories Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{category.category}</div>
                      <div className="text-sm text-gray-500">{category.reports} reports • {category.subscribers} subscribers</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">{category.frequency}</div>
                      <div className="text-xs text-gray-500">{category.lastGenerated}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Report Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-600" />
                <span>Report Performance & Engagement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Most Popular Template</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-medium mb-1">Executive Dashboard</div>
                    <div className="text-sm text-gray-500">95% usage rate</div>
                    <Progress value={95} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Fastest Generation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-medium mb-1">Daily Operations Brief</div>
                    <div className="text-sm text-gray-500">1.2 min average</div>
                    <Progress value={85} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Highest Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-medium mb-1">Monthly Workforce Analytics</div>
                    <div className="text-sm text-gray-500">156 avg downloads</div>
                    <Progress value={92} className="h-2 mt-2" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}