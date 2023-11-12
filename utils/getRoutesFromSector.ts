import { RegionData, RockData } from '../services/rocks';
import { getRoutesFromRock } from './getRoutesFromRock';

export const getRoutesFromSector = (sector: RegionData, rocks: RockData[]) => {
  const rocksToSearch = rocks.filter(
    (rock) =>
      rock.attributes.parent.data.attributes.uuid === sector.attributes.uuid,
  );
  let sectorRoutes = {
    toV: 0,
    toVI2: 0,
    toVI4: 0,
    toVI8: 0,
  };
  rocksToSearch.forEach((rock) => {
    const rockRoutes = getRoutesFromRock(rock);
    sectorRoutes = {
      toV: sectorRoutes.toV + rockRoutes.toV,
      toVI2: sectorRoutes.toVI2 + rockRoutes.toVI2,
      toVI4: sectorRoutes.toVI4 + rockRoutes.toVI4,
      toVI8: sectorRoutes.toVI8 + rockRoutes.toVI8,
    };
  });
  return sectorRoutes;
};