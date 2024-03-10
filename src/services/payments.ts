import qs from "qs";
import authService from "src/services/auth";
import { EphemeralKey, PaymentIntent } from "src/types/stripe";

import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { wantsToUseNotLoggedAtom } from "src/store/global";
import { apiConfig } from "./apiConfig";
import { queryKeys } from "./queryKeys";
import { ProductSanitized, RockData } from "./rocks";

type GetPaymentIntentResponse = {
  data: {
    customer: string;
    ephemeralKey: EphemeralKey;
    paymentIntent: PaymentIntent;
  };
};

type GetSubscriptionResponse = {
  data: {
    id: number;
    attributes: ProductSanitized;
  };
};

type MapRocksReference = {
  map_rocks: {
    data: RockData[];
  };
};

export type Product = ProductSanitized & MapRocksReference;

type GetProductResponse = {
  data: {
    id: number;
    attributes: Product;
  }[];
};

export const getPaymentIntent = async (productId: string) => {
  const body = {
    data: {
      productId,
    },
  };
  const data = await authService.post<GetPaymentIntentResponse>(
    apiConfig.payments.intent,
    JSON.stringify(body),
  );
  return data;
};

export const getSubscription = async () => {
  const { data } = await authService.get<GetSubscriptionResponse>(
    apiConfig.subscription.get,
  );
  return data;
};

export const useSubscriptionProduct = () => {
  return useQuery({
    queryKey: queryKeys.product("year_subscription"),
    queryFn: getSubscription,
    select: (data) => data.data.attributes,
  });
};

export const getProduct = async (id: string) => {
  if (id === "") return;
  const query = qs.stringify({
    populate: ["uuid", "name", "description", "map_rocks", "map_rocks.Name"],
    filters: {
      uuid: {
        $eq: id,
      },
    },
  });
  const { data } = await authService.get<GetProductResponse>(
    apiConfig.product.get(query),
  );
  return data.data;
};

export const useProduct = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => getProduct(id),
    select: (data) => data && data[0],
    enabled,
  });
};

export const confirmPayment = async (
  productId: string | number,
  intentId: string,
) => {
  if (productId === "" || intentId === "") return;
  const body = {
    productId,
    intentId,
  };
  const data = await authService.post<GetProductResponse>(
    apiConfig.payments.confirm,
    body,
  );
  return data;
};

type GetProductsResponse = {
  data: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    product: ProductSanitized;
  }[];
};

export const getProducts = async () => {
  const query = qs.stringify({
    pagination: {
      pageSize: 999,
    },
    populate: ["product", "product.uuid", "user", "user.id"],
  });
  const { data } = await authService.get<GetProductsResponse>(
    apiConfig.productTransaction.get(query),
  );
  return data.data;
};

export const useUserProducts = () => {
  const wantsToUseNotLogged = useAtomValue(wantsToUseNotLoggedAtom);
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: () => getProducts(),
    staleTime: 1000 * 60 * 60 * 24 * 30,
    enabled: !wantsToUseNotLogged,
    gcTime: Infinity,
  });
};

export const useUserProductsId = () => {
  const { data } = useUserProducts();

  return data?.map((product) => product.product.uuid);
};
