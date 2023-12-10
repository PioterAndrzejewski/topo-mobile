import { useAtom } from "jotai";
import { StyleSheet, Switch, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { rocksOnlyAtom } from "src/store/settings";

type SettingsProps = {
  onClose: () => void;
};

const Settings = ({ onClose }: SettingsProps) => {
  const [rocksOnly, setRocksOnly] = useAtom(rocksOnlyAtom);
  return (
    <View style={styles.container}>
      <View style={styles.closeButtonWrapper}>
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          hitSlop={12}
        >
          <Text>x</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.settingRow}>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={rocksOnly ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor='#3e3e3e'
            onValueChange={() => setRocksOnly((prev) => !prev)}
            value={rocksOnly}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
          <Text>Wyświetlaj tylko skały na liście pod mapą</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButtonWrapper: {
    position: "absolute",
    right: -3,
    top: -3,
    height: 30,
    width: 30,
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: 40,
    height: 40,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Settings;
