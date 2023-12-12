import { Text as TextBase, TextStyle } from "react-native";
import { styleGuide } from "src/styles/guide";

type TextProps = {
  variant?: keyof typeof styleGuide.text;
  additionalStyles?: TextStyle;
  children?: string;
};

const Text = ({ variant = "body", additionalStyles, children }: TextProps) => (
  <TextBase style={[styleGuide.text[`${variant}`], additionalStyles]}>
    {children}
  </TextBase>
);

export default Text;
