import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { useMemo } from "react";

import InformationRow from "src/components/rock/details/InformationRow";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";
import RouteStructure from "../common/RouteStructure";

import { useAreas } from "src/hooks/useAreas";
import { RockData } from "src/services/rocks";
import { selectedRockAtom } from "src/store/results";
import { HomeScreenNavigationProp } from "src/types/type";
import { getRoutesFromRock } from "src/utils/getRoutesFromRock";
import Button from "../common/Button";

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
    <View flex={1} height={"100%"} paddingHorizontal='m' gap='l'>
      <View
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Text
          variant='h2'
          additionalStyles={{
            color: "black",
          }}
        >
          {rock?.attributes.Name}
        </Text>
      </View>
      {rock && <InformationRow rock={rock} />}
      {routes && <RouteStructure routes={routes} />}
      <Button label='Otwórz skałoplan' onClick={handleOpenRock} />
    </View>
  );
};

export default RockInfoExpanded;
