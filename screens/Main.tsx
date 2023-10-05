import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUserProfile } from "../hooks/useUserProfile";
import { useQuery } from "@tanstack/react-query";

import { styleGuide } from "../styles/guide";
import { getAreas } from "../services/rocks";

export default function Main() {
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
    <View style={styles.container}>
      <Text>no elo</Text>
      <Text>user: {data?.username}</Text>
      <Text>user: {data?.email}</Text>
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
