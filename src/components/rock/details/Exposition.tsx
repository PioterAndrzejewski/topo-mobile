import { StyleSheet } from "react-native";
import { SunIcon } from "src/components/icons/Sun";
import { Exhibition } from "src/services/rocks";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";
import DetailsWrapper from "./DetailsWrapper";

type HeightProps = {
  exposition: Exhibition;
};

const getMeaningfulExposition = (exposition: Exhibition) => {
  switch (exposition) {
    case "north":
      return "północ";
    case "east":
      return "wschó∂";
    case "south":
      return "południe";
    case "trees":
      return "zadrzewiony";
    case "west":
      "zachód";
  }
};

const Exposition = (props: HeightProps) => {
  return (
    <DetailsWrapper>
      <SunIcon size={32} />
      <View flexDirection='row' gap='s'>
        <Text variant='body'>Wystawka:</Text>
        <Text variant='body'>
          {getMeaningfulExposition(props.exposition)}
        </Text>
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

export default Exposition;
