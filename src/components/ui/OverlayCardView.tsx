import { BoxProps } from "@shopify/restyle";
import { ReactNode } from "react";
import Animated from "react-native-reanimated";
import { Object } from "ts-toolbelt";

import { Theme, styleGuide } from "src/styles/theme";

import View from "./View";

type OverlayCardViewProps = Object.Merge<
  BoxProps<Theme>,
  { children: ReactNode }
>;

const OverlayCardView = ({ children, ...rest }: OverlayCardViewProps) => (
  <Animated.View>
    <View padding='s' {...styleGuide.cardShadow} {...rest}>
      {children}
    </View>
  </Animated.View>
);

export default OverlayCardView;
