import React from 'react';
import { Link } from 'react-router-dom';
import LegalLayout, { LegalSection } from '@/components/LegalLayout';

const Privacy = () => (
  <LegalLayout
    title="Privacy Policy"
    pageTitle="Privacy Policy | TapJournal"
    metaDescription="How TapJournal collects, stores, and protects your information, including journal entries, account and payment data, cookies, and third-party services."
    intro="TapJournal is a personal wellness tracker. This policy explains what information we collect, where it is stored, who helps us run the service, and the choices you have. Please read it before creating an account."
  >
    <LegalSection heading="1. Who we are">
      <p>
        TapJournal (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a wellness tracking web
        app operated from the United States. This policy covers the TapJournal website and app.
        It does not cover third-party services we link to or that process data on our behalf,
        which have their own policies.
      </p>
    </LegalSection>

    <LegalSection heading="2. Information we collect">
      <p>
        <strong>Account information.</strong> When you sign up we collect your email address and
        the password you choose. Your password is stored only as a salted hash managed by our
        authentication provider, never as readable text.
      </p>
      <p>
        <strong>Subscription and payment information.</strong> For premium plans we record your
        plan, billing cycle, and subscription status, along with identifiers from our payment
        provider. Card numbers, expiry dates, and security codes are entered directly into our
        payment provider&apos;s checkout and are not stored on our servers.
      </p>
      <p>
        <strong>Content you create.</strong> This includes journal entries and the mood you pick,
        chores and work tasks with their priorities, goals, medications and custom trackers, and
        your progress in wellness programs such as the 30-Day Mindfulness Program, the 21-Day
        Digital Detox, the 14-Day Hydration Challenge, and the Sleep Reset.
      </p>
      <p>
        <strong>Settings.</strong> Your theme choice, time zone, and custom tracker definitions.
      </p>
      <p>
        <strong>Usage data.</strong> We use Google Analytics to record standard information such
        as pages visited, referring page, browser and device type, and an approximate location
        derived from your IP address. See section 6.
      </p>
      <p>
        <strong>AI feature input.</strong> If you use the AI assistant, the text you send and the
        related conversation context are transmitted to our AI provider so it can generate a
        reply.
      </p>
    </LegalSection>

    <LegalSection heading="3. Where your journal content lives">
      <p>
        Your journal entries, tasks, goals, and program progress are saved in your browser&apos;s
        local storage on the device you use TapJournal on. They are keyed to your account so the
        app can load them for you, and they are not published or shared with anyone.
      </p>
      <p>
        Because this content is kept on the device, it does not automatically appear on a
        different device or browser, and clearing your browser storage can remove it. You can
        export what is stored on the current device from the{' '}
        <Link to="/recovery" className="text-primary font-medium hover:underline">
          data recovery page
        </Link>
        . Your email address, profile, and subscription status are stored in our hosted database
        instead, so signing in works on any device.
      </p>
    </LegalSection>

    <LegalSection heading="4. How we use information">
      <ul className="list-disc pl-6 space-y-1">
        <li>create and secure your account, and keep you signed in</li>
        <li>show your entries, tasks, goals, and progress when you open the app</li>
        <li>process payments and manage renewals, invoices, and cancellations</li>
        <li>power features you use, including the AI assistant and wellness programs</li>
        <li>send service messages such as password resets, receipts, and security notices</li>
        <li>understand which parts of the app are used so we can fix and improve them</li>
        <li>prevent abuse, fraud, and attacks, and comply with legal obligations</li>
      </ul>
    </LegalSection>

    <LegalSection heading="5. Who we share information with">
      <p>
        We do not sell your personal information and we do not show third-party advertising. We
        share only what is needed with service providers that act on our behalf:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Supabase</strong> &mdash; account authentication, database, and server-side
          functions
        </li>
        <li>
          <strong>Stripe</strong> &mdash; checkout, card processing, subscriptions, and tax
          handling
        </li>
        <li>
          <strong>Groq</strong> &mdash; generating AI responses for the assistant feature
        </li>
        <li>
          <strong>Google Analytics</strong> &mdash; aggregated usage measurement
        </li>
        <li>
          <strong>Our hosting provider</strong> &mdash; delivering the app to your browser
        </li>
      </ul>
      <p>
        We may also disclose information if we are required to by law or to protect the safety,
        rights, and property of TapJournal and its users.
      </p>
    </LegalSection>

    <LegalSection heading="6. Cookies and similar technologies">
      <p>
        Our authentication provider sets cookies and uses local storage so you stay signed in and
        so password resets and sign-up confirmations work. Google Analytics sets cookies to count
        visits and measure how the site performs. You can block or delete cookies in your browser
        settings; disabling analytics cookies will not stop you from using TapJournal, but
        disabling authentication storage will prevent you from signing in.
      </p>
    </LegalSection>

    <LegalSection heading="7. Legal bases (for readers in the UK and EU)">
      <p>
        Where the GDPR or similar laws apply, we process information to perform our contract with
        you (providing the account and paid features), on the basis of your consent (cookies and
        analytics, AI features you choose to use), for our legitimate interests (keeping the
        service secure, improving it, and marketing our own product), and where required to
        comply with law.
      </p>
    </LegalSection>

    <LegalSection heading="8. Retention">
      <p>
        We keep your account and profile until you delete it. Subscription records are kept for as
        long as required for accounting, tax, and dispute-resolution obligations. Content held in
        your browser stays there until you delete it, clear your browser storage, or remove the
        app.
      </p>
    </LegalSection>

    <LegalSection heading="9. Your choices and rights">
      <p>
        Where the law grants them, you can request access to the personal information we hold
        about you, ask for corrections, request deletion of your account and associated records,
        receive an export of your data, object to or withdraw certain processing, and lodge a
        complaint with a data-protection authority. Use the contact address on this page and we
        will verify your request before acting on it.
      </p>
    </LegalSection>

    <LegalSection heading="10. Security">
      <p>
        We use HTTPS in transit, hashed credentials, access controls, and database protections
        that limit which records each signed-in user can read. No method of storage or
        transmission is completely secure, so we cannot guarantee absolute security, and we
        encourage you not to store information in the app that you would not want seen on a shared
        device.
      </p>
    </LegalSection>

    <LegalSection heading="11. Health information">
      <p>
        TapJournal is a personal tracking tool, not a medical device, diagnostic service, or
        emergency service. Please avoid entering sensitive medical details you would rather keep
        offline, and do not rely on the app for urgent health concerns.
      </p>
    </LegalSection>

    <LegalSection heading="12. Children">
      <p>
        TapJournal is not directed at children under 16, and we do not knowingly collect their
        information. If you believe a child under 16 has provided us personal information, contact
        us and we will delete it.
      </p>
    </LegalSection>

    <LegalSection heading="13. International processing">
      <p>
        Our providers process data in the United States and other locations. Where information
        moves across borders, we rely on the safeguards our providers maintain for their
        services.
      </p>
    </LegalSection>

    <LegalSection heading="14. Changes to this policy">
      <p>
        We may update this policy as the app changes. When we do, we will revise the date at the
        top of this page and, for material changes, give you notice in the app or by email.
      </p>
    </LegalSection>
  </LegalLayout>
);

export default Privacy;
