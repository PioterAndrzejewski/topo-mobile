import React, { useRef, useMemo, useCallback, useEffect } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView, Text } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeScreenNavigationProp } from "../types/type";

import RockDrawing from "../Components/rock/RockDrawing";

import { useRock } from "../hooks/useRock";
import { styleGuide } from "../styles/guide";
import AppLoading from "../Components/common/AppLoading";

type Props = NativeStackScreenProps<HomeScreenNavigationProp, "Rock">;

const Rock = ({ navigation, route }: Props) => {
  const { data } = useRock(route.params.id);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const snapPoints = useMemo(() => ["10%", "50%", "90%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <View style={styles.container}>
      {data && (
        <RockDrawing
          imageUrl={data?.attributes?.image?.data.attributes.url}
          routes={data?.attributes?.routes.data}
        />
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <ScrollView>
          {data ? (
            data?.attributes?.routes.data.map((route) => (
              <Text>{route.attributes.display_name}</Text>
            ))
          ) : (
            <AppLoading />
          )}
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

export default Rock;

const styles = StyleSheet.create({
  container: {
    backgroundColor: styleGuide.color.white,
    paddingTop: 40,
    flex: 1,
  },
});
