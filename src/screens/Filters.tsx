import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import Button from "src/components/common/Button";
import AvailableOnly from "src/components/filters/AvailableOnly";
import Exposition from "src/components/filters/Exposition";
import FamilyFriendly from "src/components/filters/FamilyFriendly";
import FormationsSelected from "src/components/filters/FormationsSelected";
import InterestingRoutes from "src/components/filters/InterestingRoutes";
import RouteTypeSelected from "src/components/filters/RouteTypeSelected";
import SelectedHeight from "src/components/filters/SelectedHeight";
import ShadingSelectedComponent from "src/components/filters/ShadingSelected";
import AnimatedFlashList from "src/components/ui/AnimatedFlashList";
import View from "src/components/ui/View";
import Divider from 'src/components/filters/Divider';

import ScreenTitle from "src/components/common/ScreenTitle";
import { StickyContainer } from "src/components/ui/StickyContainer";
import { useFilters } from "src/hooks/useFilters";
import { filtersAtom, filtersCountAtom, heightValues } from "src/store/filters";
import { palette } from "src/styles/theme";
import { HomeScreenNavigationProp } from "src/types/type";

const FiltersScreen = () => {
  const [filters, setFilters] = useAtom(filtersAtom);
  const [filtersCount, setFiltersCount] = useAtom(filtersCountAtom);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [localChanges, setLocalChanges] = useState(filters);

  const { resetFilters } = useFilters();

  const { height, width } = useWindowDimensions();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });


  const saveLocalChangesToGlobalState = () => {
    setFilters(localChanges);
    let activeNumber = 0;
    if (localChanges.routesInterestedSections.length > 0) {
      activeNumber++;
    }
    if (localChanges.onlyAvailable) {
      activeNumber++;
    }
    if (localChanges.formationsSelected.length > 0) {
      activeNumber++;
    }
    if (
      filters.heightSelected[0] !== heightValues[0] ||
      filters.heightSelected[1] !== heightValues[1]
    ) {
      activeNumber++;
    }
    if (localChanges.familyFriendly) {
      activeNumber++;
    }
    if (localChanges.selectedExposition.length > 0) {
      activeNumber++;
    }
    if (localChanges.shadingSelected.length > 0) {
      activeNumber++;
    }
    if (localChanges.routeTypeSelected.length > 0) {
      activeNumber++;
    }
    setFiltersCount(activeNumber);
    navigation.goBack();
  };

  const handleReset = () => {
    resetFilters();
    navigation.goBack();
  };

  const handleCancel = () => {
    Toast.show({
      type: "info",
      text1: "Nie zapisano zmian",
      text2: "Jeżeli chcesz zapisać zmiany, użyj przycisku pod filtrami",
    });
    navigation.goBack();
  };

  const renderItems = () => (
    <>
      <ScreenTitle centered title='Filtry' />
      <AvailableOnly
        value={localChanges.onlyAvailable}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            onlyAvailable: newValue,
          }))
        }
      />
      <Divider />
      <InterestingRoutes
        value={localChanges.routesInterestedSections}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            routesInterestedSections: newValue,
          }))
        }
      />
      <Divider />
      <FormationsSelected
        value={localChanges.formationsSelected}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            formationsSelected: newValue,
          }))
        }
      />
      <Divider />
      <SelectedHeight
        value={localChanges.heightSelected}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            heightSelected: newValue,
          }))
        }
      />
      <Divider />
      <FamilyFriendly
        value={localChanges.familyFriendly}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            familyFriendly: newValue,
          }))
        }
      />
      <Divider />
      <Exposition
        value={localChanges.selectedExposition}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            selectedExposition: newValue,
          }))
        }
      />
      <Divider />
      <ShadingSelectedComponent
        value={localChanges.shadingSelected}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            shadingSelected: newValue,
          }))
        }
      />
      <Divider />
      <RouteTypeSelected
        value={localChanges.routeTypeSelected}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            routeTypeSelected: newValue,
          }))
        }
      />
      <StickyContainer scrollY={scrollY}>
        <View
          flexDirection='row'
          paddingHorizontal='l'
          justifyContent='space-between'
          flex={1}
          gap={"m"}
          mt='xl'
        >
          <View flex={2}>
            <Button
              label='Wyczyść i zamknij'
              variant='outline'
              onClick={handleReset}
            />
          </View>
          <View flex={1}>
            <Button label='Zapisz' onClick={saveLocalChangesToGlobalState} />
          </View>
        </View>
      </StickyContainer>
    </>
  );

  return (
    <SafeAreaView style={{ backgroundColor: palette.white, flex: 1 }}>
      <AnimatedFlashList
        data={[1]}
        onScroll={onScroll}
        renderItem={renderItems}
        estimatedListSize={{ height, width }}
        estimatedItemSize={height}
      />
    </SafeAreaView>
  );
};

export default FiltersScreen;
