import { ReactNode } from "react";
import { StyleSheet } from "react-native";

import View from "src/components/ui/View";
import { styleGuide } from "src/styles/theme";

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
      padding='m'
      {...styleGuide.cardShadow}
      shadowColor='backgroundDark'
      backgroundColor='backgroundScreen'
      borderRadius={12}
    >
      <View flex={1}>{Title}</View>
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
