import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, Save, Shield, Bell, Mail, 
  Globe, Users, Database, Key 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="space-y-8 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground">Settings</h1>
            <p className="text-muted-foreground">Configure system settings and preferences</p>
          </div>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="grid gap-6">
              <Card className="admin-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input id="siteName" defaultValue="civicSENSE" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">Admin Email</Label>
                      <Input id="adminEmail" type="email" defaultValue="admin@civicsense.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea 
                      id="siteDescription" 
                      defaultValue="A platform for citizens to report and track community issues."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Input id="timezone" defaultValue="UTC-5 (Eastern)" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Default Language</Label>
                      <Input id="language" defaultValue="English" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="admin-card">
                <CardHeader>
                  <CardTitle>Feature Toggles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allowRegistration">Allow User Registration</Label>
                      <p className="text-sm text-muted-foreground">Enable new users to register accounts</p>
                    </div>
                    <Switch id="allowRegistration" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="moderateReports">Moderate Reports</Label>
                      <p className="text-sm text-muted-foreground">Require admin approval for new reports</p>
                    </div>
                    <Switch id="moderateReports" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableAnalytics">Enable Analytics</Label>
                      <p className="text-sm text-muted-foreground">Collect usage analytics and statistics</p>
                    </div>
                    <Switch id="enableAnalytics" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="admin-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send email notifications for new issues</p>
                    </div>
                    <Switch id="emailNotifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send SMS alerts for urgent issues</p>
                    </div>
                    <Switch id="smsNotifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Browser push notifications</p>
                    </div>
                    <Switch id="pushNotifications" defaultChecked />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="notificationEmail">Notification Email</Label>
                    <Input id="notificationEmail" type="email" defaultValue="notifications@civicsense.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="urgentPhone">Urgent Issues Phone</Label>
                    <Input id="urgentPhone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="grid gap-6">
              <Card className="admin-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                      </div>
                      <Switch id="twoFactor" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sessionTimeout">Auto Session Timeout</Label>
                        <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
                      </div>
                      <Switch id="sessionTimeout" defaultChecked />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="sessionDuration">Session Duration (minutes)</Label>
                      <Input id="sessionDuration" type="number" defaultValue="60" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                      <Input id="maxLoginAttempts" type="number" defaultValue="5" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="admin-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    API Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="apiAccess">Enable API Access</Label>
                        <p className="text-sm text-muted-foreground">Allow external API connections</p>
                      </div>
                      <Switch id="apiAccess" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex gap-2">
                      <Input id="apiKey" type="password" defaultValue="sk-1234567890abcdef" readOnly />
                      <Button variant="outline">Regenerate</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="admin-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Management Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoApprove">Auto-approve New Users</Label>
                      <p className="text-sm text-muted-foreground">Automatically approve user registrations</p>
                    </div>
                    <Switch id="autoApprove" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailVerification">Require Email Verification</Label>
                      <p className="text-sm text-muted-foreground">Users must verify email before access</p>
                    </div>
                    <Switch id="emailVerification" defaultChecked />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maxReportsPerDay">Max Reports per Day</Label>
                    <Input id="maxReportsPerDay" type="number" defaultValue="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userTimeout">User Inactivity Timeout (days)</Label>
                    <Input id="userTimeout" type="number" defaultValue="90" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card className="admin-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable maintenance mode for updates</p>
                    </div>
                    <Switch id="maintenanceMode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="debugMode">Debug Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable detailed error logging</p>
                    </div>
                    <Switch id="debugMode" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <Input id="backupFrequency" defaultValue="Daily at 2:00 AM" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxFileSize">Max File Upload Size (MB)</Label>
                    <Input id="maxFileSize" type="number" defaultValue="10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                  <Textarea 
                    id="maintenanceMessage" 
                    placeholder="Message to display during maintenance"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;