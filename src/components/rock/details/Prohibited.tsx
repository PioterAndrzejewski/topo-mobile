import { ProhibitedIcon } from "src/components/icons/ProhibitedIcon";

import Text from "src/components/ui/Text";
import DetailsWrapper from "src/components/rock/details/DetailsWrapper";

const Prohibited = () => {
  return (
    <DetailsWrapper>
      <ProhibitedIcon size={32} />
      <Text variant='body'>Zakaz wspinania</Text>
    </DetailsWrapper>
  );
};

export default Prohibited;
