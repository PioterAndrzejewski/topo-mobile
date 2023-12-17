import { StyleSheet, View } from "react-native";
import { HeightIcon } from "src/components/icons/Height";

import Text from 'src/components/ui/Text';

type HeightProps = {
  height: number;
};

const Height = (props: HeightProps) => {
  return (
    <View style={styles.container}>
      <HeightIcon size={32} />
      <Text variant='caption'>{`${props.height.toString()}m`}</Text>
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

export default Height;
