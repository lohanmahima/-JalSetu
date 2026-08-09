export const liveCards = [
  {
    label: 'Active relief zones',
    value: '4 regions',
    detail: 'Focused coordination in low-lying districts and riverfront communities.',
  },
  {
    label: 'Verified requests',
    value: '120+',
    detail: 'Requests triaged and prioritized for local teams to review.',
  },
  {
    label: 'Open volunteers',
    value: '89 ready',
    detail: 'Volunteers available for transport, food distribution, and shelter support.',
  },
];

export const processSteps = [
  { title: 'Request', description: 'Submit a help report or request a resource through the platform.' },
  { title: 'Verify', description: 'Local teams confirm the situation, flags, and urgency.' },
  { title: 'Prioritize', description: 'AI insight and coordinators assign the request a response tier.' },
  { title: 'Match', description: 'Available community and NGO resources are connected with the need.' },
  { title: 'Respond', description: 'Support is dispatched and responders are notified with location details.' },
  { title: 'Track', description: 'Progress is updated until the request is resolved and confirmed.', clickable: false },
];

export const aiCapabilities = [
  {
    title: 'Need Prediction',
    summary: 'Estimate where rising water and infrastructure stress may create new relief needs.',
  },
  {
    title: 'SOS Prioritization',
    summary: 'Help responders focus on the most urgent, high-impact situations first.',
  },
  {
    title: 'Resource Matching',
    summary: 'Pair available volunteers and supplies with nearby verified requests.',
  },
  {
    title: 'Verification Assistance',
    summary: 'Flag duplicate or inconsistent reports for human review.',
  },
];

export const helpOptions = [
  {
    title: 'Report a need',
    description: 'Share a request for food, water, shelter, transport or rescue support.',
    action: '/get-help',
  },
  {
    title: 'Volunteer locally',
    description: 'Offer your time for relief distribution, safety checks, or community support.',
    action: '/volunteer',
  },
  {
    title: 'Donate essentials',
    description: 'Contribute supplies, equipment, or coordinated community donations.',
    action: '/donate',
  },
];

export const emergencyResources = [
  {
    name: 'Community relief guide',
    type: 'Demo resource sheet',
  },
  {
    name: 'Local shelter list',
    type: 'Sample safety planning document',
  },
  {
    name: 'Volunteer briefing',
    type: 'Prepared coordination checklist',
  },
];
