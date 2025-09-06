import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, MessageSquare, Award, TrendingUp, MapPin, Heart,
  Calendar, User, Star, ArrowRight, Clock, CheckCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Community = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      // User is logged in, navigate to dashboard
      navigate('/dashboard');
    } else {
      // User is not logged in, navigate to signup
      navigate('/signup');
    }
  };

  const handleReportIssue = () => {
    if (user) {
      // Navigate to issue reporting page
      navigate('/report-issue');
    } else {
      // Redirect to login with return URL
      navigate('/login?redirect=/report-issue');
    }
  };

  const handleVolunteer = () => {
    if (user) {
      // Navigate to volunteer page
      navigate('/volunteer');
    } else {
      // Redirect to signup with volunteer context
      navigate('/signup?context=volunteer');
    }
  };

  const communityStats = [
    { label: "Active Members", value: "5,832", icon: Users, color: "text-blue-600" },
    { label: "Issues Resolved", value: "1,247", icon: CheckCircle, color: "text-green-600" },
    { label: "Community Posts", value: "892", icon: MessageSquare, color: "text-purple-600" },
    { label: "Success Stories", value: "156", icon: Award, color: "text-orange-600" }
  ];

  const topContributors = [
    { name: "Aarav Mehta", issues: 23, avatar: "AM", location: "Bengaluru", badge: "Champion" },
    { name: "Shruti Agarwal", issues: 18, avatar: "SA", location: "Delhi", badge: "Hero" },
    { name: "Rohan Iyer", issues: 15, avatar: "RI", location: "Pune", badge: "Activist" },
    { name: "Priya Sharma", issues: 12, avatar: "PS", location: "Mumbai", badge: "Contributor" }
  ];

  const recentActivity = [
    { user: "Aarav M.", action: "reported a pothole", location: "MG Road", time: "2 hours ago" },
    { user: "Shruti A.", action: "resolved street light issue", location: "Lodhi Road", time: "4 hours ago" },
    { user: "Rohan I.", action: "joined the community", location: "Pune", time: "6 hours ago" },
    { user: "Priya S.", action: "started a discussion", location: "Bandra", time: "8 hours ago" }
  ];

  const upcomingEvents = [
    {
      title: "Community Cleanup Drive",
      date: "March 15, 2024",
      time: "9:00 AM",
      location: "Central Park, Bengaluru",
      participants: 45
    },
    {
      title: "Civic Awareness Workshop",
      date: "March 22, 2024", 
      time: "2:00 PM",
      location: "Community Center, Delhi",
      participants: 32
    },
    {
      title: "Monthly Town Hall",
      date: "March 30, 2024",
      time: "6:00 PM",
      location: "Virtual Meeting",
      participants: 120
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary-glow to-secondary">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display font-bold text-5xl md:text-6xl text-primary-foreground mb-6">
              {user ? `Welcome back, ${user.user_metadata?.full_name?.split(' ')[0] || 'Citizen'}!` : 'Join Our Growing'}
              <span className="block bg-gradient-to-r from-secondary-glow to-primary-glow bg-clip-text text-transparent">
                {user ? 'Community' : 'Community'}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              {user 
                ? "Continue making a positive impact in your community and connect with fellow citizens."
                : "Connect with passionate citizens working together to create positive change in their communities."
              }
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="btn-hero group"
              onClick={handleGetStarted}
            >
              <Users className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              {user ? 'Go to Dashboard' : 'Get Started Today'}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* User Status Banner */}
      {user && (
        <section className="py-4 bg-green-50 border-b border-green-200">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                You're logged in as {user.email} - Ready to make an impact!
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Community Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Contributors */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl text-foreground mb-4">
              Community Champions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the amazing citizens leading positive change in their communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topContributors.map((contributor, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-4">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                      {contributor.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{contributor.name}</CardTitle>
                  <CardDescription className="flex items-center justify-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {contributor.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="mb-3">
                    {contributor.badge}
                  </Badge>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {contributor.issues} issues resolved
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity & Upcoming Events */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Stay updated with the latest community actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {activity.user.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" />
                          {activity.location}
                          <Clock className="w-3 h-3 ml-2" />
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>
                  Join community events and make a difference
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <h4 className="font-semibold text-foreground mb-2">{event.title}</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {event.date} at {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {event.participants} participants
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="mt-3"
                        onClick={() => user ? navigate('/events') : navigate('/login?redirect=/events')}
                      >
                        {user ? 'Join Event' : 'Login to Join'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-secondary via-secondary-glow to-primary">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-primary-foreground mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              {user 
                ? "Continue your journey of creating positive change in your neighborhood."
                : "Join our community of passionate citizens and start creating positive change in your neighborhood today."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="group"
                onClick={handleReportIssue}
              >
                <MapPin className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                {user ? 'Report An Issue' : 'Report Your First Issue'}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={handleVolunteer}
              >
                <Heart className="w-5 h-5 mr-2" />
                {user ? 'View Opportunities' : 'Volunteer Today'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg">civicSENSE</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Building stronger communities through civic engagement
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Community;
