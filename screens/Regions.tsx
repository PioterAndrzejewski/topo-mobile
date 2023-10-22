import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import { styleGuide } from "../styles/guide";
import ScreenTitle from "../Components/common/ScreenTitle";
import BackArrow from "../Components/common/BackArrow";
import { Props } from "../types/type";

export default function Regions({ route, navigation }: Props) {
  useEffect(() => {
    console.log("id: ", route.params.id);
  }, []);
  return (
    <View style={styles.container}>
      <ScreenTitle title='Regions' />
      <BackArrow linkTo='Areas' />
      {/* <ScrollView>
        <PrettyJson json={areas} />
      </ScrollView> */}
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
