import { BoxProps } from "@shopify/restyle";
import { ReactNode } from "react";
import { Object } from "ts-toolbelt";

import { Theme, styleGuide } from "src/styles/theme";

import View from "./View";

type OverlayCardViewProps = Object.Merge<
  BoxProps<Theme>,
  { children: ReactNode }
>;

const OverlayCardView = ({ children, ...rest }: OverlayCardViewProps) => (
  <View padding='s' {...styleGuide.cardShadow} {...rest}>
    {children}
  </View>
);

export default OverlayCardView;
