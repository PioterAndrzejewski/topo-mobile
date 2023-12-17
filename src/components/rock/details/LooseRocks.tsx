import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { LooseRocksIcon } from "src/components/icons/LooseRocks";

const LooseRocks = () => {
  return (
    <View justifyContent='center' alignItems='center' height={40} width={40}>
      <LooseRocksIcon size={32} />
      <Text variant='caption'>Krucho</Text>
    </View>
  );
};

export default LooseRocks;
