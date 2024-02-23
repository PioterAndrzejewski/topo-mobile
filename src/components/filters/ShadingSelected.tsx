import { useAtom } from "jotai";
import { TouchableOpacity } from "react-native-gesture-handler";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { renderShadingText } from "src/components/rock/details/Shading";
import { ShadingSelected, shadingSelectedAtom } from "src/store/filters";

const ShadingSelectedComponent = () => {
  const [shadingsSelected, setShadingSelected] = useAtom(shadingSelectedAtom);

  const handleSelect = (item: ShadingSelected) => {
    const newShading = shadingsSelected.map((shading) => {
      if (shading.type === item.type) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return shading;
    });
    setShadingSelected(newShading);
  };

  return (
    <View marginHorizontal='l' gap='m'>
      <View flexDirection='row' justifyContent='space-between'>
        <Text variant='body'>Pokaż skały, które zawierają formacje:</Text>
      </View>
      <View flexDirection='row' flexWrap='wrap' rowGap='s' columnGap='m'>
        {shadingsSelected.map((shading) => {
          return (
            <TouchableOpacity onPress={() => handleSelect(shading)}>
              <View
                backgroundColor={
                  shading.selected ? "backgroundTertiary" : "backgroundScreen"
                }
                borderColor={
                  shading.selected ? "backgroundTertiary" : "backgroundDark"
                }
                borderWidth={1}
                paddingHorizontal='m'
                paddingVertical='s'
                borderRadius={8}
                flexDirection='row'
                gap='m'
              >
                <Text variant='body'>{renderShadingText(shading.type)}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ShadingSelectedComponent;
