
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Linkedin } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
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
            <Button variant="outline" onClick={() => navigate('/login')}>Log In</Button>
            <Button onClick={() => navigate('/signup')}>Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-8 pl-0 flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} />
          Back to Home
        </Button>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <div className="bg-card p-8 rounded-lg border border-border">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-lg mb-6">
              At TapJournal, our mission is to empower individuals to take control of their health and wellness
              through simple, intuitive tracking. We believe that small, consistent steps lead to meaningful change,
              and our platform is designed to make those steps as effortless as possible.
            </p>
            <p className="text-lg mb-6">
              We're committed to creating tools that help people understand their bodies, minds, and habits better.
              By providing easy-to-use tracking features for everything from medication adherence to mood patterns,
              we enable our users to gather valuable insights that can improve their overall wellbeing.
            </p>
            <p className="text-lg">
              Our goal is to make wellness tracking accessible to everyone, regardless of technical proficiency or
              health background. We strive to continuously improve our platform based on user feedback, scientific
              research, and emerging best practices in the health and wellness space.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">About the Founder</h2>
          <div className="bg-card p-8 rounded-lg border border-border">
            <p className="text-lg mb-6">
              I'm Theresa, the Founder and CEO of TapJournal. I was born and raised in MA and am a Cornell University alum. 
              I have always had a passion for helping others and having an impact on my community. Before founding TapJournal, 
              I've worked with organizations like Black Futures Lab, GetThru, Teach for America, and Care2.
            </p>
            <p className="text-lg mb-6">
              In my spare time, I love keeping up with politics, cooking, comedy, and exploring new places. 
              Connect with me online {" "}
              <a 
                href="https://linkedin.com/in/theresa-anoje" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline font-medium inline-flex items-center"
              >
                here
                <Linkedin className="ml-1 h-4 w-4" />
              </a>.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Logo size="small" />
              <span className="text-lg font-bold ml-2">TapJournal</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TapJournal. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
