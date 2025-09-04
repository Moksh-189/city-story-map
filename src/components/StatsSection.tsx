import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, Users, Clock, TrendingUp, Award, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  label: string;
  subtext?: string;
  delay?: number;
  color: "primary" | "secondary" | "accent" | "muted";
}

const StatCard = ({ icon: Icon, value, label, subtext, delay = 0, color }: StatCardProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = value / 60; // Animate over 1 second (60 frames)
      const animation = setInterval(() => {
        current += increment;
        if (current >= value) {
          setAnimatedValue(value);
          clearInterval(animation);
        } else {
          setAnimatedValue(Math.floor(current));
        }
      }, 16); // ~60fps

      return () => clearInterval(animation);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return "from-primary/10 to-primary-glow/5 border-primary/20";
      case "secondary":
        return "from-secondary/10 to-secondary-glow/5 border-secondary/20";
      case "accent":
        return "from-accent to-accent/50 border-accent/20";
      default:
        return "from-muted to-muted/50 border-muted/20";
    }
  };

  const getIconColor = () => {
    switch (color) {
      case "primary":
        return "text-primary";
      case "secondary":
        return "text-secondary";
      case "accent":
        return "text-accent-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={`stat-card bg-gradient-to-br ${getColorClasses()}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Icon className={`w-8 h-8 ${getIconColor()}`} />
          <div className="w-16 h-1 bg-gradient-to-r from-transparent to-current opacity-20 rounded-full" />
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl md:text-4xl font-bold font-display">
            {animatedValue.toLocaleString()}
            {label.includes('Response') && <span className="text-lg">hrs</span>}
          </div>
          <div className="text-sm font-medium text-foreground/80">{label}</div>
          {subtext && (
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {subtext}
            </div>
          )}
        </div>

        {/* Progress bar visualization */}
        <div className="mt-4 w-full h-1 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${color === 'primary' ? 'from-primary to-primary-glow' : color === 'secondary' ? 'from-secondary to-secondary-glow' : 'from-accent to-accent/80'} transition-all duration-1000 ease-out`}
            style={{ width: `${Math.min((animatedValue / value) * 100, 100)}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: CheckCircle,
      value: 1247,
      label: "Issues Resolved",
      subtext: "+23% this month",
      color: "secondary" as const
    },
    {
      icon: MapPin,
      value: 2156,
      label: "Issues Reported",
      subtext: "Across 47 areas",
      color: "primary" as const
    },
    {
      icon: Users,
      value: 5832,
      label: "Active Citizens",
      subtext: "+15% growth",
      color: "primary" as const
    },
    {
      icon: Clock,
      value: 24,
      label: "Avg Response Time",
      subtext: "2hr improvement",
      color: "accent" as const
    },
    {
      icon: Award,
      value: 89,
      label: "Satisfaction Rate",
      subtext: "4.8/5 rating",
      color: "secondary" as const
    },
    {
      icon: MessageSquare,
      value: 342,
      label: "Community Reports",
      subtext: "This week",
      color: "primary" as const
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            Community Impact Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Track real progress in your community. Every report matters, every resolution counts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              subtext={stat.subtext}
              delay={index * 200}
              color={stat.color}
            />
          ))}
        </div>

        {/* Additional insights */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">58%</div>
              <div className="text-sm text-muted-foreground">Faster resolution than last year</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-secondary">12</div>
              <div className="text-sm text-muted-foreground">Neighborhoods actively improving</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-accent-foreground">96%</div>
              <div className="text-sm text-muted-foreground">Citizens would recommend platform</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;