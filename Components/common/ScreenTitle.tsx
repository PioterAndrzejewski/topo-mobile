import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { styleGuide } from "../../styles/guide";
import { LoginTitleProps } from "../../types/props";

export default function LoginTitle({ title }: LoginTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: styleGuide.color.primary["200"],
  },
  header: {
    ...styleGuide.text.heading["1"],
    color: "#336383",
  },
});
