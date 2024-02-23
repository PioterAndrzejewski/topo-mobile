import { useNavigation } from "@react-navigation/native";

import Text from "src/components//ui/Text";
import View from "src/components/ui/View";

import { TouchableOpacity } from "react-native-gesture-handler";
import { FiltersIcon } from "src/components/icons/Filters";
import { HomeScreenNavigationProp } from "src/types/type";

const FiltersButton = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleNavigation = () => navigation.navigate("Filters");
  return (
    <View position='absolute' right={20} bottom={15}>
      <TouchableOpacity onPress={handleNavigation}>
        <FiltersIcon size={28} />
        <View
          position='absolute'
          height={20}
          width={20}
          justifyContent='center'
          alignItems='center'
          borderRadius={50}
          backgroundColor='backgroundError'
          top={-5}
          right={-5}
        >
          <Text variant='filter' color='textWhite'>
            3
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FiltersButton;
