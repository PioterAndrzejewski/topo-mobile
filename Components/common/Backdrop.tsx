import { StyleSheet } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

type Props = {
  onClose: () => void;
};

export const Backdrop = (props: Props) => {
  const { onClose } = props;

  const pan = Gesture.Pan().onBegin(onClose);
  const tap = Gesture.Tap().onBegin(onClose);

  const gesture = Gesture.Race(tap, pan);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={styles.backdrop} />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: "#bbb",
  },
});
