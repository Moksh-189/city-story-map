import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import { 
  AlertCircle, CheckCircle, Clock, Users, TrendingUp, 
  MapPin, MessageSquare, Bell, Download 
} from "lucide-react";

// Mock data for charts
const issuesTrendData = [
  { month: 'Jan', reported: 45, resolved: 42 },
  { month: 'Feb', reported: 52, resolved: 48 },
  { month: 'Mar', reported: 61, resolved: 58 },
  { month: 'Apr', reported: 58, resolved: 55 },
  { month: 'May', reported: 72, resolved: 69 },
  { month: 'Jun', reported: 68, resolved: 71 }
];

const categoryData = [
  { name: 'Roads', value: 35, color: '#3b82f6' },
  { name: 'Lighting', value: 25, color: '#10b981' },
  { name: 'Waste', value: 20, color: '#f59e0b' },
  { name: 'Water', value: 15, color: '#ef4444' },
  { name: 'Other', value: 5, color: '#8b5cf6' }
];

const responseTimeData = [
  { day: 'Mon', hours: 18 },
  { day: 'Tue', hours: 22 },
  { day: 'Wed', hours: 16 },
  { day: 'Thu', hours: 24 },
  { day: 'Fri', hours: 20 },
  { day: 'Sat', hours: 28 },
  { day: 'Sun', hours: 32 }
];

const AdminDashboard = () => {
  const dashboardStats = [
    {
      title: "Total Issues",
      value: "2,156",
      change: "+12%",
      trend: "up",
      icon: AlertCircle,
      color: "primary"
    },
    {
      title: "Resolved Issues",
      value: "1,247",
      change: "+23%",
      trend: "up",
      icon: CheckCircle,
      color: "secondary"
    },
    {
      title: "Active Users",
      value: "5,832",
      change: "+15%",
      trend: "up",
      icon: Users,
      color: "primary"
    },
    {
      title: "Avg Response Time",
      value: "24hrs",
      change: "-8%",
      trend: "down",
      icon: Clock,
      color: "accent"
    }
  ];

  const recentIssues = [
    {
      id: "ISS-2024-001",
      title: "Pothole on Main Street",
      location: "Main St & 5th Ave",
      status: "new",
      priority: "high",
      reportedAt: "2 hours ago",
      reportedBy: "John Doe"
    },
    {
      id: "ISS-2024-002",
      title: "Broken Street Light",
      location: "Park Ave & 2nd St",
      status: "progress",
      priority: "medium",
      reportedAt: "1 day ago",
      reportedBy: "Sarah Wilson"
    },
    {
      id: "ISS-2024-003",
      title: "Garbage Collection Missed",
      location: "Oak Street District",
      status: "resolved",
      priority: "low",
      reportedAt: "3 days ago",
      reportedBy: "Mike Johnson"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage community issues</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" className="relative">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={stat.title} className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className={`flex items-center text-xs ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`w-3 h-3 mr-1 ${
                      stat.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    {stat.change} from last month
                  </div>
                </div>
                <stat.icon className={`w-8 h-8 ${
                  stat.color === 'primary' ? 'text-primary' :
                  stat.color === 'secondary' ? 'text-secondary' : 'text-accent-foreground'
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues Trend Chart */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Issues Trend (6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={issuesTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="reported" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="resolved" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Issues by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Response Time Chart */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Weekly Response Time (Hours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="hours" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Issues Table */}
      <Card className="admin-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Issues
            </div>
            <Button variant="outline" size="sm">
              View All Issues
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">ID</th>
                  <th className="pb-3 font-medium text-muted-foreground">Title</th>
                  <th className="pb-3 font-medium text-muted-foreground">Location</th>
                  <th className="pb-3 font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 font-medium text-muted-foreground">Priority</th>
                  <th className="pb-3 font-medium text-muted-foreground">Reported</th>
                  <th className="pb-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentIssues.map((issue, index) => (
                  <tr key={issue.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-4 text-sm font-mono">{issue.id}</td>
                    <td className="py-4 font-medium">{issue.title}</td>
                    <td className="py-4 text-muted-foreground">{issue.location}</td>
                    <td className="py-4">
                      <Badge className={`status-badge ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Badge className={`status-badge ${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      <div>{issue.reportedAt}</div>
                      <div className="text-xs">by {issue.reportedBy}</div>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;