import { TouchableOpacity } from "react-native-gesture-handler";
import { showLocation } from "react-native-map-link";

import AppLoading from "src/components/common/AppLoading";
import InformationRow from "src/components/rock/details/InformationRow";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useWindowDimensions } from "react-native";
import { Location } from "src/components/icons/Location";
import { ParkingIcon } from "src/components/icons/Parking";
import { useRock } from "src/hooks/useRock";
import OverlayCardView from "../ui/OverlayCardView";

type RockDetailsProps = {
  id: string;
};

const RockDetails = (props: RockDetailsProps) => {
  const { data } = useRock(props.id);
  const { width } = useWindowDimensions();

  const handleMapOpen = () => {
    if (!data?.attributes) return;
    showLocation({
      latitude: data.attributes.coordinates.latitude,
      longitude: data.attributes.coordinates.longitude,
    });
  };

  const handleParkingOpen = () => {
    if (!data?.attributes) return;
    showLocation({
      latitude: data.attributes.parking_coordinates.latitude,
      longitude: data.attributes.parking_coordinates.longitude,
    });
  };

  if (!data) return <AppLoading />;

  return (
    <View marginBottom='l'>
      <View
        flexDirection='row'
        alignItems='center'
        gap='m'
        justifyContent='space-between'
        paddingBottom='l'
        paddingHorizontal='m'
        borderBottomWidth={1}
        borderBottomColor='backgroundSecondary'
      >
        <View flexShrink={1}>
          <Text variant='h2'>{data?.attributes?.Name}</Text>
          <View flexDirection='row' flexWrap='wrap'>
            <Text>W sektorze: </Text>
            <Text variant='h4' color='secondary'>
              {data?.attributes?.parent.data.attributes.Name}
            </Text>
          </View>
        </View>
        <View flexDirection='row' gap='s'>
          <OverlayCardView backgroundColor='backgroundScreen'>
            <TouchableOpacity onPress={handleMapOpen}>
              <Location size={36} />
            </TouchableOpacity>
          </OverlayCardView>
          <OverlayCardView backgroundColor='backgroundScreen'>
            <TouchableOpacity onPress={handleParkingOpen}>
              <ParkingIcon size={36} />
            </TouchableOpacity>
          </OverlayCardView>
        </View>
      </View>
      {data?.attributes && <InformationRow rock={data} />}
    </View>
  );
};

export default RockDetails;
