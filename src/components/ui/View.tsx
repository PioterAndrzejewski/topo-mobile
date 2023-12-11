import { BoxProps, createBox } from "@shopify/restyle";
import { ReactNode } from "react";
import { Object } from "ts-toolbelt";

import { Theme } from "src/styles/theme";

export type ViewProps = Object.Merge<
  BoxProps<Theme>,
  { children: ReactNode; testID?: string }
>;
export const View = createBox<Theme>();
