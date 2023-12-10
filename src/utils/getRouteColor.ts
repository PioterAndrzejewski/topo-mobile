export const getRouteColor = (grade: number) => {
  if (grade < 6) return '#fff';
  if (grade < 12) return '#228B22';
  if (grade < 16) return '#008FFF';
  if (grade < 20) return '#ff0800';
  return '#000';
}