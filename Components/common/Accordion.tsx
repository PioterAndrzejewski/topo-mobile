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
    <View>
      <View>
        <View style={styles.heading}>
          <View style={styles.icon}>{Title}</View>
          {Icon}
        </View>
        {Content}
      </View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    flex: 1,
  },
});
