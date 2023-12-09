import { View, StyleSheet, Text, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FavoriteType } from "../../services/storeAsync";
import { getFavoriteColor } from "../../utils/getFavoriteColor";

type SwitcherOption = {
  label: string;
  value: FavoriteType;
};

type SwitcherProps = {
  options: SwitcherOption[];
  active: FavoriteType;
  onPress: (value: FavoriteType) => void;
};

const Switcher = ({ options, onPress, active }: SwitcherProps) => {
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
                    ...styles.option,
                    ...$activeOption(getFavoriteColor(option.value)),
                  }
                : styles.option
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
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  option: {
    paddingHorizontal: 30,
    paddingTop: 8,
    paddingBottom: 4,
  },
});

const $activeOption = (color: string | undefined) => ({
  backgroundColor: "#fff",
  borderRadius: 40,
  borderBottomWidth: 4,
  borderBottomColor: color,
});

export default Switcher;
