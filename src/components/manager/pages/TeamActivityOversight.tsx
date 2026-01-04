import { useState } from 'react';
import { Activity, Shield, AlertTriangle, Users, Heart, Bell, BarChart3, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer , PieChart, Cell, Pie } from 'recharts';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  initials: string;
  status: 'active' | 'focused' | 'break' | 'meeting' | 'offline';
  activity: {
    currentTask: string;
    timeSpent: number;
    productivity: number;
    focusTime: number;
    breakTime: number;
    meetingTime: number;
    lastActivity: string;
  };
  wellness: {
    workLifeBalance: number;
    stressLevel: number;
    burnoutRisk: number;
    alertsEnabled: boolean;
  };
  collaboration: {
    interactions: number;
    responseTime: number;
    teamMeetings: number;
    helpRequests: number;
  };
  patterns: {
    peakHours: string[];
    productivityTrend: number[];
    weeklyActivity: number[];
  };
}

interface ActivityAlert {
  id: string;
  type: 'wellness' | 'productivity' | 'collaboration' | 'security';
  severity: 'low' | 'medium' | 'high';
  memberId: string;
  memberName: string;
  message: string;
  recommendation: string;
  timestamp: string;
  acknowledged: boolean;
}

export const TeamActivityOversight: React.FC = () => {
  const [privacyMode, setPrivacyMode] = useState(true);
  const [wellnessAlertsEnabled, setWellnessAlertsEnabled] = useState(true);

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Senior Developer',
      avatar: '/api/placeholder/32/32',
      initials: 'SJ',
      status: 'focused',
      activity: {
        currentTask: 'Authentication Module',
        timeSpent: 6.5,
        productivity: 92,
        focusTime: 5.2,
        breakTime: 0.8,
        meetingTime: 0.5,
        lastActivity: '2 min ago'
      },
      wellness: {
        workLifeBalance: 78,
        stressLevel: 25,
        burnoutRisk: 15,
        alertsEnabled: true
      },
      collaboration: {
        interactions: 15,
        responseTime: 12,
        teamMeetings: 2,
        helpRequests: 3
      },
      patterns: {
        peakHours: ['9-11 AM', '2-4 PM'],
        productivityTrend: [85, 92, 88, 95, 90, 75, 45],
        weeklyActivity: [7.5, 8.2, 7.8, 8.1, 7.9, 4.2, 2.1]
      }
    },
    {
      id: '2',
      name: 'Mike Chen',
      role: 'UI/UX Designer',
      avatar: '/api/placeholder/32/32',
      initials: 'MC',
      status: 'active',
      activity: {
        currentTask: 'Dashboard Redesign',
        timeSpent: 5.8,
        productivity: 88,
        focusTime: 4.5,
        breakTime: 1.0,
        meetingTime: 0.3,
        lastActivity: '5 min ago'
      },
      wellness: {
        workLifeBalance: 85,
        stressLevel: 20,
        burnoutRisk: 10,
        alertsEnabled: true
      },
      collaboration: {
        interactions: 22,
        responseTime: 8,
        teamMeetings: 3,
        helpRequests: 1
      },
      patterns: {
        peakHours: ['10 AM-12 PM', '3-5 PM'],
        productivityTrend: [78, 85, 92, 88, 85, 60, 30],
        weeklyActivity: [6.8, 7.5, 8.0, 7.2, 6.9, 3.5, 1.8]
      }
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      role: 'Full Stack Developer',
      avatar: '/api/placeholder/32/32',
      initials: 'ER',
      status: 'break',
      activity: {
        currentTask: 'API Integration',
        timeSpent: 7.1,
        productivity: 95,
        focusTime: 6.2,
        breakTime: 0.6,
        meetingTime: 0.3,
        lastActivity: '15 min ago'
      },
      wellness: {
        workLifeBalance: 92,
        stressLevel: 12,
        burnoutRisk: 5,
        alertsEnabled: true
      },
      collaboration: {
        interactions: 18,
        responseTime: 10,
        teamMeetings: 1,
        helpRequests: 2
      },
      patterns: {
        peakHours: ['8-10 AM', '1-3 PM'],
        productivityTrend: [92, 88, 95, 90, 92, 70, 50],
        weeklyActivity: [8.1, 8.5, 8.3, 8.0, 8.2, 5.1, 3.2]
      }
    },
    {
      id: '4',
      name: 'James Wilson',
      role: 'Data Analyst',
      avatar: '/api/placeholder/32/32',
      initials: 'JW',
      status: 'meeting',
      activity: {
        currentTask: 'Performance Analytics',
        timeSpent: 8.5,
        productivity: 85,
        focusTime: 5.8,
        breakTime: 0.4,
        meetingTime: 2.3,
        lastActivity: '1 min ago'
      },
      wellness: {
        workLifeBalance: 65,
        stressLevel: 45,
        burnoutRisk: 35,
        alertsEnabled: true
      },
      collaboration: {
        interactions: 25,
        responseTime: 15,
        teamMeetings: 4,
        helpRequests: 0
      },
      patterns: {
        peakHours: ['9-11 AM', '7-9 PM'],
        productivityTrend: [88, 90, 85, 82, 78, 85, 75],
        weeklyActivity: [8.8, 9.2, 9.1, 8.9, 9.5, 6.2, 4.5]
      }
    }
  ];

  const activityAlerts: ActivityAlert[] = [
    {
      id: '1',
      type: 'wellness',
      severity: 'high',
      memberId: '4',
      memberName: 'James Wilson',
      message: 'Extended work hours detected (9.5h today). Burnout risk increasing.',
      recommendation: 'Suggest taking breaks and consider workload redistribution.',
      timestamp: '10 min ago',
      acknowledged: false
    },
    {
      id: '2',
      type: 'productivity',
      severity: 'medium',
      memberId: '2',
      memberName: 'Mike Chen',
      message: 'Productivity dip detected during usual peak hours.',
      recommendation: 'Check if blocking issues need attention or support.',
      timestamp: '25 min ago',
      acknowledged: false
    },
    {
      id: '3',
      type: 'collaboration',
      severity: 'low',
      memberId: '1',
      memberName: 'Sarah Johnson',
      message: 'Lower team interaction than usual this week.',
      recommendation: 'Consider team check-in or collaboration opportunities.',
      timestamp: '1 hour ago',
      acknowledged: true
    }
  ];

  const teamProductivityData = [
    { time: '9 AM', productivity: 85, focus: 78, collaboration: 65 },
    { time: '10 AM', productivity: 92, focus: 89, collaboration: 72 },
    { time: '11 AM', productivity: 88, focus: 82, collaboration: 78 },
    { time: '12 PM', productivity: 75, focus: 65, collaboration: 85 },
    { time: '1 PM', productivity: 70, focus: 60, collaboration: 80 },
    { time: '2 PM', productivity: 95, focus: 91, collaboration: 70 },
    { time: '3 PM', productivity: 90, focus: 85, collaboration: 75 },
    { time: '4 PM', productivity: 85, focus: 80, collaboration: 82 },
    { time: '5 PM', productivity: 78, focus: 70, collaboration: 88 }
  ];

  const wellnessMetrics = [
    { metric: 'Work-Life Balance', value: 80, target: 85, status: 'improving' },
    { metric: 'Stress Levels', value: 25, target: 20, status: 'attention' },
    { metric: 'Team Satisfaction', value: 92, target: 90, status: 'excellent' },
    { metric: 'Burnout Risk', value: 16, target: 10, status: 'monitor' }
  ];

  const activityDistribution = [
    { name: 'Deep Work', value: 45, color: '#0088FE' },
    { name: 'Meetings', value: 25, color: '#00C49F' },
    { name: 'Collaboration', value: 20, color: '#FFBB28' },
    { name: 'Breaks', value: 10, color: '#FF8042' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'focused': return 'bg-blue-500';
      case 'break': return 'bg-yellow-500';
      case 'meeting': return 'bg-purple-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'focused': return 'Deep Focus';
      case 'break': return 'On Break';
      case 'meeting': return 'In Meeting';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getWellnessColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'improving': return 'text-blue-600';
      case 'monitor': return 'text-yellow-600';
      case 'attention': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    console.log('Acknowledging alert:', alertId);
  };

  const enableWellnessAlert = (memberId: string) => {
    console.log('Enabling wellness alert for:', memberId);
  };

  return (
    <div className="space-y-6">
      {/* Header with Privacy Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Team Activity Oversight</h1>
          <p className="text-muted-foreground">Real-time team activity status with privacy-compliant monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            <Label htmlFor="privacy-mode">Privacy Mode</Label>
            <Switch 
              id="privacy-mode" 
              checked={privacyMode} 
              onCheckedChange={setPrivacyMode} 
            />
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-600" />
            <Label htmlFor="wellness-alerts">Wellness Alerts</Label>
            <Switch 
              id="wellness-alerts" 
              checked={wellnessAlertsEnabled} 
              onCheckedChange={setWellnessAlertsEnabled} 
            />
          </div>
        </div>
      </div>

      {/* Real-time Activity Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Real-time Team Status
          </CardTitle>
          <CardDescription>Live activity monitoring with productivity insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {teamMembers.map((member) => (
              <Card key={member.id} className="relative">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{getStatusLabel(member.status)}</p>
                    </div>
                  </div>

                  {privacyMode ? (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Activity Level:</span>
                        <span className="font-medium">{member.activity.productivity}%</span>
                      </div>
                      <Progress value={member.activity.productivity} className="h-2" />
                      <p className="text-muted-foreground">Detailed metrics hidden in privacy mode</p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Current Task:</span>
                        <span className="font-medium truncate">{member.activity.currentTask}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Spent:</span>
                        <span className="font-medium">{member.activity.timeSpent}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Productivity:</span>
                        <span className="font-medium">{member.activity.productivity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Focus Time:</span>
                        <span className="font-medium">{member.activity.focusTime}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wellness Score:</span>
                        <span className={`font-medium ${member.wellness.burnoutRisk <= 20 ? 'text-green-600' : member.wellness.burnoutRisk <= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {100 - member.wellness.burnoutRisk}%
                        </span>
                      </div>
                      <p className="text-muted-foreground">Last active: {member.activity.lastActivity}</p>
                    </div>
                  )}

                  {member.wellness.burnoutRisk > 30 && (
                    <div className="mt-2 p-2 bg-red-50 rounded flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                      <span className="text-xs text-red-600">High burnout risk</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="productivity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="productivity">Productivity Analysis</TabsTrigger>
          <TabsTrigger value="wellness">Wellness Monitoring</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration Patterns</TabsTrigger>
          <TabsTrigger value="alerts">Activity Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="productivity" className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Team Productivity Trends
                </CardTitle>
                <CardDescription>Hourly productivity, focus, and collaboration patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={teamProductivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="productivity" stroke="#0088FE" name="Productivity" />
                    <Line type="monotone" dataKey="focus" stroke="#00C49F" name="Focus Time" />
                    <Line type="monotone" dataKey="collaboration" stroke="#FFBB28" name="Collaboration" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Distribution</CardTitle>
                <CardDescription>How team time is allocated throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={activityDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={(entry: any) => `${entry.name || ''} ${((entry.percent ?? 0) * 100).toFixed(0)}%`}
                    >
                      {activityDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Individual Productivity Insights</CardTitle>
              <CardDescription>Personalized productivity recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Peak hours: {member.patterns.peakHours.join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{member.activity.productivity}%</div>
                    <div className="text-sm text-muted-foreground">
                      {member.activity.focusTime}h focus time
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wellness" className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {wellnessMetrics.map((metric) => (
              <Card key={metric.metric}>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{metric.metric}</p>
                    <div className="text-2xl font-bold">{metric.value}%</div>
                    <div className="flex items-center gap-2">
                      <Progress value={(metric.value / metric.target) * 100} className="flex-1 h-2" />
                      <span className={`text-xs font-medium ${getWellnessColor(metric.status)}`}>
                        {metric.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Target: {metric.target}%</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Individual Wellness Dashboard
              </CardTitle>
              <CardDescription>Personalized wellness monitoring and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={member.wellness.burnoutRisk <= 20 ? 'default' : member.wellness.burnoutRisk <= 40 ? 'secondary' : 'destructive'}>
                        {member.wellness.burnoutRisk <= 20 ? 'Healthy' : member.wellness.burnoutRisk <= 40 ? 'Monitor' : 'At Risk'}
                      </Badge>
                      {!member.wellness.alertsEnabled && (
                        <Button size="sm" variant="outline" onClick={() => enableWellnessAlert(member.id)}>
                          <Bell className="h-3 w-3 mr-1" />
                          Enable Alerts
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Work-Life Balance</p>
                      <div className="flex items-center gap-2">
                        <Progress value={member.wellness.workLifeBalance} className="flex-1 h-2" />
                        <span className="font-medium">{member.wellness.workLifeBalance}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Stress Level</p>
                      <div className="flex items-center gap-2">
                        <Progress value={member.wellness.stressLevel} className="flex-1 h-2" />
                        <span className={`font-medium ${member.wellness.stressLevel <= 30 ? 'text-green-600' : member.wellness.stressLevel <= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {member.wellness.stressLevel}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Burnout Risk</p>
                      <div className="flex items-center gap-2">
                        <Progress value={member.wellness.burnoutRisk} className="flex-1 h-2" />
                        <span className={`font-medium ${member.wellness.burnoutRisk <= 20 ? 'text-green-600' : member.wellness.burnoutRisk <= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {member.wellness.burnoutRisk}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {member.wellness.burnoutRisk > 30 && (
                    <div className="mt-3 p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-900">Wellness Alert</span>
                      </div>
                      <p className="text-xs text-red-700">
                        High burnout risk detected. Consider scheduling a 1:1 meeting and redistributing workload.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Collaboration Analysis
              </CardTitle>
              <CardDescription>Communication patterns and team interaction insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.collaboration.interactions} interactions today
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-right">
                    <div>
                      <p className="text-muted-foreground">Response Time</p>
                      <p className="font-medium">{member.collaboration.responseTime}m</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Meetings</p>
                      <p className="font-medium">{member.collaboration.teamMeetings}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Help Requests</p>
                      <p className="font-medium">{member.collaboration.helpRequests}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Activity Alerts
              </CardTitle>
                <CardDescription>Activity alerts for wellness, productivity, and team health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activityAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 border rounded-lg ${alert.acknowledged ? 'opacity-50' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={getAlertColor(alert.severity)}>
                          {alert.severity} priority
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {alert.type}
                        </Badge>
                        <span className="text-sm font-medium">{alert.memberName}</span>
                        <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                      </div>
                      <p className="text-sm mb-2">{alert.message}</p>
                      <div className="bg-blue-50 p-2 rounded text-xs">
                        <strong>Recommendation:</strong> {alert.recommendation}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {!alert.acknowledged && (
                        <Button size="sm" variant="outline" onClick={() => acknowledgeAlert(alert.id)}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Acknowledge
                        </Button>
                      )}
                      <Button size="sm">
                        Take Action
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};