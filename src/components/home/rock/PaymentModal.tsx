import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";

import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { getPaymentIntent } from "src/services/payments";
import { selectedRockAtom } from "src/store/results";

type PaymentModalProps = {
  opened: boolean;
  onClose: () => void;
};

const PaymentModal = ({ opened, onClose }: PaymentModalProps) => {
  const selectedRock = useAtomValue(selectedRockAtom);
  const [isReady, setIsReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); 

  useEffect(() => {
    initialisePaymentSheet();
  }, []);

  const initialisePaymentSheet = async () => {
    if (!selectedRock) return;

    const { data } = await getPaymentIntent(selectedRock);

    const { error } = await initPaymentSheet({
      customerId: data.data.customer,
      customerEphemeralKeySecret: data.data.ephemeralKey.secret,
      paymentIntentClientSecret: data.data.paymentIntent.client_secret || "",
      merchantDisplayName: "WspinApp",
      allowsDelayedPaymentMethods: false,
    });

    if (error) {
      Toast.show({
        type: "error",
        text2: "Coś poszło nie tak podczas przygotowywania płatności",
      });
    } else {
      setIsReady(true);
    }
  };

  const handleBuy = async () => {
    if (!isReady) return;
    const { error } = await presentPaymentSheet();

    if (error) {
      Toast.show({
        type: "error",
        text2: "Coś poszło nie tak podczas wykonywania płatności",
      });
    } else {
      onClose();
      Toast.show({
        type: "success",
        text2: "Płatność poprawna!",
      });
    }
  };

  return (
    <Modal
      isVisible={opened}
      onDismiss={onClose}
      onBackdropPress={onClose}
      animationIn='slideInDown'
      animationOut='slideOutDown'
      animationInTiming={0}
      animationOutTiming={0}
      onBackButtonPress={onClose}
    >
      <View
        backgroundColor='backgroundScreen'
        borderRadius={24}
        paddingVertical='l'
        paddingHorizontal='m'
        gap='m'
      >
        <TouchableOpacity onPress={handleBuy}>
          <TouchableOpacity>
            <View width='100%' borderRadius={12} borderWidth={1} padding='m'>
              <Text variant='caption'>kup subskrypcję</Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBuy}>
          <View width='100%' borderRadius={12} borderWidth={1} padding='m'>
            <Text variant='caption'>Kup tylko region</Text>
            <Text variant='caption'>wchodzi w skłąd to i to</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PaymentModal;
