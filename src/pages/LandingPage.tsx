import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Droplets, BookText, Pill, Heart, ArrowRight, LogOut } from 'lucide-react';
import Logo from '@/components/Logo';
import MobileNav from '@/components/MobileNav';
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

  // Scroll reveal animations for LandingPage
  useEffect(() => {
    const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0', 'translate-y-4');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border shadow-sm bg-card safe-top">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Logo size="medium" />
            <h1 className="text-xl md:text-2xl font-bold ml-2">TapJournal</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Button onClick={() => navigate('/dashboard')}>Go to Journal</Button>
                <Button variant="ghost" onClick={() => navigate('/about')}>About Us</Button>
                <Button variant="ghost" onClick={() => navigate('/pricing')}>Pricing</Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/about')}>About Us</Button>
                <Button variant="ghost" onClick={() => navigate('/pricing')}>Pricing</Button>
                <Button variant="outline" onClick={() => navigate('/login')}>Log In</Button>
                <Button onClick={() => navigate('/signup')}>Sign Up</Button>
              </>
            )}
          </div>
          
          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-16 lg:py-24">
          <div data-reveal className="w-full md:w-1/2 mb-8 md:mb-0 opacity-0 translate-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              Track your{' '}
              <span 
                className={`bg-gradient-to-r ${words[activeWord].color} bg-clip-text text-transparent transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
              >
                {words[activeWord].text}
              </span>
            </h2>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              one tap at a time
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
              TapJournal helps you monitor your daily habits, goals, and wellness to help you grow day to day.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              {isAuthenticated ? (
                <Button size="lg" className="w-full sm:w-auto min-h-[48px]" onClick={() => navigate('/dashboard')}>
                  Go to Journal
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              ) : (
                <>
                  <Button size="lg" className="w-full sm:w-auto min-h-[48px]" onClick={() => navigate('/signup')}>
                    Get Started
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[48px]" onClick={() => navigate('/login')}>
                    Log In
                  </Button>
                </>
              )}
            </div>
          </div>
          <div data-reveal className="w-full md:w-1/2 flex justify-center opacity-0 translate-y-4">
            <div className="rounded-lg overflow-hidden shadow-lg max-w-md md:max-w-none">
              <img 
                src="/lovable-uploads/9367920c-5252-4e6a-8580-7837623b79f2.png" 
                alt="Journal with phone and laptop" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 md:py-16 border-t border-border">
          <h2 data-reveal className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center opacity-0 translate-y-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Personal Journal */}
            <div data-reveal className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 focus:shadow-xl focus:-translate-y-0.5 opacity-0 translate-y-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <BookText className="text-orange-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Journal</h3>
              <p className="text-muted-foreground">
                Record your thoughts and reflections with our easy-to-use journaling tool with text, audio, images, emojis, and more.
              </p>
            </div>

            {/* Habit Tracking */}
            <div data-reveal className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 focus:shadow-xl focus:-translate-y-0.5 opacity-0 translate-y-4">
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
            <div data-reveal className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 focus:shadow-xl focus:-translate-y-0.5 opacity-0 translate-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-green-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Symptom Tracking</h3>
              <p className="text-muted-foreground">
                Record pain levels, energy, mood, and symptoms to understand patterns and share with healthcare providers.
              </p>
            </div>
            
            {/* Medication Management */}
            <div data-reveal className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 focus:shadow-xl focus:-translate-y-0.5 opacity-0 translate-y-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Pill className="text-purple-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Medication Management</h3>
              <p className="text-muted-foreground">
                Track your medications with a personalized list that remembers your past prescriptions.
              </p>
            </div>
            
            {/* Wellness Insights */}
            <div data-reveal className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 focus:shadow-xl focus:-translate-y-0.5 opacity-0 translate-y-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-red-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wellness Insights</h3>
              <p className="text-muted-foreground">
                Gain valuable insights into your habits and health patterns with premium analytics.
              </p>
            </div>

            {/* AI-powered Recommendations */}
            <div data-reveal className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 focus:shadow-xl focus:-translate-y-0.5 opacity-0 translate-y-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Recommendations</h3>
              <p className="text-muted-foreground">
                Get personalized wellness programs and actionable suggestions powered by AI (included with Premium).
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div data-reveal className="py-12 md:py-16 border-t border-border mb-12 md:mb-16 text-center opacity-0 translate-y-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Start your wellness journey today</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Join thousands of users who are taking control of their health one day at a time.
          </p>
          {isAuthenticated ? (
            <Button size="lg" className="w-full sm:w-auto min-h-[48px]" onClick={() => navigate('/dashboard')}>
              Go to Journal
              <ArrowRight className="ml-2" size={18} />
            </Button>
          ) : (
            <Button size="lg" className="w-full sm:w-auto min-h-[48px]" onClick={() => navigate('/signup')}>
              Sign Up for Free
              <ArrowRight className="ml-2" size={18} />
            </Button>
          )}
        </div>
      </main>

      <footer className="border-t border-border bg-card py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Logo size="small" />
              <span className="text-lg font-bold ml-2">TapJournal</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-center md:text-left">
              <a href="/about" className="text-sm hover:text-primary transition-colors">
                About Us
              </a>
              <a href="/pricing" className="text-sm hover:text-primary transition-colors">
                Pricing
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
