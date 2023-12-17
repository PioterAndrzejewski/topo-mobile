import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { StrollerIcon } from "src/components/icons/Stroller";

const FamilyFriendly = () => {
  return (
    <View justifyContent='center' alignItems='center' height={40} width={40}>
      <StrollerIcon size={32} />
      <Text variant='caption'>Piknik</Text>
    </View>
  );
};

export default FamilyFriendly;
