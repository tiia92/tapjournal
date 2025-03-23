
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Droplets, BookText, Pill, Heart, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border shadow-sm bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <Logo size="medium" />
            <h1 className="text-2xl font-bold ml-2">TapJournal</h1>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" onClick={() => navigate('/about')}>About Us</Button>
            <Button variant="outline" onClick={() => navigate('/login')}>Log In</Button>
            <Button onClick={() => navigate('/signup')}>Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between py-16 md:py-24">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Track your day, your wellness, and your growth, one tap at a time
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              TapJournal helps you monitor your daily habits, goals, and wellness to help you grow day to day.
            </p>
            <div className="space-x-4">
              <Button size="lg" onClick={() => navigate('/signup')}>
                Get Started
                <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                Log In
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <Logo size="large" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 border-t border-border">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <BookText className="text-orange-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Journal</h3>
              <p className="text-muted-foreground">
                Record your thoughts and reflections with our easy-to-use journaling tool with text, audio, images, emojis, and more.
              </p>
            </div>

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

            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-green-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Symptom Tracking</h3>
              <p className="text-muted-foreground">
                Record pain levels, energy, mood, and symptoms to understand patterns and share with healthcare providers.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Pill className="text-purple-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Medication Management</h3>
              <p className="text-muted-foreground">
                Track your medications with a personalized list that remembers your past prescriptions.
              </p>
            </div>
            
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
          <Button size="lg" onClick={() => navigate('/signup')}>
            Sign Up for Free
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </main>

      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0 cursor-pointer" onClick={() => navigate('/')}>
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
