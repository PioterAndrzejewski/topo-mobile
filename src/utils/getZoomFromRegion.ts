import { Region } from 'react-native-maps';

export const getZoomFromRegion = (region: Region) => {
  return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
};