import { Button } from "@/components/ui/button";
import { MapPin, Users, TrendingUp } from "lucide-react";
import heroMapBackground from "@/assets/hero-map-background.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with map image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroMapBackground})` }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      {/* Animated map pins */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-status-new rounded-full animate-pin-pulse" />
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-status-progress rounded-full animate-pin-pulse animation-delay-1000" />
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-status-resolved rounded-full animate-pin-pulse animation-delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-primary rounded-full animate-pin-pulse animation-delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <div className="animate-fade-in">
          <h1 className="font-display font-bold text-5xl md:text-7xl text-primary-foreground mb-6 leading-tight">
            Turn Complaints
            <span className="block bg-gradient-to-r from-primary-glow to-secondary-glow bg-clip-text text-transparent">
              Into Change
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your voice matters. Report issues, track progress, and make your city better.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="default" size="lg" className="btn-hero group">
              <MapPin className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Report an Issue
            </Button>
            <Button variant="outline" size="lg" className="btn-hero-outline">
              <Users className="w-5 h-5 mr-2" />
              View Community Map
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="glass-card p-4 text-center animate-slide-up">
              <TrendingUp className="w-8 h-8 text-primary-glow mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-foreground">1,247</div>
              <div className="text-sm text-primary-foreground/70">Issues Resolved</div>
            </div>
            <div className="glass-card p-4 text-center animate-slide-up animation-delay-200">
              <Users className="w-8 h-8 text-secondary-glow mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-foreground">5,832</div>
              <div className="text-sm text-primary-foreground/70">Active Citizens</div>
            </div>
            <div className="glass-card p-4 text-center animate-slide-up animation-delay-400">
              <MapPin className="w-8 h-8 text-primary-glow mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary-foreground">24hrs</div>
              <div className="text-sm text-primary-foreground/70">Avg Response</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full p-1">
          <div className="w-1 h-3 bg-primary-foreground/60 rounded-full mx-auto animate-ping" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;