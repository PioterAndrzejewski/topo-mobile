import { StyleSheetProperties, StyleProp, ViewStyle, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type ChangeRouteButtonProps = {
  Icon: JSX.Element;
  style?: StyleProp<ViewStyle>;
};

const ChangeRouteButton = (props: ChangeRouteButtonProps) => {
  return <View style={props.style}>{props.Icon}</View>;
};

export default ChangeRouteButton;
