import React from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { styleGuide } from "../styles/guide";
import { getAreas } from "../services/rocks";
import PrettyJson from "../Components/helpers/PrettyJson";
import ScreenTitle from "../Components/common/ScreenTitle";
import ListResult from "../Components/common/ResultsItem";

export default function Areas() {
  const { data } = useQuery({
    queryFn: () => getAreas(0),
    queryKey: ["areas"],
    refetchInterval: 1000 * 60 * 10,
  });

  return (
    <View style={styles.container}>
      <ScreenTitle title='Obszary' />
      <SafeAreaView>
        <ScrollView>
          {data &&
            Array.isArray(data.list) &&
            data.list?.map((area) => (
              <ListResult
                linkToId={area.attributes.uuid}
                label={area.attributes.Name}
                key={area.attributes.Name}
                currentType={0}
              />
            ))}
        </ScrollView>
      </SafeAreaView>
      <ScrollView>
        <PrettyJson json={data && data.list} />
      </ScrollView>
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
