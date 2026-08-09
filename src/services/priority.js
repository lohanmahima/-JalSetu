export function calculatePriority(values) {
  let score = 0;

  if (values.medicalEmergency) score += 40;
  if (values.currentlyTrapped) score += 30;
  if (!values.accessToDrinkingWater) score += 20;
  if (values.childrenPresent) score += 10;
  if (values.elderlyPresent) score += 10;
  if (values.personWithDisability) score += 10;
  if (values.helpUnavailableDuration === 'gt12') score += 10;

  return score;
}

export function priorityLabel(score) {
  if (score >= 80) return 'CRITICAL';
  if (score >= 60) return 'HIGH';
  if (score >= 30) return 'MEDIUM';
  return 'LOW';
}
