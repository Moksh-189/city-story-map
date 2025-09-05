import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import { 
  TrendingUp, Users, Clock, MapPin, Calendar, 
  Download, Filter, BarChart3 
} from "lucide-react";

const AdminAnalytics = () => {
  // Mock analytics data
  const monthlyData = [
    { month: 'Jan', issues: 45, users: 120, resolved: 42 },
    { month: 'Feb', issues: 52, users: 135, resolved: 48 },
    { month: 'Mar', issues: 61, users: 158, resolved: 58 },
    { month: 'Apr', issues: 58, users: 142, resolved: 55 },
    { month: 'May', issues: 72, users: 168, resolved: 69 },
    { month: 'Jun', issues: 68, users: 185, resolved: 71 }
  ];

  const categoryPerformance = [
    { category: 'Roads', reported: 120, resolved: 108, avgTime: 18 },
    { category: 'Lighting', reported: 85, resolved: 82, avgTime: 12 },
    { category: 'Waste', reported: 95, resolved: 90, avgTime: 24 },
    { category: 'Water', reported: 65, resolved: 58, avgTime: 36 },
    { category: 'Other', reported: 45, resolved: 40, avgTime: 28 }
  ];

  const resolutionTrend = [
    { week: 'Week 1', resolved: 12, target: 15 },
    { week: 'Week 2', resolved: 18, target: 15 },
    { week: 'Week 3', resolved: 14, target: 15 },
    { week: 'Week 4', resolved: 22, target: 15 }
  ];

  const userEngagement = [
    { day: 'Mon', activeUsers: 245, reports: 15 },
    { day: 'Tue', activeUsers: 278, reports: 22 },
    { day: 'Wed', activeUsers: 312, reports: 18 },
    { day: 'Thu', activeUsers: 289, reports: 25 },
    { day: 'Fri', activeUsers: 334, reports: 19 },
    { day: 'Sat', activeUsers: 198, reports: 12 },
    { day: 'Sun', activeUsers: 156, reports: 8 }
  ];

  const satisfactionData = [
    { rating: '5 Stars', count: 145, color: '#10b981' },
    { rating: '4 Stars', count: 98, color: '#3b82f6' },
    { rating: '3 Stars', count: 42, color: '#f59e0b' },
    { rating: '2 Stars', count: 18, color: '#ef4444' },
    { rating: '1 Star', count: 7, color: '#6b7280' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground">Analytics</h1>
            <p className="text-muted-foreground">Detailed insights and performance metrics</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Analytics
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
                  <p className="text-2xl font-bold">87.5%</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5.2% from last month
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold">18.5h</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                    -2.3h from last month
                  </div>
                </div>
                <Clock className="w-8 h-8 text-accent-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">User Satisfaction</p>
                  <p className="text-2xl font-bold">4.2/5</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +0.3 from last month
                  </div>
                </div>
                <Users className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          <Card className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Areas</p>
                  <p className="text-2xl font-bold">12</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2 from last month
                  </div>
                </div>
                <MapPin className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trends */}
          <Card className="admin-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Monthly Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="issues" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="resolved" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card className="admin-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Category Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reported" fill="#3b82f6" name="Reported" />
                  <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* More Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Resolution Trend */}
          <Card className="admin-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Weekly Resolution vs Target
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={resolutionTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} name="Resolved" />
                  <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Satisfaction */}
          <Card className="admin-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Satisfaction Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ rating, percent }) => `${rating} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* User Engagement */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Daily User Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userEngagement}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="activeUsers" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Active Users" />
                <Area type="monotone" dataKey="reports" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} name="Reports" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;