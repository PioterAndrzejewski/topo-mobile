import { Dimensions } from "react-native";

export const getRegionForZoom = (lat: number, lon: number, zoom: number) => {
  const distanceDelta = Math.exp(Math.log(360) - zoom * Math.LN2);
  const { width, height } = Dimensions.get("window");
  const aspectRatio = width / height;
  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta: distanceDelta * aspectRatio,
    longitudeDelta: distanceDelta,
  };
};
