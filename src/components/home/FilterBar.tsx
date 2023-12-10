import { useNavigation } from "@react-navigation/native";
import { useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";

import Settings from "src/components/home/Settings";

import { useDebounce } from "src/hooks/useDebounce";
import { searchTextAtom } from "src/store/search";
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

  const onModalClose = useCallback(() => {
    setSettingsVisible(false);
  }, []);

  const handleChange = () => {
    navigation.navigate("Search");
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon} />
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <TextInput
            style={styles.input}
            onChange={handleChange}
            onChangeText={(value) => setInputValue(value)}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setSettingsVisible((prev) => !prev)}>
        <View style={styles.icon} />
      </TouchableOpacity>

      <Modal
        isVisible={settingsVisible}
        backdropColor={"rgba(0, 0, 0, 0.8)"}
        onBackdropPress={() => setSettingsVisible(false)}
      >
        <Settings onClose={onModalClose} />
      </Modal>
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingBottom: 10,
    paddingHorizontal: 12,
    shadowOffset: { width: 0, height: -1 },
    shadowRadius: 2,
    shadowColor: "#000",
    shadowOpacity: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 12,
    borderBottomWidth: 1,
  },
  icon: {
    borderWidth: 1,
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  inputContainer: {
    flexGrow: 1,
  },
  input: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    padding: 6,
    justifyContent: "center",
    borderRadius: 16,
  },
});
