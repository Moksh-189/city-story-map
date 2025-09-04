import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers, Filter, Clock, User } from "lucide-react";

// Mock data for issues
const mockIssues = [
  {
    id: 1,
    title: "Pothole on Main Street",
    location: "Main St & 5th Ave",
    status: "new",
    reportedBy: "John D.",
    reportedAt: "2 hours ago",
    category: "Roads",
    image: "🕳️"
  },
  {
    id: 2,
    title: "Broken Street Light",
    location: "Park Ave & 2nd St",
    status: "progress",
    reportedBy: "Sarah M.",
    reportedAt: "1 day ago",
    category: "Lighting",
    image: "💡"
  },
  {
    id: 3,
    title: "Garbage Collection Missed",
    location: "Oak Street District",
    status: "resolved",
    reportedBy: "Mike R.",
    reportedAt: "3 days ago",
    category: "Waste",
    image: "🗑️"
  },
  {
    id: 4,
    title: "Water Leak in Park",
    location: "Central Park",
    status: "new",
    reportedBy: "Lisa K.",
    reportedAt: "5 hours ago",
    category: "Water",
    image: "💧"
  }
];

const InteractiveMap = () => {
  const [viewMode, setViewMode] = useState<'normal' | 'heatmap'>('normal');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'new' | 'progress' | 'resolved'>('all');

  const filteredIssues = mockIssues.filter(issue => 
    selectedFilter === 'all' || issue.status === selectedFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-status-new';
      case 'progress': return 'bg-status-progress';
      case 'resolved': return 'bg-status-resolved';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'New Issue';
      case 'progress': return 'In Progress';
      case 'resolved': return 'Resolved';
      default: return status;
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-4xl text-foreground mb-4">
            Community Issues Map
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track reported issues in real-time and see the progress in your neighborhood
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden h-[500px]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Interactive Map
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'normal' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('normal')}
                    >
                      <Layers className="w-4 h-4 mr-1" />
                      Normal
                    </Button>
                    <Button
                      variant={viewMode === 'heatmap' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('heatmap')}
                    >
                      <Filter className="w-4 h-4 mr-1" />
                      Heatmap
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 relative">
                {/* Placeholder Map Background */}
                <div className="w-full h-full bg-gradient-to-br from-muted via-background to-muted/50 relative overflow-hidden">
                  {/* Street Grid Overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-6 grid-rows-4 h-full w-full">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div key={i} className="border border-muted-foreground/20" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Map Pins */}
                  <div className="absolute top-1/4 left-1/3 cursor-pointer hover:scale-110 transition-transform">
                    <div className={`w-6 h-6 ${getStatusColor('new')} rounded-full border-2 border-white shadow-lg animate-pin-pulse`} />
                  </div>
                  <div className="absolute top-1/2 right-1/4 cursor-pointer hover:scale-110 transition-transform">
                    <div className={`w-6 h-6 ${getStatusColor('progress')} rounded-full border-2 border-white shadow-lg animate-pin-pulse`} />
                  </div>
                  <div className="absolute bottom-1/3 left-1/2 cursor-pointer hover:scale-110 transition-transform">
                    <div className={`w-6 h-6 ${getStatusColor('resolved')} rounded-full border-2 border-white shadow-lg animate-pin-pulse`} />
                  </div>
                  <div className="absolute top-3/4 right-1/3 cursor-pointer hover:scale-110 transition-transform">
                    <div className={`w-6 h-6 ${getStatusColor('new')} rounded-full border-2 border-white shadow-lg animate-pin-pulse`} />
                  </div>

                  {/* Heatmap Overlay */}
                  {viewMode === 'heatmap' && (
                    <div className="absolute inset-0 bg-gradient-radial from-red-500/30 via-orange-400/20 to-transparent" />
                  )}

                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 glass-card p-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-3 h-3 ${getStatusColor('new')} rounded-full`} />
                      <span>New Issues</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-3 h-3 ${getStatusColor('progress')} rounded-full`} />
                      <span>In Progress</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-3 h-3 ${getStatusColor('resolved')} rounded-full`} />
                      <span>Resolved</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Issues Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Latest Issues
                  <div className="flex gap-1">
                    {(['all', 'new', 'progress', 'resolved'] as const).map((filter) => (
                      <Button
                        key={filter}
                        variant={selectedFilter === filter ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedFilter(filter)}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </Button>
                    ))}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredIssues.map((issue, index) => (
                  <div
                    key={issue.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{issue.image}</span>
                        <div>
                          <h4 className="font-semibold text-sm">{issue.title}</h4>
                          <p className="text-xs text-muted-foreground">{issue.location}</p>
                        </div>
                      </div>
                      <Badge className={`status-badge status-${issue.status}`}>
                        {getStatusText(issue.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {issue.reportedBy}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {issue.reportedAt}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;