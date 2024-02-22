import { useTheme } from "@shopify/restyle";
import { ReactNode, useState } from "react";
import type { FieldError } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

import Text from "../ui/Text";
import View from "../ui/View";

import type { RegisterData } from "src/components/auth/RegisterPanel";
import { VisionIcon, VisionLowIcon } from "src/components/common/SvgIcons";
import { Theme, palette } from "src/styles/theme";
import { ErrorIcon } from "../icons/Error";

export type AutoComplete = "email" | "username" | undefined;

export type CustomTextInputProps = {
  label?: string;
  secure?: boolean;
  onChange: (val: string) => void;
  value: string | undefined;
  field?: keyof RegisterData | undefined;
  error?: FieldError;
  onBlur?: any;
  hookBlurHandler: any;
  icon?: ReactNode;
  autoComplete?: AutoComplete;
};

export default function CustomTextInput({
  label,
  secure,
  onChange,
  value,
  field,
  error,
  hookBlurHandler,
  icon,
  autoComplete,
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
    <View position='absolute' right={18} top={15}>
      <TouchableOpacity onPress={handlePress} hitSlop={20}>
        {hidden ? (
          <VisionLowIcon color={palette.gray} />
        ) : (
          <VisionIcon color={palette.gray} />
        )}
      </TouchableOpacity>
    </View>
  );

  const showIcon = () => (
    <View position='absolute' left={10} top={15}>
      <TouchableOpacity onPress={() => setInputFocused(true)} hitSlop={20}>
        {icon}
      </TouchableOpacity>
    </View>
  );

  const textInputStyles = () => {
    if (error && inputFocused)
      return {
        ...styles.input,
        ...styles.inputFocused,
        ...styles.inputError,
      };
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
    <View width='100%'>
      <View gap='s'>
        {label && <Text variant='label'>{label}</Text>}
        <View>
          <TextInput
            style={{ ...textInputStyles(), ...textVariants.input }}
            onFocus={() => setInputFocused(true)}
            onBlur={handleBlur}
            value={value}
            editable
            secureTextEntry={secure && hidden}
            onChangeText={onChange}
            autoComplete={autoComplete}
            {...props}
          />
          {error?.message && (
            <>
              <View position='absolute' left={14} bottom={-20}>
                <Text color='error' variant='caption'>
                  {error.message}
                </Text>
              </View>
              <View
                position='absolute'
                right={14}
                top={10}
                backgroundColor='backgroundError'
                p='xs'
                borderRadius={99}
              >
                <ErrorIcon />
              </View>
            </>
          )}
          {secure && showPassword()}
          {icon && showIcon()}
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
    borderWidth: 1,
    borderRadius: 6,
    borderColor: palette.gray,
    backgroundColor: palette.white,
    shadowColor: palette.black,
  },
  inputError: {
    borderStyle: "solid",
    borderColor: palette.red,
    shadowColor: palette.red,
  },
  inputFocused: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: palette.green,
    shadowColor: palette.green,
    shadowOpacity: 0.7,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});
