import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star, MapPin, Clock, Trophy } from "lucide-react";
import { useState } from "react";
import citizen1 from "@/assets/citizen-1.jpg";

// Mock community stories data
const stories = [
  {
    id: 1,
    name: "Aarav Mehta",
    avatar: citizen1,
    issue: "Reported a dangerous pothole near the elementary school",
    resolution: "The pothole was fixed within 24 hours, making the route safe for children again!",
    location: "MG Road, Bengaluru",
    timeToResolve: "24 hours",
    impactPoints: 150,
    category: "Road Safety",
    status: "resolved"
  },
  {
    id: 2,
    name: "Kunal Sharma",
    avatar: citizen1, // We'll generate more images
    issue: "Broken playground equipment at Central Park",
    resolution: "New swing set installed and safety inspection completed. Kids are happy!",
    location: "Nehru Park, Delhi",
    timeToResolve: "3 days",
    impactPoints: 200,
    category: "Recreation",
    status: "resolved"
  },
  {
    id: 3,
    name: "Ananya Desai",
    avatar: citizen1,
    issue: "Flickering street lights causing safety concerns",
    resolution: "All 12 street lights on the block were upgraded to LED and are working perfectly.",
    location: "Ashok Nagar, Mumbai",
    timeToResolve: "5 days",
    impactPoints: 180,
    category: "Lighting",
    status: "resolved"
  },
  {
    id: 4,
    name: "Rohan Iyer",
    avatar: citizen1,
    issue: "Overgrown vegetation blocking pedestrian walkway",
    resolution: "City maintenance team cleared the path and scheduled regular trimming.",
    location: "Marina Beach Road, Chennai",
    timeToResolve: "2 days",
    impactPoints: 120,
    category: "Maintenance",
    status: "resolved"
  }
];

// Top reporters leaderboard
const topReporters = [
  { name: "Shruti Agarwal", points: 850, reports: 23, badge: "Community Champion" },
  { name: "Aditya Rao", points: 720, reports: 19, badge: "Safety Guardian" },
  { name: "Tanvi Verma", points: 680, reports: 17, badge: "Neighborhood Hero" },
  { name: "Viraj Malhotra", points: 540, reports: 14, badge: "Active Citizen" },
  { name: "Meera Chauhan", points: 420, reports: 11, badge: "Change Maker" }
];


const CommunityStories = () => {
  const [currentStory, setCurrentStory] = useState(0);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const story = stories[currentStory];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 via-background to-primary/5">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            Community Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real stories from real citizens making a difference in their neighborhoods
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Featured Story Slider */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-elevated">
              <CardContent className="p-0">
                {/* Story Navigation */}
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
                  <Button variant="ghost" size="icon" onClick={prevStory}>
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">Featured Success Story</h3>
                    <p className="text-sm text-muted-foreground">
                      {currentStory + 1} of {stories.length}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={nextStory}>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Story Content */}
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={story.avatar}
                        alt={story.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-semibold">
                        +{story.impactPoints}
                      </div>
                    </div>

                    {/* Story Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h4 className="font-display font-semibold text-2xl text-foreground">
                          {story.name}
                        </h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {story.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Resolved in {story.timeToResolve}
                          </div>
                          <Badge variant="outline">{story.category}</Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-status-new">
                          <p className="text-sm font-medium text-muted-foreground mb-1">Reported Issue:</p>
                          <p className="text-foreground">{story.issue}</p>
                        </div>
                        
                        <div className="p-4 bg-secondary/10 rounded-lg border-l-4 border-status-resolved">
                          <p className="text-sm font-medium text-muted-foreground mb-1">Resolution:</p>
                          <p className="text-foreground">{story.resolution}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          "Amazing response time and quality work!"
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Story Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStory ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Leaderboard Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <h3 className="font-display font-semibold text-xl">Top Contributors</h3>
                </div>
                
                <div className="space-y-4">
                  {topReporters.map((reporter, index) => (
                    <div
                      key={reporter.name}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:shadow-md ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200' :
                        index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200' :
                        index === 2 ? 'bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200' :
                        'bg-muted/30 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{reporter.name}</h4>
                        <p className="text-xs text-muted-foreground">{reporter.reports} reports</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm text-primary">{reporter.points}</div>
                        <Badge variant="outline" className="text-xs">
                          {reporter.badge}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View Full Leaderboard
                </Button>
              </CardContent>
            </Card>

            {/* Gamification Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display font-semibold text-lg mb-4">Earn Impact Points</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Report an issue</span>
                    <Badge variant="secondary">+50 pts</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Issue gets resolved</span>
                    <Badge variant="secondary">+100 pts</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Community feedback</span>
                    <Badge variant="secondary">+25 pts</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Monthly top reporter</span>
                    <Badge variant="secondary">+500 pts</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityStories;
