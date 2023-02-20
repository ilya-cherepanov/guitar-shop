export function formatPrice(price: number) {
  const formatter = Intl.NumberFormat('ru');
  return formatter.format(price);
}
