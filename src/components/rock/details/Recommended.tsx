import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { RecommendedIcon } from "src/components/icons/Recommended";

const Recommended = () => {
  return (
    <View justifyContent='center' alignItems='center' height={40} width={40}>
      <RecommendedIcon size={32} />
      <Text variant='caption'>OK</Text>
    </View>
  );
};

export default Recommended;
