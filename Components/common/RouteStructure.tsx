import { View, Text, StyleSheet } from "react-native";

import { styleGuide } from "../../styles/guide";

type Routes = {
  toV: number;
  toVI2: number;
  toVI4: number;
  toVI8: number;
};

type RouteStructureProps = {
  routes: Routes;
};

const RouteStructure = ({ routes }: RouteStructureProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.text}>III - V+</Text>
        <View style={styles.divider} />
        <Text style={styles.text}>{routes?.toV}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>VI - VI.2+</Text>
        <View style={styles.divider} />
        <Text style={styles.text}>{routes.toVI2}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>VI.3 - VI.4+</Text>
        <View style={styles.divider} />
        <Text style={styles.text}>{routes.toVI4}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>VI.5 - VI.8</Text>
        <View style={styles.divider} />
        <Text style={styles.text}>{routes.toVI8}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderWidth: 0.5,
    borderRadius: 12,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
  },
  text: {
    ...styleGuide.text.caption,
    color: "#336383",
  },
});

export default RouteStructure;
