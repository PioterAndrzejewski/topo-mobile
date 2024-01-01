import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";

import Button from "src/components/common/Button";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { ViewStyle } from "react-native";
import { useAreas } from "src/hooks/useAreas";
import {
  getPaymentIntent,
  useProduct,
  useSubscription,
} from "src/services/payments";
import { RockData } from "src/services/rocks";
import { selectedRockAtom } from "src/store/results";
import { palette } from "src/styles/theme";
import SectorProduct from "./products/SectorProduct";
import SubscriptionProduct from "./products/SubscriptionProduct";

type PaymentModalProps = {
  opened: boolean;
  onClose: () => void;
};

const PaymentModal = ({ opened, onClose }: PaymentModalProps) => {
  const selectedRock = useAtomValue(selectedRockAtom);
  const [isProcessing, setIsProcessing] = useState(false);
  const { rocks } = useAreas();
  const rock = useMemo(
    () =>
      rocks?.find((rock: RockData) => rock.attributes.uuid === selectedRock),
    [selectedRock],
  );
  const { data: subscription } = useSubscription();
  const { data: product } = useProduct(
    rock?.attributes.product.data?.attributes.uuid || "",
  );

  const initialisePaymentSheet = async (productId: string) => {
    console.log("no zaczynam dla id ", productId);
    if (!selectedRock) return;

    const { data } = await getPaymentIntent(productId);

    const { error: initPaymentError } = await initPaymentSheet({
      customerId: data.data.customer,
      customerEphemeralKeySecret: data.data.ephemeralKey.secret,
      paymentIntentClientSecret: data.data.paymentIntent.client_secret || "",
      merchantDisplayName: "WspinApp",
      allowsDelayedPaymentMethods: false,
    });

    if (initPaymentError) {
      return Toast.show({
        type: "error",
        text2: "Coś poszło nie tak podczas przygotowywania płatności",
      });
    }

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
      setIsProcessing(false);
    }
  };

  const handleBuy = async (productId: string | undefined) => {
    console.log("no zaczynam dla id ", productId);
    if (isProcessing || !productId) return;
    initialisePaymentSheet(productId);
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
      >
        <ScrollView>
          <View gap='m'>
            <Text variant='h2'>Uzyskaj dostęp do tych materiałów!</Text>
            <TouchableOpacity>
              {subscription && <SubscriptionProduct isLoading={isProcessing} />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleBuy(rock?.attributes.product.data?.attributes.uuid)
              }
            >
              {product && (
                <SectorProduct product={product} isLoading={isProcessing} />
              )}
            </TouchableOpacity>
          </View>
          <Button
            label='Innym razem'
            onClick={onClose}
            containerStyles={$buttonStyle}
            labelColor='textSecondary'
            isLoading={isProcessing}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

const $buttonStyle = {
  backgroundColor: palette.white,
  borderColor: palette.green,
  borderWidth: 1,
  borderRadius: 12,
} satisfies ViewStyle;

export default PaymentModal;
