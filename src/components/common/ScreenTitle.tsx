import { useNavigation } from "@react-navigation/native";
import type { FC } from "react";
import { TouchableOpacity } from "react-native";

import OverlayCardView from "src/components/ui/OverlayCardView";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { ArrowLeft } from "src/components/icons/ArrowLeft";
import { CrossIcon } from "src/components/icons/Cross";
import { isAndroid } from "src/helpers/isAndroid";
import { palette } from "src/styles/theme";
import FiltersButton from "./FiltersButton";

type ScreenTitleProps = {
  title: string;
  centered?: boolean;
  hasBackButton?: boolean;
  hasCloseButton?: boolean;
  hasFilters?: boolean;
  onClose?: () => void;
};

const ScreenTitle: FC<ScreenTitleProps> = ({
  title,
  centered,
  hasBackButton,
  hasCloseButton,
  onClose,
  hasFilters,
}) => {
  const navigation = useNavigation();

  const handleClose = () => {
    if (onClose) onClose();
    navigation.goBack();
  };
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
      paddingTop={isAndroid ? "m" : undefined}
      overflow='visible'
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
          <TouchableOpacity onPress={handleClose}>
            <ArrowLeft size={24} color={palette.green} />
          </TouchableOpacity>
        </OverlayCardView>
      )}
      {hasCloseButton && (
        <View position='absolute' right={16} bottom={14}>
          <TouchableOpacity onPress={handleClose}>
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
