import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
type Props = {
  Title?: ReactNode;
  Icon?: ReactNode;
  Content?: ReactNode;
};
const Accordion = (props: Props) => {
  const { Title, Icon, Content } = props;
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.icon}>{Title}</View>
        {Icon}
      </View>
      {Content}
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    borderColor: "#000",
    borderWidth: 1,
    
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    flex: 1,
  },
});
