
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, Heart, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Track Your Wellness",
      description: "Monitor mood, habits, and daily activities with simple taps"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "View Progress",
      description: "See your journey unfold with beautiful calendar views"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Gain Insights",
      description: "Discover patterns and trends in your wellness data"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <Logo size="large" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 tracking-tighter">
              TapJournal
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Your personal wellness companion. Track, reflect, and grow with elegant simplicity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/signup')}
                className="text-base px-8 py-3 h-14 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-elegant hover:shadow-floating"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/login')}
                className="text-base px-8 py-3 h-14 backdrop-blur-sm"
              >
                Sign In
              </Button>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group text-center p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary/15 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="text-center mt-20 p-12 rounded-3xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 border border-border/30">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4 tracking-tight">
              Ready to transform your wellness journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands who've discovered the power of mindful tracking.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/signup')}
              className="text-base px-8 py-3 h-14 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-elegant hover:shadow-floating"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
