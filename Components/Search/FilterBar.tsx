import { useEffect, useRef, useState, useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { View, TextInput, StyleSheet, Text } from "react-native";

const FilterBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isExpanded) {
      bottomSheetModalRef.current?.present();
    }
  }, [isExpanded]);

  const snapPoints = useMemo(() => ["90%"], []);

  return (
    <View>
      <View style={styles.container}>
        <Text>Filter bar</Text>
      </View>
    </View>
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
