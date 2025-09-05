import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import InteractiveMap from "@/components/InteractiveMap";
import StatsSection from "@/components/StatsSection";
import CommunityStories from "@/components/CommunityStories";
import { Button } from "@/components/ui/button";
import { MapPin, MessageSquare, Users, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Interactive Map Section */}
      <div id="map">
        <InteractiveMap />
      </div>
      
      {/* Stats Dashboard */}
      <div id="dashboard">
        <StatsSection />
      </div>
      
      {/* Community Stories */}
      <div id="community">
        <CommunityStories />
      </div>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary-glow to-secondary">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-primary-foreground mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Join thousands of citizens already transforming their communities. Your voice matters, your action counts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" className="group">
                <MapPin className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Report Your First Issue
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Users className="w-5 h-5 mr-2" />
                Join the Community
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-primary-foreground/80">
              <div className="space-y-2">
                <MessageSquare className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold">Quick Reporting</h3>
                <p className="text-sm">Report issues in under 30 seconds with photo upload</p>
              </div>
              <div className="space-y-2">
                <Users className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold">Community Power</h3>
                <p className="text-sm">Join 5,832 active citizens making real change</p>
              </div>
              <div className="space-y-2">
                <MapPin className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold">Track Progress</h3>
                <p className="text-sm">See real-time updates on your neighborhood issues</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-lg">CivicSENSE</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering communities through civic engagement and transparent governance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Report Issues</div>
                <div>Track Progress</div>
                <div>Community Map</div>
                <div>Impact Dashboard</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Success Stories</div>
                <div>Leaderboard</div>
                <div>Guidelines</div>
                <div>Support</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Contact Us</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Help Center</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          </div>
        </div>
      </footer>

      {/* Floating Action Button for Mobile */}
      <Button className="floating-action btn-hero lg:hidden">
        <MapPin className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Index;
