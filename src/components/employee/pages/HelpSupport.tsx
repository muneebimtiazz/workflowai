
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Separator } from "../../ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { toast } from 'sonner'
import { 
  MessageSquare, 
  Phone, 
  Mail,
  Search,
  Video,
  FileText,
  Clock,
  CheckCircle,
  Send,
  Download,
  ExternalLink,
  Star,
  ThumbsUp,
  ThumbsDown,
  Plus
} from 'lucide-react'

interface Ticket {
  id: string
  subject: string
  category: 'technical' | 'hr' | 'payroll' | 'benefits' | 'training' | 'general'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in-progress' | 'waiting' | 'resolved' | 'closed'
  createdDate: string
  lastUpdate: string
  assignedTo?: string
  description: string
  responses: TicketResponse[]
}

interface TicketResponse {
  id: string
  from: string
  message: string
  timestamp: string
  isStaff: boolean
  attachments?: string[]
}

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  helpful: number
  notHelpful: number
  lastUpdated: string
}

export function HelpSupport() {
  const [newTicketForm, setNewTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock ticket data
  const tickets: Ticket[] = [
    {
      id: 'TICK-001',
      subject: 'Unable to access payslip download',
      category: 'technical',
      priority: 'medium',
      status: 'in-progress',
      createdDate: '2025-08-10T09:00:00Z',
      lastUpdate: '2025-08-12T14:30:00Z',
      assignedTo: 'IT Support Team',
      description: 'I cannot download my July payslip. The download button is not working.',
      responses: [
        {
          id: 'resp-001',
          from: 'Alex Morgan',
          message: 'I cannot download my July payslip. The download button is not working when I click it.',
          timestamp: '2025-08-10T09:00:00Z',
          isStaff: false
        },
        {
          id: 'resp-002',
          from: 'IT Support',
          message: 'Thank you for reporting this issue. We are investigating the payslip download functionality. We will update you shortly.',
          timestamp: '2025-08-10T11:30:00Z',
          isStaff: true
        },
        {
          id: 'resp-003',
          from: 'IT Support',
          message: 'The issue has been resolved. Please try downloading your payslip again. If you continue to experience problems, please let us know.',
          timestamp: '2025-08-12T14:30:00Z',
          isStaff: true
        }
      ]
    },
    {
      id: 'TICK-002',
      subject: 'Question about health insurance coverage',
      category: 'benefits',
      priority: 'low',
      status: 'resolved',
      createdDate: '2025-08-05T15:20:00Z',
      lastUpdate: '2025-08-06T10:15:00Z',
      assignedTo: 'HR Benefits Team',
      description: 'I need clarification on what is covered under the dental plan.',
      responses: [
        {
          id: 'resp-004',
          from: 'Alex Morgan',
          message: 'I need clarification on what is covered under the dental plan. Specifically, are orthodontic treatments covered?',
          timestamp: '2025-08-05T15:20:00Z',
          isStaff: false
        },
        {
          id: 'resp-005',
          from: 'HR Benefits',
          message: 'Yes, orthodontic treatments are covered under our PPO dental plan with 50% coverage after deductible. I\'ve attached the full benefits summary for your reference.',
          timestamp: '2025-08-06T10:15:00Z',
          isStaff: true,
          attachments: ['dental-benefits-summary.pdf']
        }
      ]
    }
  ]

  // Mock FAQ data
  const faqs: FAQItem[] = [
    {
      id: 'faq-001',
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking the "Forgot Password" link on the login page. You will receive an email with instructions to create a new password.',
      category: 'Account',
      helpful: 45,
      notHelpful: 2,
      lastUpdated: '2025-07-15'
    },
    {
      id: 'faq-002',
      question: 'When are payslips available?',
      answer: 'Payslips are typically available on the 5th of each month for the previous month. You will receive an email notification when your payslip is ready for download.',
      category: 'Payroll',
      helpful: 38,
      notHelpful: 1,
      lastUpdated: '2025-07-20'
    },
    {
      id: 'faq-003',
      question: 'How do I request time off?',
      answer: 'Time off requests should be submitted through the Time & Attendance section. Your manager will receive an automatic notification to approve or deny the request.',
      category: 'Time Off',
      helpful: 52,
      notHelpful: 3,
      lastUpdated: '2025-07-25'
    },
    {
      id: 'faq-004',
      question: 'How do I update my emergency contacts?',
      answer: 'You can update your emergency contacts in the Profile section under the Emergency Contacts tab. Make sure to save your changes after updating.',
      category: 'Profile',
      helpful: 29,
      notHelpful: 0,
      lastUpdated: '2025-07-30'
    },
    {
      id: 'faq-005',
      question: 'What training is mandatory?',
      answer: 'Mandatory training includes Information Security, Workplace Safety, and Code of Conduct. These must be completed by their assigned deadlines.',
      category: 'Training',
      helpful: 67,
      notHelpful: 4,
      lastUpdated: '2025-08-01'
    }
  ]

  const supportStats = {
    openTickets: tickets.filter(t => ['open', 'in-progress', 'waiting'].includes(t.status)).length,
    resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
    averageResponseTime: '4 hours',
    satisfactionRating: 4.6
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-100 text-blue-800">Open</Badge>
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
      case 'waiting':
        return <Badge className="bg-orange-100 text-orange-800">Waiting</Badge>
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const handleSubmitTicket = () => {
    if (!newTicketForm.subject || !newTicketForm.category || !newTicketForm.description) {
      alert('Please fill in all required fields')
      return
    }
    // In a real app, this would submit the ticket
    setNewTicketForm({ subject: '', category: '', priority: 'medium', description: '' })
    toast.success('Support ticket submitted successfully')
  }

  const handleFAQFeedback = (_faqId: string, _helpful: boolean) => {
    // In a real app, this would record the feedback
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString()
  }

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const faqCategories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))]

  return (
    <div className="max-w-9xl mx-auto space-y-6">
      {/* Help Overview */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Open Tickets</p>
                <p className="text-2xl font-bold">{supportStats.openTickets}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold">{supportStats.resolvedTickets}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold">{supportStats.averageResponseTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <p className="text-2xl font-bold">{supportStats.satisfactionRating}/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Find quick answers to common questions
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      placeholder="Search FAQs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {faqCategories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <Card key={faq.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold">{faq.question}</h4>
                          <Badge variant="outline">{faq.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-muted-foreground">Was this helpful?</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFAQFeedback(faq.id, true)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {faq.helpful}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFAQFeedback(faq.id, false)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <ThumbsDown className="w-4 h-4 mr-1" />
                              {faq.notHelpful}
                            </Button>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Updated: {new Date(faq.lastUpdated).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Support Tickets</CardTitle>
                    <CardDescription>
                      Track your support requests and their status
                    </CardDescription>
                  </div>
                  <Button onClick={() => {
                    // Scroll to contact tab or show new ticket form
                    const contactTab = document.querySelector('[value="contact"]') as HTMLElement;
                    if (contactTab) contactTab.click();
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Ticket
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{ticket.subject}</h4>
                              <p className="text-sm text-muted-foreground">#{ticket.id}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(ticket.status)}
                              {getPriorityBadge(ticket.priority)}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Category:</span>
                              <span className="ml-2 capitalize">{ticket.category}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Created:</span>
                              <span className="ml-2">{new Date(ticket.createdDate).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Last Update:</span>
                              <span className="ml-2">{new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Assigned to:</span>
                              <span className="ml-2">{ticket.assignedTo || 'Unassigned'}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h5 className="font-medium">Recent Activity:</h5>
                            <div className="max-h-32 overflow-y-auto space-y-2">
                              {ticket.responses.slice(-2).map((response) => (
                                <div key={response.id} className="text-sm p-2 bg-gray-50 rounded">
                                  <div className="flex justify-between mb-1">
                                    <span className="font-medium">{response.from}</span>
                                    <span className="text-muted-foreground">{formatTimestamp(response.timestamp)}</span>
                                  </div>
                                  <p>{response.message}</p>
                                  {response.attachments && (
                                    <div className="mt-1">
                                      {response.attachments.map((attachment, index) => (
                                        <Button key={index} size="sm" variant="link" className="p-0 h-auto">
                                          <Download className="w-3 h-3 mr-1" />
                                          {attachment}
                                        </Button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            View Full Conversation
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <div className="grid grid-cols-2 gap-6">
            {/* New Ticket Form */}
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Request</CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Create a support ticket
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={newTicketForm.subject}
                    onChange={(e) => setNewTicketForm({...newTicketForm, subject: e.target.value})}
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={newTicketForm.category} onValueChange={(value) => setNewTicketForm({...newTicketForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="hr">HR Questions</SelectItem>
                      <SelectItem value="payroll">Payroll Issues</SelectItem>
                      <SelectItem value="benefits">Benefits & Insurance</SelectItem>
                      <SelectItem value="training">Training & Development</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTicketForm.priority} onValueChange={(value) => setNewTicketForm({...newTicketForm, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={newTicketForm.description}
                    onChange={(e) => setNewTicketForm({...newTicketForm, description: e.target.value})}
                    placeholder="Please provide detailed information about your issue..."
                    rows={6}
                  />
                </div>

                <Button onClick={handleSubmitTicket} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Other Ways to Get Help</CardTitle>
                <CardDescription>
                  Multiple channels to reach our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Phone Support</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Monday - Friday, 8:00 AM - 6:00 PM EST
                      </p>
                      <Button variant="outline" size="sm">
                        Call (555) 123-4567
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Mail className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Email Support</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Typically responds within 24 hours
                      </p>
                      <Button variant="outline" size="sm">
                        Email support@company.com
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <MessageSquare className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Live Chat</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Available during business hours
                      </p>
                      <Button variant="outline" size="sm">
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Emergency Contacts</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">IT Emergency:</span>
                      <span className="ml-2 font-medium">(555) 999-8888</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">HR Emergency:</span>
                      <span className="ml-2 font-medium">(555) 999-7777</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Security:</span>
                      <span className="ml-2 font-medium">(555) 999-6666</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentation & Guides</CardTitle>
                <CardDescription>
                  Comprehensive guides and documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'Employee Handbook', type: 'PDF', icon: FileText },
                    { title: 'HR Policies & Procedures', type: 'PDF', icon: FileText },
                    { title: 'IT Security Guidelines', type: 'PDF', icon: FileText },
                    { title: 'Benefits Guide 2025', type: 'PDF', icon: FileText },
                    { title: 'Time & Attendance Manual', type: 'PDF', icon: FileText }
                  ].map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <resource.icon className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <p className="text-sm text-muted-foreground">{resource.type}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training Videos</CardTitle>
                <CardDescription>
                  Visual guides for common tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'How to Access Your Payslips',
                    'Requesting Time Off',
                    'Updating Your Profile',
                    'Using the Training Portal',
                    'Benefits Enrollment Process'
                  ].map((video, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Video className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium">{video}</p>
                          <p className="text-sm text-muted-foreground">Video Tutorial</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Watch
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}