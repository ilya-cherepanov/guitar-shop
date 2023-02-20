import { Link } from 'react-router-dom';
import { ModalType } from '../../constants';
import Modal from '../modal/modal';

interface EnterModalProps {
  onClose: () => void;
}

export default function EnterModal({onClose}: EnterModalProps) {
  return (
    <Modal onClose={onClose} type={ModalType.ModalEnter}>
      <div className="modal-enter">
        <h2 className="modal-enter__title">
          Для выполнения данного действия необходимо войти в&nbsp;систему
        </h2>
        <Link className="button button--big modal-enter__link" to="/login">
          Войти
        </Link>
        <p className="modal-enter__text">
          Если у вас ещё нет аккаунта, необходимо <br />{' '}
          <Link to="/registration">Зарегистрироваться</Link>
        </p>
      </div>
    </Modal>
  );
}
