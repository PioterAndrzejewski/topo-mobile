import type { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

import { styleGuide } from "src/styles/guide";

type LoginTitleProps = {
  title: string;
};

const LoginTitle: FC<LoginTitleProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
    </View>
  );
};

export default LoginTitle;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  header: {
    ...styleGuide.text.heading["1"],
    color: "#336383",
  },
});
