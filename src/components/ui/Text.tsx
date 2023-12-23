import { useTheme } from "@shopify/restyle";
import { Text as TextBase, TextStyle } from "react-native";
import { Theme } from "src/styles/theme";

type TextProps = {
  variant?: keyof Theme["textVariants"];
  additionalStyles?: TextStyle;
  color?: keyof Theme["colors"];
  children?: string;
};

const Text = ({
  variant = "body",
  additionalStyles,
  color,
  children,
}: TextProps) => {
  const { textVariants, colors } = useTheme<Theme>();
  return (
    <TextBase
      style={[
        { color: color ? colors[color] : colors["textBlack"] },
        textVariants[`${variant}`],
        additionalStyles,
      ]}
    >
      {children}
    </TextBase>
  );
};

export default Text;
