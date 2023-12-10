export const getRingsCoords = (path: string) => {
  const points = path.split(/[^0-9.]+/).filter((element) => element.length > 0);
  const result = [];

  for (let i = 0; i < points.length; i += 2) {
    const x = parseFloat(points[i]);
    const y = parseFloat(points[i + 1]);

    if (!isNaN(x) && !isNaN(y)) {
      result.push({ x, y });
    }
  }

  const start = result[0];
  const anchor = result.slice(-1)[0];
  const rings = result.slice(1, result.length - 1);

  return { start, anchor, rings };
};