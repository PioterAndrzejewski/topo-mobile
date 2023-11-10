import { useEffect, useRef, useState, useMemo } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

import { styleGuide } from "../../../styles/guide";

type ButtonProps = {
  handlePress: (option: "rocks" | "areas") => void;
  mode: "rocks" | "areas";
};

const Button = ({ handlePress, mode }: ButtonProps) => {
  return (
    <View style={styles.buttonWrapper}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handlePress("rocks")}>
          <View
            style={
              mode === "rocks"
                ? {
                    ...styles.button,
                    ...styles.buttonActive,
                  }
                : styles.button
            }
          >
            <Text>Skały</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress("areas")}
          style={
            mode === "areas"
              ? {
                  ...styles.button,
                  ...styles.buttonActive,
                }
              : styles.button
          }
        >
          <Text>Obszary</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    top: 50,
    zIndex: 4,
  },
  headerWrapper: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  iconWrapper: {
    position: "absolute",
    left: 0,
  },
  headingWrapper: {},
  heading: {
    ...styleGuide.text.heading[3],
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 24,
    backgroundColor: "#ccc",
    borderRadius: 24,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 24,
  },
  buttonActive: {
    backgroundColor: "#fff",
  },
});

export default Button;
