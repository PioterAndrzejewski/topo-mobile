import { useMemo } from "react";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { Popularity } from "src/services/rocks";

import { GroupIcon } from "src/components/icons/Group";

const PopularityInfo = ({ popularity }: { popularity: Popularity }) => {
  const getPopulariy = useMemo(() => {
    switch (popularity) {
      case "high":
        return "duzo";
      case "medium":
        return "srednio";
      case "low":
        return "mało";
      default:
        return "b/d";
    }
  }, [popularity]);
  return (
    <View justifyContent='center' alignItems='center' height={40} width={40}>
      <GroupIcon size={32} />
      <Text variant='caption'>Duzo</Text>
    </View>
  );
};

export default PopularityInfo;
