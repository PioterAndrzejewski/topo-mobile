import qs from 'qs';
import authService from "src/services/auth";
import { EphemeralKey, PaymentIntent } from 'src/types/stripe';

import { useQuery } from '@tanstack/react-query';
import { apiConfig } from './apiConfig';
import { queryKeys } from './queryKeys';
import { ProductSanitized, RockData } from './rocks';


type GetPaymentIntentResponse = {
  data: {
    customer: string;
    ephemeralKey: EphemeralKey;
    paymentIntent: PaymentIntent;
  }
}

type GetSubscriptionResponse = {
  data: {
    id: number;
    attributes: ProductSanitized;
  }[]
}

type MapRocksReference = {
  map_rocks: {
    data: RockData[];
  }
}

export type Product = ProductSanitized & MapRocksReference;

type GetProductResponse = {
  data: {
    id: number;
    attributes: Product;
  }[]
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

export const getSubscription = async () => {
  const query = qs.stringify({
    filters: {
      name: {
        $eq: 'subskrypcja_roczna',
      },
    }
  });
  const { data } = await authService.get<GetSubscriptionResponse>(apiConfig.product.get(query));
  return data.data;
};

export const useSubscription = () => {
  return useQuery({
    queryKey: queryKeys.product('year_subscription'),
    queryFn: getSubscription,
    select: (data) => data && data[0].attributes,
  })
};


export const getProduct = async (id: string) => {
  if (id === '') return;
  const query = qs.stringify({
    populate: [
      'uuid',
      'name',
      'description',
      'map_rocks',
      'map_rocks.Name'
    ],
    filters: {
      uuid: {
        $eq: id,
      },
    }
  });
  const { data } = await authService.get<GetProductResponse>(apiConfig.product.get(query));
  return data.data;
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => getProduct(id),
    select: (data) => data && data[0].attributes,
  })
}