import { ConfigContext, ExpoConfig } from "@expo/config";
import * as dotenv from "dotenv";

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "WspinApp",
  name: "WspinApp",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.wspinapp",
    config: {
      googleMapsApiKey: process.env.MAPS_KEY,
    },
    infoPlist: {
      NSCameraUsageDescription: "Allow WspinApp to access your camera",
      NSLocationWhenInUseUsageDescription:
        "Allow WspinApp to access your location",
      LSApplicationQueriesSchemes: [
        "comgooglemaps",
        "citymapper",
        "uber",
        "lyft",
        "transit",
        "truckmap",
        "waze",
        "yandexnavi",
        "moovit",
        "yandextaxi",
        "yandexmaps",
        "kakaomap",
        "szn-mapy",
        "mapsme",
        "osmandmaps",
        "gett",
        "nmap",
        "dgis",
        "lftgpas",
        "mailto",
        "tel",
      ],
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.wspinapp",
    config: {
      googleMaps: {
        apiKey: process.env.MAPS_KEY,
      },
    },
  },
  extra: {
    eas: {
      projectId: "0fb9ea29-ebe1-4c3e-91a7-940fffffd008",
    },
  },
});
