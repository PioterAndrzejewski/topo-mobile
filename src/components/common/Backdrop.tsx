import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const Backdrop = () => (
  <Animated.View
    entering={FadeIn}
    exiting={FadeOut}
    style={{
      backgroundColor: "#00000030",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none",
    }}
  />
);

export default Backdrop;
