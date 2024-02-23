import { useNavigation } from "@react-navigation/native";
import type { FC } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import OverlayCardView from "src/components/ui/OverlayCardView";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { ArrowLeft } from "src/components/icons/ArrowLeft";
import { palette } from "src/styles/theme";
import { CrossIcon } from "../icons/Cross";
import FiltersButton from "./FiltersButton";

type ScreenTitleProps = {
  title: string;
  centered?: boolean;
  hasBackButton?: boolean;
  hasFilters?: boolean;
  hasCloseButton?: boolean;
};

const ScreenTitle: FC<ScreenTitleProps> = ({
  title,
  centered,
  hasBackButton,
  hasFilters,
  hasCloseButton,
}) => {
  const navigation = useNavigation();
  return (
    <View
      width='100%'
      paddingHorizontal='s'
      backgroundColor='backgroundScreen'
      justifyContent={centered ? "center" : undefined}
      alignItems={centered ? "center" : undefined}
      paddingBottom='m'
      flexDirection='row'
      gap='m'
    >
      {hasBackButton && (
        <OverlayCardView
          width={40}
          height={40}
          alignSelf='center'
          position='absolute'
          left={20}
          bottom={10}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color={palette.green} />
          </TouchableOpacity>
        </OverlayCardView>
      )}
      {hasCloseButton && (
        <View position='absolute' right={16} bottom={14}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CrossIcon size={34} />
          </TouchableOpacity>
        </View>
      )}
      <View>
        <Text
          variant='h2'
          color='secondary'
          additionalStyles={{ fontFamily: "Outfit400" }}
        >
          {title}
        </Text>
      </View>
      {hasFilters && <FiltersButton />}
    </View>
  );
};

export default ScreenTitle;
