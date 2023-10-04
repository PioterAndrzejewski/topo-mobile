import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { styleGuide } from "../../styles/guide";
import { ButtonProps } from "../../types/props";

export default function CustomTextInput({
  label,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (!disabled) {
          onClick();
        }
      }}
    >
      <View
        style={
          disabled
            ? {
                ...styles.container,
                ...styles.disabled,
              }
            : { ...styles.container }
        }
      >
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 14,
    backgroundColor: "#2F4858",
    ...(styleGuide.center as ViewStyle),
    ...styleGuide.corner.sm,
  },
  disabled: {
    backgroundColor: styleGuide.color.primary["300"],
  },
  label: {
    color: styleGuide.color.white,
    ...styleGuide.text.button,
  },
});
