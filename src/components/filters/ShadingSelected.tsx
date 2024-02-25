import { TouchableOpacity } from "react-native-gesture-handler";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { renderShadingText } from "src/components/rock/details/Shading";
import { Shading } from "src/services/rocks";

type Props = {
  value: Shading[];
  onChange: (newValue: Shading[]) => void;
};

const ShadingSelectedComponent = ({ value, onChange }: Props) => {
  const handleSelect = (item: Shading, operation: "add" | "remove") => {
    let newShading = [...value];

    if (operation === "add") {
      newShading.push(item);
    }
    if (operation === "remove") {
      newShading = newShading.filter((shading) => shading !== item);
    }
    onChange(newShading);
  };

  return (
    <View marginHorizontal='l' gap='m'>
      <View flexDirection='row' justifyContent='space-between'>
        <Text variant='body'>Pokaż skały, które zawierają formacje:</Text>
      </View>
      <View flexDirection='row' flexWrap='wrap' rowGap='s' columnGap='m'>
        {value.map((shading) => {
          const isSelected = value.includes(shading);
          return (
            <TouchableOpacity
              onPress={() =>
                handleSelect(shading, isSelected ? "remove" : "add")
              }
              key={shading}
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
                <Text variant='body'>{renderShadingText(shading)}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ShadingSelectedComponent;
