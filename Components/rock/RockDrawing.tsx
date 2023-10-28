import React, { FC } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import BackArrow from "../common/BackArrow";

import { styleGuide } from "../../styles/guide";
import { HomeScreenNavigationProp } from "../../types/type";

type RockDrawingProps = {
  url: string;
};

const RockDrawing: FC<RockDrawingProps> = ({ url }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <BackArrow onClick={() => navigation.goBack()} />
      <Text>Rysunek</Text>
      <Text>url: {url}</Text>
    </View>
  );
};

export default RockDrawing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleGuide.color.white,
  },
});
