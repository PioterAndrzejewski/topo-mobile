import Checkbox from "expo-checkbox";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { palette } from "src/styles/theme";
type Props = {
  value: boolean;
  onChange: (newValue: boolean) => void;
};

const FamilyFriendly = ({ value, onChange }: Props) => {
  const handleChange = () => onChange(!value);
  return (
    <View gap='m'>
      <View
        marginHorizontal='l'
        flexDirection='row'
        justifyContent='space-between'
      >
        <Text variant='body'>Tylko przyjazne dla rodzin / piknikowe</Text>
        <Checkbox
          value={value}
          onValueChange={handleChange}
          color={palette.green}
        />
      </View>
    </View>
  );
};

export default FamilyFriendly;
