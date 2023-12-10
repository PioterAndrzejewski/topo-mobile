export const getRingsToOmit = (ringsToOmit: string) => {
  if (!ringsToOmit) return [];
  return ringsToOmit
    .replace(" ", "")
    .split(",")
    .map((el) => Number(el));
};