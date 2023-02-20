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
