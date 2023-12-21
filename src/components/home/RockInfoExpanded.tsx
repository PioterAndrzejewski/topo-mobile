import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { ScrollView } from "react-native-gesture-handler";

import Button from "src/components/common/Button";
import RouteStructure from "src/components/common/RouteStructure";
import InformationRow from "src/components/rock/details/InformationRow";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useAreas } from "src/hooks/useAreas";
import { RockData } from "src/services/rocks";
import { selectedRockAtom } from "src/store/results";
import { Theme } from "src/styles/theme";
import { HomeScreenNavigationProp } from "src/types/type";
import { getRoutesFromRock } from "src/utils/getRoutesFromRock";

const RockInfoExpanded = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedRock, setSelectedRock] = useAtom(selectedRockAtom);
  const { colors } = useTheme<Theme>();
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
    <View flex={1} gap='l'>
      <ScrollView>
        <View
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          flex={1}
        >
          <View marginHorizontal='m'>
            <Text variant='h2' color={colors.secondary}>
              {rock?.attributes.Name}
            </Text>
          </View>
        </View>
        <View marginVertical='m'>{rock && <InformationRow rock={rock} />}</View>
        <View marginHorizontal='m'>
          {routes && <RouteStructure routes={routes} />}
        </View>
      </ScrollView>
      <View marginBottom='xl' marginHorizontal='m'>
        <Button label='Otwórz skałoplan' onClick={handleOpenRock} />
      </View>
    </View>
  );
};

export default RockInfoExpanded;
