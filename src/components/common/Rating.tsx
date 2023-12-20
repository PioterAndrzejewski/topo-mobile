import { useTheme } from "@shopify/restyle";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { Theme } from "src/styles/theme";
import { StarIcon } from "../icons/Star";

const Rating = ({ rating }: { rating: string | null }) => {
  const { colors } = useTheme<Theme>();
  return (
    <View>
      <StarIcon
        size={42}
        fill={rating ? colors.secondary : undefined}
        color={rating ? colors.secondary : colors.backgroundBlack}
      />
      <View
        position='absolute'
        left={0}
        right={0}
        top={2}
        bottom={0}
        justifyContent='center'
        alignItems='center'
      >
        <Text
          variant='h4'
          color={rating ? colors.mainBackground : colors.backgroundBlack}
        >
          {rating ? rating.toString() : ""}
        </Text>
      </View>
    </View>
  );
};

export default Rating;
