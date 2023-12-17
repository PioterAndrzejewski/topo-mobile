import View from "src/components/ui/View";

import { OverhangIcon } from "src/components/icons/Overhang";
import { SlabIcon } from "src/components/icons/Slab";
import { VerticalIcon } from "src/components/icons/Vertical";
import { Formations } from "src/services/rocks";

import Text from "src/components/ui/Text";

type FormationProps = {
  formation: Formations;
};

const Formation = (props: FormationProps) => {
  const renderIcon = () => {
    switch (props.formation) {
      case "slab":
        return <SlabIcon size={32} />;
      case "vertical":
        return <VerticalIcon size={32} />;
      case "overhang":
        return <OverhangIcon size={32} />;
      case "roof":
        return <OverhangIcon size={32} />;
    }
  };
  const renderText = () => {
    switch (props.formation) {
      case "slab":
        return "połóg";
      case "vertical":
        return "pion";
      case "overhang":
        return "przew";
      case "roof":
        return "dach";
    }
  };
  return (
    <View justifyContent='center' alignItems='center' height={40} width={40}>
      {renderIcon()}
      <Text variant='caption'>{renderText()}</Text>
    </View>
  );
};

export default Formation;
