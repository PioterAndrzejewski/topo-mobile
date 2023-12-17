import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { useImageFile } from "src/hooks/useImageFile";

import InformationRow from "src/components/rock/details/InformationRow";
import OverlayCardView from "src/components/ui/OverlayCardView";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";
import RouteStructure from "../common/RouteStructure";

import { useAreas } from "src/hooks/useAreas";
import { RockData } from "src/services/rocks";
import { selectedRockAtom } from "src/store/results";
import { HomeScreenNavigationProp } from "src/types/type";
import { getRoutesFromRock } from "src/utils/getRoutesFromRock";

const RockInfoExpanded = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedRock, setSelectedRock] = useAtom(selectedRockAtom);
  const { rocks } = useAreas();

  const rock = useMemo(
    () =>
      rocks?.find((rock: RockData) => rock.attributes.uuid === selectedRock),
    [selectedRock],
  );
  const routes = useMemo(() => rock && getRoutesFromRock(rock), [rock]);

  const handleOpenRock = () => {
    navigation.navigate("Rock", {
      id: selectedRock,
    });
    setSelectedRock(null);
  };

  return (
      <View flex={1} height={"100%"} paddingHorizontal='m'>
        <View
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          marginBottom='l'
        >
          <Text
            variant='h2'
            additionalStyles={{
              color: "white",
              textShadowColor: "rgba(0, 0, 0, 0.85)",
              textShadowOffset: { width: 2, height: 1 },
              textShadowRadius: 6,
              paddingRight: 8,
            }}
          >
            {rock?.attributes.Name}
          </Text>
          <TouchableOpacity onPress={handleOpenRock}>
            <Text variant='h4'>Otwórz skałoplan</Text>
          </TouchableOpacity>
        </View>
        {rock && <InformationRow rock={rock} />}
        {routes && <RouteStructure routes={routes} />}
      </View>
  );
};

export default RockInfoExpanded;
