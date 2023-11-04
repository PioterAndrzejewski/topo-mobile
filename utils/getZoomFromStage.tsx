export const getZoomFromStage = (stage: number) => {
  if (stage === 0) return 8;
  if (stage === 1) return 10;
  if (stage === 2) return 12;
  return 14;
};
