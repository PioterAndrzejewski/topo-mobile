export const getRingsConjugation = (rings: number) => {
  if (rings === 0) return 'przelotów';
  if (rings === 1) return 'przelot';
  if (rings < 5) return 'przeloty';
  return 'przelotów';
}