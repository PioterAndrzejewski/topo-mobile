import { View, Text, StyleSheet, LayoutAnimation } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import BackArrow from "../common/BackArrow";
import { useNavigation } from "@react-navigation/native";
import { styleGuide } from "../../styles/guide";

type HeaderProps = {
  onChange: (newMode: 0 | 1) => void;
  name?: string;
  mode: 0 | 1;
};
const Header = (props: HeaderProps) => {
  const navigation = useNavigation();
  const { mode, onChange } = props;

  const handlePress = (changeTo: 0 | 1) => {
    if (!onChange) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    props.onChange(changeTo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.iconWrapper}>
          <BackArrow onClick={() => navigation.goBack()} />
        </View>
        <View style={styles.headingWrapper}>
          <Text style={styles.heading}>{props.name}</Text>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handlePress(0)}>
            <View
              style={
                mode === 0
                  ? {
                      ...styles.button,
                      ...styles.buttonActive,
                    }
                  : styles.button
              }
            >
              <Text>2d</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress(1)}
            style={
              mode === 1
                ? {
                    ...styles.button,
                    ...styles.buttonActive,
                  }
                : styles.button
            }
          >
            <Text>3d</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    top: 50,
    zIndex: 4,
  },
  headerWrapper: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  iconWrapper: {
    position: "absolute",
    left: 0,
  },
  headingWrapper: {},
  heading: {
    ...styleGuide.text.heading[3],
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 24,
    backgroundColor: "#ccc",
    borderRadius: 24,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 24,
  },
  buttonActive: {
    backgroundColor: "#fff",
  },
});

export default Header;
