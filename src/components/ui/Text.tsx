import { useTheme } from "@shopify/restyle";
import { ReactNode } from "react";
import { Text as TextComponent, TextStyle } from "react-native";
import { Theme } from "src/styles/theme";

type TextProps = {
  variant?: keyof Theme["textVariants"];
  additionalStyles?: TextStyle;
  color?: keyof Theme["colors"];
  children?: string | ReactNode;
};

const Text = ({
  variant = "body",
  additionalStyles,
  color,
  children,
}: TextProps) => {
  const { textVariants, colors } = useTheme<Theme>();
  return (
    <TextComponent
      style={[
        { color: color ? colors[color] : colors["textBlack"] },
        textVariants[`${variant}`],
        additionalStyles,
      ]}
    >
      {children}
    </TextComponent>
  );
};

export default Text;
