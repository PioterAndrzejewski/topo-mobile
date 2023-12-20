import { TouchableOpacity } from "react-native-gesture-handler";
import { showLocation } from "react-native-map-link";

import AppLoading from "src/components/common/AppLoading";
import InformationRow from "src/components/rock/details/InformationRow";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useTheme } from "@shopify/restyle";
import { Location } from "src/components/icons/Location";
import { ParkingIcon } from "src/components/icons/Parking";
import { useRock } from "src/hooks/useRock";
import { Theme } from "src/styles/theme";
import OverlayCardView from "../ui/OverlayCardView";

type RockDetailsProps = {
  id: string;
};

const RockDetails = (props: RockDetailsProps) => {
  const { data } = useRock(props.id);
  const { colors } = useTheme<Theme>();

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
    <View marginBottom='xl' marginTop='m'>
      <View
        flexDirection='row'
        alignItems='center'
        marginBottom='l'
        gap='m'
        justifyContent='space-between'
      >
        <View flexShrink={1}>
          <Text variant='h2' color={colors.secondary}>
            {data?.attributes?.Name}
          </Text>
        </View>
        <View flexDirection='row' gap='s'>
          <TouchableOpacity onPress={handleMapOpen}>
            <OverlayCardView padding='xs' backgroundColor='mainBackground'>
              <Location size={36} />
            </OverlayCardView>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleParkingOpen}>
            <OverlayCardView padding='xs' backgroundColor='mainBackground'>
              <ParkingIcon size={36} />
            </OverlayCardView>
          </TouchableOpacity>
        </View>
      </View>
      {data?.attributes && <InformationRow rock={data} />}
    </View>
  );
};

export default RockDetails;
