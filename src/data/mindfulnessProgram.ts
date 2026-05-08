export interface MindfulnessDay {
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

export const mindfulnessProgram: {
  overview: {
    title: string;
    description: string;
    duration: string;
    level: string;
    goal: string;
  };
  days: MindfulnessDay[];
} = {
  overview: {
    title: '30-Day Mindfulness Program',
    description:
      'Build a sustainable daily meditation practice with this progressive 30-day program designed to develop mindfulness skills that enhance focus, reduce stress, and promote emotional wellbeing.',
    duration: '30 days',
    level: 'Intermediate',
    goal: 'Establish a consistent meditation practice and develop mindfulness skills for daily life',
  },
  days: [
    {
      day: 1,
      title: 'Settling In',
      description: 'Week 1 — Foundations of Mindfulness. Begin with simple breath awareness.',
      practice: {
        duration: '5 min',
        description: 'Simple breath awareness',
        steps: [
          { id: 'd1-1', task: 'Find a comfortable seated position' },
          { id: 'd1-2', task: 'Focus on the natural rhythm of your breath' },
          { id: 'd1-3', task: 'When your mind wanders, gently return to the breath' },
          { id: 'd1-4', task: 'Notice how it feels to simply be present' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd1-r1', question: 'What sensations did you notice in your body during this practice?' },
          { id: 'd1-r2', question: 'How often did your mind wander?' },
        ],
      },
    },
    {
      day: 2,
      title: 'Body Scan',
      description: 'Progressive body relaxation to release tension and build awareness.',
      practice: {
        duration: '7 min',
        description: 'Progressive body relaxation',
        steps: [
          { id: 'd2-1', task: 'Lie down in a comfortable position' },
          { id: 'd2-2', task: 'Bring awareness to each body part, starting from your toes and moving upward' },
          { id: 'd2-3', task: 'Notice any sensations without judgment' },
          { id: 'd2-4', task: 'Release tension with each exhale' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd2-r1', question: 'Where did you notice tension in your body?' },
          { id: 'd2-r2', question: 'How did your awareness change as you moved through the scan?' },
        ],
      },
    },
    {
      day: 3,
      title: 'Mindful Breathing',
      description: 'Four-count breathing to settle the mind and body.',
      practice: {
        duration: '5 min',
        description: 'Four-count breathing',
        steps: [
          { id: 'd3-1', task: 'Inhale for a count of 4' },
          { id: 'd3-2', task: 'Hold for a count of 4' },
          { id: 'd3-3', task: 'Exhale for a count of 4' },
          { id: 'd3-4', task: 'Hold for a count of 4' },
          { id: 'd3-5', task: 'Repeat for 5 minutes' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd3-r1', question: 'How did controlling your breath affect your mental state?' },
          { id: 'd3-r2', question: 'Did you notice any physical changes?' },
        ],
      },
    },
    {
      day: 4,
      title: 'Thought Observation',
      description: 'Watch thoughts arise and pass without engagement.',
      practice: {
        duration: '8 min',
        description: 'Watching thoughts',
        steps: [
          { id: 'd4-1', task: 'Focus on your breath' },
          { id: 'd4-2', task: 'When thoughts arise, mentally label them (planning, worrying, remembering)' },
          { id: 'd4-3', task: 'Return to the breath without judgment' },
          { id: 'd4-4', task: 'Notice patterns in your thinking' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd4-r1', question: 'What types of thoughts were most common?' },
          { id: 'd4-r2', question: 'How did labeling them affect your relationship to them?' },
        ],
      },
    },
    {
      day: 5,
      title: 'Mindful Listening',
      description: 'Sound awareness as an anchor to the present moment.',
      practice: {
        duration: '6 min',
        description: 'Sound awareness',
        steps: [
          { id: 'd5-1', task: 'Sit quietly and focus on the sounds around you' },
          { id: 'd5-2', task: 'Notice sounds without labeling them as good or bad' },
          { id: 'd5-3', task: 'Pay attention to volume, tone, and texture' },
          { id: 'd5-4', task: 'Notice the space between sounds' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd5-r1', question: 'What sounds did you notice that you typically ignore?' },
          { id: 'd5-r2', question: 'How did focused listening change your experience?' },
        ],
      },
    },
    {
      day: 6,
      title: 'Grounding Practice',
      description: 'The 5-4-3-2-1 grounding technique using all five senses.',
      practice: {
        duration: '8 min',
        description: '5-4-3-2-1 technique',
        steps: [
          { id: 'd6-1', task: 'Notice 5 things you can see' },
          { id: 'd6-2', task: 'Notice 4 things you can touch' },
          { id: 'd6-3', task: 'Notice 3 things you can hear' },
          { id: 'd6-4', task: 'Notice 2 things you can smell' },
          { id: 'd6-5', task: 'Notice 1 thing you can taste' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd6-r1', question: 'Which of your senses provided the strongest anchor to the present moment? Why?' },
        ],
      },
    },
    {
      day: 7,
      title: 'Loving-Kindness',
      description: 'Compassion meditation extending well-wishes to yourself and others.',
      practice: {
        duration: '10 min',
        description: 'Compassion meditation — repeat: "May you be happy, healthy, safe, at ease."',
        steps: [
          { id: 'd7-1', task: 'Send well-wishes to yourself' },
          { id: 'd7-2', task: 'Send well-wishes to someone you love' },
          { id: 'd7-3', task: 'Send well-wishes to someone neutral in your life' },
          { id: 'd7-4', task: 'Send well-wishes to someone challenging' },
          { id: 'd7-5', task: 'Send well-wishes to all beings everywhere' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd7-r1', question: 'Which recipient was easiest to send kind thoughts to?' },
          { id: 'd7-r2', question: 'Which was most challenging? What emotions arose?' },
        ],
      },
    },
    {
      day: 8,
      title: 'Mindful Walking',
      description: 'Week 2 — Deepening Your Practice. Walking meditation.',
      practice: {
        duration: '10 min',
        description: 'Walking meditation',
        steps: [
          { id: 'd8-1', task: 'Walk slowly and deliberately' },
          { id: 'd8-2', task: 'Notice the sensation of each foot touching the ground' },
          { id: 'd8-3', task: 'Feel the weight transfer and balance shifts' },
          { id: 'd8-4', task: 'Coordinate breath with movement' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd8-r1', question: 'How did slowing down change your experience of walking?' },
          { id: 'd8-r2', question: 'What new sensations did you notice?' },
        ],
      },
    },
    {
      day: 9,
      title: 'Breath Expansion',
      description: 'Three-part breath to deepen awareness of breathing.',
      practice: {
        duration: '8 min',
        description: 'Three-part breath',
        steps: [
          { id: 'd9-1', task: 'Inhale first into your abdomen' },
          { id: 'd9-2', task: 'Continue inhaling into your mid-chest' },
          { id: 'd9-3', task: 'Finally fill your upper chest' },
          { id: 'd9-4', task: 'Exhale slowly from top to bottom' },
          { id: 'd9-5', task: 'Repeat for 8 minutes' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd9-r1', question: 'How did this breathing pattern affect your energy level?' },
          { id: 'd9-r2', question: 'What physical sensations accompanied this practice?' },
        ],
      },
    },
    {
      day: 10,
      title: 'Mindful Eating',
      description: 'Eating meditation with a single small food item.',
      practice: {
        duration: '10 min',
        description: 'Eating meditation',
        steps: [
          { id: 'd10-1', task: 'Choose one small food item (raisin, berry, nut)' },
          { id: 'd10-2', task: 'Examine it with all your senses before eating' },
          { id: 'd10-3', task: 'Eat slowly, noticing flavor, texture, and sensations' },
          { id: 'd10-4', task: 'Follow the sensations of swallowing and digestion' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd10-r1', question: 'What new aspects of this food did you discover?' },
          { id: 'd10-r2', question: 'How was this different from your normal eating habits?' },
        ],
      },
    },
    {
      day: 11,
      title: 'Thought Clouds',
      description: 'Non-attachment visualization — thoughts as passing clouds.',
      practice: {
        duration: '10 min',
        description: 'Non-attachment visualization',
        steps: [
          { id: 'd11-1', task: 'Visualize your thoughts as clouds in the sky' },
          { id: 'd11-2', task: 'Watch them form, move across your awareness, and dissolve' },
          { id: 'd11-3', task: 'Notice the blue sky (your awareness) that remains unchanged' },
          { id: 'd11-4', task: 'Practice not following or attaching to any thought-cloud' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd11-r1', question: 'Were you able to maintain awareness of the "sky" behind your thoughts?' },
          { id: 'd11-r2', question: 'Which thoughts were hardest to let pass?' },
        ],
      },
    },
    {
      day: 12,
      title: 'Energy Scan',
      description: 'Subtle energy awareness throughout the body.',
      practice: {
        duration: '12 min',
        description: 'Subtle energy awareness',
        steps: [
          { id: 'd12-1', task: 'Scan through your body looking for areas of energy or vibration' },
          { id: 'd12-2', task: 'Notice areas that feel energized, depleted, or neutral' },
          { id: 'd12-3', task: 'Direct breath to areas that feel blocked or stagnant' },
          { id: 'd12-4', task: 'Visualize balance and flow throughout your system' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd12-r1', question: 'Where did you feel the strongest sensations of energy?' },
          { id: 'd12-r2', question: 'Did directing attention change how those areas felt?' },
        ],
      },
    },
    {
      day: 13,
      title: 'Mindful Stress Response',
      description: 'The S.T.O.P. technique for working with stress.',
      practice: {
        duration: '10 min',
        description: 'S.T.O.P. technique — practice this cycle several times',
        steps: [
          { id: 'd13-1', task: 'Stop what you are doing' },
          { id: 'd13-2', task: 'Take a breath' },
          { id: 'd13-3', task: 'Observe your body, thoughts, and emotions' },
          { id: 'd13-4', task: 'Proceed with awareness' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd13-r1', question: 'What sensations in your body indicate stress?' },
          { id: 'd13-r2', question: 'How did the pause between observation and proceeding feel?' },
        ],
      },
    },
    {
      day: 14,
      title: 'Open Awareness',
      description: 'Choiceless awareness — observing without directing attention.',
      practice: {
        duration: '15 min',
        description: 'Choiceless awareness',
        steps: [
          { id: 'd14-1', task: 'Begin with focusing on breath' },
          { id: 'd14-2', task: 'Gradually expand awareness to include all sensations, sounds, and thoughts' },
          { id: 'd14-3', task: 'Don\'t focus on anything specific — just notice what enters your awareness' },
          { id: 'd14-4', task: 'Maintain an attitude of curious observation' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd14-r1', question: 'What was most prominent in your field of awareness?' },
          { id: 'd14-r2', question: 'How did it feel to observe without directing your attention?' },
        ],
      },
    },
    {
      day: 15,
      title: 'Working with Difficulty',
      description: 'Week 3 — Challenges and Insights. Being with discomfort.',
      practice: {
        duration: '12 min',
        description: 'Being with discomfort',
        steps: [
          { id: 'd15-1', task: 'Notice any area of discomfort in body or mind' },
          { id: 'd15-2', task: 'Instead of changing it, bring curious attention to it' },
          { id: 'd15-3', task: 'Explore its qualities, boundaries, and intensity' },
          { id: 'd15-4', task: 'Breathe with the discomfort, allowing it to be present' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd15-r1', question: 'How did your relationship to the discomfort change through observation?' },
          { id: 'd15-r2', question: 'What did you learn about your typical reaction to discomfort?' },
        ],
      },
    },
    {
      day: 16,
      title: 'Mindful Communication',
      description: 'Bring presence to conversations throughout the day.',
      practice: {
        duration: 'Throughout day + 5 min reflection',
        description: 'Mindful communication practice',
        steps: [
          { id: 'd16-1', task: 'Before speaking, pause briefly' },
          { id: 'd16-2', task: 'Listen fully without planning your response' },
          { id: 'd16-3', task: 'Notice physical sensations while communicating' },
          { id: 'd16-4', task: 'Observe reactions without immediately acting on them' },
          { id: 'd16-5', task: 'End of day: reflect on communication patterns for 5 minutes' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd16-r1', question: 'How did pausing before speaking change your communication?' },
          { id: 'd16-r2', question: 'What did you notice about your listening habits?' },
        ],
      },
    },
    {
      day: 17,
      title: 'Gratitude Practice',
      description: 'Gratitude meditation reflecting on what you appreciate.',
      practice: {
        duration: '10 min',
        description: 'Gratitude meditation',
        steps: [
          { id: 'd17-1', task: 'Reflect on 5 things you are grateful for, starting with simple things' },
          { id: 'd17-2', task: 'For each item, spend 1-2 minutes feeling the gratitude in your body' },
          { id: 'd17-3', task: 'Notice how gratitude affects your mental state' },
          { id: 'd17-4', task: 'End by thanking yourself for making time for practice' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd17-r1', question: 'How did focusing on gratitude affect your mood?' },
          { id: 'd17-r2', question: 'Did you notice physical sensations accompanying grateful thoughts?' },
        ],
      },
    },
    {
      day: 18,
      title: 'Mindful Movement',
      description: 'Gentle yoga or stretching with full body awareness.',
      practice: {
        duration: '15 min',
        description: 'Gentle mindful yoga or stretching',
        steps: [
          { id: 'd18-1', task: 'Move slowly and deliberately through 5-7 simple stretches' },
          { id: 'd18-2', task: 'Coordinate movement with breath' },
          { id: 'd18-3', task: 'Notice sensations of stretching, tension, and release' },
          { id: 'd18-4', task: 'Focus on body sensations rather than achievement' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd18-r1', question: 'Which movements created the strongest sensations?' },
          { id: 'd18-r2', question: 'How did mindful movement differ from your usual physical activities?' },
        ],
      },
    },
    {
      day: 19,
      title: 'Emotional Awareness',
      description: 'Naming emotions and noticing them in the body.',
      practice: {
        duration: '12 min',
        description: 'Emotion labeling',
        steps: [
          { id: 'd19-1', task: 'Sit quietly and notice what emotions are present' },
          { id: 'd19-2', task: 'Label emotions specifically (not just "good" or "bad")' },
          { id: 'd19-3', task: 'Notice where and how emotions appear in your body' },
          { id: 'd19-4', task: 'Allow emotions to be present without trying to change them' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd19-r1', question: 'Which emotions were easiest to identify?' },
          { id: 'd19-r2', question: 'Did labeling your emotions change your experience of them?' },
        ],
      },
    },
    {
      day: 20,
      title: 'Mental Noting',
      description: 'Continuous noting practice for sustained awareness.',
      practice: {
        duration: '15 min',
        description: 'Continuous mental noting',
        steps: [
          { id: 'd20-1', task: 'Silently label all experiences as they arise ("hearing", "thinking", "feeling")' },
          { id: 'd20-2', task: 'Note at a rate of about one label per second' },
          { id: 'd20-3', task: 'When distracted, simply note "distracted" and continue' },
          { id: 'd20-4', task: 'Maintain a calm, steady pace of noting' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd20-r1', question: 'What categories of experience were most common in your practice?' },
          { id: 'd20-r2', question: 'How did continuous noting affect your concentration?' },
        ],
      },
    },
    {
      day: 21,
      title: 'Intention Setting',
      description: 'Clarify the values that ground your mindfulness practice.',
      practice: {
        duration: '15 min',
        description: 'Values clarification',
        steps: [
          { id: 'd21-1', task: 'Reflect on why mindfulness matters to you' },
          { id: 'd21-2', task: 'Identify three core values that meditation supports' },
          { id: 'd21-3', task: 'Visualize how regular practice aligns with these values' },
          { id: 'd21-4', task: 'Set clear intentions for the remainder of the program' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd21-r1', question: 'What values are most important in your mindfulness journey?' },
          { id: 'd21-r2', question: 'How will these help sustain your practice beyond the 30 days?' },
        ],
      },
    },
    {
      day: 22,
      title: 'Self-Compassion',
      description: 'Week 4 — Integration and Sustainability. Forgiveness meditation.',
      practice: {
        duration: '15 min',
        description: 'Forgiveness meditation',
        steps: [
          { id: 'd22-1', task: 'Acknowledge any self-judgment about your practice' },
          { id: 'd22-2', task: 'Place a hand on your heart and offer kind phrases to yourself' },
          { id: 'd22-3', task: 'Recognize that imperfection is part of being human' },
          { id: 'd22-4', task: 'Extend the same kindness you would offer a good friend' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd22-r1', question: 'What self-critical thoughts arose during this practice?' },
          { id: 'd22-r2', question: 'How did physical self-compassion gestures affect your emotional state?' },
        ],
      },
    },
    {
      day: 23,
      title: 'Mindful Transitions',
      description: 'Use doorways throughout the day as mindfulness triggers.',
      practice: {
        duration: 'Throughout day',
        description: 'Doorway mindfulness',
        steps: [
          { id: 'd23-1', task: 'Use doorways as mindfulness triggers' },
          { id: 'd23-2', task: 'Each time you pass through a door, take three mindful breaths' },
          { id: 'd23-3', task: 'Notice the transition from one space to another' },
          { id: 'd23-4', task: 'Brief end-of-day reflection on how this affected your day' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd23-r1', question: 'How many times did you remember to practice at doorways?' },
          { id: 'd23-r2', question: 'How did these brief moments of awareness affect the flow of your day?' },
        ],
      },
    },
    {
      day: 24,
      title: 'Visualization',
      description: 'Safe place meditation engaging all the senses.',
      practice: {
        duration: '15 min',
        description: 'Safe place meditation',
        steps: [
          { id: 'd24-1', task: 'Visualize a place (real or imagined) where you feel completely safe' },
          { id: 'd24-2', task: 'Engage all senses in the visualization' },
          { id: 'd24-3', task: 'Notice the feeling of safety in your body' },
          { id: 'd24-4', task: 'When distracted, gently return to the visualization' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd24-r1', question: 'What qualities make your safe place feel secure?' },
          { id: 'd24-r2', question: 'How might you invoke this feeling in daily life?' },
        ],
      },
    },
    {
      day: 25,
      title: 'Expanded Loving-Kindness',
      description: 'Extend compassion outward in widening circles.',
      practice: {
        duration: '15 min',
        description: 'Extended compassion practice',
        steps: [
          { id: 'd25-1', task: 'Begin with self-compassion' },
          { id: 'd25-2', task: 'Extend to loved ones' },
          { id: 'd25-3', task: 'Extend to friends and colleagues' },
          { id: 'd25-4', task: 'Extend to neutral people' },
          { id: 'd25-5', task: 'Extend to difficult people' },
          { id: 'd25-6', task: 'Extend to your community and all beings everywhere' },
          { id: 'd25-7', task: 'End by resting in the feeling of universal connection' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd25-r1', question: 'How far were you able to extend your circle of compassion?' },
          { id: 'd25-r2', question: 'What resistance did you notice?' },
        ],
      },
    },
    {
      day: 26,
      title: 'Non-Judgment Practice',
      description: 'Neutral observation — "not good, not bad, just is."',
      practice: {
        duration: '15 min',
        description: 'Neutral observation',
        steps: [
          { id: 'd26-1', task: 'Observe each experience as "not good, not bad, just is"' },
          { id: 'd26-2', task: 'When you notice judgment, label it and return to neutral observation' },
          { id: 'd26-3', task: 'Practice with physical sensations, sounds, thoughts' },
          { id: 'd26-4', task: 'Notice how removing judgment affects your experience' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd26-r1', question: 'What types of experiences triggered the strongest judgments?' },
          { id: 'd26-r2', question: 'How did practicing neutrality affect your stress level?' },
        ],
      },
    },
    {
      day: 27,
      title: 'Body-Mind Connection',
      description: 'Somatic awareness — link thoughts and physical sensations.',
      practice: {
        duration: '15 min',
        description: 'Somatic awareness',
        steps: [
          { id: 'd27-1', task: 'Notice the connection between thoughts and physical sensations' },
          { id: 'd27-2', task: 'When a thought arises, scan for corresponding body sensations' },
          { id: 'd27-3', task: 'When a physical sensation arises, notice any associated thoughts' },
          { id: 'd27-4', task: 'Observe these connections without trying to change them' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd27-r1', question: 'What patterns did you notice between specific thoughts and physical sensations?' },
          { id: 'd27-r2', question: 'How might this awareness be useful?' },
        ],
      },
    },
    {
      day: 28,
      title: 'Mindfulness in Action',
      description: 'Bring full presence to routine daily activities.',
      practice: {
        duration: 'Throughout day',
        description: 'Task mindfulness',
        steps: [
          { id: 'd28-1', task: 'Choose 3 routine activities (brushing teeth, washing dishes, etc.)' },
          { id: 'd28-2', task: 'Perform each with complete presence and awareness' },
          { id: 'd28-3', task: 'Engage all senses in the experience' },
          { id: 'd28-4', task: 'Brief reflection after each mindful activity' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd28-r1', question: 'How did full awareness transform routine activities?' },
          { id: 'd28-r2', question: 'Which activity benefited most from mindful attention?' },
        ],
      },
    },
    {
      day: 29,
      title: 'Joy Practice',
      description: 'Appreciative joy meditation — savor moments of delight.',
      practice: {
        duration: '15 min',
        description: 'Appreciative joy meditation',
        steps: [
          { id: 'd29-1', task: 'Focus on moments of joy, achievement, or beauty in your life' },
          { id: 'd29-2', task: 'Allow feelings of delight, wonder, or happiness to expand' },
          { id: 'd29-3', task: 'Notice resistance to joy and gently let it go' },
          { id: 'd29-4', task: 'Rest in the physical sensation of joy in your body' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd29-r1', question: 'What quality of joy was strongest for you (peace, excitement, contentment)?' },
          { id: 'd29-r2', question: 'Where did you feel joy in your body?' },
        ],
      },
    },
    {
      day: 30,
      title: 'Integration and Commitment',
      description: 'Design a sustainable personal practice for life beyond the program.',
      practice: {
        duration: '20 min',
        description: 'Personal practice design',
        steps: [
          { id: 'd30-1', task: 'Review what you have learned over the past 30 days' },
          { id: 'd30-2', task: 'Identify the practices that resonated most strongly' },
          { id: 'd30-3', task: 'Design a sustainable personal practice plan' },
          { id: 'd30-4', task: 'Commit to specific times and durations for ongoing practice' },
        ],
      },
      reflection: {
        questions: [
          { id: 'd30-r1', question: 'What aspects of mindfulness have been most valuable to you?' },
          { id: 'd30-r2', question: 'What is your commitment to practice moving forward?' },
        ],
      },
    },
  ],
};
