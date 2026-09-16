import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicNav from '@/components/PublicNav';
import PublicFooter from '@/components/PublicFooter';

/**
 * Single place to change the contact address used on the legal pages.
 * Replace with the real support mailbox before launch.
 */
export const SUPPORT_EMAIL = 'support@tapjournal.com';
export const LEGAL_UPDATED = 'September 16, 2026';

type LegalLayoutProps = {
  title: string;
  intro: string;
  pageTitle: string;
  metaDescription: string;
  children: React.ReactNode;
};

const LegalLayout: React.FC<LegalLayoutProps> = ({
  title,
  intro,
  pageTitle,
  metaDescription,
  children,
}) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = pageTitle;

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const hadMeta = !!meta;
    const previousDescription = meta?.getAttribute('content') ?? '';
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', metaDescription);

    return () => {
      document.title = previousTitle;
      if (meta) {
        if (hadMeta) {
          meta.setAttribute('content', previousDescription);
        } else {
          meta.remove();
        }
      }
    };
  }, [pageTitle, metaDescription]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNav />
      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{title}</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Last updated: {LEGAL_UPDATED}
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
            {intro}
          </p>
          <div className="space-y-10">{children}</div>
          <div className="mt-12 rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold mb-2">Questions</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Email us at{' '}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-primary font-medium hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>{' '}
              and we&apos;ll get back to you.
            </p>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            <Link to="/" className="text-primary font-medium hover:underline">
              Back to home
            </Link>
          </p>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
};

type SectionProps = {
  heading: string;
  children: React.ReactNode;
};

export const LegalSection: React.FC<SectionProps> = ({ heading, children }) => (
  <section aria-labelledby={heading.replace(/[^a-zA-Z0-9]/g, '-')} className="scroll-mt-24">
    <h2 className="text-xl md:text-2xl font-semibold mb-3">{heading}</h2>
    <div className="space-y-3 text-sm md:text-base leading-relaxed text-foreground/90">
      {children}
    </div>
  </section>
);

export default LegalLayout;
