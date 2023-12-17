import { StyleSheet, View } from "react-native";
import { SunIcon } from "src/components/icons/Sun";
import { Exhibition } from "src/services/rocks";

import Text from "src/components/ui/Text";

type HeightProps = {
  exposition: Exhibition;
};

const Exposition = (props: HeightProps) => {
  return (
    <View style={styles.container}>
      <SunIcon size={32} />
      <Text variant='caption'>{props.exposition.slice(0, 1).toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
  },
});

export default Exposition;
