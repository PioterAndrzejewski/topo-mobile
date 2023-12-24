import { SunIcon } from "src/components/icons/Sun";
import { Exhibition } from "src/services/rocks";

import DetailsWrapper from "src/components/rock/details/DetailsWrapper";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

type HeightProps = {
  exposition: Exhibition;
};

const getMeaningfulExposition = (exposition: Exhibition) => {
  switch (exposition) {
    case "north":
      return "Wystawka północna";
    case "east":
      return "Wystawka wschodnia";
    case "south":
      return "Wystawka południowa";
    case "trees":
      return "Skała w lesie";
    case "west":
      "Wystawka zachodnia";
  }
};

const Exposition = (props: HeightProps) => {
  return (
    <DetailsWrapper>
      <SunIcon size={32} />
      <View flexDirection='row' gap='s'>
        <Text variant='body'>{getMeaningfulExposition(props.exposition)}</Text>
      </View>
    </DetailsWrapper>
  );
};

export default Exposition;
