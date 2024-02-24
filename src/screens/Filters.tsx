import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import Button from "src/components/common/Button";
import ScreenTitle from "src/components/common/ScreenTitle";
import AvailableOnly from "src/components/filters/AvailableOnly";
import Exposition from "src/components/filters/Exposition";
import FamilyFriendly from "src/components/filters/FamilyFriendly";
import FormationsSelected from "src/components/filters/FormationsSelected";
import InterestingRoutes from "src/components/filters/InterestingRoutes";
import SelectedHeight from "src/components/filters/SelectedHeight";
import ShadingSelectedComponent from "src/components/filters/ShadingSelected";
import View from "src/components/ui/View";
import { useFilters } from "src/hooks/useFilters";

import {
  exhibitionSelectedAtom,
  formationsSelectedAtom,
  onlyAvailableAtom,
  onlyFamilyFriendlyAtom,
  routesInterestedAtom,
  selectedHeightAtom,
  shadingSelectedAtom,
} from "src/store/filters";
import { palette } from "src/styles/theme";

const FiltersScreen = () => {
  const [onlyAvailable, setOnlyAvailable] = useAtom(onlyAvailableAtom);
  const [routesInterestedSections, setRoutesInterestedSections] =
    useAtom(routesInterestedAtom);
  const [formationsSelected, setFormationsSelected] = useAtom(
    formationsSelectedAtom,
  );
  const [heightSelected, setHeightSelected] = useAtom(selectedHeightAtom);
  const [familyFriendly, setFamilyFriendly] = useAtom(onlyFamilyFriendlyAtom);
  const [selectedExposition, setSelectedExposition] = useAtom(
    exhibitionSelectedAtom,
  );
  const [shadingSelected, setShadingSelected] = useAtom(shadingSelectedAtom);
  const navigation = useNavigation();

  const [localChanges, setLocalChanges] = useState({
    onlyAvailable,
    routesInterestedSections,
    formationsSelected,
    heightSelected,
    familyFriendly,
    selectedExposition,
    shadingSelected,
  });

  const { resetFilters } = useFilters();

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
    setOnlyAvailable(localChanges.onlyAvailable);
    setRoutesInterestedSections(localChanges.routesInterestedSections);
    setFormationsSelected(localChanges.formationsSelected);
    setHeightSelected(localChanges.heightSelected);
    setFamilyFriendly(localChanges.familyFriendly);
    setSelectedExposition(localChanges.selectedExposition);
    setShadingSelected(localChanges.shadingSelected);
    navigation.goBack();
  };

  const handleReset = () => {
    resetFilters();
    navigation.goBack();
  };

  const handleCancel = () => {
    Toast.show({
      type: 'info',
      text1: "Nie zapisano zmian",
      text2: "Jeżeli chcesz zapisać zmiany, użyj przycisku pod filtrami",
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: palette.white, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenTitle
          title='Filtry'
          centered
          hasCloseButton
          onClose={handleCancel}
        />
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
        <View
          marginHorizontal='l'
          flexDirection='row'
          justifyContent='space-between'
          marginTop='l'
          gap='m'
        >
          <View flexGrow={1}>
            <Button
              label='Wyczyść i zamknij'
              variant='outline'
              onClick={handleReset}
            />
          </View>
          <View flexGrow={1}>
            <Button label='Zapisz' onClick={saveLocalChangesToGlobalState} />
          </View>
        </View>
        <View mb='3xl' />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FiltersScreen;
