import { CreateCommentRequest } from '@guitar-shop/shared-types';
import { FormEventHandler, useState } from 'react';
import { ModalType } from '../../constants';
import Modal from '../modal/modal';
import StarsInput from './stars-input';


interface CreateCommentModalProps {
  productTitle: string;
  onCreate: (data: CreateCommentRequest) => void;
  onClose: () => void;
}


export default function CreateCommentModal({productTitle, onCreate, onClose}: CreateCommentModalProps) {
  const [advantages, setAdvantages] = useState<string | null>(null);
  const [disadvantages, setDisadvantages] = useState<string | null>(null)
  const [text, setText] = useState<string | null>(null);
  const [rate, setRate] = useState(0);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    if (advantages && disadvantages && text) {
      onCreate({
        advantages,
        disadvantages,
        text,
        rating: rate,
      });
    }

    onClose();
  };

  return (
    <Modal type={ModalType.ModalReview} onClose={onClose}>
      <h2 className="modal__header modal__header--review title title--medium">
        Оставить отзыв
      </h2>
      <form className="form-review" action="create" onSubmit={handleSubmit}>
        <div className="form-review__wrapper">
          <h3 className="form-review__title">{productTitle}</h3>
          <div>
            <span className="form-review__label form-review__label--required form-review__label--star">
              Ваша Оценка
            </span>
            <StarsInput onChange={(newRate) => setRate(newRate)} value={rate} />
          </div>
        </div>
        <label
          className="form-review__label form-review__label--required"
          htmlFor="advantage"
        >
          Достоинства
        </label>
        <input
          className="form-review__input"
          id="advantage"
          type="text"
          autoComplete="off"
          onChange={({target: {value}}) => setAdvantages(value)}
          value={advantages ?? ''}
        />
        <p className="form-review__warning" style={{visibility: advantages !== null && advantages === '' ? 'visible' : 'hidden'}}>Заполните поле</p>
        <label
          className="form-review__label form-review__label--required"
          htmlFor="disadv"
        >
          Недостатки
        </label>
        <input
          className="form-review__input"
          id="disadv"
          type="text"
          autoComplete="off"
          onChange={({target: {value}}) => setDisadvantages(value)}
          value={disadvantages ?? ''}
        />
        <p className="form-review__warning" style={{visibility: disadvantages !== null && disadvantages === '' ? 'visible' : 'hidden'}}>Заполните поле</p>
        <label
          className="form-review__label form-review__label--required form-review__label--textarea"
          htmlFor="comment"
        >
          Комментарий
        </label>
        <textarea
          className="form-review__input form-review__input--textarea"
          id="comment"
          autoComplete="off"
          onChange={({target: {value}}) => setText(value)}
          value={text ?? ''}
        ></textarea>
        <p className="form-review__warning" style={{visibility: text !== null && text === '' ? 'visible' : 'hidden'}}>Заполните поле</p>
        <button
          className="button button--medium-20 form-review__button"
          type="submit"
        >
          Отправить отзыв
        </button>
      </form>
    </Modal>
  );
}
