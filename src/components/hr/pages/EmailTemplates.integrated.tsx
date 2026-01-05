import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { ScrollArea } from '../../ui/scroll-area';

import { 
  Eye, 
  Send, 
  Zap,
  ArrowRight,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

// Template interface
interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  placeholders: string[];
  triggerEvent?: string;
}

// Mock data for placeholders
const MOCK_PLACEHOLDER_VALUES: Record<string, string> = {
  candidate_name: 'John Smith',
  job_title: 'Senior Software Engineer',
  interview_date: 'January 20, 2025',
  interview_time: '2:00 PM',
  location: 'Conference Room A, 3rd Floor',
  interview_type: 'Technical Interview',
  hr_contact: 'hr@company.com',
  employee_name: 'Sarah Johnson',
  start_date: 'February 1, 2025',
  company_name: 'TechCorp',
  department: 'Engineering',
  manager_name: 'Michael Chen',
  salary: '$95,000',
  position: 'Software Engineer',
  payslip_month: 'January 2025',
  leave_start: 'March 15, 2025',
  leave_end: 'March 20, 2025',
  leave_type: 'Vacation',
  leave_status: 'Approved'
};

// Predefined templates
const PREDEFINED_TEMPLATES: EmailTemplate[] = [
  {
    id: 'interview-invitation',
    name: 'Interview Invitation',
    subject: 'Interview Invitation for {{job_title}} Position at {{company_name}}',
    body: `Dear {{candidate_name}},

Thank you for your interest in the {{job_title}} position at {{company_name}}.

We were impressed with your application and would like to invite you for an interview. Please find the details below:

Interview Details:
- Date: {{interview_date}}
- Time: {{interview_time}}
- Location: {{location}}
- Interview Type: {{interview_type}}
- Duration: Approximately 45-60 minutes

What to Expect:
- Discussion about your background and experience
- Overview of the role and our team
- Opportunity for you to ask questions

Please confirm your availability by replying to this email within 48 hours. If you need to reschedule or have any questions, please contact us at {{hr_contact}}.

We look forward to meeting you and learning more about how you can contribute to our team.

Best regards,
HR Team
{{company_name}}`,
    placeholders: ['candidate_name', 'job_title', 'company_name', 'interview_date', 'interview_time', 'location', 'interview_type', 'hr_contact'],
    triggerEvent: 'interview_scheduled'
  },
  {
    id: 'offer-letter',
    name: 'Offer Letter',
    subject: 'Job Offer - {{job_title}} at {{company_name}}',
    body: `Dear {{candidate_name}},

We are pleased to offer you the position of {{job_title}} at {{company_name}}.

Position Details:
- Title: {{job_title}}
- Department: {{department}}
- Start Date: {{start_date}}
- Salary: {{salary}}
- Manager: {{manager_name}}

We are excited about the possibility of you joining our team. Please confirm your acceptance by replying to this email within 5 business days.

If you have any questions, please don't hesitate to contact us at {{hr_contact}}.

Welcome aboard!

Best regards,
HR Team
{{company_name}}`,
    placeholders: ['candidate_name', 'job_title', 'company_name', 'department', 'start_date', 'salary', 'manager_name', 'hr_contact'],
    triggerEvent: 'offer_sent'
  },
  {
    id: 'hired-confirmation',
    name: 'Hired Confirmation',
    subject: 'Welcome to {{company_name}} - Your Offer Has Been Accepted!',
    body: `Dear {{candidate_name}},

Congratulations! We are thrilled to confirm that you have accepted our offer for the {{job_title}} position at {{company_name}}.

We are excited to have you join our {{department}} team. Here's what happens next:

Next Steps:
1. You will receive your official employment contract within 2 business days
2. Please complete the required onboarding documents by {{start_date}}
3. Your manager, {{manager_name}}, will contact you before your start date
4. On {{start_date}}, please report to the reception at 9:00 AM

Important Information:
- Your start date: {{start_date}}
- Your department: {{department}}
- Your manager: {{manager_name}}
- HR Contact: {{hr_contact}}

If you have any questions before your start date, please don't hesitate to reach out to us.

We look forward to welcoming you to the team!

Best regards,
HR Team
{{company_name}}`,
    placeholders: ['candidate_name', 'company_name', 'job_title', 'department', 'start_date', 'manager_name', 'hr_contact'],
    triggerEvent: 'offer_accepted'
  },
  {
    id: 'rejection-email',
    name: 'Rejection Email',
    subject: 'Application Update - {{job_title}} Position',
    body: `Dear {{candidate_name}},

Thank you for your interest in the {{job_title}} position at {{company_name}} and for taking the time to interview with us.

After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.

We appreciate your interest in {{company_name}} and wish you the best in your job search.

We encourage you to keep an eye on our career page for future opportunities that may be a better fit.

Best regards,
HR Team
{{company_name}}`,
    placeholders: ['candidate_name', 'job_title', 'company_name'],
    triggerEvent: 'application_rejected'
  },
  {
    id: 'onboarding-welcome',
    name: 'Onboarding Welcome Email',
    subject: 'Welcome to {{company_name}}!',
    body: `Dear {{employee_name}},

Welcome to {{company_name}}! We are thrilled to have you join our {{department}} team.

Your first day is scheduled for {{start_date}}. Here's what to expect:

- Your manager, {{manager_name}}, will meet you at the reception at 9:00 AM
- You'll receive your equipment and access credentials
- We'll provide a comprehensive orientation session
- You'll have lunch with your team

If you have any questions before your start date, please don't hesitate to contact us at {{hr_contact}}.

We're looking forward to working with you!

Best regards,
HR Team
{{company_name}}`,
    placeholders: ['employee_name', 'company_name', 'department', 'start_date', 'manager_name', 'hr_contact'],
    triggerEvent: 'onboarding_started'
  },
  {
    id: 'interview-rejection',
    name: 'Interview Rejection',
    subject: 'Update on Your Application - {{job_title}} Position',
    body: `Dear {{candidate_name}},

Thank you for taking the time to interview with us for the {{job_title}} position at {{company_name}}.

We appreciate the opportunity to learn more about your background and experience during your interview on {{interview_date}} ({{interview_type}} interview).

After careful consideration of all candidates, we have decided to move forward with other applicants whose qualifications more closely align with our current needs for this role.

We were impressed with your skills and experience, and we encourage you to keep an eye on our career page for future opportunities that may be a better fit.

We wish you the very best in your job search and professional endeavors.

If you have any questions, please feel free to contact us at {{hr_contact}}.

Best regards,
HR Team
{{company_name}}`,
    placeholders: ['candidate_name', 'job_title', 'company_name', 'interview_date', 'interview_type', 'hr_contact'],
    triggerEvent: 'interview_rejected'
  }
];

// Email automation mapping
const EMAIL_AUTOMATION: Array<{ event: string; templateId: string; description: string }> = [
  {
    event: 'application_received',
    templateId: 'interview-invitation',
    description: 'When a new job application is received, automatically send interview invitation if candidate is shortlisted'
  },
  {
    event: 'interview_scheduled',
    templateId: 'interview-invitation',
    description: 'When an interview is scheduled, send confirmation email to candidate'
  },
  {
    event: 'interview_completed',
    templateId: 'offer-letter',
    description: 'After interview completion, send offer letter if candidate is selected'
  },
  {
    event: 'offer_sent',
    templateId: 'offer-letter',
    description: 'When an offer is sent, automatically notify the candidate'
  },
  {
    event: 'offer_accepted',
    templateId: 'hired-confirmation',
    description: 'When a candidate accepts the offer, send welcome and onboarding information'
  },
  {
    event: 'onboarding_started',
    templateId: 'onboarding-welcome',
    description: 'When onboarding begins, send welcome email to new employee'
  },
  {
    event: 'interview_rejected',
    templateId: 'interview-rejection',
    description: 'When a candidate is rejected after an interview, send rejection notification'
  }
];

export function EmailTemplates() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(PREDEFINED_TEMPLATES[0].id);
  const [editedSubject, setEditedSubject] = useState<string>('');
  const [editedBody, setEditedBody] = useState<string>('');

  const selectedTemplate = useMemo(() => {
    return PREDEFINED_TEMPLATES.find(t => t.id === selectedTemplateId) || PREDEFINED_TEMPLATES[0];
  }, [selectedTemplateId]);

  // Initialize edited values when template changes
  useEffect(() => {
    setEditedSubject(selectedTemplate.subject);
    setEditedBody(selectedTemplate.body);
  }, [selectedTemplate]);

  // Extract placeholders from text
  const extractPlaceholders = (text: string): string[] => {
    const matches = text.match(/\{\{(\w+)\}\}/g);
    if (!matches) return [];
    return [...new Set(matches.map(m => m.replace(/\{\{|\}\}/g, '')))];
  };

  // Replace placeholders with mock values
  const replacePlaceholders = (text: string): string => {
    let result = text;
    const placeholders = extractPlaceholders(text);
    placeholders.forEach(placeholder => {
      const value = MOCK_PLACEHOLDER_VALUES[placeholder] || `[${placeholder}]`;
      result = result.replace(new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g'), value);
    });
    return result;
  };

  // Get all placeholders from current template
  const currentPlaceholders = useMemo(() => {
    const fromSubject = extractPlaceholders(editedSubject);
    const fromBody = extractPlaceholders(editedBody);
    return [...new Set([...fromSubject, ...fromBody])];
  }, [editedSubject, editedBody]);

  // Preview with replaced placeholders
  const previewSubject = useMemo(() => replacePlaceholders(editedSubject), [editedSubject]);
  const previewBody = useMemo(() => replacePlaceholders(editedBody), [editedBody]);

  // Handle test email
  const handleTestEmail = () => {
    // Mock email sending
    setTimeout(() => {
      toast.success('Test email sent successfully! Check your inbox (mock).');
    }, 500);
  };

  // Reset template to original
  const handleReset = () => {
    setEditedSubject(selectedTemplate.subject);
    setEditedBody(selectedTemplate.body);
    toast.info('Template reset to original');
  };

  // Save changes (mock - just show success)
  const handleSave = () => {
    toast.success('Template saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Email Templates</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage HR email templates with dynamic placeholders
          </p>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="editor" className="space-y-4">
        <TabsList>
          <TabsTrigger value="editor">Template Editor</TabsTrigger>
          <TabsTrigger value="automation">Email Automation</TabsTrigger>
        </TabsList>

        {/* Editor Tab */}
        <TabsContent value="editor" className="space-y-4">
          <div className="grid grid-cols-3 gap-6">
            {/* Template List */}
            <div className="col-span-1">
        <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Prebuilt Templates</CardTitle>
                  <CardDescription>Select a template to edit</CardDescription>
          </CardHeader>
          <CardContent>
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-2">
                      {PREDEFINED_TEMPLATES.map((template) => (
                        <div
                          key={template.id}
                          onClick={() => setSelectedTemplateId(template.id)}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedTemplateId === template.id
                              ? 'bg-blue-50 border-blue-500'
                              : 'hover:bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{template.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {template.subject}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary" className="text-xs">
                                  {template.placeholders.length} placeholders
                                </Badge>
                                {template.triggerEvent && (
                                  <Badge variant="outline" className="text-xs">
                                    <Zap className="h-3 w-3 mr-1" />
                                    Auto
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
          </CardContent>
        </Card>
      </div>

            {/* Editor and Preview */}
            <div className="col-span-2 space-y-4">
              {/* Editor */}
          <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedTemplate.name}</CardTitle>
                      <CardDescription>Edit subject and body. Use {'{{placeholder}}'} for dynamic content.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleReset}>
                        Reset
                      </Button>
                      <Button size="sm" onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Placeholder Hints */}
                  {currentPlaceholders.length > 0 && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="flex-1">
                          <p className="text-xs font-medium text-blue-900 mb-1">Available Placeholders:</p>
                          <div className="flex flex-wrap gap-1">
                            {currentPlaceholders.map((placeholder) => (
                              <Badge key={placeholder} variant="secondary" className="text-xs">
                                {'{{' + placeholder + '}}'}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Subject Editor */}
                  <div>
                    <Label htmlFor="subject">Email Subject</Label>
                    <Input
                      id="subject"
                      value={editedSubject}
                      onChange={(e) => setEditedSubject(e.target.value)}
                      placeholder="Enter email subject..."
                      className="mt-1"
                    />
                  </div>

                  {/* Body Editor */}
                  <div>
                    <Label htmlFor="body">Email Body</Label>
                    <Textarea
                      id="body"
                      value={editedBody}
                      onChange={(e) => setEditedBody(e.target.value)}
                      placeholder="Enter email body..."
                      rows={12}
                      className="mt-1 font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use {'{{placeholder_name}}'} format for dynamic content
                    </p>
                </div>

                  {/* Test Email Button */}
                  <div className="pt-4 border-t">
                    <Button onClick={handleTestEmail} className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Test Email (Mock)
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Test email will be sent to your own email address (simulated)
                    </p>
              </div>
            </CardContent>
          </Card>

              {/* Live Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Live Preview
                  </CardTitle>
                  <CardDescription>Preview with sample data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                      <div>
                      <Label className="text-xs text-muted-foreground">Subject:</Label>
                      <div className="p-3 bg-gray-50 border rounded-md mt-1">
                        <p className="text-sm font-medium">{previewSubject}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Body:</Label>
                      <ScrollArea className="h-[300px] w-full rounded-md border p-4 mt-1 bg-white">
                        <pre className="text-sm whitespace-pre-wrap font-sans">{previewBody}</pre>
                      </ScrollArea>
                  </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Automation Rules</CardTitle>
              <CardDescription>
                These templates are automatically triggered based on HR events
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {EMAIL_AUTOMATION.map((rule, index) => {
                  const template = PREDEFINED_TEMPLATES.find(t => t.id === rule.templateId);
                  return (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Zap className="h-5 w-5 text-blue-600" />
                        </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="font-mono text-xs">
                              {rule.event}
                          </Badge>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">{template?.name}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{rule.description}</p>
                        </div>
                        <Badge variant="secondary" className="ml-auto">
                          Active
                        </Badge>
                      </div>
                    </div>
                  );
                })}
                </div>
            </CardContent>
          </Card>

          {/* Supported Placeholders */}
          <Card>
            <CardHeader>
              <CardTitle>Supported Placeholders</CardTitle>
              <CardDescription>
                Available placeholders you can use in templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {Object.keys(MOCK_PLACEHOLDER_VALUES).map((placeholder) => (
                  <div
                    key={placeholder}
                    className="p-2 border rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <code className="text-xs font-mono text-blue-600">
                      {'{{' + placeholder + '}}'}
                    </code>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {MOCK_PLACEHOLDER_VALUES[placeholder]}
                    </p>
                    </div>
                  ))}
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
