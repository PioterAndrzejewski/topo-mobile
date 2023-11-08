import { View, Text, StyleSheet } from "react-native";
import { useRock } from "../../hooks/useRock";
import AppLoading from "../common/AppLoading";
import { TouchableOpacity } from "react-native-gesture-handler";
import { showLocation } from "react-native-map-link";

import Height from "./details/Height";

import { Pin } from "../icons/Pin";
import { Parking } from "../icons/Parking";
import { styleGuide } from "../../styles/guide";

type RockDetailsProps = {
  id: string;
};

const RockDetails = (props: RockDetailsProps) => {
  const { data } = useRock(props.id);

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

  const detailIcons = [
    {
      walkDistance: 5,
    },
  ];

  if (!data) return <AppLoading />;

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.heading}>{data.attributes.Name}</Text>
        <View style={styles.divider} />
        <TouchableOpacity onPress={handleMapOpen}>
          <Pin size={36} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleParkingOpen}>
          <Parking size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Height height={data.attributes.height} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    ...styleGuide.text.heading[3],
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
