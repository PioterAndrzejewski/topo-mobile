import { Slider } from "@miblanchard/react-native-slider";
import { useAtom } from "jotai";
import { useState } from "react";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useUserSubscription } from "src/hooks/useUserSubscription";
import { onlyAvailableAtom } from "src/store/filters";
import { palette } from 'src/styles/theme';

const SelectedHeight = () => {
  const [onlyAvailable, setOnlyAvailable] = useAtom(onlyAvailableAtom);
  const hasSubscription = useUserSubscription();
  const [values, setValues] = useState([0, 70]);

  const handleOnlyAvailableChange = () => setOnlyAvailable((prev) => !prev);
  return (
    <View marginHorizontal='l' justifyContent='space-between'>
      <Text variant='body'>Wybierz zakres wysokości skały</Text>
      <View mt="l">
        <Slider
          animateTransitions
          maximumTrackTintColor='#d3d3d3'
          maximumValue={70}
          minimumTrackTintColor={palette.green}
          minimumValue={0}
          step={2}
          thumbTintColor={palette.green}
          value={values}
          onValueChange={(values) => setValues(values)}
          renderAboveThumbComponent={(thumb) => (
            <View position='absolute' top={-10} left={-10}>
              <Text>{values[thumb]}m</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default SelectedHeight;
