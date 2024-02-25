import { useTheme } from "@shopify/restyle";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "react-native-toast-message/lib/src/components/BaseToast.styles";
import { Touchable } from "react-native-toast-message/lib/src/components/Touchable";
import { BaseToastProps } from "react-native-toast-message/lib/src/types";
import { TickIcon } from "src/components/icons/Tick";

import { Theme, palette } from "src/styles/theme";

export const CustomSuccessToast = ({
  text1,
  text2,
  onPress,
  activeOpacity,
  style,
  touchableContainerProps,
  contentContainerStyle,
  contentContainerProps,
}: BaseToastProps) => {
  const { textVariants, colors } = useTheme<Theme>();
  return (
    <Touchable
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={[styles.base, style]}
      {...touchableContainerProps}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          flex: 1,
          paddingHorizontal: 24,
        }}
      >
        <View>
          <TickIcon color={palette.green} />
        </View>
        <View
          style={[styles.contentContainer, contentContainerStyle, { gap: 4 }]}
          {...contentContainerProps}
        >
          {text1 && text1.length > 0 && (
            <Text
              style={{
                fontFamily: "Outfit400",
                fontSize: 14,
              }}
            >
              {text1}
            </Text>
          )}
          {text2 && text2.length > 0 && (
            <Text
              style={{
                fontFamily: "Outfit300",
                fontSize: 12,
              }}
            >
              {text2}
            </Text>
          )}
        </View>
      </View>
    </Touchable>
  );
};
