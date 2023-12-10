import { StyleProp, View, ViewStyle } from "react-native";

type ChangeRouteButtonProps = {
  Icon: JSX.Element;
  style?: StyleProp<ViewStyle>;
};

const ChangeRouteButton = (props: ChangeRouteButtonProps) => {
  return <View style={props.style}>{props.Icon}</View>;
};

export default ChangeRouteButton;
