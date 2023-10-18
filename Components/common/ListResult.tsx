import type { FC } from "react";

import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styleGuide } from "../../styles/guide";

import { HomeScreenNavigationProp } from "../../types/type";

type ListResultProps = {
  linkTo: string;
  linkToId: string;
  label: string;
};

const ListResult: FC<ListResultProps> = ({ linkTo, linkToId, label }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <TouchableHighlight onPress={navigation.navigate(linkTo, { id: linkToId })}>
      <View style={styles.container}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ListResult;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: styleGuide.color.primary["200"],
  },
  text: {
    ...styleGuide.text.heading["1"],
    color: "#336383",
  },
});
