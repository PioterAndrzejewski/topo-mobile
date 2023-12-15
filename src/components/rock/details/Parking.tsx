import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { ParkingIcon } from "src/components/icons/Parking";

type ParkingProps = {
  distance: number;
};

const Parking = (props: ParkingProps) => {
  return (
    <View justifyContent='center' alignItems='center' height={40} width={40}>
      <ParkingIcon size={32} />
      <Text variant='caption'>{`${props.distance.toString()} min`}</Text>
    </View>
  );
};

export default Parking;
