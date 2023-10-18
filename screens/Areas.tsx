import React, { useEffect } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { useUserProfile } from "../hooks/useUserProfile";
import { useQuery } from "@tanstack/react-query";

import { styleGuide } from "../styles/guide";
import { getAreas } from "../services/rocks";
import PrettyJson from "../Components/helpers/PrettyJson";
import ScreenTitle from "../Components/common/ScreenTitle";

export default function Areas() {
  const { data } = useUserProfile();
  const { data: areas } = useQuery({
    queryFn: getAreas,
    queryKey: ["areas"],
    refetchInterval: 1000 * 60 * 10,
  });

  // useEffect(() => {
  //   console.log(areas);
  // }, [areas]);

  return (
    <ScrollView style={styles.container}>
      <ScreenTitle title='Obszary' />
      <Text>no elo</Text>
      <Text>user: {data?.username}</Text>
      <Text>user: {data?.email}</Text>
      <PrettyJson json={areas} />
    </ScrollView>
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
