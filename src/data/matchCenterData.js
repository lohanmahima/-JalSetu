export const urgentNeeds = [
  {
    need: 'Drinking Water',
    people: 5,
    required: '50 kits',
    priority: 'HIGH',
    location: 'Demo Area A',
    status: 'Awaiting resource',
  },
  {
    need: 'Food',
    people: 12,
    required: '80 meals',
    priority: 'MEDIUM',
    location: 'Demo Area B',
    status: 'Awaiting resource',
  },
];

export const availableResources = [
  {
    resource: 'Drinking Water',
    available: '60 kits',
    provider: 'Demo Volunteer',
    distance: '3.2 km away',
    availability: 'Available',
  },
  {
    resource: 'Medicine',
    available: '40 boxes',
    provider: 'Demo Supply Hub',
    distance: '5.4 km away',
    availability: 'Available',
  },
];

export const matchResults = [
  {
    title: 'Potential Match Found',
    need: '50 water kits',
    available: '60 water kits',
    distance: '3.2 km',
    priority: 'HIGH',
    score: 92,
    factors: [
      'Resource type matches',
      'Quantity is sufficient',
      'Resource is nearby',
      'Request has high priority',
    ],
  },
];

export const otherMatches = [
  { label: 'Food', score: 87 },
  { label: 'Medicine', score: 81 },
  { label: 'Shelter', score: 74 },
];

export const matchPipeline = ['REQUEST', 'PRIORITY', 'RESOURCE DISCOVERY', 'AI MATCH', 'RESPONDER', 'TRACKING'];
