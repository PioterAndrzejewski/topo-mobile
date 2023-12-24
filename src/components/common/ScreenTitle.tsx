import type { FC } from "react";

import Text from "../ui/Text";
import View from "../ui/View";

type ScreenTitleProps = {
  title: string;
  centered?: boolean;
};

const ScreenTitle: FC<ScreenTitleProps> = ({ title, centered }) => {
  return (
    <View
      width='100%'
      paddingHorizontal='l'
      backgroundColor='backgroundScreen'
      justifyContent={centered ? "center" : undefined}
      alignItems={centered ? "center" : undefined}
      paddingBottom='m'
      paddingTop='3xl'
    >
      <Text variant='h1' color='secondary'>
        {title}
      </Text>
    </View>
  );
};

export default ScreenTitle;
