import { Slider } from "@miblanchard/react-native-slider";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { heightValues } from "src/store/filters";
import { palette } from "src/styles/theme";

type Props = {
  value: number[];
  onChange: (newValue: number[]) => void;
};

const SelectedHeight = ({ value, onChange }: Props) => {
  return (
    <View marginHorizontal='l' justifyContent='space-between' gap='m'>
      <Text variant='body'>Wybierz zakres wysokości skały</Text>
      <View mt='l'>
        <Slider
          animateTransitions
          maximumTrackTintColor='#d3d3d3'
          maximumValue={heightValues[1]}
          minimumTrackTintColor={palette.green}
          minimumValue={heightValues[0]}
          step={1}
          thumbTintColor={palette.green}
          value={value}
          onValueChange={(values) => onChange(values)}
          renderAboveThumbComponent={(thumb) => (
            <View position='absolute' top={-10} left={-10}>
              <Text>{value[thumb]}m</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default SelectedHeight;
