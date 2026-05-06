import React from 'react';
import Logo from '@/components/Logo';

const PublicFooter: React.FC = () => (
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
);

export default PublicFooter;
