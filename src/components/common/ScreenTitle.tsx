import type { FC } from "react";

import Text from "../ui/Text";
import View from "../ui/View";

type LoginTitleProps = {
  title: string;
};

const LoginTitle: FC<LoginTitleProps> = ({ title }) => {
  return (
    <View
      width='100%'
      paddingHorizontal='l'
      backgroundColor='backgroundScreen'
    >
      <Text variant='h1' color='secondary'>
        {title}
      </Text>
    </View>
  );
};

export default LoginTitle;
