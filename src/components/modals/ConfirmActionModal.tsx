import { useTheme } from "@shopify/restyle";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-native-modal";
import Animated, { FadeInDown } from "react-native-reanimated";

import Button from "src/components/common/Button";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { ViewStyle } from "react-native";
import { CrossIcon } from "src/components/icons/Cross";
import { confirmActionAtom } from "src/store/global";
import { Theme } from "src/styles/theme";

const ConfirmActionModal = () => {
  const [showModal, setShowModal] = useState(false);
  const confirmAction = useAtomValue(confirmActionAtom);
  const { colors } = useTheme<Theme>();

  useEffect(() => {
    if (confirmAction && !showModal) setShowModal(true);
  }, [confirmAction]);

  const renderIcon = () => {
    if (!confirmAction) return;
    if (confirmAction.Icon) return confirmAction.Icon;
    return <CrossIcon size={80} color={colors.favoriteRed} />;
  };

  const handleConfirm = useCallback(() => {
    confirmAction?.confirmFn();
    setShowModal(false);
  }, [confirmAction]);

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
        padding='m'
        borderRadius={12}
        width='100%'
        gap='l'
      >
        <Animated.View entering={FadeInDown.delay(300)} style={$iconContainer}>
          {renderIcon()}
        </Animated.View>
        <Text>{confirmAction?.message}</Text>
        <View flexDirection='row' gap='m'>
          <View flex={1}>
            <Button label='anuluj' onClick={() => setShowModal(false)} />
          </View>
          <Button
            label='potwierdź'
            onClick={handleConfirm}
            containerStyles={$confirmButton(colors.secondary)}
            labelColor='secondary'
          />
        </View>
      </View>
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

export default ConfirmActionModal;
