import { useNavigation } from "@react-navigation/native";
import type { FC } from "react";
import { TouchableOpacity } from "react-native";

import OverlayCardView from "src/components/ui/OverlayCardView";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { ArrowLeft } from "src/components/icons/ArrowLeft";
import { palette } from "src/styles/theme";

type ScreenTitleProps = {
  title: string;
  centered?: boolean;
  hasBackButton?: boolean;
};

const ScreenTitle: FC<ScreenTitleProps> = ({
  title,
  centered,
  hasBackButton,
}) => {
  const navigation = useNavigation();
  return (
    <View
      width='100%'
      paddingHorizontal='l'
      backgroundColor='backgroundScreen'
      justifyContent={centered ? "center" : undefined}
      alignItems={centered ? "center" : undefined}
      paddingBottom='m'
      flexDirection='row'
      gap='m'
    >
      {hasBackButton && (
        <OverlayCardView width={40} height={40} alignSelf='center'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color={palette.green} />
          </TouchableOpacity>
        </OverlayCardView>
      )}
      <View>
        <Text variant='h1' color='secondary'>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default ScreenTitle;
