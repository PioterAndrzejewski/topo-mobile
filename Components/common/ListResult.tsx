import React, { useContext } from "react";
import type { FC } from "react";

import { Text, StyleSheet, TouchableHighlight } from "react-native";
import { NavigationContext } from "@react-navigation/native";

import { styleGuide } from "../../styles/guide";

import { HomeScreenNavigationProp } from "../../types/type";

type ListResultProps = {
  linkTo: string;
  linkToId: string;
  label: string;
};

const ListResult: FC<ListResultProps> = ({ linkTo, linkToId, label }) => {
  const navigation = useContext(NavigationContext);
  return (
    <TouchableHighlight
      onPress={() => navigation?.navigate(linkTo, { id: linkToId })}
      style={styles.container}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableHighlight>
  );
};

export default ListResult;

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
