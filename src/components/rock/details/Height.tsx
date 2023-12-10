import { StyleSheet, Text, View } from "react-native";

type HeightProps = {
  height: number;
};

const Height = (props: HeightProps) => {
  return (
    <View style={styles.container}>
      <Text>{props.height}m</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 6,
  },
});

export default Height;
