export interface HydrationDay {
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

export const hydrationProgram: {
  overview: {
    title: string;
    description: string;
    duration: string;
    level: string;
    goal: string;
  };
  days: HydrationDay[];
} = {
  overview: {
    title: '14-Day Hydration Challenge',
    description:
      'Build optimal daily water intake and sustainable hydration habits over two weeks — from assessing your baseline to designing a personalized long-term hydration blueprint.',
    duration: '14 days',
    level: 'Beginner',
    goal: 'Establish optimal daily water intake and sustainable hydration habits',
  },
  days: [
    {
      day: 1,
      title: 'Hydration Assessment',
      description:
        'Water is essential for nearly every bodily function — temperature regulation, joint lubrication, nutrient transport, and waste removal.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Calculate your baseline water target',
        steps: [
          { id: 'h1-1', task: 'Body weight (lbs) ÷ 2 = minimum ounces/day' },
          { id: 'h1-2', task: 'Body weight (kg) × 30 = minimum ml/day' },
          { id: 'h1-3', task: 'Adjust upward for exercise, heat, or illness' },
          { id: 'h1-4', task: 'Track current intake, primary beverages, and hydration symptoms (headaches, fatigue, dark urine)' },
        ],
      },
      reflection: {
        questions: [
          { id: 'h1-r1', question: 'How does your typical intake compare to your target?' },
          { id: 'h1-r2', question: 'Set your personal daily goal.' },
          { id: 'h1-r3', question: 'Tracker: Today\'s intake, goal, and achievement %' },
        ],
      },
    },
    {
      day: 2,
      title: 'Morning Hydration Ritual',
      description:
        'Morning water rehydrates after sleep, jumpstarts metabolism, and improves alertness.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Build a morning water ritual',
        steps: [
          { id: 'h2-1', task: 'Place a bottle by your bed tonight' },
          { id: 'h2-2', task: 'Drink 16oz (500ml) immediately on waking' },
          { id: 'h2-3', task: 'Wait 15-30 min before caffeine' },
          { id: 'h2-4', task: 'Track before/after energy levels and total intake' },
        ],
      },
      reflection: {
        questions: [
          { id: 'h2-r1', question: 'How did morning hydration affect your energy?' },
          { id: 'h2-r2', question: 'Tracker: Morning water, total, goal, achievement %' },
        ],
      },
    },
    {
      day: 3,
      title: 'Hydration Container Selection',
      description:
        'Your water vessel shapes your habits — size, portability, and appeal all matter.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Choose your ideal water container(s)',
        steps: [
          { id: 'h3-1', task: 'Choose your ideal bottle(s) for home, work, and gym' },
          { id: 'h3-2', task: 'Pick one that makes tracking easy' },
          { id: 'h3-3', task: 'Track container details, refills, and effect on habits' },
        ],
      },
      reflection: {
        questions: [
          { id: 'h3-r1', question: 'Does your container make hydration easier?' },
          { id: 'h3-r2', question: 'Tracker: Capacity, refills, total, achievement %' },
        ],
      },
    },
    {
      day: 4,
      title: 'Hydration Quality',
      description:
        'Water source and taste affect willingness to drink; some beverages have diuretic effects.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Find the water you\'ll actually enjoy drinking',
        steps: [
          { id: 'h4-1', task: 'Taste-test tap, filtered, and spring water' },
          { id: 'h4-2', task: 'Try healthy flavor additions (cucumber, citrus, mint) if needed' },
          { id: 'h4-3', task: 'Track sources tested, preferred type, and effective additions' },
        ],
      },
      reflection: {
        questions: [
          { id: 'h4-r1', question: 'What water source/flavor do you prefer?' },
          { id: 'h4-r2', question: 'Tracker: Sources tested, preferred type, total, achievement %' },
        ],
      },
    },
    {
      day: 5,
      title: 'Hydration Timing Strategy',
      description:
        'Front-loading intake earlier improves energy and reduces nighttime disruptions.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Follow a strategic hydration schedule',
        steps: [
          { id: 'h5-1', task: '16-20oz on waking' },
          { id: 'h5-2', task: '8-16oz before each meal' },
          { id: 'h5-3', task: '8oz between meals' },
          { id: 'h5-4', task: 'Limit intake 2 hours before bed' },
          { id: 'h5-5', task: 'Track timing of intake and effects on hunger, energy, and sleep' },
        ],
      },
      reflection: {
        questions: [
          { id: 'h5-r1', question: 'Which time blocks were hardest?' },
          { id: 'h5-r2', question: 'Tracker: Morning, afternoon, evening, total, achievement %' },
        ],
      },
    },
    {
      day: 6,
      title: 'Hydration Triggers and Reminders',
      description:
        'Environmental cues build automatic habits faster than willpower alone.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Set hydration triggers and reminders',
        steps: [
          { id: 'h6-1', task: 'Set 3-5 triggers (after brushing teeth, before meals, after bathroom breaks)' },
          { id: 'h6-2', task: 'Add visual or tech reminders' },
          { id: 'h6-3', task: 'Track triggers used and their effectiveness' },
        ],
      },
      reflection: {
        questions: [
          { id: 'h6-r1', question: 'Which triggers were most reliable?' },
          { id: 'h6-r2', question: 'Tracker: Most effective trigger, total, achievement %' },
        ],
      },
    },
    {
      day: 7,
      title: 'Hydration and Exercise',
      description:
        'Exercise raises fluid needs; proper hydration boosts performance and recovery.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Hydrate around your workout',
        steps: [
          { id: 'h7-1', task: '16-20oz two hours pre-workout' },
          { id: 'h7-2', task: '8oz 15 minutes before' },
          { id: 'h7-3', task: '7-10oz every 15-20 min during workouts over 60 minutes' },
          { id: 'h7-4', task: '16-24oz per pound lost after exercise' },
          { id: 'h7-5', task: 'Track pre/during/post-workout intake and performance notes' },
        ],
      },
      reflection: {
        questions: [
          { id: 'h7-r1', question: 'Did hydration affect your performance or recovery?' },
          { id: 'h7-r2', question: 'Tracker: Pre, during, post, total, achievement %' },
        ],
      },
    },
    {
      day: 8,
      title: 'Midpoint Assessment',
      description:
        'The halfway point is ideal for measuring progress and adjusting strategy.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Assess your first week',
        steps: [
          { id: 'h8-1', task: 'Compare Day 1 vs. Day 8 intake' },
          { id: 'h8-2', task: 'Check urine color' },
          { id: 'h8-3', task: 'Note energy, skin, and digestion changes' },
          { id: 'h8-4', task: 'Identify your most effective strategies so far' },
        ],
      },
      reflection: {
        questions: [
          { id: 'h8-r1', question: 'What\'s working? What needs adjusting for week two?' },
          { id: 'h8-r2', question: 'Tracker: Day 1 intake, Day 8 intake, improvement %, achievement %' },
        ],
      },
    },
    {
      day: 9,
      title: 'Hydration and Nutrition',
      description:
        'About 20% of daily water comes from food; water-rich foods and electrolytes support hydration.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Hydrate through food',
        steps: [
          { id: 'h9-1', task: 'Eat 5+ servings of hydrating foods (watermelon, cucumber, celery, strawberries)' },
          { id: 'h9-2', task: 'Add electrolyte sources (banana, yogurt, leafy greens)' },
          { id: 'h9-3', task: 'Track hydrating foods eaten and effect on thirst/energy' },
        ],
      },
      reflection: {
        questions: [
          { id: 'h9-r1', question: 'Which foods would be easy to add regularly?' },
          { id: 'h9-r2', question: 'Tracker: Foods consumed, beverage water, total hydration, achievement %' },
        ],
      },
    },
    {
      day: 10,
      title: 'Social Hydration Strategies',
      description:
        'Social situations (alcohol, peer pressure, disrupted routine) challenge hydration goals.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Stay hydrated in social settings',
        steps: [
          { id: 'h10-1', task: 'Alternate alcoholic/caffeinated drinks with water' },
          { id: 'h10-2', task: 'Order water first at restaurants' },
          { id: 'h10-3', task: 'Prepare responses to social pressure' },
          { id: 'h10-4', task: 'Track situations encountered and strategies used' },
        ],
      },
      reflection: {
        questions: [
          { id: 'h10-r1', question: 'Which strategies worked best socially?' },
          { id: 'h10-r2', question: 'Tracker: Situations navigated, total, achievement %' },
        ],
      },
    },
    {
      day: 11,
      title: 'Hydration and Sleep',
      description:
        'Hydration supports sleep, but too much fluid late at night disrupts it — balance is key.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Time hydration for better sleep',
        steps: [
          { id: 'h11-1', task: 'Front-load 70% of intake before 5pm' },
          { id: 'h11-2', task: 'Sip only small amounts within 2 hours of bed' },
          { id: 'h11-3', task: 'Empty bladder before sleep' },
          { id: 'h11-4', task: 'Track evening intake timing, nighttime bathroom trips, and morning thirst' },
        ],
      },
      reflection: {
        questions: [
          { id: 'h11-r1', question: 'Did this improve your sleep?' },
          { id: 'h11-r2', question: 'Tracker: Before 5pm, after 5pm, bathroom trips, achievement %' },
        ],
      },
    },
    {
      day: 12,
      title: 'Hydration and Cognitive Performance',
      description:
        'Even 1-2% dehydration impairs concentration, memory, and mood.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Hydrate for mental clarity',
        steps: [
          { id: 'h12-1', task: 'Drink water before demanding tasks' },
          { id: 'h12-2', task: 'Keep water visible during focus work' },
          { id: 'h12-3', task: 'Hydrate on breaks proactively' },
          { id: 'h12-4', task: 'Track intake timing vs. tasks and focus/energy levels' },
        ],
      },
      reflection: {
        questions: [
          { id: 'h12-r1', question: 'When was your mental clarity strongest?' },
          { id: 'h12-r2', question: 'Tracker: Water during mental work, total, cognitive rating, achievement %' },
        ],
      },
    },
    {
      day: 13,
      title: 'Hydration Habit Stacking',
      description:
        'Linking new habits to existing routines makes them automatic.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Create 5 hydration habit stacks',
        steps: [
          { id: 'h13-1', task: 'After brushing teeth → 8oz water' },
          { id: 'h13-2', task: 'Before meals → 8oz' },
          { id: 'h13-3', task: 'After bathroom → 4oz' },
          { id: 'h13-4', task: 'Starting commute → 8oz' },
          { id: 'h13-5', task: 'Create one custom stack of your own; track which stacks stuck' },
        ],
      },
      reflection: {
        questions: [
          { id: 'h13-r1', question: 'Which existing habits are your strongest anchors?' },
          { id: 'h13-r2', question: 'Tracker: Successful stacks / 5, total, achievement %' },
        ],
      },
    },
    {
      day: 14,
      title: 'Sustainable Hydration Blueprint',
      description:
        'Lasting change needs a personalized plan, not just willpower.',
      practice: {
        duration: 'Daily Challenge',
        description: 'Build your long-term hydration blueprint',
        steps: [
          { id: 'h14-1', task: 'Define your daily target' },
          { id: 'h14-2', task: 'List your top 5 strategies' },
          { id: 'h14-3', task: 'Design your ideal schedule' },
          { id: 'h14-4', task: 'Plan for travel, social events, and busy days' },
          { id: 'h14-5', task: 'Set up an accountability system' },
        ],
      },
      reflection: {
        questions: [
          { id: 'h14-r1', question: 'How has your relationship with hydration changed over 14 days?' },
          { id: 'h14-r2', question: 'Day 1 average intake → Day 14 average intake → total improvement %?' },
          { id: 'h14-r3', question: 'What improvements did you notice (energy, skin, digestion, performance, sleep, headaches, clarity)?' },
          { id: 'h14-r4', question: 'Your 30-day commitment: daily target, top habit stacks, tracking method, accountability system' },
        ],
      },
    },
  ],
};
