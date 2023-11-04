import { Region } from 'react-native-maps';
import { Coordinates } from '../services/rocks';

export function calculateDistance(point1: Region, point2: Coordinates) {
  const R = 6371; // Earth's radius in kilometers
  const lat1 = deg2rad(point1.latitude);
  const lon1 = deg2rad(point1.longitude);
  const lat2 = deg2rad(point2.latitude);
  const lon2 = deg2rad(point2.longitude);
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // The distance in kilometers
  return distance;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}