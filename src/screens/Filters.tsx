import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
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
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { CrossIcon } from "src/components/icons/Cross";
import { StickyContainer } from "src/components/ui/StickyContainer";
import { isAndroid } from "src/helpers/isAndroid";
import { useFilters } from "src/hooks/useFilters";
import { filtersAtom } from "src/store/filters";
import { palette } from "src/styles/theme";
import { HomeScreenNavigationProp } from "src/types/type";

const FiltersScreen = () => {
  const [filters, setFilters] = useAtom(filtersAtom);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [localChanges, setLocalChanges] = useState(filters);

  const { resetFilters } = useFilters();

  const { height, width } = useWindowDimensions();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const divider = useMemo(() => {
    return (
      <View
        height={1}
        backgroundColor='backgroundSecondary'
        marginHorizontal='l'
        marginVertical='l'
      />
    );
  }, []);

  const saveLocalChangesToGlobalState = () => {
    setFilters(localChanges);
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
    navigation.navigate("HomeNavigator");
  };

  const renderItems = () => (
    <>
      <View
        width='100%'
        paddingHorizontal='s'
        backgroundColor='backgroundScreen'
        justifyContent={"center"}
        alignItems={"center"}
        paddingBottom='m'
        flexDirection='row'
        gap='m'
        paddingTop={isAndroid ? "m" : undefined}
        overflow='visible'
      >
        <View position='absolute' right={16} bottom={14}>
          <TouchableOpacity onPress={handleCancel}>
            <CrossIcon size={34} />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            variant='h2'
            color='secondary'
            additionalStyles={{ fontFamily: "Outfit400" }}
          >
            Filtry
          </Text>
        </View>
      </View>
      <AvailableOnly
        value={localChanges.onlyAvailable}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            onlyAvailable: newValue,
          }))
        }
      />
      {divider}
      <InterestingRoutes
        value={localChanges.routesInterestedSections}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            routesInterestedSections: newValue,
          }))
        }
      />
      {divider}
      <FormationsSelected
        value={localChanges.formationsSelected}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            formationsSelected: newValue,
          }))
        }
      />
      {divider}
      <SelectedHeight
        value={localChanges.heightSelected}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            heightSelected: newValue,
          }))
        }
      />
      {divider}
      <FamilyFriendly
        value={localChanges.familyFriendly}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            familyFriendly: newValue,
          }))
        }
      />
      {divider}
      <Exposition
        value={localChanges.selectedExposition}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            selectedExposition: newValue,
          }))
        }
      />
      {divider}
      <ShadingSelectedComponent
        value={localChanges.shadingSelected}
        onChange={(newValue) =>
          setLocalChanges((prevState) => ({
            ...prevState,
            shadingSelected: newValue,
          }))
        }
      />
      {divider}
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
