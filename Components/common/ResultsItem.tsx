import React from "react";
import type { FC } from "react";

import { Text, StyleSheet, TouchableOpacity } from "react-native";

import { styleGuide } from "../../styles/guide";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../types/type";
import { CurrentResultsListItem } from "../../types/common";

type ListResultProps = {
  id: string;
  name: string;
  onChange: (step: number, newItem: CurrentResultsListItem) => void;
  isRock: boolean;
};

const ResultsItem: FC<ListResultProps> = ({ id, isRock, name, onChange }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const handleChange = () => {
    if (!isRock) return onChange(1, { id, name });
    navigation.navigate("Rock", { id });
  };
  return (
    <TouchableOpacity onPress={handleChange} style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ResultsItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
    padding: 20,
  },
  text: {
    ...styleGuide.text.heading["2"],
    color: "#336383",
  },
});
