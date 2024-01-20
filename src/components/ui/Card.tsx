import { BoxProps } from "@shopify/restyle";
import { ReactNode } from "react";
import { Object } from "ts-toolbelt";

import { Theme } from "src/styles/theme";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

type CardProps = {
  children: ReactNode;
  title?: string;
  isOutline?: boolean;
};

type AllCardProps = Object.Merge<BoxProps<Theme>, CardProps>;

const Card = (props: AllCardProps) => {
  const { title, children, isOutline, ...rest } = props;
  return (
    <View
      borderRadius={24}
      backgroundColor={isOutline ? undefined : "backgroundLight"}
      borderWidth={isOutline ? 1 : 0}
      borderColor='backgroundLight'
      padding='m'
      {...rest}
    >
      {title && (
        <View
          width='100%'
          alignItems='center'
          borderBottomWidth={1}
          borderBottomColor='backgroundTertiaryFaded'
          paddingTop='m'
          paddingBottom='l'
          marginBottom='m'
        >
          <Text variant='h3' color='textGray'>
            {title}
          </Text>
        </View>
      )}
      {children}
    </View>
  );
};

export default Card;
