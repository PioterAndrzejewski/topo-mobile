import Text from "src/components/ui/Text";

import { LooseRocksIcon } from "src/components/icons/LooseRocks";
import DetailsWrapper from "./DetailsWrapper";

const LooseRocks = () => {
  return (
    <DetailsWrapper>
      <LooseRocksIcon size={32} />
      <Text variant='body'>Krucha skała</Text>
    </DetailsWrapper>
  );
};

export default LooseRocks;
