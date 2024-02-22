import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import ChangeRouteButton from "src/components/rock/drawing/ChangeRouteButton";

import { ChevronLeftIcon } from "src/components/icons/ChevronLeft";
import { ChevronRightIcon } from "src/components/icons/ChevronRight";

type ButtonsProps = {
  handleRouteChange: (number: -1 | 1) => void;
};

const Buttons = ({ handleRouteChange }: ButtonsProps) => {
  return (
    <>
      <TouchableOpacity
        style={styles.buttonContainerLeft}
        activeOpacity={0.5}
        onPress={() => handleRouteChange(-1)}
      >
        <ChangeRouteButton
          Icon={<ChevronLeftIcon size={36} />}
          style={styles.buttonLeft}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainerRight}
        activeOpacity={0.5}
        onPress={() => handleRouteChange(1)}
      >
        <ChangeRouteButton
          Icon={<ChevronRightIcon size={36} />}
          style={styles.buttonRight}
        />
      </TouchableOpacity>
    </>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  buttonContainerLeft: {
    zIndex: 3,
    position: "absolute",
  },
  buttonLeft: {
    padding: 5,
    position: "absolute",
    top: 250,
    left: 10,
    backgroundColor: "#fff",
    opacity: 0.5,
    borderRadius: 30,
  },
  buttonContainerRight: {
    zIndex: 3,
    position: "absolute",
    right: 60,
  },
  buttonRight: {
    padding: 5,
    position: "absolute",
    top: 250,
    backgroundColor: "#fff",
    opacity: 0.5,
    borderRadius: 30,
  },
});
