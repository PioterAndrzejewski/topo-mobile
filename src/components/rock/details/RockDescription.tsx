import Text from "src/components/ui/Text";
import DetailsWrapper from "src/components/rock/details/DetailsWrapper";

import { InfoIcon } from 'src/components/icons/Info';

type DescriptionProps = {
  description: string;
};

const RockDescription = ({ description }: DescriptionProps) => {
  return (
    <DetailsWrapper>
      <InfoIcon size={32} />
      <Text variant='body'>{description}</Text>
    </DetailsWrapper>
  );
};

export default RockDescription;
