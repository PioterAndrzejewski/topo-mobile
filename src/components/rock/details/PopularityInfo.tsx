import { useMemo } from "react";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";
import DetailsWrapper from "./DetailsWrapper";

import { GroupIcon } from "src/components/icons/Group";
import { Popularity } from "src/services/rocks";

const PopularityInfo = ({ popularity }: { popularity: Popularity }) => {
  const getPopularity = useMemo(() => {
    switch (popularity) {
      case "high":
        return "duza";
      case "medium":
        return "średnia";
      case "low":
        return "mała";
      default:
        return "b/d";
    }
  }, [popularity]);
  return (
    <DetailsWrapper>
      <GroupIcon size={32} />
      <View flexDirection='row' gap='s'>
        <Text variant='body'>Popularność</Text>
        <Text variant='body'>{getPopularity}</Text>
      </View>
    </DetailsWrapper>
  );
};

export default PopularityInfo;
