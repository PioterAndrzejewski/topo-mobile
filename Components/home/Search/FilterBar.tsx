import { useEffect, useRef, useState, useMemo } from "react";
import {
  TouchableWithoutFeedback,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { View, TextInput, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import Button from "./Button";

const FilterBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [resultsMode, setResultsMode] = useState<"rocks" | "areas">("rocks");

  useEffect(() => {
    if (isExpanded) {
      bottomSheetModalRef.current?.present();
    }
  }, [isExpanded]);

  const snapPoints = useMemo(() => ["90%"], []);

  const topBar = () => (
    <View>
      <View style={styles.container}>
        <View style={styles.icon} />
        <View style={styles.inputContainer}>
          <TouchableWithoutFeedback
            onPress={() => bottomSheetModalRef.current?.expand()}
          >
            <TextInput
              style={styles.input}
              editable
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setIsExpanded(false)}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.icon} />
      </View>
    </View>
  );
  return (
    <>
      {topBar()}
      <BottomSheetModal
        snapPoints={snapPoints}
        ref={bottomSheetModalRef}
        enablePanDownToClose
        onDismiss={() => setIsExpanded(false)}
      >
        <Button mode={resultsMode} handlePress={setResultsMode} />
        <Animated.FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={({ item }) => <View style={styles.listElement} />}
        />
      </BottomSheetModal>
    </>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: "#fff",
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
    height: 40,
    width: "60%",
    borderColor: "#000",
    borderWidth: 1,
    padding: 6,
    justifyContent: "center",
    borderRadius: 16,
  },
  listElement: {
    height: 60,
    borderWidth: 1,
  },
});
