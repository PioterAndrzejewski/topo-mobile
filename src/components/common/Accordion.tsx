import { ReactNode } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import View from "src/components/ui/View";

import { palette, styleGuide } from "src/styles/theme";

type Props = {
  Title?: ReactNode;
  Content?: ReactNode;
};

const Accordion = (props: Props) => {
  const { Title, Content } = props;

  const height = useSharedValue(120);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height:
        height.value > 0 ? withTiming(height.value + 120) : withTiming(120),
    };
  }, []);

  return (
    <Animated.View style={animatedStyle}>
      <View
        marginBottom='m'
        borderColor='backgroundSecondary'
        padding='m'
        {...styleGuide.cardShadow}
        shadowColor='backgroundDark'
        backgroundColor='backgroundScreen'
        borderRadius={12}
      >
        <View height={70}>{Title}</View>
        <View
          onLayout={(ev) => {
            height.value = ev.nativeEvent.layout.height;
          }}
        >
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
      </View>
    </Animated.View>
  );
};

export default Accordion;

const $containerStyle = {
  marginBottom: 12,
  borderColor: palette.blue100_25,
  padding: 12,
  ...styleGuide.cardShadow,
  shadowColor: palette.blue300,
  backgroundColor: palette.white,
  borderRadius: 12,
};
