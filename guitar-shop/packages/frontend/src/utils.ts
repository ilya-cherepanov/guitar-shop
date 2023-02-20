export function buildQuery(queryParams: Record<string, string | string[]>): string {
  const query = new URLSearchParams();
  const params = Object.entries(queryParams);

  params.forEach(([paramName, paramValue]) => {
    if (Array.isArray(paramValue)) {
      paramValue.map((value) => query.append(paramName, value));
    } else {
      query.append(paramName, paramValue);
    }
  });

  return query.toString();
}

export function formatDate(date: Date | string): string | null {
  const dateFormatter = new Intl.DateTimeFormat('ru');
  if (date instanceof Date) {
    return dateFormatter.format(date);
  }

  if (isNaN(Date.parse(date))) {
    return null;
  }

  return dateFormatter.format(new Date(date));
}

export function formatOrderId(orderId: number): string {
  const orderIdStr = `00000000${orderId}`;
  const reversedIdFragments = orderIdStr
    .split('')
    .reverse()
    .slice(0, 8)
    .join('')
    .match(/.{1,3}/g) as RegExpMatchArray;

  return reversedIdFragments
    .reverse()
    .map(
      (fragment) => fragment
        .split('')
        .reverse()
        .join('')
    )
    .join('-');
}

export function formatPrice(price: number) {
  const formatter = Intl.NumberFormat('ru');
  return formatter.format(price);
}

export function parseDateString(dateString: string) {
  const [day, month, year] = dateString.split('.').map((dateFragment) => parseInt(dateFragment));
  return new Date(year, month, day);
}

export function adaptProductToServer(productFormData: FormData): FormData | null {
  const createdAtFormData = productFormData.get('createdAt');
  if (!createdAtFormData) {
    return null;
  }

  const date = parseDateString(createdAtFormData.toString());
  productFormData.delete('createdAt');
  productFormData.append('createdAt', date.toISOString());

  return productFormData;
}
