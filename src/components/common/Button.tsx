import { useTheme } from '@shopify/restyle';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { styleGuide } from "src/styles/guide";
import { Theme } from 'src/styles/theme';

export type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  containerStyles?: ViewStyle;
  labelColor?: string;
};

export default function Button({
  label,
  onClick,
  disabled,
  isLoading,
  containerStyles,
  labelColor,
}: ButtonProps) {
  const {colors} = useTheme<Theme>()
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
          <Text variant='h3' color={labelColor || colors.mainBackground}>{label}</Text>
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
