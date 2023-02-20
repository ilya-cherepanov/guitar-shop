export const SORT_BY = ['sortByAdding', 'sortByPrice', 'sortByRating'] as const;
export type SortByType = typeof SORT_BY[number];
