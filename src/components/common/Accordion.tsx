import { ReactNode } from "react";
import { StyleSheet } from "react-native";

import View from "src/components/ui/View";

type Props = {
  Title?: ReactNode;
  Content?: ReactNode;
};

const Accordion = (props: Props) => {
  const { Title, Content } = props;
  return (
    <View
      marginBottom='m'
      borderColor='backgroundSecondary'
      shadowColor='backgroundDark'
      shadowOffset={{ width: 0, height: 0 }}
      shadowRadius={4}
      shadowOpacity={0.15}
      elevation={50}
      zIndex={50}
      backgroundColor='backgroundScreen'
      borderRadius={12}
      padding='m'
    >
      <View flex={1} >
        {Title}
      </View>
      {Content && (
        <View
          top={-10}
          position='relative'
          marginTop='l'
          paddingTop='l'
          borderTopColor='backgroundSecondary'
          borderTopWidth={1}
        >
          {Content}
        </View>
      )}
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
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
