import { ActivityIndicator, ViewStyle } from "react-native";

import View from "../ui/View";

import { palette } from "src/styles/theme";

export default function AppLoading() {
  return (
    <View style={$container}>
      <ActivityIndicator size='large' />
    </View>
  );
}

const $container: ViewStyle = {
  width: "100%",
  height: "100%",
  marginTop: 12,
  backgroundColor: palette.white,
};
