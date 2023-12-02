import { useMemo } from "react";
import { View, Text, StyleSheet, LayoutAnimation } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import BackArrow from "../common/BackArrow";
import { useNavigation } from "@react-navigation/native";
import { styleGuide } from "../../styles/guide";

type HeaderProps = {
  name?: string;
  numberOfImages?: number;
  activeImage: number;
  onCirclePress: (index: number) => void;
};

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();
  const imagesArray = useMemo(() => {
    if (!props.numberOfImages || props.numberOfImages < 1) return null;
    return Array.from({ length: props.numberOfImages! }, (_, i) => ({
      index: i,
    }));
  }, [props.numberOfImages]);

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
      {props.numberOfImages && props.numberOfImages > 1 && (
        <View style={styles.circlesContainer}>
          {imagesArray?.map((_, i) => (
            <ImageCircle
              active={i === props.activeImage}
              index={i}
              onPress={props.onCirclePress}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const ImageCircle = ({
  active,
  index,
  onPress,
}: {
  active: boolean;
  index: number;
  onPress: (i: number) => void;
}) => {
  const handlePress = () => onPress(index);
  if (active)
    return (
      <View style={$imageCircleOffset(active)}>
        <View style={$imageCircle(active)} />
      </View>
    );
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={$imageCircleOffset(active)}>
        <View style={$imageCircle(active)} />
      </View>
    </TouchableOpacity>
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
  circlesContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
});

const $imageCircle = (active: boolean) => ({
  width: 12,
  height: 12,
  backgroundColor: active ? "#000" : "#777",
  borderRadius: 20,
  borderWidth: 1,
});

const $imageCircleOffset = (active: boolean) => ({
  padding: 4,
  borderColor: "#000",
  borderRadius: 20,
  borderWidth: active ? 1 : 0,
});

export default Header;
