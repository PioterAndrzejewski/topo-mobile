import { useEffect, useRef, useState, useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSetAtom } from "jotai";

import { HomeScreenNavigationProp } from "../../types/type";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useDebounce } from "../../hooks/useDebounce";
import { searchTextAtom } from "../../store/search";

const FilterBar = () => {
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
      <View style={styles.icon} />
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 10,
    paddingHorizontal: 12,
    backgroundColor: "#bf1a1a",
    shadowOffset: { width: 0, height: -20 },
    shadowRadius: 0,
    shadowColor: "#000",
    shadowOpacity: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 12,
  },
  icon: {
    borderWidth: 1,
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  inputContainer: {
    backgroundColor: "#cde",
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
