import DetailsWrapper from "src/components/rock/details/DetailsWrapper";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { ChimneyIcon } from "src/components/icons/ChimneyIcon";
import { CrackIcon } from "src/components/icons/CrackIcon";
import { OverhangIcon } from "src/components/icons/Overhang";
import { PillarIcon } from "src/components/icons/PillarIcon";
import { RoofIcon } from "src/components/icons/RoofIcon";
import { SlabIcon } from "src/components/icons/Slab";
import { VerticalIcon } from "src/components/icons/Vertical";
import { FormationData, Formations } from "src/services/rocks";

type FormationProps = {
  formation: FormationData[];
};

export const renderFormationText = (formation: Formations) => {
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

export const renderFormationIcon = (type: Formations, size: number) => {
  switch (type) {
    case "slab":
      return <SlabIcon size={size} />;
    case "vertical":
      return <VerticalIcon size={size} />;
    case "chimney":
      return <ChimneyIcon size={size} />;
    case "crack":
      return <CrackIcon size={size} />;
    case "overhang":
      return <OverhangIcon size={size} />;
    case "pillar":
      return <PillarIcon size={size} />;
    case "roof":
      return <RoofIcon size={size} />;
  }
};

const Formation = (props: FormationProps) => {
  return (
    <DetailsWrapper>
      <SlabIcon size={32} />
      <View flexDirection='row' gap='s'>
        <Text variant='body'>Główne formacje:</Text>
        {props.formation.length &&
          props.formation.length > 0 &&
          props.formation.map((item, index) => (
            <Text key={item.formation + index}>
              {renderFormationText(item.formation) +
                (index === props.formation.length - 1 ? "" : ", ")}
            </Text>
          ))}
      </View>
    </DetailsWrapper>
  );
};

export default Formation;
