import { ProhibitedIcon } from "src/components/icons/ProhibitedIcon";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

const Prohibited = () => {
  return (
    <View justifyContent='center' alignItems='center' height={40} width={40}>
      <ProhibitedIcon size={32} />
      <Text variant='caption'>Zakaz</Text>
    </View>
  );
};

export default Prohibited;
