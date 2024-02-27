import { TouchableOpacity } from "react-native-gesture-handler";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import {
  renderFormationIcon,
  renderFormationText,
} from "src/components/rock/details/Formation";
import { formationsSelectedClean } from "src/context/FilteredRocksContext";
import { Formations } from "src/services/rocks";

type Props = {
  value: Formations[];
  onChange: (newValue: Formations[]) => void;
};

const FormationsSelected = ({ value, onChange }: Props) => {
  const handleSelect = (item: Formations, operation: "add" | "remove") => {
    let changesSelected = [...value];

    if (operation === "add") {
      changesSelected.push(item);
    }
    if (operation === "remove") {
      changesSelected = changesSelected.filter(
        (formation) => formation !== item,
      );
    }
    onChange(changesSelected);
  };

  return (
    <View marginHorizontal='l' gap='m'>
      <View flexDirection='row' justifyContent='space-between'>
        <Text variant='body'>Pokaż skały, które zawierają formacje:</Text>
      </View>
      <View flexDirection='row' flexWrap='wrap' rowGap='s' columnGap='m'>
        {formationsSelectedClean.map((formation) => {
          const isSelected = value.includes(formation);
          return (
            <TouchableOpacity
              onPress={() =>
                handleSelect(formation, isSelected ? "remove" : "add")
              }
              key={formation}
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
                {renderFormationIcon(formation, 20)}
                <Text variant='body'>{renderFormationText(formation)}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default FormationsSelected;
