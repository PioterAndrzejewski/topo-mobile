import { useTheme } from "@shopify/restyle";
import { useState } from "react";
import type { FieldError } from "react-hook-form";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

import Text from "../ui/Text";
import View from "../ui/View";

import type { RegisterData } from "src/components/auth/RegisterPanel";
import { VisionIcon, VisionLowIcon } from "src/components/common/SvgIcons";
import { Theme, palette } from "src/styles/theme";

export type CustomTextInputProps = {
  label: string;
  secure?: boolean;
  onChange: (val: string) => void;
  value: string | undefined;
  field?: keyof RegisterData | undefined;
  error?: FieldError;
  onBlur?: any;
  hookBlurHandler: any;
};

export default function CustomTextInput({
  label,
  secure,
  onChange,
  value,
  field,
  error,
  hookBlurHandler,
  ...props
}: CustomTextInputProps) {
  const [inputFocused, setInputFocused] = useState(false);
  const [hidden, setHidden] = useState<boolean | undefined>(secure);
  const handlePress = () => setHidden((prevValue) => !prevValue);
  const { textVariants } = useTheme<Theme>();

  const handleBlur = () => {
    setInputFocused(false);
    hookBlurHandler();
  };

  const showPassword = () => (
    <View position='absolute' right={10} top={15}>
      <TouchableOpacity onPress={handlePress} hitSlop={20}>
        {hidden ? <VisionLowIcon /> : <VisionIcon />}
      </TouchableOpacity>
    </View>
  );

  const textInputStyles = () => {
    if (error)
      return {
        ...styles.input,
        ...styles.inputError,
      };

    if (inputFocused)
      return {
        ...styles.input,
        ...styles.inputFocused,
      };
    return styles.input;
  };

  return (
    <View marginVertical='s' width='100%' paddingHorizontal='s'>
      <View>
        <Text variant='label'>{label}</Text>
        <View>
          <TextInput
            style={{ ...textInputStyles(), ...textVariants.input }}
            onFocus={() => setInputFocused(true)}
            onBlur={handleBlur}
            value={value}
            editable
            secureTextEntry={secure && hidden}
            onChangeText={onChange}
            {...props}
          />
          {error?.message && (
            <View position='absolute' right={10} top={15}>
              <Text color='error'>{error.message}</Text>
            </View>
          )}
          {secure && showPassword()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 47,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: palette.white,
  },
  inputError: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: palette.red,
  },
  inputFocused: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: palette.blue500,
  },
});
