import React, { useContext } from "react";
import { Text, StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { useUserProfile } from "../hooks/useUserProfile";
import { useQuery } from "@tanstack/react-query";

import { styleGuide } from "../styles/guide";
import { getAreas } from "../services/rocks";
import PrettyJson from "../Components/helpers/PrettyJson";
import ScreenTitle from "../Components/common/ScreenTitle";
import ListResult from "../Components/common/ListResult";
import { NavigationContext } from "@react-navigation/native";

export default function Areas() {

  const { data: areas } = useQuery({
    queryFn: getAreas,
    queryKey: ["areas"],
    refetchInterval: 1000 * 60 * 10,
  });

  return (
    <View style={styles.container}>
      <ScreenTitle title='Obszary' />
      <SafeAreaView>
        <ScrollView>
          {areas &&
            areas?.map((area) => (
              <ListResult
                linkTo='Regions'
                linkToId={area.attributes.Name}
                label={area.attributes.Name}
                key={area.attributes.Name}
              />
            ))}
        </ScrollView>
      </SafeAreaView>
      {/* <ScrollView>
        <PrettyJson json={areas} />
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: styleGuide.color.primary["200"],
  },
});
