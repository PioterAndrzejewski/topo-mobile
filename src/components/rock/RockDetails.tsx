import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { showLocation } from "react-native-map-link";

import AppLoading from "src/components/common/AppLoading";
import InformationRow from "src/components/rock/details/InformationRow";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { Location } from "src/components/icons/Location";
import { ParkingIcon } from "src/components/icons/Parking";
import { useRock } from "src/hooks/useRock";

type RockDetailsProps = {
  id: string;
};

const RockDetails = (props: RockDetailsProps) => {
  const { data, isSuccess } = useRock(props.id);

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
    <View>
      <View style={styles.row}>
        <Text variant='h3'>{data?.attributes?.Name}</Text>
        <View style={styles.divider} />
        <TouchableOpacity onPress={handleMapOpen}>
          <Location size={36} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleParkingOpen}>
          <ParkingIcon size={36} />
        </TouchableOpacity>
      </View>
      {data?.attributes && <InformationRow rock={data} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
    gap: 10,
  },
  divider: {
    flexGrow: 1,
  },
});

export default RockDetails;
