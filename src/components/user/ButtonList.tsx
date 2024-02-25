import { TouchableOpacity } from "react-native";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

type ButtonListProps = {
  buttonList: {
    label: string;
    action: () => void;
  }[];
};

const ButtonList = (props: ButtonListProps) => {
  const { buttonList } = props;
  const restButtons = buttonList.filter((_, index) => index !== 0);
  return (
    <View paddingHorizontal='m'>
      <TouchableOpacity onPress={buttonList[0].action}>
        <View
          flex={1}
          backgroundColor='backgroundLight'
          borderTopLeftRadius={24}
          borderTopRightRadius={24}
          borderRadius={buttonList.length === 1 ? 24 : undefined}
          paddingHorizontal='m'
          paddingTop='l'
          paddingBottom={buttonList.length === 1 ? "l" : "m"}
        >
          <Text variant='body' color='textBlack'>
            {buttonList[0].label}2
          </Text>
        </View>
      </TouchableOpacity>
      {!!restButtons &&
        restButtons.length > 0 &&
        restButtons.map((el, index) => (
          <TouchableOpacity onPress={el!.action} key={el.label}>
            <View
              flex={1}
              backgroundColor='backgroundLight'
              paddingHorizontal='m'
              paddingTop='m'
              paddingBottom={index === restButtons.length - 1 ? "l" : "m"}
              borderTopWidth={1}
              borderColor='backgroundScreen'
              borderBottomLeftRadius={
                index === restButtons.length - 1 ? 24 : undefined
              }
              borderBottomRightRadius={
                index === restButtons.length - 1 ? 24 : undefined
              }
            >
              <Text variant='body' color='textBlack'>
                {el?.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default ButtonList;
