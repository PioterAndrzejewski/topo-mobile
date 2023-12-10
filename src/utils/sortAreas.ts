import { Region } from "react-native-maps";
import { AreaData } from 'src/services/rocks';
import { calculateDistance } from 'src/utils/calculateDistance';

export const sortAreas = (region: Region, areas: AreaData[]) => {
  if (!areas || areas.length < 1 || !Array.isArray(areas)) return [];
  const shallowCopy = [...areas];
  if (!shallowCopy || !Array.isArray(shallowCopy) || shallowCopy?.length < 1)
    return [];
  return shallowCopy.sort((a, b) => {
    return (
      calculateDistance(region, a.attributes.coordinates) -
      calculateDistance(region, b.attributes.coordinates)
    );
  });
};