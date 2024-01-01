export function getPriceString(price: number): string {
  const priceZl = price / 100;

  const formattedPrice = priceZl.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });

  return formattedPrice;
}