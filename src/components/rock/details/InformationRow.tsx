import { StyleSheet, View } from "react-native";

import Height from "src/components/rock/details/Height";

import { RockData } from "src/services/rocks";

type InformationRowProps = {
  rock: RockData;
};

const InformationRow = ({ rock }: InformationRowProps) => {
  return (
    <View style={styles.row}>
      <Height height={rock.attributes.height} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
    gap: 10,
  },
});

export default InformationRow;
