import React, { useRef, useMemo, useCallback } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView, Text } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

import RockDrawing from "../Components/rock/RockDrawing";

import { styleGuide } from "../styles/guide";

export default function Rock() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["10%", "50%", "90%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <View style={styles.container}>
      <RockDrawing url='pomidor' />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View>
          <Text>Jakieś rzeczy tu</Text>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: styleGuide.color.white,
    paddingTop: 40,
    flex: 1,
  },
});
