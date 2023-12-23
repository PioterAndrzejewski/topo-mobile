import { useMemo } from "react";
import { ViewStyle, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";
import { palette } from "src/styles/theme";

export type SwitcherOption<T> = {
  label: string;
  value: T;
};

export type SwitcherProps<T> = {
  options: SwitcherOption<T>[];
  active: string;
  onPress: (value: T) => void;
  containerStyles?: ViewStyle;
  badgeColor?: string;
};

const Switcher = <T extends string>({
  options,
  onPress,
  active,
  containerStyles,
  badgeColor,
}: SwitcherProps<T>) => {
  const { width } = useWindowDimensions();
  const optionWidth = useMemo(() => (width - 60) / options.length, [options]);
  return (
    <View
      width='100%'
      flexDirection='row'
      justifyContent='space-between'
      borderRadius={40}
      backgroundColor='backgroundSecondaryFaded'
      borderWidth={1}
      borderColor='backgroundSecondary'
      paddingVertical='s'
      paddingHorizontal='m'
    >
      {options.map((option) => {
        const isActive = option.value === active;
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onPress(option.value)}
            style={
              isActive
                ? {
                    ...$option(optionWidth),
                    ...$activeOption(badgeColor),
                    ...containerStyles,
                  }
                : { ...$option(optionWidth), ...containerStyles }
            }
          >
            <Text variant='h3' color={isActive ? "textBlack" : "textGray"}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const $option = (width: number): ViewStyle => ({
  flexDirection: "row",
  justifyContent: "center",
  paddingHorizontal: 6,
  paddingTop: 8,
  paddingBottom: 4,
  elevation: 5,
  zIndex: 5,

  width,
});

const $activeOption = (color: string | undefined): ViewStyle => ({
  backgroundColor: palette.white,
  borderRadius: 40,
  borderColor: color,
  borderWidth: color ? 1 : 0,
  shadowColor: palette.blue300,
  shadowRadius: 6,
  shadowOpacity: 1,
  shadowOffset: { width: 0, height: 0 },
});

export default Switcher;
