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
    select: (data) => data && data[0],
  })
}

export const confirmPayment = async (productId: string, intentId: string) => {
  if (productId === '' || intentId === '') return;
  const body = {
    productId,
    intentId
  }
  const data = await authService.post<GetProductResponse>(apiConfig.payments.confirm, body);
  return data;
};

type ProductObject = {
  attributes: {
    createdAt: Date,
    updatedAt: Date,
    product: {
      data: {
        id: number;
        attributes: Product;
      }
    }
  }
  id: number;
}

type GetProductsResponse = {
  data: ProductObject[];
}

export const getProducts = async () => {
  const query = qs.stringify({
    pagination: {
      pageSize: 200
    },
    populate: [
      'product',
      'product.uuid',
    ],
  })
  const { data } = await authService.get<GetProductsResponse>(apiConfig.productTransaction.get(query));
  return data;
};


export const useUserProducts = () => {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: () => getProducts(),
    select: (data) => data.data,
  })
}