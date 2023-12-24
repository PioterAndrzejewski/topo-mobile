import { StyleSheet } from "react-native";
import { HeightIcon } from "src/components/icons/Height";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";
import DetailsWrapper from "src/components/rock/details/DetailsWrapper";

type HeightProps = {
  height: number;
};

const Height = (props: HeightProps) => {
  return (
    <DetailsWrapper>
      <HeightIcon size={32} />
      <View flexDirection='row' gap='s'>
        <Text variant='body'>Wysokość</Text>
        <Text variant='body'>{`${props.height.toString()}m`}</Text>
      </View>
    </DetailsWrapper>
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
