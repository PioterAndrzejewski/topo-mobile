import DetailsWrapper from "src/components/rock/details/DetailsWrapper";
import Text from "src/components/ui/Text";

import { HalfShadowIcon } from "src/components/icons/HalfShadow";
import { ShadowIcon } from "src/components/icons/Shadow";
import { SunnyIcon } from "src/components/icons/Sunny";
import { Shading } from "src/services/rocks";

type ShadingProps = {
  shading: Shading;
};

export const renderShadingText = (shading: Shading) => {
  switch (shading) {
    case "shadow":
      return "Gęsty las";
    case "half-shadow":
      return "Trochę drzew";
    case "sunny":
      return "Brak drzew";
    default:
      return "Brak danych";
  }
};

const ShadingInfo = (props: ShadingProps) => {
  const renderIcon = () => {
    switch (props.shading) {
      case "shadow":
        return <ShadowIcon size={32} />;
      case "half-shadow":
        return <HalfShadowIcon size={38} />;
      case "sunny":
        return <SunnyIcon size={32} />;
      default:
        return <HalfShadowIcon size={32} />;
    }
  };

  return (
    <DetailsWrapper>
      {renderIcon()}
      <Text variant='body'>{renderShadingText(props.shading)}</Text>
    </DetailsWrapper>
  );
};

export default ShadingInfo;
