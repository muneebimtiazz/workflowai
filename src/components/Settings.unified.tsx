import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Separator } from "./ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Eye, EyeOff, Save, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

interface SettingsData {
  notifications: {
    email: {
      tasks: boolean
      training: boolean
      announcements: boolean
      security: boolean
      timeOff: boolean
    }
    push: {
      enabled: boolean
      tasks: boolean
      deadlines: boolean
      announcements: boolean
      messages: boolean
    }
    frequency: 'immediate' | 'daily' | 'weekly'
  }
  security: {
    twoFactorEnabled: boolean
    sessionTimeout: number
    passwordLastChanged: string
    loginAlerts: boolean
  }
  privacy: {
    profileVisibility: 'public' | 'internal' | 'private'
    activityTracking: boolean
    analyticsSharing: boolean
  }
}

export function UnifiedSettings() {
  const [settings, setSettings] = useState<SettingsData>({
    notifications: {
      email: {
        tasks: true,
        training: true,
        announcements: false,
        security: true,
        timeOff: true
      },
      push: {
        enabled: true,
        tasks: true,
        deadlines: true,
        announcements: false,
        messages: true
      },
      frequency: 'immediate'
    },
    security: {
      twoFactorEnabled: false,
      sessionTimeout: 60,
      passwordLastChanged: '2025-06-15',
      loginAlerts: true
    },
    privacy: {
      profileVisibility: 'internal',
      activityTracking: true,
      analyticsSharing: false
    }
  })

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSettingChange = (section: keyof SettingsData, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const handleNestedSettingChange = (section: keyof SettingsData, subsection: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: subsection ? {
        ...prev[section],
        [subsection]: {
          ...(prev[section] as any)[subsection],
          [key]: value
        }
      } : {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }
    toast.success('Password changed successfully')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-4">Email Notifications</h4>
                <div className="space-y-4">
                  {Object.entries(settings.notifications.email).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => handleNestedSettingChange('notifications', 'email', key, checked)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-4">Push Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow the application to send push notifications
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.push.enabled}
                      onCheckedChange={(checked) => handleNestedSettingChange('notifications', 'push', 'enabled', checked)}
                    />
                  </div>

                  {settings.notifications.push.enabled && (
                    <>
                      {Object.entries(settings.notifications.push).filter(([key]) => key !== 'enabled').map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between pl-6">
                          <div>
                            <Label className="capitalize">{key}</Label>
                            <p className="text-sm text-muted-foreground">
                              Push notifications for {key}
                            </p>
                          </div>
                          <Switch
                            checked={value as boolean}
                            onCheckedChange={(checked) => handleNestedSettingChange('notifications', 'push', key, checked)}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-4">Notification Frequency</h4>
                <Select value={settings.notifications.frequency} onValueChange={(value) => handleNestedSettingChange('notifications', '', 'frequency', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="daily">Daily Summary</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => toast.success('Settings saved successfully')}>
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password & Authentication</CardTitle>
                <CardDescription>
                  Manage your password and two-factor authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleChangePassword}>
                    Change Password
                  </Button>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      checked={settings.security.twoFactorEnabled}
                      onCheckedChange={(checked) => {
                        handleSettingChange('security', 'twoFactorEnabled', checked)
                        if (checked) toast.success('Two-factor authentication enabled')
                      }}
                    />
                  </div>
                  {!settings.security.twoFactorEnabled && (
                    <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">
                        Your account is not protected by two-factor authentication
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Login Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when someone logs into your account
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.loginAlerts}
                    onCheckedChange={(checked) => handleSettingChange('security', 'loginAlerts', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Session Timeout</Label>
                  <Select 
                    value={settings.security.sessionTimeout.toString()} 
                    onValueChange={(value) => handleSettingChange('security', 'sessionTimeout', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Password last changed: {new Date(settings.security.passwordLastChanged).toLocaleDateString()}</p>
                </div>

                <Button onClick={() => toast.success('Settings saved successfully')}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select value={settings.privacy.profileVisibility} onValueChange={(value) => handleSettingChange('privacy', 'profileVisibility', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Visible to everyone</SelectItem>
                      <SelectItem value="internal">Internal - Visible to company employees</SelectItem>
                      <SelectItem value="private">Private - Visible only to managers and HR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Activity Tracking</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow tracking of your activity for analytics and improvements
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.activityTracking}
                    onCheckedChange={(checked) => handleSettingChange('privacy', 'activityTracking', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Analytics Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Share anonymized usage data to help improve the platform
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.analyticsSharing}
                    onCheckedChange={(checked) => handleSettingChange('privacy', 'analyticsSharing', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Data Management</h4>
                
                <div className="space-y-2">
                  <Label>Data Export</Label>
                  <p className="text-sm text-muted-foreground">
                    Download a copy of all your data in JSON format
                  </p>
                  <Button variant="outline">
                    Request Data Export
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Account Information</Label>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Account created: January 15, 2022</p>
                    <p>Last login: {new Date().toLocaleString()}</p>
                    <p>Total sessions: 1,247</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Danger Zone</h4>
                <p className="text-sm text-red-700 mb-4">
                  These actions are irreversible. Please be certain before proceeding.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Export My Data
                  </Button>
                  <Button variant="outline" size="sm">
                    Clear Activity History
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </div>

              <Button onClick={() => toast.success('Settings saved successfully')}>
                <Save className="w-4 h-4 mr-2" />
                Save Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}