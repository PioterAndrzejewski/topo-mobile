import { useNavigation } from "@react-navigation/native";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";

import Settings from "src/components/home/Settings";
import OverlayCardView from "src/components/ui/OverlayCardView";
import View from "src/components/ui/View";

import { useTheme } from "@shopify/restyle";
import { SearchIcon } from "src/components/icons/Search";
import { SettingsIcon } from "src/components/icons/Settings";
import { useDebounce } from "src/hooks/useDebounce";
import { searchTextAtom } from "src/store/search";
import { Theme } from "src/styles/theme";
import { HomeScreenNavigationProp } from "src/types/type";

const FilterBar = () => {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [inputValue, setInputValue] = useState<string>("");
  const setGlobalTextSearchState = useSetAtom(searchTextAtom);
  useDebounce(
    () =>
      setGlobalTextSearchState(
        inputValue.trim().replace("  ", " ").toLowerCase(),
      ),
    500,
    [inputValue],
  );
  const { colors } = useTheme<Theme>();

  const onModalClose = useCallback(() => {
    setSettingsVisible(false);
  }, []);

  const handleChange = () => {
    navigation.navigate("Search");
  };

  return (
    <View
      backgroundColor='backgroundScreen'
      paddingTop='3xl'
      paddingBottom='m'
      paddingHorizontal='m'
      flexDirection='row'
      gap='m'
      borderBottomColor='backgroundSecondary'
      borderBottomWidth={1}
    >
      <View
        flex={1}
        height={40}
        borderWidth={1}
        borderRadius={12}
        borderColor='backgroundSecondary'
        flexDirection='row'
      >
        <View paddingHorizontal='xs' justifyContent='center'>
          <SearchIcon size={26} color={colors.backgroundDark} />
        </View>
        <TextInput
          style={{ width: "100%" }}
          onChange={handleChange}
          onChangeText={(value) => setInputValue(value)}
        />
      </View>
      <TouchableOpacity onPress={() => setSettingsVisible((prev) => !prev)}>
        <OverlayCardView borderRadius={24}>
          <SettingsIcon size={20} color={colors.backgroundDark} />
        </OverlayCardView>
      </TouchableOpacity>

      <Modal
        isVisible={settingsVisible}
        backdropColor={"rgba(0, 0, 0, 0.8)"}
        onBackdropPress={() => setSettingsVisible(false)}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        animationIn='slideInDown'
        animationOutTiming={0}
      >
        <Settings onClose={onModalClose} />
      </Modal>
    </View>
  );
};

export default FilterBar;
