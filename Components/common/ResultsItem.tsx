import React from "react";
import type { FC } from "react";

import { Text, StyleSheet, TouchableHighlight } from "react-native";

import { styleGuide } from "../../styles/guide";
import type { CurrentItem } from "../../screens/ResultsList";

type ListResultProps = {
  id: string;
  name: string;
  onChange: (step: number, newItem: CurrentItem) => void;
};

const ResultsItem: FC<ListResultProps> = ({ id, name, onChange }) => {
  return (
    <TouchableHighlight
      onPress={() => onChange(1, { id, name })}
      style={styles.container}
    >
      <Text style={styles.text}>{name}</Text>
    </TouchableHighlight>
  );
};

export default ResultsItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    padding: 20,
    backgroundColor: styleGuide.color.primary["100"],
  },
  text: {
    ...styleGuide.text.heading["2"],
    color: "#336383",
  },
});
