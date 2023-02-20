import { FormEventHandler, MouseEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageInput from '../../components/product-form-inputs/image-input';
import StringsInput from '../../components/product-form-inputs/strings-input';
import TextInput from '../../components/product-form-inputs/text-input';
import TextareaInput from '../../components/product-form-inputs/textarea-input';
import TypesInput from '../../components/product-form-inputs/types-input';
import { useAppDispatch } from '../../hooks';
import { createProduct } from '../../store/slices/products-slice';
import { adaptProductToServer } from '../../utils';

export default function AddProduct() {
  const navigate = useNavigate();
  const [triedToSend, setTriedToSend] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);

    const adaptedFormData = adaptProductToServer(formData);
    if (!adaptedFormData) {
      return;
    }

    await dispatch(createProduct(adaptedFormData)).unwrap();
    navigate('/product-list');
  }

  const handleSubmitButton: MouseEventHandler<HTMLButtonElement> = () => {
    setTriedToSend(true);
  }

  const handleBackButton: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();

    navigate('/product-list');
  };

  return (
    <main className="page-content">
      <section className="add-item">
        <div className="container">
          <h1 className="add-item__title">Новый товар</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item">
              <Link className="link" to="/">
                Каталог
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to="/product-list">
                Товары
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">Новый товар</a>
            </li>
          </ul>
          <form className="add-item__form" action="#" method="POST" onSubmit={handleSubmit}>
            <div className="add-item__form-left">
              <ImageInput />
              <TypesInput />
              <StringsInput />
            </div>
            <div className="add-item__form-right">
              <TextInput name="createdAt" label="Дата добавления товара" placeholder="Дата в формате 00.00.0000" triedToSend={triedToSend} />
              <TextInput name="title" label="Введите наименование товара" placeholder="Наименование" triedToSend={triedToSend} />
              <TextInput name="price" label="Введите цену товара" placeholder="Цена" additionalClasses={['add-item__form-input--price', 'is-placeholder']} triedToSend={triedToSend} />
              <TextInput name="article" label="Введите артикул товара" placeholder="Артикул товара" triedToSend={triedToSend} />
              <TextareaInput name="description" label="Введите описание товара" triedToSend={triedToSend} />
            </div>
            <div className="add-item__form-buttons-wrap">
              <button
                className="button button--small add-item__form-button"
                type="submit"
                onClick={handleSubmitButton}
              >
                Сохранить изменения
              </button>
              <button
                className="button button--small add-item__form-button"
                type="button"
                onClick={handleBackButton}
              >
                Вернуться к списку товаров
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
