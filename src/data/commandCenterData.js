export const commandKpis = [
  { label: 'Active Requests', value: '128' },
  { label: 'Critical', value: '14' },
  { label: 'Available Resources', value: '76' },
  { label: 'Potential Matches', value: '42' },
  { label: 'Active Volunteers', value: '31' },
];

export const mapMarkers = [
  { id: 'm1', type: 'critical', label: 'Water', position: { top: '18%', left: '22%' } },
  { id: 'm2', type: 'high', label: 'Food', position: { top: '35%', left: '62%' } },
  { id: 'm3', type: 'high', label: 'Medicine', position: { top: '56%', left: '40%' } },
  { id: 'm4', type: 'resource', label: 'Water', position: { top: '70%', left: '72%' } },
  { id: 'm5', type: 'resource', label: 'Food', position: { top: '28%', left: '80%' } },
];

export const priorityQueue = [
  { title: 'Drinking Water', level: 'CRITICAL', location: 'Demo Area A', people: 5 },
  { title: 'Rescue', level: 'CRITICAL', location: 'Demo Area C', people: 8 },
  { title: 'Medicine', level: 'HIGH', location: 'Demo Area B', people: 11 },
  { title: 'Food', level: 'MEDIUM', location: 'Demo Area D', people: 14 },
];

export const resourceFlow = ['REQUESTED', 'PRIORITIZED', 'MATCHED', 'DISPATCHED', 'DELIVERED'];

export const aiInsights = [
  'Water demand is currently the highest simulated need.',
  '3 high-priority requests have nearby potential resources.',
  '2 resource shortages require additional volunteers.',
];

export const markerDetails = {
  m1: { title: 'Critical — Water', info: 'High priority need in Demo Area A' },
  m2: { title: 'High — Food', info: 'Requires nearby supply support' },
  m3: { title: 'High — Medicine', info: 'Medical kits needed urgently' },
  m4: { title: 'Resource — Water', info: 'Available water supply ready' },
  m5: { title: 'Resource — Food', info: 'Available food support nearby' },
};
