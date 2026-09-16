import React from 'react';
import LegalLayout, { LegalSection } from '@/components/LegalLayout';

const Terms = () => (
  <LegalLayout
    title="Terms of Service"
    pageTitle="Terms of Service | TapJournal"
    metaDescription="The terms that govern your use of TapJournal, including accounts, acceptable use, your content, premium subscription and billing, and disclaimers."
    intro="These terms are the agreement between you and TapJournal covering your use of our website and app. By creating an account or using TapJournal you accept them."
  >
    <LegalSection heading="1. Using TapJournal">
      <p>
        TapJournal gives you a private place to track habits, moods, chores, work tasks, goals,
        and wellness programs. Some features are free; premium features require a paid
        subscription. We may add, change, or retire features over time as long as we do not
        materially reduce what you have paid for during a term you have already bought.
      </p>
    </LegalSection>

    <LegalSection heading="2. Eligibility">
      <p>
        You must be at least 16 years old to use TapJournal. If you are 16 or 17, you may only use
        the service with the permission of a parent or guardian. By accepting these terms you
        confirm that you can lawfully enter into this agreement.
      </p>
    </LegalSection>

    <LegalSection heading="3. Your account">
      <p>
        Keep your password confidential and do not share your login with others. You are
        responsible for activity that happens under your account. Tell us promptly at the contact
        address on this page if you believe your account has been used without your permission.
        Provide accurate information so we can reach you about your account, receipts, and
        security.
      </p>
    </LegalSection>

    <LegalSection heading="4. Acceptable use">
      <p>You agree not to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>use the service for unlawful, harmful, harassing, or deceptive purposes</li>
        <li>upload content that is infringing, hateful, or that you have no right to share</li>
        <li>attempt to gain unauthorized access, scan, probe, or disable any part of the service</li>
        <li>scrape, bulk-download, or resell the service or its content without our permission</li>
        <li>reverse engineer, or build a competing product from, the service or its source</li>
        <li>interfere with other people&apos;s use of the service or its normal operation</li>
        <li>use automated tools to create accounts or evade usage limits</li>
      </ul>
    </LegalSection>

    <LegalSection heading="5. Your content">
      <p>
        You own the entries, tasks, goals, and other material you create in TapJournal. You grant
        us only the limited license needed to store, display, and back it up so we can deliver the
        service to you, and to process the text you submit to the AI assistant so it can respond.
      </p>
      <p>
        You are responsible for the content you add. Please do not enter other people&apos;s
        confidential or personal information without their knowledge. If you stop using the service
        or clear your browser storage, your content may no longer be recoverable &mdash; export
        anything you want to keep.
      </p>
    </LegalSection>

    <LegalSection heading="6. Not medical advice">
      <p>
        TapJournal is a personal wellness tool. It is not a medical device, a diagnosis, a
        treatment, therapy, or a substitute for professional care, and the AI assistant can produce
        incorrect or inappropriate suggestions. Always talk to a qualified clinician before making
        health decisions, and stop using the app if a feature causes distress. If you are in
        crisis, contact your local emergency number or a crisis line in your country.
      </p>
    </LegalSection>

    <LegalSection heading="7. Premium subscription and billing">
      <p>
        Premium is billed in US dollars through our payment provider: <strong>$7.99 per month</strong>{' '}
        for the monthly plan and <strong>$59.99 per year</strong> for the yearly plan. Applicable
        taxes may be added at checkout. Payment is collected up front for each term.
      </p>
      <p>
        Subscriptions renew automatically at the same price until you cancel. You can cancel at any
        time from your account or by contacting us; you keep premium access through the end of the
        term you already paid for, and we do not charge you again after that. Refunds are handled
        case by case and are given whenever the law in your region requires it. Prices can change
        for future terms; if we raise a price we will notify you before the increase takes effect
        so you can cancel.
      </p>
    </LegalSection>

    <LegalSection heading="8. Third-party services">
      <p>
        Parts of the service depend on providers such as Supabase (authentication and database),
        Stripe (payments), Groq (AI responses), and Google Analytics (measurement). Their terms and
        privacy policies apply to the interactions you have with them, and we are not responsible
        for their actions.
      </p>
    </LegalSection>

    <LegalSection heading="9. Our intellectual property">
      <p>
        The app design, branding, logo, text, program materials, software, and documentation
        belong to TapJournal or its licensors and are protected by law. Nothing in these terms gives
        you the right to use our name, marks, or content beyond using the service itself. Ideas and
        suggestions you send us may be used without obligation, as long as we do not identify you.
      </p>
    </LegalSection>

    <LegalSection heading="10. Suspension and termination">
      <p>
        You can stop using TapJournal at any time and ask us to delete your account. We may
        suspend or end access to the service, or specific features, if you break these terms, if we
        must do so for legal reasons, or if your account is being abused. Where we can, we will
        tell you why and give you a chance to respond before taking action that affects access you
        have paid for.
      </p>
    </LegalSection>

    <LegalSection heading="11. Disclaimers">
      <p>
        The service is provided &quot;as is&quot; and &quot;as available&quot;, without warranties
        of any kind, to the fullest extent the law allows. We do not promise that the service will
        be uninterrupted, error-free, secure, or that its output will be accurate, and we are not
        responsible for content other people may add in shared or third-party spaces.
      </p>
    </LegalSection>

    <LegalSection heading="12. Limitation of liability">
      <p>
        To the extent permitted by law, TapJournal is not liable for indirect, incidental, special,
        or consequential damages, or for lost data, and our total liability for any claim is capped
        at the greater of the amount you paid us in the twelve months before the claim or US$100.
        These limits do not apply where the law does not allow them, and nothing here excludes
        liability for fraud or for death or personal injury caused by our negligence.
      </p>
    </LegalSection>

    <LegalSection heading="13. Changes to these terms">
      <p>
        We may update these terms as the product and the law evolve. For material changes we will
        give reasonable notice in the app, by email, or on this page, and the date at the top will
        change. Continuing to use TapJournal after a change takes effect means you accept the
        revised terms; if you do not, stop using the service.
      </p>
    </LegalSection>

    <LegalSection heading="14. Governing law and contact">
      <p>
        These terms are governed by the laws of the State of Massachusetts, United States, without
        regard to conflict-of-law rules, and the courts there handle disputes &mdash; except where
        your country&apos;s consumer-protection law gives you stronger rights you cannot give up.
        Questions about these terms can go to the contact address on this page.
      </p>
    </LegalSection>
  </LegalLayout>
);

export default Terms;
