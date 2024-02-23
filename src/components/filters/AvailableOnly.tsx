import Checkbox from "expo-checkbox";
import { useAtom } from "jotai";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useUserSubscription } from "src/hooks/useUserSubscription";
import { onlyAvailableAtom } from "src/store/filters";
import { palette } from "src/styles/theme";

const AvailableOnly = () => {
  const [onlyAvailable, setOnlyAvailable] = useAtom(onlyAvailableAtom);
  const hasSubscription = useUserSubscription();

  const handleOnlyAvailableChange = () => setOnlyAvailable((prev) => !prev);
  return (
    <View>
      <View
        marginHorizontal='l'
        mt='xl'
        flexDirection='row'
        justifyContent='space-between'
        gap='m'
      >
        <Text variant='body'>Pokaz tylko te skały, do których mam dostęp</Text>
        <Checkbox
          value={hasSubscription ? true : onlyAvailable}
          disabled={hasSubscription}
          onValueChange={handleOnlyAvailableChange}
          color={palette.green}
        />
      </View>
      {hasSubscription && (
        <View marginHorizontal='l' mt='m'>
          <Text variant='special'>
            {"Masz aktywną subskrypcję, więć masz dostęp do wszystkich skał :)"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AvailableOnly;
