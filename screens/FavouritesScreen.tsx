import { useState, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";

import { FavoriteType } from "../services/storeAsync";
import Switcher from "../components/common/Switcher";
export default function SearchScreen() {
  const [section, setSection] = useState<FavoriteType>("done");

  const options: { value: FavoriteType; label: string }[] = [
    {
      value: "done",
      label: "zrobione",
    },
    {
      value: "project",
      label: "projekt",
    },
    {
      value: "other",
      label: "inne",
    },
  ];
  return (
    <ScrollView>
      <Switcher onPress={setSection} active={section} options={options} />
    </ScrollView>
  );
}
