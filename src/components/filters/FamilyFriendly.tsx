import Checkbox from "expo-checkbox";
import { useAtom } from "jotai";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { onlyFamilyFriendlyAtom } from "src/store/filters";
import { palette } from "src/styles/theme";

const FamilyFriendly = () => {
  const [onlyFamilyFriendly, setonlyFamilyFriendly] = useAtom(
    onlyFamilyFriendlyAtom,
  );

  const handleOnlyAvailableChange = () =>
    setonlyFamilyFriendly((prev) => !prev);
  return (
    <View  gap='m'>
      <View
        marginHorizontal='l'
        flexDirection='row'
        justifyContent='space-between'
      >
        <Text variant='body'>Tylko przyjazne dla rodzin / piknikowe</Text>
        <Checkbox
          value={onlyFamilyFriendly}
          onValueChange={handleOnlyAvailableChange}
          color={palette.green}
        />
      </View>
    </View>
  );
};

export default FamilyFriendly;
