import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";

import Button from "src/components/common/Button";
import SectorProduct from "src/components/home/rock//products/SectorProduct";
import SubscriptionProduct from "src/components/home/rock/products/SubscriptionProduct";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAreas } from "src/hooks/useAreas";
import {
  confirmPayment,
  getPaymentIntent,
  useProduct,
  useSubscription,
} from "src/services/payments";
import { RockData } from "src/services/rocks";
import { selectedRockAtom } from "src/store/results";
import { palette } from "src/styles/theme";

type PaymentModalProps = {
  opened: boolean;
  onClose: () => void;
};

const PaymentModal = ({ opened, onClose }: PaymentModalProps) => {
  const selectedRock = useAtomValue(selectedRockAtom);
  const [isProcessing, setIsProcessing] = useState(false);
  const { rocks } = useAreas();
  const insets = useSafeAreaInsets();
  const rock = useMemo(
    () =>
      rocks?.find((rock: RockData) => rock.attributes.uuid === selectedRock),
    [selectedRock],
  );
  const { data: subscription } = useSubscription();
  const { data: product } = useProduct(
    rock?.attributes.product.data?.attributes.uuid || "",
  );
  const { mutate: confirmPaymentMutation } = useMutation({
    mutationFn: ({
      productId,
      intentId,
    }: {
      productId: string;
      intentId: string;
    }) => confirmPayment(productId, intentId),
    retryDelay: 1000,
    retry: true,
    onSuccess: (data) => {
      console.log(data && data.data);
    },
  });

  const initialisePaymentSheet = async (
    productId: string,
    item: "product" | "subscription",
  ) => {
    console.log("no zaczynam dla id ", productId);
    if (!selectedRock) return setIsProcessing(false);

    const { data: intentData } = await getPaymentIntent(productId);

    const { error: initPaymentError } = await initPaymentSheet({
      customerId: intentData.data.customer,
      customerEphemeralKeySecret: intentData.data.ephemeralKey.secret,
      paymentIntentClientSecret:
        intentData.data.paymentIntent.client_secret || "",
      merchantDisplayName: "WspinApp",
      allowsDelayedPaymentMethods: false,
    });

    if (initPaymentError) {
      setIsProcessing(false);
      return Toast.show({
        type: "error",
        text2: "Coś poszło nie tak podczas przygotowywania płatności",
      });
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      console.log("no jest platność jakaś tu?");
      setIsProcessing(false);
      return Toast.show({
        type: "error",
        text2: "Coś poszło nie tak podczas wykonywania płatności",
      });
    }
    try {
      await confirmPaymentMutation({
        productId:
          item === "product" && product?.id
            ? product?.id.toString()
            : productId
            ? productId
            : "",
        intentId: intentData.data.paymentIntent.id || "",
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text2:
          "Coś poszło nie tak podczas potwierdzania Twojej płatności. Spróbuj ponownie lub prosimy o kontakt - help@wsinapp.pl",
        visibilityTime: 3000,
      });
    }

    onClose();
    Toast.show({
      type: "success",
      text2: "Płatność poprawna!",
    });
    setIsProcessing(false);
  };

  const handleBuy = async (
    productId: string | undefined,
    item: "product" | "subscription",
  ) => {
    console.log("no zaczynam dla id ", productId);
    if (isProcessing || !productId) return;
    setIsProcessing(true);
    initialisePaymentSheet(productId, item);
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
      style={{ marginTop: insets.top + 40, marginBottom: insets.bottom + 40 }}
    >
      <View
        backgroundColor='backgroundScreen'
        borderRadius={24}
        paddingVertical='l'
        paddingHorizontal='m'
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View gap='l' marginBottom='l'>
            <Text variant='h2'>Uzyskaj dostęp do tych materiałów!</Text>
            <TouchableOpacity
              onPress={() => handleBuy(subscription?.uuid, "subscription")}
            >
              {subscription && <SubscriptionProduct isLoading={isProcessing} />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handleBuy(
                  rock?.attributes.product.data?.attributes.uuid,
                  "product",
                )
              }
            >
              {product && (
                <SectorProduct
                  product={product.attributes}
                  isLoading={isProcessing}
                />
              )}
            </TouchableOpacity>
          </View>
          <Button
            label='Innym razem'
            onClick={onClose}
            containerStyles={$buttonStyle}
            labelColor='textSecondary'
            isLoading={isProcessing}
            disabled={isProcessing}
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
