import { TouchableOpacity } from "react-native-gesture-handler";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";
import { RouteType } from "src/services/rocks";

type Props = {
  value: RouteType[];
  onChange: (newValue: RouteType[]) => void;
};

const RouteTypeSelectedComponent = ({ value, onChange }: Props) => {
  const handleSelect = (item: RouteType, operation: "add" | "remove") => {
    const newRouteTypes = value.map((routeType) => {
      let newRouteTypes = [...value];

      if (operation === "add") {
        newRouteTypes.push(item);
      }
      if (operation === "remove") {
        newRouteTypes = newRouteTypes.filter((routeType) => routeType !== item);
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
          const isSelected = value.includes(routeType);
          return (
            <TouchableOpacity
              onPress={() =>
                handleSelect(routeType, isSelected ? "remove" : "add")
              }
              key={routeType}
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
                <Text variant='body'>{routeType}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default RouteTypeSelectedComponent;
