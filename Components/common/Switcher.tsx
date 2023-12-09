import { useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    <View style={styles.container}>
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
            <Text>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 40,
    backgroundColor: "#e8e8e8",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});

const $option = (width: number): ViewStyle => ({
  flexDirection: "row",
  justifyContent: "center",
  paddingHorizontal: 6,
  paddingTop: 8,
  paddingBottom: 4,
  width,
});

const $activeOption = (color: string | undefined): ViewStyle => ({
  backgroundColor: "#fff",
  borderRadius: 40,
  borderBottomWidth: color ? 4 : 0,
  borderBottomColor: color,
});

export default Switcher;
