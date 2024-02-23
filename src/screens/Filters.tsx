import { useAtom } from "jotai";
import { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import ScreenTitle from "src/components/common/ScreenTitle";
import AvailableOnly from "src/components/filters/AvailableOnly";
import FormationsSelected from "src/components/filters/FormationsSelected";
import InterestingRoutes from "src/components/filters/InterestingRoutes";
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
      <ScreenTitle title='Filtry' centered hasCloseButton />
      <AvailableOnly />
      {divider}
      <InterestingRoutes />
      {divider}
      <FormationsSelected />
      {divider}
    </SafeAreaView>
  );
};

export default FiltersScreen;
