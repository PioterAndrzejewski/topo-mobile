import { useAtom } from "jotai";
import { TouchableOpacity } from "react-native-gesture-handler";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import {
  renderFormationIcon,
  renderFormationText,
} from "src/components/rock/details/Formation";
import { FormationSelected } from 'src/store/filters';

type Props = {
  value:FormationSelected[];
  onChange: (newValue: FormationSelected[]) => void;
};

const FormationsSelected = ({value, onChange}: Props) => {

  const handleSelect = (item: FormationSelected) => {
    const changedSelected = value.map((formation) => {
      if (formation.type === item.type) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return formation;
    });
    onChange(changedSelected);
  };

  return (
    <View marginHorizontal='l'  gap='m'>
      <View flexDirection='row' justifyContent='space-between'>
        <Text variant='body'>Pokaż skały, które zawierają formacje:</Text>
      </View>
      <View flexDirection='row' flexWrap='wrap' rowGap='s' columnGap='m'>
        {value.map((formation) => {
          return (
            <TouchableOpacity onPress={() => handleSelect(formation)} key={formation.type}>
              <View
                backgroundColor={
                  formation.selected ? "backgroundTertiary" : "backgroundScreen"
                }
                borderColor={
                  formation.selected ? "backgroundTertiary" : "backgroundDark"
                }
                borderWidth={1}
                paddingHorizontal='m'
                paddingVertical='s'
                borderRadius={8}
                flexDirection='row'
                gap='m'
              >
                {renderFormationIcon(formation.type, 20)}
                <Text variant='body'>
                  {renderFormationText(formation.type)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default FormationsSelected;
