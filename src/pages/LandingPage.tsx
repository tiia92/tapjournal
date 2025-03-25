import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Droplets, BookText, Pill, Heart, ArrowRight, LogOut } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [activeWord, setActiveWord] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const words = [
    { text: 'day', color: 'from-orange-400 to-pink-500' },
    { text: 'wellness', color: 'from-blue-500 to-purple-600' },
    { text: 'growth', color: 'from-green-400 to-emerald-500' }
  ];
  
  useEffect(() => {
    // Set up word rotation every 1.5 seconds with fade transition
    const wordInterval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveWord(prev => (prev + 1) % words.length);
        setIsTransitioning(false);
      }, 300); // Wait for fade out before changing word
    }, 1500);
    
    return () => clearInterval(wordInterval);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border shadow-sm bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Logo size="medium" />
            <h1 className="text-2xl font-bold ml-2">TapJournal</h1>
          </div>
          <div className="space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Button onClick={() => navigate('/dashboard')}>Go to Journal</Button>
                <Button variant="ghost" onClick={() => navigate('/about')}>About Us</Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/about')}>About Us</Button>
                <Button variant="outline" onClick={() => navigate('/login')}>Log In</Button>
                <Button onClick={() => navigate('/signup')}>Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between py-16 md:py-24">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Track your{' '}
              <span 
                className={`bg-gradient-to-r ${words[activeWord].color} bg-clip-text text-transparent transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
              >
                {words[activeWord].text}
              </span>
            </h2>
            <p className="text-4xl md:text-5xl font-bold mb-6">
              one tap at a time
            </p>
            <p className="text-xl text-muted-foreground mb-8">
              TapJournal helps you monitor your daily habits, goals, and wellness to help you grow day to day.
            </p>
            <div className="space-x-4">
              {isAuthenticated ? (
                <Button size="lg" onClick={() => navigate('/dashboard')}>
                  Go to Journal
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              ) : (
                <>
                  <Button size="lg" onClick={() => navigate('/signup')}>
                    Get Started
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                    Log In
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/9367920c-5252-4e6a-8580-7837623b79f2.png" 
                alt="Journal with phone and laptop" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 border-t border-border">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Personal Journal */}
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <BookText className="text-orange-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Journal</h3>
              <p className="text-muted-foreground">
                Record your thoughts and reflections with our easy-to-use journaling tool with text, audio, images, emojis, and more.
              </p>
            </div>

            {/* Habit Tracking */}
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Droplets className="text-blue-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Habit Tracking</h3>
              <p className="text-muted-foreground">
                Monitor daily habits like water intake, sleep hours, and completed tasks 
                with our simple tap interface.
              </p>
            </div>

            {/* Symptom Tracking */}
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-green-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Symptom Tracking</h3>
              <p className="text-muted-foreground">
                Record pain levels, energy, mood, and symptoms to understand patterns and share with healthcare providers.
              </p>
            </div>
            
            {/* Medication Management */}
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Pill className="text-purple-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Medication Management</h3>
              <p className="text-muted-foreground">
                Track your medications with a personalized list that remembers your past prescriptions.
              </p>
            </div>
            
            {/* Wellness Insights */}
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-red-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wellness Insights</h3>
              <p className="text-muted-foreground">
                Gain valuable insights into your habits and health patterns with premium analytics.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 border-t border-border mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Start your wellness journey today</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are taking control of their health one day at a time.
          </p>
          {isAuthenticated ? (
            <Button size="lg" onClick={() => navigate('/dashboard')}>
              Go to Journal
              <ArrowRight className="ml-2" size={18} />
            </Button>
          ) : (
            <Button size="lg" onClick={() => navigate('/signup')}>
              Sign Up for Free
              <ArrowRight className="ml-2" size={18} />
            </Button>
          )}
        </div>
      </main>

      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Logo size="small" />
              <span className="text-lg font-bold ml-2">TapJournal</span>
            </div>
            <div className="flex gap-6">
              <a href="/about" className="text-sm hover:text-primary transition-colors">
                About Us
              </a>
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} TapJournal. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
