import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { styleGuide } from "src/styles/guide";

export type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  containerStyles?: ViewStyle;
};

export default function Button({
  label,
  onClick,
  disabled,
  isLoading,
  containerStyles,
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
            : { ...styles.container, ...containerStyles }
        }
      >
        {isLoading ? (
          <ActivityIndicator size='small' />
        ) : (
          <Text style={styles.label}>{label}</Text>
        )}
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
