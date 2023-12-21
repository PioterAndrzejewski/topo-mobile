import { ReactNode } from "react";

import View from "src/components/ui/View";

type Props = {
  children: ReactNode;
};

const DetailsWrapper = (props: Props) => {
  return (
    <View justifyContent='space-between' flex={1} alignItems='center' gap='s'>
      {props.children}
    </View>
  );
};

export default DetailsWrapper;
