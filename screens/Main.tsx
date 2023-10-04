import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUserProfile } from "../hooks/useUserProfile";

import { styleGuide } from "../styles/guide";

export default function Main() {
  const { data } = useUserProfile();
  return (
    <View style={styles.container}>
      <Text>no elo</Text>
      <Text>user: {data?.username}</Text>
      <Text>user: {data?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: styleGuide.color.primary["200"],
  },
});
