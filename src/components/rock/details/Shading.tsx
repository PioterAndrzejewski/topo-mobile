import View from "src/components/ui/View";

import { Shading } from "src/services/rocks";

import { HalfShadowIcon } from "src/components/icons/HalfShadow";
import { ShadowIcon } from "src/components/icons/Shadow";
import { SunnyIcon } from "src/components/icons/Sunny";
import Text from "src/components/ui/Text";

type ShadingProps = {
  shading: Shading;
};

const ShadingInfo = (props: ShadingProps) => {
  const renderIcon = () => {
    switch (props.shading) {
      case "shadow":
        return <ShadowIcon size={32} />;
      case "half-shadow":
        return <HalfShadowIcon size={32} />;
      case "sunny":
        return <SunnyIcon size={32} />;
      default:
        return <HalfShadowIcon size={32} />;
    }
  };
  const renderText = () => {
    switch (props.shading) {
      case "shadow":
        return "las";
      case "half-shadow":
        return "półlas";
      case "sunny":
        return "patelnia";
      default:
        return "b/d";
    }
  };
  return (
    <View justifyContent='center' alignItems='center' height={40} width={46}>
      {renderIcon()}
      <Text variant='caption'>{renderText()}</Text>
    </View>
  );
};

export default ShadingInfo;
