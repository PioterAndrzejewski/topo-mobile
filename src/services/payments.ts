import authService from "src/services/auth";
import { EphemeralKey, PaymentIntent } from 'src/types/stripe';

import { apiConfig } from './apiConfig';


type GetPaymentIntentResponse = {
  data: {
    customer: string;
    ephemeralKey: EphemeralKey;
    paymentIntent: PaymentIntent;
  }
}

export const getPaymentIntent = async (productId: string) => {
  const body = {
    data: {
      productId,
    }
}
const data = await authService.post<GetPaymentIntentResponse>(apiConfig.payments.intent, JSON.stringify(body));
return data;
};