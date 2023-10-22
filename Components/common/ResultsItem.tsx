import React, { useContext } from "react";
import type { FC } from "react";

import { Text, StyleSheet, TouchableHighlight } from "react-native";
import { NavigationContext } from "@react-navigation/native";

import { styleGuide } from "../../styles/guide";
import { itemsTypes } from "../../services/rocks";

type ListResultProps = {
  currentType: number;
  linkToId: string;
  label: string;
};

const ResultsItem: FC<ListResultProps> = ({ currentType, linkToId, label }) => {
  const navigation = useContext(NavigationContext);
  console.log("w results item:");
  console.log({ currentType, linkToId });
  return (
    <TouchableHighlight
      onPress={() => {
        console.log("wywoluje onpress");
        navigation?.navigate("ResultsList", {
          currentItemType: currentType + 1,
          id: linkToId,
        });
      }}
      style={styles.container}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableHighlight>
  );
};

export default ResultsItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    border: "solid 1px black",
    borderRadius: 12,
    padding: 20,
    backgroundColor: styleGuide.color.primary["100"],
  },
  text: {
    ...styleGuide.text.heading["2"],
    color: "#336383",
  },
});
