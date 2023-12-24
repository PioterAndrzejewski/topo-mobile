import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useAtom } from "jotai";
import { useMemo } from "react";

import Button from "src/components/common/Button";
import RouteStructure from "src/components/common/RouteStructure";
import InformationRow from "src/components/rock/details/InformationRow";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";
import RockGallery from "./RockGallery";

import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useAreas } from "src/hooks/useAreas";
import { RockData } from "src/services/rocks";
import { selectedRockAtom } from "src/store/results";
import { Theme } from "src/styles/theme";
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
    <View height='100%'>
      <View>
        <View paddingHorizontal='m' borderBottomWidth={1} borderBottomColor='backgroundSecondary' paddingBottom='m'>
          <Text variant='h2' color='textBlack'>
            {rock?.attributes.Name}
          </Text>
          <View flexDirection='row' gap='s'>
            <Text variant='h4'>w sektorze:</Text>
            <Text variant='h4' color='textSecondary'>
              {rock?.attributes.parent.data.attributes.Name}
            </Text>
          </View>
        </View>
      </View>
      <BottomSheetScrollView showsVerticalScrollIndicator={false}>
        <View marginBottom='m'>{rock && <InformationRow rock={rock} />}</View>
        {routes && <RouteStructure routes={routes} />}
        {rock?.attributes && rock?.attributes.cover.length > 0 && (
          <RockGallery images={rock?.attributes.cover} />
        )}
      </BottomSheetScrollView>
      <View marginBottom='l' marginHorizontal='m'>
        <Button label='Otwórz skałoplan' onClick={handleOpenRock} />
      </View>
    </View>
  );
};

export default RockInfoExpanded;
