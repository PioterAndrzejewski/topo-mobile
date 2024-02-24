import { useLayout } from "@react-native-community/hooks";
import { StyleProp, ViewStyle, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import View, { ViewProps } from "src/components/ui/View";

import { useMemo } from "react";
import { isAndroid } from "src/helpers/isAndroid";

type StickyContainerProps = {
  scrollY: SharedValue<number>;
} & ViewProps;

export const StickyContainer = (props: StickyContainerProps) => {
  const { height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const { onLayout, y, height: elementHeight } = useLayout();
  const bottomInset = useMemo(() => {
    if (isAndroid && bottom === 0) {
      return 60;
    }
    if (!isAndroid && bottom === 0) {
      return 60;
    }
    return bottom;
  }, [bottom]);

  const { scrollY, children, ...viewProps } = props;

  const newOffset = useDerivedValue(
    () =>
      -y +
      height -
      (elementHeight + (isAndroid ? 0 : bottomInset)) +
      Math.floor(scrollY.value) -
      60,
  );

  const animatedStyle = useAnimatedStyle(() => {
    const interpolationOutputRange =
      y > height
        ? //? [INFO] This is the case when the element is not visible on the screen, so we compensate for the scroll and if we reach the "spot" of the element we stop compensating
          [newOffset.value, newOffset.value, 0, 0]
        : //? [INFO] In this case the element is visible on the screen, meaning the "scrollView" is smaller than the screen. In this case we want the container to always stick to the bottom of the screen.
          [newOffset.value, newOffset.value, newOffset.value, newOffset.value];
    return {
      transform: [
        {
          translateY: interpolate(
            newOffset.value,
            [-1, 0, 1],
            interpolationOutputRange,
            {
              extrapolateLeft: Extrapolate.CLAMP,
              extrapolateRight: Extrapolate.CLAMP,
            },
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      onLayout={onLayout}
      style={[animatedStyle, $blurViewStyle(bottomInset)]}
    >
      <View
        flex={1}
        flexDirection={"row"}
        paddingVertical={"m"}
        borderRadius={100}
        justifyContent={"space-between"}
        alignItems={"center"}
        columnGap={"xl"}
        {...viewProps}
      >
        {children}
      </View>
    </Animated.View>
  );
};

const $blurViewStyle = (bottomInset: number): StyleProp<ViewStyle> => ({
  overflow: "hidden",
  marginBottom: isAndroid ? bottomInset : 0,
});
