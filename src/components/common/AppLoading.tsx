import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { styleGuide } from "src/styles/guide";

export default function AppLoading() {
  return (
    <View style={styles.container}>
      <Text>
        <ActivityIndicator size='large' />;
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    marginTop: 20,
    backgroundColor: styleGuide.color.white,
  },
});
