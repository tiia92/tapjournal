export interface DigitalDetoxDay {
  day: number;
  title: string;
  description: string;
  practice: {
    duration: string;
    description: string;
    steps: { id: string; task: string }[];
  };
  reflection: {
    questions: { id: string; question: string }[];
  };
}

export const digitalDetoxProgram: {
  overview: {
    title: string;
    description: string;
    duration: string;
    level: string;
    goal: string;
  };
  days: DigitalDetoxDay[];
} = {
  overview: {
    title: '21-Day Digital Detox Program',
    description:
      'Reclaim your attention, reduce screen time, and improve focus with this advanced 21-day program designed to help you develop a healthier relationship with technology and digital devices.',
    duration: '21 days',
    level: 'Advanced',
    goal: 'Reduce screen time, improve focus and presence, and establish sustainable technology boundaries',
  },
  days: [
    {
      day: 1,
      title: 'Digital Audit',
      description:
        'The average person spends 7+ hours daily on screens, often unconsciously. Understanding your current digital habits is essential for creating meaningful change. Awareness precedes transformation.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Conduct a comprehensive digital audit',
        steps: [
          { id: 'd1-1', task: 'Enable screen time tracking on all devices' },
          { id: 'd1-2', task: 'Record every digital interaction for 24 hours' },
          { id: 'd1-3', task: 'Note which apps/sites consume most time' },
          { id: 'd1-4', task: 'Document when and why you reach for devices' },
          { id: 'd1-5', task: 'Identify triggers for mindless scrolling' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd1-r1', question: 'Were you surprised by your actual screen time?' },
          { id: 'd1-r2', question: 'Which digital habits serve you? Which don\'t?' },
          { id: 'd1-r3', question: 'What emotions or situations trigger device use?' },
          { id: 'd1-r4', question: 'Set your screen time reduction target for this program' },
        ],
      },
    },
    {
      day: 2,
      title: 'Phone-Free Zones',
      description:
        'Environmental design is more powerful than willpower. Creating physical spaces where devices are prohibited removes temptation and creates mental boundaries that support presence and focus.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Establish 3 phone-free zones',
        steps: [
          { id: 'd2-1', task: 'Bedroom (promote better sleep)' },
          { id: 'd2-2', task: 'Dining table (encourage mindful eating and conversation)' },
          { id: 'd2-3', task: 'Bathroom (reduce mindless scrolling)' },
          { id: 'd2-4', task: 'Choose your 3rd zone based on your priorities' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd2-r1', question: 'How did phone-free zones affect your experiences in those spaces?' },
          { id: 'd2-r2', question: 'Where was compliance easiest? Most difficult?' },
          { id: 'd2-r3', question: 'What unexpected benefits emerged?' },
          { id: 'd2-r4', question: 'How might you strengthen these boundaries?' },
        ],
      },
    },
    {
      day: 3,
      title: 'Notification Purge',
      description:
        'Notifications fragment attention and create chronic interruption, reducing productivity by up to 40% and increasing stress hormones. Most notifications serve the app\'s interests, not yours.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Radical notification reduction',
        steps: [
          { id: 'd3-1', task: 'Disable ALL notifications except calls and messages from key contacts' },
          { id: 'd3-2', task: 'Turn off email notifications completely' },
          { id: 'd3-3', task: 'Disable social media notifications' },
          { id: 'd3-4', task: 'Remove badge icons' },
          { id: 'd3-5', task: 'Disable lock screen notifications' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd3-r1', question: 'How did reducing notifications affect your attention and mood?' },
          { id: 'd3-r2', question: 'Did you experience anxiety about missing something?' },
          { id: 'd3-r3', question: 'How many times did you check apps without notification prompts?' },
          { id: 'd3-r4', question: 'What did you do with the reclaimed mental space?' },
        ],
      },
    },
    {
      day: 4,
      title: 'Morning Routine Protection',
      description:
        'How you start your day sets the tone for everything that follows. Checking your phone first thing floods your brain with others\' priorities, triggering reactive mode rather than intentional presence.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Device-free morning routine (minimum 60 minutes after waking)',
        steps: [
          { id: 'd4-1', task: 'Place phone in another room before sleep' },
          { id: 'd4-2', task: 'Create analog alarm clock solution' },
          { id: 'd4-3', task: 'Complete morning routine without any screens' },
          { id: 'd4-4', task: 'No phone until after breakfast, getting ready, and setting intentions' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd4-r1', question: 'How did delaying phone use affect your morning mindset?' },
          { id: 'd4-r2', question: 'What did you do with the device-free time?' },
          { id: 'd4-r3', question: 'How did your day unfold differently?' },
          { id: 'd4-r4', question: 'What obstacles made this challenging?' },
        ],
      },
    },
    {
      day: 5,
      title: 'Single-Tasking Practice',
      description:
        'Multitasking with devices reduces productivity by 40%, increases errors, and creates chronic stress. The human brain cannot effectively process multiple streams of information simultaneously.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Commit to single-tasking with technology',
        steps: [
          { id: 'd5-1', task: 'One browser tab/window at a time' },
          { id: 'd5-2', task: 'Close email when working on projects' },
          { id: 'd5-3', task: 'No second-screen activities (no phone during TV/computer)' },
          { id: 'd5-4', task: 'Complete one digital task before starting another' },
          { id: 'd5-5', task: 'Practice "monotasking" for all screen activities' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd5-r1', question: 'How did single-tasking affect your work quality and speed?' },
          { id: 'd5-r2', question: 'What triggered the urge to multitask?' },
          { id: 'd5-r3', question: 'How did it feel to give full attention to one thing?' },
          { id: 'd5-r4', question: 'What benefits did you notice?' },
        ],
      },
    },
    {
      day: 6,
      title: 'Social Media Boundaries',
      description:
        'Social media is engineered for addiction, using intermittent reinforcement and social validation to maximize engagement. Strategic boundaries protect your mental health, time, and self-worth.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Implement strict social media boundaries',
        steps: [
          { id: 'd6-1', task: 'Limit social media to 30 minutes total per day' },
          { id: 'd6-2', task: 'Set specific time blocks for checking (e.g., 12-12:15pm and 6-6:15pm)' },
          { id: 'd6-3', task: 'Log out after each use' },
          { id: 'd6-4', task: 'Delete apps from phone, use browser versions only' },
          { id: 'd6-5', task: 'No social media during first and last hour of day' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd6-r1', question: 'How did limiting social media affect your mood and productivity?' },
          { id: 'd6-r2', question: 'What were you tempted to fill the time with?' },
          { id: 'd6-r3', question: 'Did you experience FOMO or anxiety?' },
          { id: 'd6-r4', question: 'What did you do with the reclaimed time?' },
        ],
      },
    },
    {
      day: 7,
      title: 'Weekly Digital Sabbath',
      description:
        'A complete 24-hour digital break allows your nervous system to reset, restores attention capacity, and reminds you that you can function without constant connectivity. This practice has ancient roots in sabbath traditions.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Complete 24-hour digital sabbath',
        steps: [
          { id: 'd7-1', task: 'Turn off phone or put in "do not disturb" mode' },
          { id: 'd7-2', task: 'No computer, tablet, TV, or gaming' },
          { id: 'd7-3', task: 'Inform key people in advance' },
          { id: 'd7-4', task: 'Plan alternative activities: nature, reading, hobbies, socializing in-person' },
          { id: 'd7-5', task: 'Notice withdrawal symptoms and sit with discomfort' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd7-r1', question: 'How did 24 hours without digital devices affect you?' },
          { id: 'd7-r2', question: 'What was most challenging? Most rewarding?' },
          { id: 'd7-r3', question: 'What did you learn about your relationship with technology?' },
          { id: 'd7-r4', question: 'How will you incorporate this practice going forward?' },
        ],
      },
    },
    {
      day: 8,
      title: 'Email Management Protocol',
      description:
        'Email is designed to serve the sender, not the recipient. Constant email checking creates perpetual reactive mode, fragmenting attention and increasing stress while decreasing deep work capacity.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Implement batch email processing',
        steps: [
          { id: 'd8-1', task: 'Check email only 2-3 designated times daily' },
          { id: 'd8-2', task: 'Process email in batches (respond/delete/file immediately)' },
          { id: 'd8-3', task: 'Turn off all email notifications' },
          { id: 'd8-4', task: 'Use email client\'s scheduling features' },
          { id: 'd8-5', task: 'Aim for "inbox zero" once daily' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd8-r1', question: 'How did batched email processing affect productivity?' },
          { id: 'd8-r2', question: 'What anxiety arose from checking less frequently?' },
          { id: 'd8-r3', question: 'Did anything urgent actually get missed?' },
          { id: 'd8-r4', question: 'How much time did you reclaim?' },
        ],
      },
    },
    {
      day: 9,
      title: 'Conscious Consumption Audit',
      description:
        'Not all screen time is equal. Intentional content consumption serves you; passive consumption serves algorithms. Distinguishing between value-adding and value-extracting digital activities is crucial.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Audit content quality and intentionality',
        steps: [
          { id: 'd9-1', task: 'Before any digital activity, ask: "Is this intentional or automatic?"' },
          { id: 'd9-2', task: 'Categorize all screen time as "value-add" or "time-wasting"' },
          { id: 'd9-3', task: 'Identify your top 3 value-add digital activities' },
          { id: 'd9-4', task: 'Identify your top 3 time-wasting digital activities' },
          { id: 'd9-5', task: 'Begin eliminating time-wasting activities' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd9-r1', question: 'What percentage of your screen time actively served your goals?' },
          { id: 'd9-r2', question: 'Which activities provided genuine value vs. false promises?' },
          { id: 'd9-r3', question: 'What might you replace time-wasting activities with?' },
          { id: 'd9-r4', question: 'How can you increase intentionality going forward?' },
        ],
      },
    },
    {
      day: 10,
      title: 'Deep Work Blocks',
      description:
        'Deep work—focused, undistracted attention on cognitively demanding tasks—produces disproportionate value and meaning. Digital distractions are deep work\'s greatest enemy. Protecting focus time is a professional and personal imperative.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Create protected deep work blocks',
        steps: [
          { id: 'd10-1', task: 'Schedule 2-4 hours of device-free focused work' },
          { id: 'd10-2', task: 'Use airplane mode or app blockers during deep work' },
          { id: 'd10-3', task: 'Create physical and digital "do not disturb" signals' },
          { id: 'd10-4', task: 'Batch shallow work (email, messages) outside deep work blocks' },
          { id: 'd10-5', task: 'Track quality of output during protected time' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd10-r1', question: 'How did protected focus time affect your work quality?' },
          { id: 'd10-r2', question: 'What tried to interrupt your deep work?' },
          { id: 'd10-r3', question: 'How did it feel to give complete attention to important work?' },
          { id: 'd10-r4', question: 'How can you protect more time for deep work?' },
        ],
      },
    },
    {
      day: 11,
      title: 'Digital Relationship Boundaries',
      description:
        'Digital communication creates the illusion of connection while often undermining genuine relationships. Texting, messaging, and social interaction require boundaries to serve rather than replace authentic connection.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Establish communication boundaries',
        steps: [
          { id: 'd11-1', task: 'Designate device-free time with loved ones' },
          { id: 'd11-2', task: 'No phones during meals or conversations' },
          { id: 'd11-3', task: 'Choose calls/video over text for meaningful conversations' },
          { id: 'd11-4', task: 'Set "office hours" for responding to messages' },
          { id: 'd11-5', task: 'Practice being present in real-time interactions' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd11-r1', question: 'How did device-free time affect relationship quality?' },
          { id: 'd11-r2', question: 'What resistance came up around putting devices away?' },
          { id: 'd11-r3', question: 'Did you notice differences in conversation depth?' },
          { id: 'd11-r4', question: 'How did others respond to your boundaries?' },
        ],
      },
    },
    {
      day: 12,
      title: 'Mindful Transitions',
      description:
        'We typically reach for devices during transitions—waiting in line, between tasks, after waking. These micro-moments of boredom are actually valuable for creativity, processing, and rest. Reclaiming them restores mental capacity.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Resist device use during transitions',
        steps: [
          { id: 'd12-1', task: 'No phone while waiting (in line, for appointments, for others)' },
          { id: 'd12-2', task: 'No filling every quiet moment with content' },
          { id: 'd12-3', task: 'Notice urges without acting on them' },
          { id: 'd12-4', task: 'Use transition moments for mindfulness, observation, or simply being' },
          { id: 'd12-5', task: 'Track boredom tolerance' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd12-r1', question: 'How did sitting with boredom feel?' },
          { id: 'd12-r2', question: 'What did you notice during device-free transitions?' },
          { id: 'd12-r3', question: 'Did creativity or insights emerge?' },
          { id: 'd12-r4', question: 'How might these micro-moments compound over time?' },
        ],
      },
    },
    {
      day: 13,
      title: 'Entertainment Audit',
      description:
        'Passive entertainment consumption provides diminishing returns. While rest is essential, screen-based entertainment often leaves us more depleted than restored. Active leisure and genuine rest are more restorative.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Replace passive screen entertainment',
        steps: [
          { id: 'd13-1', task: 'Identify your go-to passive entertainment (streaming, gaming, scrolling)' },
          { id: 'd13-2', task: 'Limit entertainment screen time to 2 hours maximum' },
          { id: 'd13-3', task: 'Replace 50% of usual entertainment time with active alternatives: reading physical books' },
          { id: 'd13-4', task: 'Try creative hobbies, physical activities, social interaction, or nature exposure' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd13-r1', question: 'How did active alternatives affect your energy and mood?' },
          { id: 'd13-r2', question: 'What makes passive screen entertainment so tempting?' },
          { id: 'd13-r3', question: 'Which alternatives were most satisfying?' },
          { id: 'd13-r4', question: 'How "restful" was passive screen time actually?' },
        ],
      },
    },
    {
      day: 14,
      title: 'Midpoint Integration',
      description:
        'Two weeks into the program, you\'ve likely noticed both benefits and challenges. Integration involves synthesizing what works, troubleshooting what doesn\'t, and recommitting with greater clarity and personalization.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Conduct midpoint assessment and integration',
        steps: [
          { id: 'd14-1', task: 'Review progress on screen time reduction' },
          { id: 'd14-2', task: 'Identify top 3 most impactful changes' },
          { id: 'd14-3', task: 'Identify top 3 persistent challenges' },
          { id: 'd14-4', task: 'Adjust strategies based on what you\'ve learned' },
          { id: 'd14-5', task: 'Recommit with refined approach for final week' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd14-r1', question: 'What changes have been most transformative?' },
          { id: 'd14-r2', question: 'What unexpected benefits have you experienced?' },
          { id: 'd14-r3', question: 'Where are you still struggling?' },
          { id: 'd14-r4', question: 'How will you refine your approach for the final week?' },
        ],
      },
    },
    {
      day: 15,
      title: 'Attention Training',
      description:
        'Sustained attention is a trainable skill. Digital technology weakens this capacity through constant distraction and interruption. Deliberately practicing sustained focus rebuilds attention strength.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Practice sustained attention training',
        steps: [
          { id: 'd15-1', task: 'Choose a non-digital focus object (book, project, conversation)' },
          { id: 'd15-2', task: 'Sustain unbroken attention for progressively longer periods' },
          { id: 'd15-3', task: 'Notice when attention wanders and gently redirect' },
          { id: 'd15-4', task: 'No multitasking or task-switching for designated periods' },
          { id: 'd15-5', task: 'Track attention span capacity' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd15-r1', question: 'How did sustained attention feel compared to fragmented attention?' },
          { id: 'd15-r2', question: 'What most frequently pulled your attention away?' },
          { id: 'd15-r3', question: 'Did you notice quality differences in focused work?' },
          { id: 'd15-r4', question: 'How might you extend your attention capacity?' },
        ],
      },
    },
    {
      day: 16,
      title: 'Digital Minimalism',
      description:
        'Digital minimalism is the philosophy of intentionally using only technology that serves your values while eliminating everything else. It\'s not about using less technology—it\'s about using better technology, more intentionally.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Apply minimalism to digital life',
        steps: [
          { id: 'd16-1', task: 'Delete apps that don\'t serve clear purposes' },
          { id: 'd16-2', task: 'Unsubscribe from unnecessary emails and notifications' },
          { id: 'd16-3', task: 'Streamline digital tools (consolidate, simplify)' },
          { id: 'd16-4', task: 'Keep only technology that supports specific values or goals' },
          { id: 'd16-5', task: 'Embrace "good enough" rather than optimizing everything' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd16-r1', question: 'How did reducing digital clutter affect your mental clarity?' },
          { id: 'd16-r2', question: 'What was hard to let go of? Why?' },
          { id: 'd16-r3', question: 'Which eliminations provided the most relief?' },
          { id: 'd16-r4', question: 'What values guide your technology use?' },
        ],
      },
    },
    {
      day: 17,
      title: 'Analog Alternatives',
      description:
        'Many digital activities have superior analog alternatives that provide additional benefits—tactile engagement, reduced eye strain, better memory retention, and greater satisfaction. Rediscovering analog enriches life.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Replace digital with analog',
        steps: [
          { id: 'd17-1', task: 'Paper book instead of ebook/audiobook' },
          { id: 'd17-2', task: 'Physical newspaper/magazine instead of news apps' },
          { id: 'd17-3', task: 'Paper calendar/planner instead of digital' },
          { id: 'd17-4', task: 'Handwritten notes instead of typed' },
          { id: 'd17-5', task: 'Analog games/puzzles instead of digital; physical maps instead of GPS (where safe)' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd17-r1', question: 'How did analog activities differ from their digital equivalents?' },
          { id: 'd17-r2', question: 'What unexpected benefits did you notice?' },
          { id: 'd17-r3', question: 'Which analog alternatives might you adopt permanently?' },
          { id: 'd17-r4', question: 'What makes digital versions so convenient yet potentially less satisfying?' },
        ],
      },
    },
    {
      day: 18,
      title: 'Evening Wind-Down Protocol',
      description:
        'Blue light exposure and cognitive stimulation from screens before bed suppresses melatonin production, delays sleep onset, reduces sleep quality, and disrupts circadian rhythms. An evening wind-down protocol is essential for sleep health.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Implement screen-free evening wind-down',
        steps: [
          { id: 'd18-1', task: 'No screens 2 hours before bed' },
          { id: 'd18-2', task: 'Charge all devices outside bedroom' },
          { id: 'd18-3', task: 'Replace screen time with calming activities: reading physical books, gentle stretching/yoga, journaling, conversation' },
          { id: 'd18-4', task: 'Create evening ritual that signals sleep preparation' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd18-r1', question: 'How did screen-free evening affect your sleep?' },
          { id: 'd18-r2', question: 'What was challenging about disconnecting before bed?' },
          { id: 'd18-r3', question: 'Which alternative activities were most calming?' },
          { id: 'd18-r4', question: 'How did you feel waking up the next morning?' },
        ],
      },
    },
    {
      day: 19,
      title: 'Productivity System Optimization',
      description:
        'Productivity systems should reduce cognitive load and support deep work, yet many digital tools create more overhead than value. Simplified, intentional systems free mental energy for meaningful work.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Optimize your productivity ecosystem',
        steps: [
          { id: 'd19-1', task: 'Reduce number of productivity apps/tools' },
          { id: 'd19-2', task: 'Create simple task management system (ideally paper-based or minimal digital)' },
          { id: 'd19-3', task: 'Batch similar tasks rather than constant task-switching' },
          { id: 'd19-4', task: 'Establish clear workflows that minimize digital friction' },
          { id: 'd19-5', task: 'Measure output quality, not just activity' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd19-r1', question: 'How did simplifying your productivity system affect your output?' },
          { id: 'd19-r2', question: 'What tools created friction rather than flow?' },
          { id: 'd19-r3', question: 'Did you accomplish more or less with fewer tools?' },
          { id: 'd19-r4', question: 'What\'s the minimum effective dose of productivity technology?' },
        ],
      },
    },
    {
      day: 20,
      title: 'Identity and Values Alignment',
      description:
        'Technology should serve your identity and values, not define them. When device use conflicts with who you want to be, suffering results. Aligning technology habits with core values creates integrity and fulfillment.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Align technology use with values',
        steps: [
          { id: 'd20-1', task: 'Clarify your top 5 core values' },
          { id: 'd20-2', task: 'Audit how each digital activity aligns with or contradicts these values' },
          { id: 'd20-3', task: 'Eliminate digital activities that conflict with your values' },
          { id: 'd20-4', task: 'Increase digital activities that serve your values' },
          { id: 'd20-5', task: 'Reflect on the person you become through your technology use' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd20-r1', question: 'How well does your technology use reflect your values?' },
          { id: 'd20-r2', question: 'What digital habits conflict with who you want to be?' },
          { id: 'd20-r3', question: 'What changes would create greater alignment?' },
          { id: 'd20-r4', question: 'How does intentional technology use feel versus autopilot use?' },
        ],
      },
    },
    {
      day: 21,
      title: 'Sustainable Digital Life Design',
      description:
        'Lasting change requires personalized, sustainable systems—not willpower. Today you\'ll create your blueprint for long-term digital wellness, integrating everything you\'ve learned into a realistic, values-aligned approach.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Design your sustainable digital life',
        steps: [
          { id: 'd21-1', task: 'Define your ideal screen time target' },
          { id: 'd21-2', task: 'List non-negotiable boundaries (phone-free zones, times, activities)' },
          { id: 'd21-3', task: 'Identify your essential technology and eliminate the rest' },
          { id: 'd21-4', task: 'Create accountability systems (tracking, partners, reviews)' },
          { id: 'd21-5', task: 'Design regular "digital sabbath" practices and plan for high-risk situations' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd21-r1', question: 'What\'s changed most significantly in 21 days?' },
          { id: 'd21-r2', question: 'Which practices will you maintain permanently?' },
          { id: 'd21-r3', question: 'What\'s your commitment to ongoing digital wellness?' },
          { id: 'd21-r4', question: 'How will you handle inevitable slips or challenges?' },
        ],
      },
    },
  ],
};
