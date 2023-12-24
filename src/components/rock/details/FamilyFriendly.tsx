import Text from "src/components/ui/Text";

import { StrollerIcon } from "src/components/icons/Stroller";
import DetailsWrapper from "src/components/rock/details/DetailsWrapper";

const FamilyFriendly = () => {
  return (
    <DetailsWrapper>
      <StrollerIcon size={32} />
      <Text variant='body'>Dojedziesz z wózkiem</Text>
    </DetailsWrapper>
  );
};

export default FamilyFriendly;
