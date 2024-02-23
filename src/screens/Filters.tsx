import { useAtom } from "jotai";
import { useMemo } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import ScreenTitle from "src/components/common/ScreenTitle";
import AvailableOnly from "src/components/filters/AvailableOnly";
import Exposition from "src/components/filters/Exposition";
import FormationsSelected from "src/components/filters/FormationsSelected";
import InterestingRoutes from "src/components/filters/InterestingRoutes";
import SelectedHeight from "src/components/filters/SelectedHeight";
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
        marginVertical='xl'
      />
    );
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: palette.white, flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingBottom: 120 }}
      >
        <ScreenTitle title='Filtry' centered hasCloseButton />
        <AvailableOnly />
        {divider}
        <InterestingRoutes />
        {divider}
        <FormationsSelected />
        {divider}
        <SelectedHeight />
        {divider}
        <Exposition />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FiltersScreen;
