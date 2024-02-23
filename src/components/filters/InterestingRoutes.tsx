import { useAtom } from "jotai";
import { TouchableOpacity } from "react-native-gesture-handler";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import {
  GradeInterestedSection,
  routesInterestedAtom,
} from "src/store/filters";
import { SlabIcon } from "../icons/Slab";

const InterestingRoutes = () => {
  const [routesInterestedSections, setRoutesInterestedSections] =
    useAtom(routesInterestedAtom);

  const handleSelect = (item: GradeInterestedSection) => {
    const changedSections = routesInterestedSections.map(
      (routeInterestedSection) => {
        if (routeInterestedSection.label === item.label) {
          return {
            ...item,
            selected: !item.selected,
          };
        }
        return routeInterestedSection;
      },
    );

    setRoutesInterestedSections(changedSections);
  };

  return (
    <View marginHorizontal='l'>
      <View flexDirection='row' justifyContent='space-between'>
        <Text variant='body'>
          Pokaż skały, które zawierają drogi o trudności:
        </Text>
      </View>
      <View flexDirection='row' flexWrap='wrap' rowGap='s' columnGap='m'>
        {routesInterestedSections.map((gradeSection) => {
          return (
            <TouchableOpacity onPress={() => handleSelect(gradeSection)}>
              <View
                backgroundColor={
                  gradeSection.selected
                    ? "backgroundTertiary"
                    : "backgroundScreen"
                }
                borderColor={
                  gradeSection.selected
                    ? "backgroundTertiary"
                    : "backgroundDark"
                }
                borderWidth={1}
                paddingHorizontal='m'
                paddingVertical='s'
                borderRadius={8}
                flexDirection='row'
              >
                <Text variant='body'>{gradeSection.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default InterestingRoutes;
