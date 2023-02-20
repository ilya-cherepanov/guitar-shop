import { MouseEventHandler } from 'react';
import { ModalType } from '../../constants';
import Modal from '../modal/modal';

interface ModalSuccessProps {
  onClose: () => void;
  message: string;
}

export default function ModalSuccess({message, onClose}: ModalSuccessProps) {
  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();

    onClose();
  };

  return (
    <Modal type={ModalType.Success} onClose={onClose}>
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <p className="modal__message">{message}</p>
      <div className="modal__button-container modal__button-container--send">
        <button className="button button--small modal__button modal__button--send" type="button" onClick={handleButtonClick}>
          К покупкам!
        </button>
      </div>
    </Modal>
  );
}
