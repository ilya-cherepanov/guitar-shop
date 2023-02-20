export function formatCommentDate(dateString: string) {
  const date = new Date(dateString);
  const dateFormatter = new Intl.DateTimeFormat('ru', {day: 'numeric', month: 'long'});

  return dateFormatter.format(date);
}
