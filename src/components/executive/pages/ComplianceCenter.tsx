import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import { Progress } from "../../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Alert, AlertDescription } from "../../ui/alert"
import { 
  Shield, 
  Lock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Users,
  Calendar,
  Eye,
  Download,
  Settings,
  Bell,
  TrendingUp,
  Clock,
  Database,
  Globe,
  Gavel,
  Search
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Compliance metrics data
const complianceMetrics = [
  { category: 'GDPR Compliance', score: 100, status: 'Fully Compliant', issues: 0, lastAudit: '2024-01-15' },
  { category: 'Data Protection', score: 98, status: 'Excellent', issues: 1, lastAudit: '2024-01-10' },
  { category: 'Employee Privacy', score: 100, status: 'Verified', issues: 0, lastAudit: '2024-01-12' },
  { category: 'Ethics Framework', score: 95, status: 'Good', issues: 2, lastAudit: '2024-01-08' },
  { category: 'Regulatory Adherence', score: 97, status: 'Compliant', issues: 1, lastAudit: '2024-01-14' }
]

const dataProcessingActivities = [
  { 
    activity: 'Employee Activity Monitoring', 
    lawfulBasis: 'Legitimate Interest + Consent',
    dataTypes: ['Activity Metadata', 'Productivity Metrics'],
    retention: '90 days',
    subjects: 2847,
    riskLevel: 'Low',
    status: 'Active'
  },
  { 
    activity: 'Performance Analytics', 
    lawfulBasis: 'Legitimate Interest',
    dataTypes: ['Performance Data', 'Goal Metrics'],
    retention: '2 years',
    subjects: 2847,
    riskLevel: 'Low',
    status: 'Active'
  },
  { 
    activity: 'HR Administration', 
    lawfulBasis: 'Contract + Legal Obligation',
    dataTypes: ['Personal Data', 'Employment Records'],
    retention: '7 years',
    subjects: 2847,
    riskLevel: 'Medium',
    status: 'Active'
  }
]

const complianceTrends = [
  { month: 'Aug', gdpr: 98, dataProtection: 96, privacy: 99, ethics: 93, regulatory: 95 },
  { month: 'Sep', gdpr: 99, dataProtection: 97, privacy: 100, ethics: 94, regulatory: 96 },
  { month: 'Oct', gdpr: 100, dataProtection: 98, privacy: 100, ethics: 95, regulatory: 97 },
  { month: 'Nov', gdpr: 100, dataProtection: 98, privacy: 100, ethics: 95, regulatory: 97 },
  { month: 'Dec', gdpr: 100, dataProtection: 98, privacy: 100, ethics: 95, regulatory: 97 },
  { month: 'Jan', gdpr: 100, dataProtection: 98, privacy: 100, ethics: 95, regulatory: 97 }
]

const riskAssessment = [
  { name: 'Low Risk', value: 75, count: 18, color: '#10B981' },
  { name: 'Medium Risk', value: 20, count: 5, color: '#F59E0B' },
  { name: 'High Risk', value: 5, count: 1, color: '#EF4444' },
  { name: 'Critical Risk', value: 0, count: 0, color: '#DC2626' }
]

const auditSchedule = [
  { type: 'GDPR Compliance Review', nextDate: '2024-02-15', frequency: 'Quarterly', responsible: 'Legal Team' },
  { type: 'Data Processing Audit', nextDate: '2024-02-08', frequency: 'Monthly', responsible: 'IT Security' },
  { type: 'Privacy Impact Assessment', nextDate: '2024-02-20', frequency: 'Bi-annual', responsible: 'Privacy Officer' },
  { type: 'Ethics Review', nextDate: '2024-02-12', frequency: 'Quarterly', responsible: 'Ethics Committee' }
]

export function ComplianceCenter() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Comprehensive Compliance Center</h1>
          <p className="text-gray-600">Privacy, ethics, and regulatory compliance management with real-time monitoring</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <Shield className="h-3 w-3 mr-1" />
            GDPR Compliant
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            ISO 27001
          </Badge>
        </div>
      </div>

      {/* Compliance Status Overview */}
      <div className="grid grid-cols-2 grid-cols-5 gap-4">
        {complianceMetrics.map((metric, index) => (
          <Card key={index} className={`${
            metric.score === 100 ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' :
            metric.score >= 95 ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200' :
            'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200'
          }`}>
            <CardHeader className="pb-2">
              <CardTitle className={`text-sm ${
                metric.score === 100 ? 'text-green-700' :
                metric.score >= 95 ? 'text-blue-700' :
                'text-amber-700'
              }`}>
                {metric.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl mb-1 ${
                metric.score === 100 ? 'text-green-900' :
                metric.score >= 95 ? 'text-blue-900' :
                'text-amber-900'
              }`}>
                {metric.score}%
              </div>
              <div className={`flex items-center text-xs ${
                metric.score === 100 ? 'text-green-600' :
                metric.score >= 95 ? 'text-blue-600' :
                'text-amber-600'
              }`}>
                <CheckCircle className="h-3 w-3 mr-1" />
                {metric.status}
              </div>
              <Progress value={metric.score} className="h-1 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compliance Alerts */}
      <Alert className="border-green-200 bg-green-50">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <span className="font-medium">All Systems Compliant:</span> No compliance issues detected. 
          Last comprehensive audit completed January 15, 2024 with 100% GDPR compliance rating.
        </AlertDescription>
      </Alert>

      {/* Main Compliance Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Compliance Overview</TabsTrigger>
          <TabsTrigger value="gdpr">GDPR Management</TabsTrigger>
          <TabsTrigger value="activities">Data Processing</TabsTrigger>
          <TabsTrigger value="audits">Audits & Reviews</TabsTrigger>
          <TabsTrigger value="settings">Compliance Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Compliance Trends (6 Months)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={complianceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[90, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="gdpr" stroke="#10B981" strokeWidth={3} name="GDPR" />
                    <Line type="monotone" dataKey="dataProtection" stroke="#3B82F6" strokeWidth={2} name="Data Protection" />
                    <Line type="monotone" dataKey="privacy" stroke="#8B5CF6" strokeWidth={2} name="Privacy" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <span>Risk Assessment Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskAssessment}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {riskAssessment.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <span>Quick Compliance Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Download className="h-5 w-5" />
                  <span className="text-sm">Generate Compliance Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Search className="h-5 w-5" />
                  <span className="text-sm">Data Subject Request</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Bell className="h-5 w-5" />
                  <span className="text-sm">Configure Alerts</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm">View Audit Logs</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gdpr" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>GDPR Compliance Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Data Processing Compliance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-green-900 mb-1">100%</div>
                    <p className="text-xs text-gray-600 mb-2">All processing activities documented with lawful basis</p>
                    <Progress value={100} className="h-2" />
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Data Subject Rights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-blue-900 mb-1">15</div>
                    <p className="text-xs text-gray-600 mb-2">Requests processed this month (avg 2.3 days)</p>
                    <Progress value={95} className="h-2" />
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Consent Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl text-purple-900 mb-1">2,847</div>
                    <p className="text-xs text-gray-600 mb-2">Active consents (100% coverage)</p>
                    <Progress value={100} className="h-2" />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg">GDPR Rights Management</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="text-sm text-green-800 mb-2">Right to Access</h4>
                      <p className="text-xs text-green-700">Automated data export available. Average response time: 1.2 days</p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="text-sm text-blue-800 mb-2">Right to Rectification</h4>
                      <p className="text-xs text-blue-700">Self-service portal active. 94% of requests auto-processed</p>
                    </div>
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="text-sm text-purple-800 mb-2">Right to Erasure</h4>
                      <p className="text-xs text-purple-700">Secure deletion protocols verified. 24-hour processing SLA</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <h4 className="text-sm text-amber-800 mb-2">Right to Data Portability</h4>
                      <p className="text-xs text-amber-700">Standard export formats available. JSON, CSV, XML supported</p>
                    </div>
                    <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                      <h4 className="text-sm text-teal-800 mb-2">Right to Object</h4>
                      <p className="text-xs text-teal-700">Opt-out mechanisms verified. Immediate processing stoppage</p>
                    </div>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h4 className="text-sm text-gray-800 mb-2">Right to Restrict Processing</h4>
                      <p className="text-xs text-gray-700">Granular controls available. Partial processing supported</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-600" />
                <span>Data Processing Activities Register</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataProcessingActivities.map((activity, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{activity.activity}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={
                              activity.riskLevel === 'Low' 
                                ? 'bg-green-50 text-green-700'
                                : activity.riskLevel === 'Medium'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-red-50 text-red-700'
                            }
                          >
                            {activity.riskLevel} Risk
                          </Badge>
                          <Badge variant="secondary">{activity.status}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Lawful Basis:</span>
                          <div className="mt-1">{activity.lawfulBasis}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Data Types:</span>
                          <div className="mt-1">{activity.dataTypes.join(', ')}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Retention Period:</span>
                          <div className="mt-1">{activity.retention}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">{activity.subjects.toLocaleString()} data subjects</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Export Register</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span>Audit Schedule & Compliance Reviews</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditSchedule.map((audit, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{audit.type}</CardTitle>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          <Clock className="h-3 w-3 mr-1" />
                          {audit.frequency}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="text-gray-500">Next Review:</span> {audit.nextDate}
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">Responsible:</span> {audit.responsible}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Schedule Review</Button>
                          <Button variant="outline" size="sm">View History</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <span>Compliance Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg">Alert Configuration</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Compliance Score Threshold</div>
                        <div className="text-xs text-gray-500">Alert when score drops below 95%</div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Data Subject Request SLA</div>
                        <div className="text-xs text-gray-500">Currently set to 30 days maximum</div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg">Privacy Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Automatic Data Retention</div>
                        <div className="text-xs text-gray-500">Auto-delete data based on retention policies</div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">Consent Management</div>
                        <div className="text-xs text-gray-500">Configure consent collection and renewal</div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
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