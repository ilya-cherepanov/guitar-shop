import { CreateCommentRequest } from '@guitar-shop/shared-types';
import { MouseEventHandler, useEffect, useState } from 'react';
import { AuthorizationStatus, COMMENT_PER_PAGE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createComment, fetchComments, selectComments, selectCommentsCount } from '../../store/slices/comments-slice';
import { selectAuthorizationStatus } from '../../store/slices/user-slice';
import Comment from '../comment/comment';
import CreateCommentModal from '../create-comment-modal/create-comment-modal';
import EnterModal from '../enter-modal/enter-modal';
import ModalSuccess from '../modal-success/modal-success';
import Spinner from '../spinner/spinner';

interface CommentsProps {
  productId: number;
  productTitle: string;
}


export default function Comments({productId, productTitle}: CommentsProps) {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthorizationStatus);
  const comments = useAppSelector((state) => selectComments(state, page * COMMENT_PER_PAGE));
  const commentsCount = useAppSelector(selectCommentsCount);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEnterModal, setShowEnterModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    dispatch(fetchComments(productId));
  }, [dispatch, productId]);

  if (!comments) {
    return <Spinner />
  }

  const handleCreateButton: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();

    if (authStatus === AuthorizationStatus.Auth) {
      setShowCreateForm(!showCreateForm);
    } else {
      setShowEnterModal(true);
    }
  }

  const handleCreateComment = async (data: CreateCommentRequest) => {
    await dispatch(createComment({...data, id: productId})).unwrap();
    setShowCreateForm(false);
    setShowSuccessModal(true);
    await dispatch(fetchComments(productId)).unwrap();
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        href={`/product/${productId}/create-comment`}
        onClick={handleCreateButton}
      >
        Оставить отзыв
      </a>
      {comments?.map((comment) => <Comment key={comment.id} comment={comment} />)}
      <button className="button button--medium reviews__more-button" onClick={() => setPage(page + 1)} style={{visibility: commentsCount > (page * COMMENT_PER_PAGE) ? 'visible' : 'hidden'}}>
        Показать еще отзывы
      </button>
      <a
        className="button button--up button--red-border button--big reviews__up-button"
        href="#header"
      >
        Наверх
      </a>
      {showCreateForm && <CreateCommentModal productTitle={productTitle} onCreate={handleCreateComment} onClose={() => setShowCreateForm(false)} />}
      {showEnterModal && <EnterModal onClose={() => setShowEnterModal(false)} />}
      {showSuccessModal && <ModalSuccess onClose={() => setShowSuccessModal(false)} message="Спасибо за ваш отзыв!" />}
    </section>
  );
}
