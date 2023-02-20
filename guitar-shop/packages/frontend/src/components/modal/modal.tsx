import { MouseEventHandler, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { ModalType } from '../../constants';

interface ModalProps {
  children: JSX.Element | JSX.Element[];
  type?: ModalType;
  onClose?: () => void;
}

export default function Modal({ children, onClose, type = ModalType.Default }: ModalProps): JSX.Element {
  const navigate = useNavigate()

  const closeModal = useCallback(() => {
    if (!onClose) {
      navigate(-1);
    } else {
      onClose();
    }
  }, [navigate, onClose]);

  const handleEscEvent = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      closeModal()
    }
  }, [closeModal]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscEvent);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', handleEscEvent);
      document.body.classList.remove('modal-open');
    };
  }, [handleEscEvent]);

  const handleCloseButton: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    closeModal();
  };

  return createPortal(
    <div className={`modal is-active ${type}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => closeModal()}></div>
        <div className="modal__content">
          {children}
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={handleCloseButton}
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLDivElement,
  );
}
