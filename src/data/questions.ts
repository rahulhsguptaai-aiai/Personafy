/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuizQuestion } from '../types';

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'energy',
    questionText: 'How do you typically recharge your battery after a busy, exhausting week?',
    subtitle: 'Choose the scenario that feels most natural and restorative to you.',
    options: [
      { id: '1a', text: 'Hosting a lively dinner or going out with a large group of active friends.', dimension: 'E', weight: 2 },
      { id: '1b', text: 'Meeting up with one or two close friends for a relaxed, low-key conversation.', dimension: 'E', weight: 1 },
      { id: '1c', text: 'Engaging in a quiet personal hobby at home, like cooking, gaming, or reading.', dimension: 'I', weight: 1 },
      { id: '1d', text: 'Unplugging from all devices and spending completely uninterrupted solo time.', dimension: 'I', weight: 2 }
    ]
  },
  {
    id: 2,
    category: 'perception',
    questionText: 'When reading an article or listening to a story, what keeps you most engaged?',
    subtitle: 'Focus on what naturally grabs your interest first.',
    options: [
      { id: '2a', text: 'Real-world facts, solid statistics, and practical descriptions of what actually happened.', dimension: 'S', weight: 2 },
      { id: '2b', text: 'Step-by-step details, logical historical context, and concrete examples.', dimension: 'S', weight: 1 },
      { id: '2c', text: 'Creative analogies, potential future implications, and underlying themes.', dimension: 'N', weight: 1 },
      { id: '2d', text: 'Abstract theories, speculative possibilities, and large-scale imaginative ideas.', dimension: 'N', weight: 2 }
    ]
  },
  {
    id: 3,
    category: 'judgment',
    questionText: 'If a close friend asks for your advice on a difficult dilemma, what is your first response?',
    subtitle: 'Identify your instinctive default approach.',
    options: [
      { id: '3a', text: 'Analyze the problem objectively, outlining logical solutions and next steps.', dimension: 'T', weight: 2 },
      { id: '3b', text: 'Evaluate the pros and cons logically to find the most efficient way forward.', dimension: 'T', weight: 1 },
      { id: '3c', text: 'Validate their feelings first, ensuring they feel heard, comforted, and supported.', dimension: 'F', weight: 1 },
      { id: '3d', text: 'Deeply empathize, focusing on dynamic emotional values and how the outcome affects people.', dimension: 'F', weight: 2 }
    ]
  },
  {
    id: 4,
    category: 'lifestyle',
    questionText: 'How do you prefer to manage your upcoming weekend or holiday schedule?',
    subtitle: 'Reflect on how you feel most comfortable structuring your free time.',
    options: [
      { id: '4a', text: 'Having a detailed itinerary planned out in advance so I can maximize my time.', dimension: 'J', weight: 2 },
      { id: '4b', text: 'Setting a few key goals/appointments but leaving plenty of breathing room.', dimension: 'J', weight: 1 },
      { id: '4c', text: 'Leaving plans completely open, waiting to see what I feel like doing in the moment.', dimension: 'P', weight: 1 },
      { id: '4d', text: 'Actively avoiding any plans so I can act entirely on spontaneous impulse.', dimension: 'P', weight: 2 }
    ]
  },
  {
    id: 5,
    category: 'energy',
    questionText: 'During meetings, classrooms, or social settings, how do you communicate?',
    subtitle: 'Think about your natural style when interacting with others.',
    options: [
      { id: '5a', text: 'I jump in immediately to speak, formulating and refining my ideas as I talk out loud.', dimension: 'E', weight: 2 },
      { id: '5b', text: 'I engage actively in the debate once the initial iced-breakers are out of the way.', dimension: 'E', weight: 1 },
      { id: '5c', text: 'I prefer to listen carefully first, only speaking once I have formulated my thoughts.', dimension: 'I', weight: 1 },
      { id: '5d', text: 'I mostly observe from the side, speaking up only when directly prompted or necessary.', dimension: 'I', weight: 2 }
    ]
  },
  {
    id: 6,
    category: 'perception',
    questionText: 'If you were given a highly creative project, which style would you enjoy more?',
    subtitle: 'Choose the learning and creation process that satisfies you.',
    options: [
      { id: '6a', text: 'Applying reliable, established methods to create tangible, physical products.', dimension: 'S', weight: 2 },
      { id: '6b', text: 'Using step-by-step instructions and practical templates to solve real issues.', dimension: 'S', weight: 1 },
      { id: '6c', text: 'Combining various existing theories to propose a fresh, creative design or template.', dimension: 'N', weight: 1 },
      { id: '6d', text: 'Inventing a completely novel concept, breaking existing norms and starting from scratch.', dimension: 'N', weight: 2 }
    ]
  },
  {
    id: 7,
    category: 'judgment',
    questionText: 'When a group conversation or debate starts getting heated, what is your primary goal?',
    subtitle: 'Consider what matters most to you in tense social situations.',
    options: [
      { id: '7a', text: 'Ensuring the argument remains logically sound, accurate, and completely factual.', dimension: 'T', weight: 2 },
      { id: '7b', text: 'Sticking to the core truth, regardless of whether it might ruffle a few feathers.', dimension: 'T', weight: 1 },
      { id: '7c', text: 'Maintaining general peace and diplomacy, even if some logical details are skipped.', dimension: 'F', weight: 1 },
      { id: '7d', text: 'Protecting everyone’s feelings, making sure everyone feels valued, safe, and heard.', dimension: 'F', weight: 2 }
    ]
  },
  {
    id: 8,
    category: 'lifestyle',
    questionText: 'How would someone describe the general state of your home desk or work area?',
    subtitle: 'Be honest about your natural tendencies, not just your aspirations.',
    options: [
      { id: '8a', text: 'Impeccably clean and highly organized, with every tool and document in its right spot.', dimension: 'J', weight: 2 },
      { id: '8b', text: 'Mostly tidy; I clean it up as soon as a project or work session concludes.', dimension: 'J', weight: 1 },
      { id: '8c', text: 'A bit of comfortable clutter; I know where everything is, even if it looks messy.', dimension: 'P', weight: 1 },
      { id: '8d', text: 'A chaotic layout of active items, papers, and mugs, constantly shifting organically.', dimension: 'P', weight: 2 }
    ]
  },
  {
    id: 9,
    category: 'energy',
    questionText: 'If you join an ongoing event or social gathering, what do you usually do?',
    subtitle: 'Identify your comfort level in unfamiliar groups.',
    options: [
      { id: '9a', text: 'Seek out the host or join a central group immediately to meet as many people as possible.', dimension: 'E', weight: 2 },
      { id: '9b', text: 'Introduce myself comfortably to people standing nearby and strike up conversations.', dimension: 'E', weight: 1 },
      { id: '9c', text: 'Look for someone I already know or await matching introductions with new faces.', dimension: 'I', weight: 1 },
      { id: '9d', text: 'Slide in quietly, find a comfortable spot, and watch the room before committing.', dimension: 'I', weight: 2 }
    ]
  },
  {
    id: 10,
    category: 'perception',
    questionText: 'When imagining the future, which thoughts tend to occupy your mind?',
    subtitle: 'Think about where your brain naturally drifts when daydreaming.',
    options: [
      { id: '10a', text: 'Specific, concrete goals like savings accounts, home improvements, or immediate tasks.', dimension: 'S', weight: 2 },
      { id: '10b', text: 'Realist adjustments to my current lifestyle based on visible patterns and facts.', dimension: 'S', weight: 1 },
      { id: '10c', text: 'Symbolic milestones, general vibes, and personal emotional aspirations of growth.', dimension: 'N', weight: 1 },
      { id: '10d', text: 'Wild possibilities, theoretical shift scenarios, and speculative world futures.', dimension: 'N', weight: 2 }
    ]
  },
  {
    id: 11,
    category: 'judgment',
    questionText: 'What matters more when evaluating an organizational policy or rule?',
    subtitle: 'Consider the metric you value most.',
    options: [
      { id: '11a', text: 'Its complete fairness, objective consistency, and logical enforcement across the board.', dimension: 'T', weight: 2 },
      { id: '11b', text: 'Its logical outcome and whether it yields predictable, efficient results.', dimension: 'T', weight: 1 },
      { id: '11c', text: 'Its compassion, flexibility, and whether it accommodates unusual human circumstances.', dimension: 'F', weight: 1 },
      { id: '11d', text: 'Its human impact and whether it elevates morale, equality, and mutual well-being.', dimension: 'F', weight: 2 }
    ]
  },
  {
    id: 12,
    category: 'lifestyle',
    questionText: 'When starting a task or project with a firm deadline, what is your work style?',
    subtitle: 'Describe your actual workflow behavior under pressure.',
    options: [
      { id: '12a', text: 'Planning everything step-by-step and completing it well ahead of the final hour.', dimension: 'J', weight: 2 },
      { id: '12b', text: 'Pacing myself steadily, aiming to finish slightly ahead of or exactly on schedule.', dimension: 'J', weight: 1 },
      { id: '12c', text: 'Starting with solid intentions, but relying on a dynamic burst of speed in the final days.', dimension: 'P', weight: 1 },
      { id: '12d', text: 'Doing the vast majority of the work in an intense, adrenaline-fueled last-minute rush.', dimension: 'P', weight: 2 }
    ]
  }
];
