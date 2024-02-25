import { TouchableOpacity } from "react-native-gesture-handler";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { gradesSectionsClean } from "src/store/filters";

type Props = {
  value: string[];
  onChange: (newValue: string[]) => void;
};

const InterestingRoutes = ({ value, onChange }: Props) => {
  const handleSelect = (item: string, operation: "add" | "remove") => {
    let changedSections: string[] = [...value];
    if (operation === "add") {
      changedSections.push(item);
    }
    if (operation === "remove") {
      changedSections = changedSections.filter((section) => section !== item);
    }

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
        {gradesSectionsClean.map((gradeSection) => {
          const isSelected = value.includes(gradeSection.label);
          return (
            <TouchableOpacity
              onPress={() =>
                handleSelect(gradeSection.label, isSelected ? "remove" : "add")
              }
              key={gradeSection.label}
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
