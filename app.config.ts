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
