import { TouchableOpacity } from "react-native-gesture-handler";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { RouteTypeSelected } from "src/store/filters";

type Props = {
  value: RouteTypeSelected[];
  onChange: (newValue: RouteTypeSelected[]) => void;
};

const RouteTypeSelectedComponent = ({ value, onChange }: Props) => {
  const handleSelect = (item: RouteTypeSelected) => {
    const newRouteTypes = value.map((routeType) => {
      if (routeType.type === item.type) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return routeType;
    });
    onChange(newRouteTypes);
  };

  return (
    <View marginHorizontal='l' gap='m'>
      <View flexDirection='row' justifyContent='space-between'>
        <Text variant='body'>Pokaż skały, które zawierają formacje:</Text>
      </View>
      <View flexDirection='row' flexWrap='wrap' rowGap='s' columnGap='m'>
        {value.map((routeType) => {
          return (
            <TouchableOpacity
              onPress={() => handleSelect(routeType)}
              key={routeType.type}
            >
              <View
                backgroundColor={
                  routeType.selected ? "backgroundTertiary" : "backgroundScreen"
                }
                borderColor={
                  routeType.selected ? "backgroundTertiary" : "backgroundDark"
                }
                borderWidth={1}
                paddingHorizontal='m'
                paddingVertical='s'
                borderRadius={8}
                flexDirection='row'
                gap='m'
              >
                <Text variant='body'>{routeType.type}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default RouteTypeSelectedComponent;
