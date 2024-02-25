import { useTheme } from "@shopify/restyle";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "react-native-toast-message/lib/src/components/BaseToast.styles";
import { Touchable } from "react-native-toast-message/lib/src/components/Touchable";
import { BaseToastProps } from "react-native-toast-message/lib/src/types";
import { InfoIcon } from "src/components/icons/Info";

import { Theme, palette } from "src/styles/theme";

export const CustomErrorToast = ({
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
      style={[styles.base, style, , { borderRadius: 16, height: 85 }]}
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
        <View
          style={{
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            backgroundColor: "#fff",
            shadowOpacity: 0.1,
            shadowRadius: 4.0,
            borderRadius: 50,
            padding: 8,
          }}
        >
          <InfoIcon color={palette.red} />
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
