import Text from "src/components/ui/Text";
import View from "src/components/ui/View";
import DetailsWrapper from "./DetailsWrapper";

import { ParkingIcon } from "src/components/icons/Parking";

type ParkingProps = {
  distance: number;
};

const Parking = (props: ParkingProps) => {
  return (
    <DetailsWrapper>
      <ParkingIcon size={32} />
      <View flexDirection='row' gap='s'>
        <Text variant='body'>Z parkingu:</Text>
        <Text variant='body'>{`${props.distance.toString()} min`}</Text>
      </View>
    </DetailsWrapper>
  );
};

export default Parking;
