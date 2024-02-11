import { useTheme } from "@shopify/restyle";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import Animated, { FadeInDown } from "react-native-reanimated";

import Button from "src/components/common/Button";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { ConversationIcon } from "src/components/icons/Conversation";
import { contactAtom } from "src/store/global";
import { Theme } from "src/styles/theme";
import { contactEmail } from "src/utils/contact";

const ContactModal = () => {
  const [showModal, setShowModal] = useState(false);
  const contactAction = useAtomValue(contactAtom);
  const { colors } = useTheme<Theme>();

  useEffect(() => {
    if (contactAction && !showModal) setShowModal(true);
  }, [contactAction]);

  const message = `Cześć,
  
  kontaktuję się w sprawie WspinApp z elementu: ${contactAction?.topic}`;

  const subject = `Kontakt Wspinapp - `;

  const handleEmail = () => {
    const link = `mailto:${contactEmail}?subject=${subject}&&body=${message}`;
    Linking.openURL(encodeURI(link)).catch((error) => {
      console.log(error);
    });
  };

  const handleCopy = async () => {
    Clipboard.setStringAsync(contactEmail).then(() =>
      Toast.show({
        type: "success",
        text2: "Skopiowano adres e-mail do schowka",
      }),
    );
  };

  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      animationIn='wobble'
      animationOutTiming={0}
    >
      <View
        backgroundColor='backgroundScreen'
        paddingHorizontal='m'
        paddingVertical='xl'
        borderRadius={12}
        width='100%'
        gap='l'
      >
        <Animated.View entering={FadeInDown.delay(300)} style={$iconContainer}>
          <ConversationIcon size={60} color={colors.backgroundTertiary} />
        </Animated.View>
        <Text>Chętnie z Tobą porozmawiamy!</Text>
        <View flexDirection='row' gap='m'>
          <Button
            label='anuluj'
            labelColor='secondary'
            containerStyles={$confirmButton(colors.secondary)}
            onClick={() => setShowModal(false)}
          />
          <View flex={1}>
            <Button label='Otwórz klienta e-mail' onClick={handleEmail} />
          </View>
        </View>
        <View flexDirection='row' flexWrap='wrap'>
          <Text variant='body'>Klient się nie otwiera? Napisz do nas na: </Text>
          <TouchableOpacity onPress={handleCopy}>
            <Text variant='body' color='textSecondary'>
              {contactEmail}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast topOffset={60} />
    </Modal>
  );
};

const $confirmButton = (border: string): ViewStyle => ({
  backgroundColor: "#fff",
  borderColor: border,
  borderWidth: 1,
});

const $iconContainer: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "center",
};

export default ContactModal;
