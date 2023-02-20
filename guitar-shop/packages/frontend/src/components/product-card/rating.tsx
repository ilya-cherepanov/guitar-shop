import { RatePlural } from "../../constants";

interface RatingProps {
  rating: number;
  totalRatings: number;
  showCount?: boolean;
}

export default function Rating({
  rating,
  totalRatings,
  showCount = false,
}: RatingProps) {
  const intRating = Math.max(
    0,
    Math.min(5, Math.round(rating))
  ) as keyof typeof RatePlural;

  const stars: JSX.Element[] = [];
  for (let i = 1; i <= 5; ++i) {
    stars.push(
      <svg key={i} width="12" height="11" aria-hidden="true">
        <use
          xlinkHref={i <= intRating ? '#icon-full-star' : '#icon-star'}
        ></use>
      </svg>
    );
  }

  return (
    <div className="rate product-card__rate">
      {stars}
      <p className="visually-hidden">Рейтинг: {RatePlural[intRating]}</p>
      {showCount && (
        <p className="rate__count">
          <span className="visually-hidden">Всего оценок: </span>
          {totalRatings}
        </p>
      )}
    </div>
  );
}
