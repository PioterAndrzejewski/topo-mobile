import { useTheme } from "@shopify/restyle";
import { useMemo } from "react";
import { ActivityIndicator, TouchableOpacity, ViewStyle } from "react-native";

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
  variant?: "standard" | "outline";
};

export default function Button({
  label,
  onClick,
  disabled,
  isLoading,
  containerStyles,
  labelColor,
  variant = "standard",
}: ButtonProps) {
  const { colors } = useTheme<Theme>();
  const handlePress = () => {
    if (disabled) {
      return;
    }
    onClick();
  };

  const getLabelColor = useMemo(() => {
    if (labelColor) return labelColor;
    if (variant === "outline") return colors.textBlack as keyof Theme["colors"];
    return "textWhite";
  }, [labelColor, variant]);

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled}>
      <View
        style={
          disabled
            ? {
                ...$container,
                ...$disabled,
              }
            : { ...$container(variant), ...containerStyles }
        }
      >
        {isLoading ? (
          <ActivityIndicator size='small' />
        ) : (
          <Text variant='button' color={getLabelColor}>
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const $container: (variant: "standard" | "outline") => ViewStyle = (
  variant,
) => ({
  padding: 14,
  backgroundColor: variant === "standard" ? palette.green : palette.white,
  borderWidth: variant === "standard" ? 0 : 1,
  borderColor: variant === "outline" ? palette.green : palette.white,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 100,
});

const $disabled: ViewStyle = {
  backgroundColor: palette.blue700_10,
  padding: 14,
  borderRadius: 100,
};
