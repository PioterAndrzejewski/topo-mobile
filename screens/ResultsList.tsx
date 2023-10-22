import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { useQuery } from "@tanstack/react-query";

import ScreenTitle from "../Components/common/ScreenTitle";
import BackArrow from "../Components/common/BackArrow";
import PrettyJson from "../Components/helpers/PrettyJson";
import ResultsItem from "../Components/common/ResultsItem";

import { Props } from "../types/type";
import { getAreas, itemsTypes } from "../services/rocks";
import { styleGuide } from "../styles/guide";

export default function ResultsList({ route, navigation }: Props) {
  const { data } = useQuery({
    queryFn: () => getAreas(route.params.currentItemType, route.params.id),
    queryKey: [itemsTypes[route.params.currentItemType], route.params.id],
    refetchInterval: 1000 * 60 * 10,
  });
  useEffect(() => {
    console.log("________Rerender");
    console.log("currentype: ", route.params.currentItemType);
    console.log("id: ", route.params.id);
    console.log("parent: ");
    console.log(data?.parentId);
  });
  return (
    <View style={styles.container}>
      <ScreenTitle
        title={
          route.params.currentItemType === 0
            ? "Dostępne obszary"
            : `${data?.currentName}`
        }
      />
      {navigation &&
        navigation.canGoBack() &&
        route.params.currentItemType > 0 && (
          <BackArrow
            currentType={route.params.currentItemType}
            previousId={data && data.parentId}
          />
        )}
      <SafeAreaView>
        <ScrollView>
          {data &&
            Array.isArray(data.list) &&
            data.list?.map((item) => (
              <ResultsItem
                currentType={route.params.currentItemType}
                linkToId={item.attributes.uuid}
                label={item.attributes.Name}
                key={item.attributes.Name}
              />
            ))}
        </ScrollView>
      </SafeAreaView>
      <ScrollView>
        <PrettyJson json={data && data.all} />
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
