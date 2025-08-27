import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, TrendingUp, Clock, CheckCircle } from "lucide-react";

interface SplashScreenProps {
  onRoleSelect: (role: 'advisor' | 'assistant' | 'client') => void;
}

export const SplashScreen = ({ onRoleSelect }: SplashScreenProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const roles = [
    {
      id: 'advisor' as const,
      title: 'Advisor',
      description: 'Full access to dashboard, clients, and settings',
      icon: TrendingUp,
      color: 'primary',
      features: ['Complete client management', 'Export capabilities', 'Team collaboration', 'Full settings access']
    },
    {
      id: 'assistant' as const,
      title: 'Assistant',
      description: 'Operational access for client management',
      icon: Users,
      color: 'warning',
      features: ['Client data entry', 'Document management', 'Message coordination', 'Export assistance']
    },
    {
      id: 'client' as const,
      title: 'Client',
      description: 'Self-service portal for profile completion',
      icon: Shield,
      color: 'accent',
      features: ['Complete your profile', 'Save and resume', 'Secure messaging', 'Document access']
    }
  ];

  const stats = [
    { label: 'Client Retention', value: '94%', icon: CheckCircle },
    { label: 'Avg. Completion Time', value: '2.3 days', icon: Clock },
    { label: 'Data Accuracy', value: '99.7%', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-glow/10 rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-warning/10 rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className={`text-center mb-12 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className="text-6xl font-bold text-primary-foreground mb-4 font-serif">
            First 90
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Win trust in the first 90 days with modern, low-friction onboarding
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className={`flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 ${mounted ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <stat.icon className="w-5 h-5 text-primary-foreground" />
                <span className="text-primary-foreground font-semibold">{stat.value}</span>
                <span className="text-primary-foreground/80 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Value Proposition */}
        <div className={`text-center mb-12 ${mounted ? 'animate-slide-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-semibold text-primary-foreground mb-4">
            Why the First 90 Days Matter
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-semibold text-primary-foreground mb-2">Build Trust</h3>
              <p className="text-primary-foreground/80 text-sm">Professional onboarding creates confidence and sets expectations for long-term relationships.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-semibold text-primary-foreground mb-2">Reduce Friction</h3>
              <p className="text-primary-foreground/80 text-sm">Modern forms and guided processes eliminate confusion and speed up account opening.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-semibold text-primary-foreground mb-2">Ensure Compliance</h3>
              <p className="text-primary-foreground/80 text-sm">Comprehensive data collection meets regulatory requirements while protecting client privacy.</p>
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-center text-primary-foreground mb-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            Choose Your Role
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <Card 
                key={role.id} 
                className={`bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${mounted ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: `${0.8 + index * 0.2}s` }}
                onClick={() => onRoleSelect(role.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-primary w-fit">
                    <role.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-serif">{role.title}</CardTitle>
                  <CardDescription className="text-base">{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {role.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full btn-hero text-base py-6"
                    onClick={() => onRoleSelect(role.id)}
                  >
                    Continue as {role.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center mt-12 ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1.4s' }}>
          <p className="text-primary-foreground/70 text-sm">
            Secure, compliant, and designed for the modern financial advisor
          </p>
        </div>
      </div>
    </div>
  );
};