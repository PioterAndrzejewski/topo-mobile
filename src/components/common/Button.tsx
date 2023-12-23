import { useTheme } from "@shopify/restyle";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { Theme, palette } from "src/styles/theme";

export type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  containerStyles?: ViewStyle;
  labelColor?: keyof Theme["colors"];
};

export default function Button({
  label,
  onClick,
  disabled,
  isLoading,
  containerStyles,
  labelColor,
}: ButtonProps) {
  const { colors } = useTheme<Theme>();
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
                ...$container,
                ...$disabled,
              }
            : { ...$container, ...containerStyles }
        }
      >
        {isLoading ? (
          <ActivityIndicator size='small' />
        ) : (
          <Text variant='button' color={labelColor || "textWhite"}>
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const $container: ViewStyle = {
  marginTop: 12,
  padding: 14,
  backgroundColor: palette.green,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 12,
};

const $disabled: ViewStyle = {
  backgroundColor: palette.blue700_10,
}
