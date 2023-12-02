import { View, Text, StyleSheet, LayoutAnimation } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import BackArrow from "../common/BackArrow";
import { useNavigation } from "@react-navigation/native";
import { styleGuide } from "../../styles/guide";

type HeaderProps = {
  name?: string;
};
const Header = (props: HeaderProps) => {
  const navigation = useNavigation();

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    top: 60,
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
