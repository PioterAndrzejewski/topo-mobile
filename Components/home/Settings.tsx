import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type SettingsProps = {
  onClose: () => void;
};

const Settings = ({ onClose }: SettingsProps) => {
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

      <Text>No jest modal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  inputContainer: {
    backgroundColor: "#cde",
    flexGrow: 1,
  },
  input: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    padding: 6,
    justifyContent: "center",
    borderRadius: 16,
  },
});

export default Settings;
