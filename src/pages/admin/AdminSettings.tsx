
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertTriangle,
  Bell,
  Clock,
  Lock,
  Mail,
  Save,
  Server,
  Settings,
  Shield,
  User,
  Paintbrush,
  Moon,
  Sun
} from 'lucide-react';

const AdminSettings = () => {
  const [systemName, setSystemName] = useState('Student Hub');
  const [tagline, setTagline] = useState('Connecting students with campus resources');
  const [contactEmail, setContactEmail] = useState('support@studenthub.edu');
  const [enableDarkMode, setEnableDarkMode] = useState(true);
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [autoAssignIssues, setAutoAssignIssues] = useState(true);
  const [defaultPriority, setDefaultPriority] = useState('medium');
  const [requireApproval, setRequireApproval] = useState(false);
  const [notifyNewIssues, setNotifyNewIssues] = useState(true);
  const [notifyStatusChanges, setNotifyStatusChanges] = useState(true);
  const [notifyComments, setNotifyComments] = useState(true);
  const [notifyAssignments, setNotifyAssignments] = useState(true);
  const [enableAuditLog, setEnableAuditLog] = useState(true);
  const [dataRetentionPeriod, setDataRetentionPeriod] = useState('365');
  const [enableTwoFactor, setEnableTwoFactor] = useState(false);
  const [passwordPolicy, setPasswordPolicy] = useState('medium');
  const [sessionTimeout, setSessionTimeout] = useState('30');

  return (
    <DashboardLayout type="admin">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure system behavior, appearance, and security settings.
          </p>
        </div>

        <Tabs defaultValue="general" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic system settings and defaults
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input
                    id="system-name"
                    value={systemName}
                    onChange={(e) => setSystemName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Support Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue="America/New_York">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="America/Anchorage">Alaska Time (AKT)</SelectItem>
                      <SelectItem value="Pacific/Honolulu">Hawaii Time (HT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="MM/DD/YYYY">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="MMM D, YYYY">MMM D, YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-assign">Auto-Assign Issues</Label>
                    <div className="text-sm text-muted-foreground">
                      Automatically assign issues to department staff
                    </div>
                  </div>
                  <Switch
                    id="auto-assign"
                    checked={autoAssignIssues}
                    onCheckedChange={setAutoAssignIssues}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-priority">Default Issue Priority</Label>
                  <Select 
                    value={defaultPriority}
                    onValueChange={setDefaultPriority}
                  >
                    <SelectTrigger id="default-priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-approval">Require Approval for Resolution</Label>
                    <div className="text-sm text-muted-foreground">
                      Require administrator approval before marking issues as resolved
                    </div>
                  </div>
                  <Switch
                    id="require-approval"
                    checked={requireApproval}
                    onCheckedChange={setRequireApproval}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize the look and feel of the system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Enable Dark Mode</Label>
                    <div className="text-sm text-muted-foreground">
                      Allow users to switch between light and dark modes
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-muted-foreground" />
                    <Switch
                      id="dark-mode"
                      checked={enableDarkMode}
                      onCheckedChange={setEnableDarkMode}
                    />
                    <Moon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                    <Input
                      id="primary-color"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo Upload</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-secondary flex items-center justify-center rounded">
                      <Paintbrush className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <Input id="logo" type="file" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon Upload</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-secondary flex items-center justify-center rounded">
                      <Paintbrush className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input id="favicon" type="file" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recommended size: 32x32px, PNG format
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-css">Custom CSS</Label>
                  <Textarea
                    id="custom-css"
                    placeholder="Add custom CSS styles here"
                    className="font-mono text-sm"
                    rows={6}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">
                  Reset to Defaults
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure system notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-new-issues" className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          New issue reported
                        </Label>
                      </div>
                      <Switch
                        id="notify-new-issues"
                        checked={notifyNewIssues}
                        onCheckedChange={setNotifyNewIssues}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-status-changes" className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          Status changes
                        </Label>
                      </div>
                      <Switch
                        id="notify-status-changes"
                        checked={notifyStatusChanges}
                        onCheckedChange={setNotifyStatusChanges}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-comments" className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          New comments
                        </Label>
                      </div>
                      <Switch
                        id="notify-comments"
                        checked={notifyComments}
                        onCheckedChange={setNotifyComments}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-assignments" className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          Issue assignments
                        </Label>
                      </div>
                      <Switch
                        id="notify-assignments"
                        checked={notifyAssignments}
                        onCheckedChange={setNotifyAssignments}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-template">Email Template</Label>
                  <Textarea
                    id="email-template"
                    placeholder="HTML email template with {placeholders}"
                    className="font-mono text-sm"
                    rows={6}
                    defaultValue={`<div style="font-family: Arial, sans-serif;">
<h2>Hello {recipient_name},</h2>
<p>{notification_message}</p>
<p>View details: <a href="{action_url}">Click here</a></p>
<p>Regards,<br>{system_name} Team</p>
</div>`}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notification-settings">System Notification Settings</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="notification-settings">
                      <SelectValue placeholder="Select notification level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Notifications</SelectItem>
                      <SelectItem value="important">Important Only</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-server">SMTP Server</Label>
                  <Input
                    id="smtp-server"
                    placeholder="smtp.example.com"
                    defaultValue="smtp.studenthub.edu"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input
                      id="smtp-port"
                      placeholder="587"
                      defaultValue="587"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtp-security">Security</Label>
                    <Select defaultValue="tls">
                      <SelectTrigger id="smtp-security">
                        <SelectValue placeholder="Select security" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="tls">TLS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="mr-2" variant="outline">
                  Test Email
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security options and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor" className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      Require Two-Factor Authentication
                    </Label>
                    <div className="text-sm text-muted-foreground">
                      Require all admin users to set up 2FA
                    </div>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={enableTwoFactor}
                    onCheckedChange={setEnableTwoFactor}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-policy" className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    Password Policy
                  </Label>
                  <Select 
                    value={passwordPolicy}
                    onValueChange={setPasswordPolicy}
                  >
                    <SelectTrigger id="password-policy">
                      <SelectValue placeholder="Select password policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (8+ characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, mixed case, numbers)</SelectItem>
                      <SelectItem value="high">High (12+ chars, mixed case, numbers, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout" className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    min="5"
                    max="240"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audit-log" className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      Enable Audit Logging
                    </Label>
                    <div className="text-sm text-muted-foreground">
                      Track all system changes and user actions
                    </div>
                  </div>
                  <Switch
                    id="audit-log"
                    checked={enableAuditLog}
                    onCheckedChange={setEnableAuditLog}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="data-retention" className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    Data Retention Period (days)
                  </Label>
                  <Input
                    id="data-retention"
                    type="number"
                    min="30"
                    value={dataRetentionPeriod}
                    onChange={(e) => setDataRetentionPeriod(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ip-restrictions" className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    IP Restrictions
                  </Label>
                  <Textarea
                    id="ip-restrictions"
                    placeholder="Enter allowed IP addresses or ranges (one per line)"
                    className="font-mono text-sm"
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">
                    Leave empty to allow access from any IP address
                  </p>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Security Reminder</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                        Regularly review your security settings and audit logs. Enable two-factor authentication
                        for enhanced security and ensure proper access controls are in place.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
