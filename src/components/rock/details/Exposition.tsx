import { SunIcon } from "src/components/icons/Sun";
import { Exhibition, ExhibitionData } from "src/services/rocks";

import DetailsWrapper from "src/components/rock/details/DetailsWrapper";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

type ExpositionProps = {
  exposition: ExhibitionData[];
};

const getMeaningfulExposition = (exposition: Exhibition) => {
  switch (exposition) {
    case "north":
      return "północna";
    case "east":
      return "wschodnia";
    case "south":
      return "południowa";
    case "west":
      "zachodnia";
  }
};

const Exposition = (props: ExpositionProps) => {
  return (
    <DetailsWrapper>
      <SunIcon size={32} />
      <View flexDirection='row' gap='s'>
        <Text>Wystawka: </Text>
        {props.exposition.map((expo, index) => (
          <Text>
            {getMeaningfulExposition(expo.exhibition) +
              (index === props.exposition.length - 1 ? "" : ", ")}
          </Text>
        ))}
      </View>
    </DetailsWrapper>
  );
};

export default Exposition;
