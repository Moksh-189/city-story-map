import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Plus, 
  Users, 
  Trophy, 
  MessageSquare, 
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Bell,
  LogOut
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const mockUserData = {
    name: "Arjun Patel",
    location: "Koramangala, Bangalore",
    joinedDate: "March 2024",
    points: 245,
    level: "Community Champion",
    issuesReported: 12,
    issuesResolved: 8,
    avatar: "/placeholder.svg"
  };

  const mockIssues = [
    {
      id: 1,
      title: "Broken streetlight near Metro Station",
      location: "MG Road Metro Station, Bangalore",
      status: "resolved",
      reportedDate: "2 days ago",
      category: "Infrastructure",
      points: 15
    },
    {
      id: 2,
      title: "Pothole causing traffic issues",
      location: "Outer Ring Road, Marathahalli",
      status: "in-progress",
      reportedDate: "5 days ago",
      category: "Roads",
      points: 20
    },
    {
      id: 3,
      title: "Garbage dumping near park",
      location: "Cubbon Park vicinity",
      status: "new",
      reportedDate: "1 week ago",
      category: "Sanitation",
      points: 10
    }
  ];

  const mockCommunityActivity = [
    {
      user: "Sneha Reddy",
      action: "resolved an issue",
      issue: "Water logging in HSR Layout",
      time: "2 hours ago"
    },
    {
      user: "Vikram Singh",
      action: "reported a new issue",
      issue: "Traffic signal malfunction",
      time: "4 hours ago"
    },
    {
      user: "Meera Joshi",
      action: "joined the community",
      issue: "",
      time: "6 hours ago"
    }
  ];

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "in-progress": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "new": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/login">
              <Button className="w-full">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" className="w-full">Create Account</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl">civicSENSE</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={mockUserData.avatar} />
                <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                  {mockUserData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {mockUserData.name}!</h1>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4" />
                  {mockUserData.location}
                </p>
              </div>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Report New Issue
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Impact Points</p>
                    <p className="text-2xl font-bold text-primary">{mockUserData.points}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Issues Reported</p>
                    <p className="text-2xl font-bold">{mockUserData.issuesReported}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Issues Resolved</p>
                    <p className="text-2xl font-bold text-green-600">{mockUserData.issuesResolved}</p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Community Level</p>
                    <p className="text-lg font-semibold">{mockUserData.level}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="issues" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="issues">My Issues</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="issues">
            <Card>
              <CardHeader>
                <CardTitle>Your Reported Issues</CardTitle>
                <CardDescription>Track the progress of issues you've reported</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockIssues.map((issue) => (
                    <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{issue.title}</h3>
                          <Badge className={getStatusColor(issue.status)}>
                            {issue.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                          <MapPin className="w-3 h-3" />
                          {issue.location}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Reported {issue.reportedDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Points Earned</p>
                        <p className="text-lg font-semibold text-primary">+{issue.points}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Community Activity</CardTitle>
                  <CardDescription>See what's happening in your neighborhood</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCommunityActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {activity.user.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span>{" "}
                            {activity.action}
                            {activity.issue && (
                              <>: <span className="text-muted-foreground">{activity.issue}</span></>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Neighborhood Stats</CardTitle>
                  <CardDescription>Koramangala community overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Members</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Issues This Month</span>
                    <span className="font-semibold">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Resolution Rate</span>
                    <span className="font-semibold text-green-600">78%</span>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Monthly Goal</span>
                      <span className="text-sm font-medium">67/85</span>
                    </div>
                    <Progress value={79} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Your Impact Journey</CardTitle>
                <CardDescription>See how you're making a difference</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">This Month</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Issues Reported</span>
                        <span className="font-medium">4</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Points Earned</span>
                        <span className="font-medium">65</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Community Rank</span>
                        <span className="font-medium">#23</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">All Time</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Points</span>
                        <span className="font-medium">{mockUserData.points}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Success Rate</span>
                        <span className="font-medium">67%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Member Since</span>
                        <span className="font-medium">{mockUserData.joinedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Progress to Next Level</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Community Champion</span>
                      <span>255/500 points</span>
                    </div>
                    <Progress value={51} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      245 more points to reach <strong>Community Leader</strong>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;