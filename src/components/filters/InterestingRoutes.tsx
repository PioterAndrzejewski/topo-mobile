import { TouchableOpacity } from "react-native-gesture-handler";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { GradeInterestedSection } from "src/store/filters";

type Props = {
  value: GradeInterestedSection[];
  onChange: (newValue: GradeInterestedSection[]) => void;
};

const InterestingRoutes = ({ value, onChange }: Props) => {
  const handleSelect = (item: GradeInterestedSection) => {
    const changedSections = value.map((routeInterestedSection) => {
      if (routeInterestedSection.label === item.label) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return routeInterestedSection;
    });

    onChange(changedSections);
  };

  return (
    <View marginHorizontal='l' gap='m'>
      <View flexDirection='row' justifyContent='space-between'>
        <Text variant='body'>
          Pokaż skały, które zawierają drogi o trudności:
        </Text>
      </View>
      <View flexDirection='row' flexWrap='wrap' rowGap='s' columnGap='m'>
        {value.map((gradeSection) => {
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
