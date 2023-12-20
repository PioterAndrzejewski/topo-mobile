import { Text as TextBase, TextStyle } from "react-native";
import { styleGuide } from "src/styles/guide";

type TextProps = {
  variant?: keyof typeof styleGuide.text;
  additionalStyles?: TextStyle;
  color?: string;
  children?: string;
};

const Text = ({
  variant = "body",
  additionalStyles,
  color,
  children,
}: TextProps) => (
  <TextBase
    style={[{ color: color }, styleGuide.text[`${variant}`], additionalStyles]}
  >
    {children}
  </TextBase>
);

export default Text;
