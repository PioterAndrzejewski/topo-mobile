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
  const image = useImageFile(rock?.attributes.cover.Photo.data.attributes.url);

  const routes = useMemo(() => rock && getRoutesFromRock(rock), [rock]);

  const handleOpenRock = () => {
    navigation.navigate("Rock", {
      id: selectedRock,
    });
    setSelectedRock(null);
  };

  return (
    <View flex={1} height={"100%"}>
      <View
        paddingHorizontal='m'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Text variant='h2'>{rock?.attributes.Name}</Text>
        <TouchableOpacity onPress={handleOpenRock}>
          <Text>Otwórz skałoplan</Text>
        </TouchableOpacity>
      </View>
      {rock && <InformationRow rock={rock} />}
      {routes && <RouteStructure routes={routes} />}
      <ImageBackground
        source={{
          uri: image || "",
        }}
        resizeMode='cover'
        style={{
          height: 200,
        }}
      >
        <OverlayCardView
          alignSelf='flex-end'
          position='absolute'
          bottom={20}
          right={20}
        >
          <Text variant='caption'>{`zdj: ${rock?.attributes.cover.Author}`}</Text>
        </OverlayCardView>
      </ImageBackground>
    </View>
  );
};

export default RockInfoExpanded;
