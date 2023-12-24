import { useTheme } from "@shopify/restyle";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { Theme } from "src/styles/theme";
import { StarIcon } from "../icons/Star";

const Rating = ({
  rating,
  noFill,
}: {
  rating: string | null;
  noFill?: boolean;
}) => {
  const { colors } = useTheme<Theme>();

  return (
    <View>
      <StarIcon
        size={58}
        fill={rating && !noFill ? colors.secondary : undefined}
        color={colors.secondary}
      />
      <View
        position='absolute'
        left={0}
        right={0}
        top={noFill ? 4 : 2}
        bottom={0}
        justifyContent='center'
        alignItems='center'
      >
        <Text variant={!noFill && rating ? "h4" : "special"} color={!noFill && rating ? "textWhite" : "textSecondary"}>
          {rating ? rating.toString() : "?"}
        </Text>
      </View>
    </View>
  );
};

export default Rating;
