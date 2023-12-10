export const getZoomFromStage = (stage: number) => {
  if (stage === 0) return 8;
  if (stage === 1) return 10;
  if (stage === 2) return 12;
  return 14;
};

export const getStageFromZoom = (zoom: number) => {
  if (zoom < 9) return 0;
  if (zoom < 11) return 1;
  if (zoom < 13) return 2;
  return 3;
};
