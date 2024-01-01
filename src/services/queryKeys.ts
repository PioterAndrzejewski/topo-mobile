export const queryKeys = {
  profile: {
    me: ['profile', 'me'] as const,
  },
  product: (id: string) => (['product', id]) as const,
  products: ['product'] as const,
};