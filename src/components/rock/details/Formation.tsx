import DetailsWrapper from "src/components/rock/details/DetailsWrapper";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { SlabIcon } from "src/components/icons/Slab";
import { FormationData, Formations } from "src/services/rocks";

type FormationProps = {
  formation: FormationData[];
};

const Formation = (props: FormationProps) => {
  const renderText = (formation: Formations) => {
    switch (formation) {
      case "slab":
        return "połóg";
      case "vertical":
        return "pion";
      case "overhang":
        return "przewieszenie";
      case "roof":
        return "dach";
      case "chimney":
        return "komin";
      case "crack":
        return "rysa";
      case "pillar":
        return "filar";
    }
  };

  console.log(props);
  return (
    <DetailsWrapper>
      <SlabIcon size={32} />
      <View flexDirection='row' gap='s'>
        <Text variant='body'>Główne formacje:</Text>
        {props.formation.length &&
          props.formation.length > 0 &&
          props.formation.map((item, index) => (
            <Text>
              {renderText(item.formation) +
                (index === props.formation.length - 1 ? "" : ", ")}
            </Text>
          ))}
      </View>
    </DetailsWrapper>
  );
};

export default Formation;
