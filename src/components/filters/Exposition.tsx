import { useAtom } from "jotai";
import { TouchableOpacity } from "react-native-gesture-handler";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { ExpositionSelected, exhibitionSelectedAtom } from "src/store/filters";
import { getMeaningfulExposition } from "../rock/details/Exposition";

type Props = {
  value: ExpositionSelected[];
  onChange: (newValue: ExpositionSelected[]) => void;
};

const Exposition = ({value, onChange}: Props) => {

  const handleSelect = (item: ExpositionSelected) => {
    const changedSelected = value.map((exposition) => {
      if (exposition.type === item.type) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return exposition;
    });
    onChange(changedSelected);
  };

  return (
    <View marginHorizontal='l'  gap='m'>
      <View flexDirection='row' justifyContent='space-between'>
        <Text variant='body'>Pokaż skały, które mają wystawkę:</Text>
      </View>
      <View flexDirection='row' flexWrap='wrap' rowGap='s' columnGap='m'>
        {value.map((exposition) => {
          return (
            <TouchableOpacity
              onPress={() => handleSelect(exposition)}
              key={exposition.type}
            >
              <View
                backgroundColor={
                  exposition.selected
                    ? "backgroundTertiary"
                    : "backgroundScreen"
                }
                borderColor={
                  exposition.selected ? "backgroundTertiary" : "backgroundDark"
                }
                borderWidth={1}
                paddingHorizontal='m'
                paddingVertical='s'
                borderRadius={8}
                flexDirection='row'
                gap='m'
              >
                <Text variant='body'>
                  {getMeaningfulExposition(exposition.type)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Exposition;
