import Text from "src/components/ui/Text";
import DetailsWrapper from "src/components/rock/details/DetailsWrapper";

import { RecommendedIcon } from "src/components/icons/Recommended";

const Recommended = () => {
  return (
    <DetailsWrapper>
      <RecommendedIcon size={32} />
      <Text variant='body'>Polecana</Text>
    </DetailsWrapper>
  );
};

export default Recommended;
