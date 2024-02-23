import { useAtom } from "jotai";
import { useMemo } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

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

import { useUserSubscription } from "src/hooks/useUserSubscription";
import { onlyAvailableAtom } from "src/store/filters";
import { palette } from "src/styles/theme";

const FiltersScreen = () => {
  const [onlyAvailable, setOnlyAvailable] = useAtom(onlyAvailableAtom);
  const hasSubscription = useUserSubscription();

  const handleOnlyAvailableChange = () => setOnlyAvailable((prev) => !prev);

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
  return (
    <SafeAreaView style={{ backgroundColor: palette.white, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenTitle title='Filtry' centered hasCloseButton />
        <AvailableOnly />
        {divider}
        <InterestingRoutes />
        {divider}
        <FormationsSelected />
        {divider}
        <SelectedHeight />
        {divider}
        <FamilyFriendly />
        {divider}
        <Exposition />
        {divider}
        <ShadingSelectedComponent />
        <View
          marginHorizontal='l'
          flexDirection='row'
          justifyContent='space-between'
          marginTop='l'
        >
          <View flexBasis='45%'>
            <Button label='Wyczyść' variant='outline' />
          </View>
          <View flexBasis='45%'>
            <Button label='Zastosuj' />
          </View>
        </View>
        <View mb='3xl' />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FiltersScreen;
