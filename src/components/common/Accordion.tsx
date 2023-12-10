import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  Title?: ReactNode;
  Content?: ReactNode;
};

const Accordion = (props: Props) => {
  const { Title, Content } = props;
  return (
    <View style={styles.container}>
      <View style={styles.header}>{Title}</View>
      {Content && <View style={styles.content}>{Content}</View>}
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  header: {
    flex: 1,
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#fff",
  },
  content: {
    position: "relative",
    top: -10,
    paddingTop: 20,
    padding: 10,
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6,
    borderWidth: 1,
    borderTopWidth: 0,
    backgroundColor: "#eee",
  },
  icon: {
    flex: 1,
  },
});
