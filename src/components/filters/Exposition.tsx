import { TouchableOpacity } from "react-native-gesture-handler";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { Exhibition } from "src/services/rocks";
import { getMeaningfulExposition } from "../rock/details/Exposition";

type Props = {
  value: Exhibition[];
  onChange: (newValue: Exhibition[]) => void;
};

const Exposition = ({ value, onChange }: Props) => {
  const handleSelect = (item: Exhibition, operation: "add" | "remove") => {
    let changedSelected = [...value];

    if (operation === "add") {
      changedSelected.push(item);
    }
    if (operation === "remove") {
      changedSelected = changedSelected.filter(
        (exposition) => exposition !== item,
      );
    }
    onChange(changedSelected);
  };

  return (
    <View marginHorizontal='l' gap='m'>
      <View flexDirection='row' justifyContent='space-between'>
        <Text variant='body'>Pokaż skały, które mają wystawkę:</Text>
      </View>
      <View flexDirection='row' flexWrap='wrap' rowGap='s' columnGap='m'>
        {value.map((exposition) => {
          const isSelected = value.includes(exposition);
          return (
            <TouchableOpacity
              onPress={() =>
                handleSelect(exposition, isSelected ? "remove" : "add")
              }
              key={exposition}
            >
              <View
                backgroundColor={
                  isSelected ? "backgroundTertiary" : "backgroundScreen"
                }
                borderColor={
                  isSelected ? "backgroundTertiary" : "backgroundDark"
                }
                borderWidth={1}
                paddingHorizontal='m'
                paddingVertical='s'
                borderRadius={8}
                flexDirection='row'
                gap='m'
              >
                <Text variant='body'>
                  {getMeaningfulExposition(exposition)}
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
