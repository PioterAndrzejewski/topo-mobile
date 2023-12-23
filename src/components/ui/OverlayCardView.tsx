import { BoxProps } from "@shopify/restyle";
import { ReactNode } from "react";
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from "react-native-reanimated";
import { Object } from "ts-toolbelt";

import { Theme } from "src/styles/theme";

import View from "./View";

type OverlayCardViewProps = Object.Merge<
  BoxProps<Theme>,
  { children: ReactNode }
>;

const OverlayCardView = ({ children, ...rest }: OverlayCardViewProps) => (
  <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
    <View
      backgroundColor='backgroundScreen'
      padding='s'
      borderRadius={6}
      shadowOffset={{ width: 0, height: 3 }}
      shadowRadius={6}
      shadowOpacity={0.15}
      elevation={5}
      {...rest}
    >
      {children}
    </View>
  </Animated.View>
);

export default OverlayCardView;
