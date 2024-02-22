import { useTheme } from "@shopify/restyle";
import { ViewStyle } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

import Text from "../ui/Text";
import View from "../ui/View";

import { Theme } from "src/styles/theme";

type ButtonProps = {
  handlePress: (option: "rocks" | "areas") => void;
  mode: "rocks" | "areas";
};

const Button = ({ handlePress, mode }: ButtonProps) => {
  const { colors } = useTheme<Theme>();

  return (
    <View flexDirection='row' justifyContent='center'>
      <View
        flexDirection='row'
        paddingVertical='xs'
        paddingHorizontal='m'
        backgroundColor='backgroundSecondary'
        borderRadius={12}
      >
        <TouchableOpacity onPress={() => handlePress("rocks")}>
          <View
            style={
              mode === "rocks"
                ? {
                    ...$button,
                    backgroundColor: colors.backgroundSecondary,
                  }
                : $button
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
                  ...$button,
                  backgroundColor: colors.backgroundSecondary,
                }
              : $button
          }
        >
          <Text>Obszary</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const $button: ViewStyle = {
  paddingHorizontal: 20,
  paddingVertical: 6,
  borderRadius: 24,
};

export default Button;
