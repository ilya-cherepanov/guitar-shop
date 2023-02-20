import { CommentResponse } from '@guitar-shop/shared-types';
import Rating from '../rating/rating';
import { formatCommentDate } from './utils';


interface CommentProps {
  comment: CommentResponse;
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">
          {comment.author.name}
        </h4>
        <span className="review__date">{formatCommentDate(comment.createdAt)}</span>
      </div>
      <Rating rating={comment.rating} totalRatings={1} classModifier="review__rating-panel" starSize={[16, 16]} showCount={false} />
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">
        {comment.advantages}
      </p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{comment.disadvantages}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">
        {comment.disadvantages}
      </p>
    </div>
  );
}
