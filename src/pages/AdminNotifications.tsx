import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Bell, Search, Filter, Check, 
  AlertCircle, CheckCircle, Clock, MapPin, 
  Users, MessageSquare, Settings
} from "lucide-react";

const AdminNotifications = () => {
  const notifications = [
    {
      id: 1,
      type: "new_issue",
      title: "New Issue Reported: Pothole on Main Street",
      description: "John Doe reported a large pothole causing traffic issues",
      location: "Main St & 5th Ave",
      priority: "high",
      timestamp: "2 minutes ago",
      read: false,
      reportedBy: "John Doe",
      issueId: "ISS-2024-001"
    },
    {
      id: 2,
      type: "urgent_issue",
      title: "Urgent: Water Main Break",
      description: "Emergency water main break affecting entire Oak Street district",
      location: "Oak Street District",
      priority: "urgent",
      timestamp: "15 minutes ago",
      read: false,
      reportedBy: "Sarah Wilson",
      issueId: "ISS-2024-002"
    },
    {
      id: 3,
      type: "issue_resolved",
      title: "Issue Resolved: Broken Street Light",
      description: "Street light on Park Ave has been successfully repaired",
      location: "Park Ave & 2nd St",
      priority: "medium",
      timestamp: "1 hour ago",
      read: false,
      resolvedBy: "Maintenance Team A",
      issueId: "ISS-2024-003"
    },
    {
      id: 4,
      type: "new_user",
      title: "New User Registration",
      description: "Mike Johnson has registered as a new community member",
      timestamp: "2 hours ago",
      read: true,
      userId: "USR-2024-012"
    },
    {
      id: 5,
      type: "system_alert",
      title: "System Maintenance Scheduled",
      description: "Scheduled maintenance will begin at 2:00 AM tomorrow",
      timestamp: "3 hours ago",
      read: true,
      category: "system"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_issue': return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'urgent_issue': return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'issue_resolved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'new_user': return <Users className="w-5 h-5 text-purple-600" />;
      case 'system_alert': return <Settings className="w-5 h-5 text-orange-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AdminLayout>
      <div className="space-y-8 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with community activities and alerts</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unread</p>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                </div>
                <Bell className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Clock className="w-8 h-8 text-accent-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Urgent</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="admin-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search notifications..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Type
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Priority
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg border transition-colors hover:bg-muted/50 ${
                    !notification.read ? 'bg-primary/5 border-primary/20' : 'border-border'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          {notification.location && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {notification.location}
                            </div>
                          )}
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                            {notification.priority && (
                              <Badge className={`status-badge ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </Badge>
                            )}
                            {notification.reportedBy && (
                              <span className="text-xs text-muted-foreground">
                                by {notification.reportedBy}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                          <Button variant="ghost" size="sm">
                            {notification.read ? 'Mark Unread' : 'Mark Read'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;