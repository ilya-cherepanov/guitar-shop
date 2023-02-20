import { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';
import { LoadingStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOneProduct, selectLoadingStatus, selectProduct } from '../../store/slices/one-product-slice';
import { updateProduct } from '../../store/slices/products-slice';
import { formatDate } from '../../utils';
import ImageInput from '../../components/product-form-inputs/image-input';
import StringsInput from '../../components/product-form-inputs/strings-input';
import TextInput from '../../components/product-form-inputs/text-input';
import TextareaInput from '../../components/product-form-inputs/textarea-input';
import TypesInput from '../../components/product-form-inputs/types-input';
import { adaptProductToServer } from '../add-product/utils';
import NotFound from '../not-found/not-found';

export default function EditProduct() {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const loadingStatus = useAppSelector(selectLoadingStatus);
  const {id} = useParams();
  const [triedToSend, setTriedToSend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOneProduct(Number(id)));
  }, [dispatch, id]);

  if (loadingStatus === LoadingStatus.Failed) {
    return <NotFound />;
  }

  if (!product) {
    return <Spinner />;
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);

    const adaptedFormData = adaptProductToServer(formData);
    if (!adaptedFormData) {
      return;
    }

    await dispatch(updateProduct({id: Number(id), updatedProduct: adaptedFormData})).unwrap();
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
      <section className="edit-item">
        <div className="container">
          <h1 className="edit-item__title">{product.title}</h1>
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
              <a className="link">{product.title}</a>
            </li>
          </ul>
          <form className="edit-item__form" action="#" method="POST" onSubmit={handleSubmit}>
            <div className="edit-item__form-left">
              <ImageInput initialImage={product.photo} />
              <TypesInput defaultValue={product.type} />
              <StringsInput defaultValue={product.numberOfStrings} />
            </div>
            <div className="edit-item__form-right">
              <TextInput name="createdAt" label="Дата добавления товара" placeholder="Дата в формате 00.00.0000" defaultValue={formatDate(product.createdAt) || undefined} triedToSend={triedToSend} />
              <TextInput name="title" label="Введите наименование товара" placeholder="Наименование" defaultValue={product.title} triedToSend={triedToSend} />
              <TextInput name="price" label="Введите цену товара" placeholder="Цена" defaultValue={`${product.price}`} additionalClasses={['add-item__form-input--price', 'is-placeholder']} triedToSend={triedToSend} />
              <TextInput name="article" label="Введите артикул товара" placeholder="Артикул товара" defaultValue={product.article} triedToSend={triedToSend} />
              <TextareaInput name="description" label="Введите описание товара" defaultValue={product.description} triedToSend={triedToSend} />
            </div>
            <div className="edit-item__form-buttons-wrap">
              <button
                className="button button--small edit-item__form-button"
                type="submit"
                onClick={handleSubmitButton}
              >
                Сохранить изменения
              </button>
              <button
                className="button button--small edit-item__form-button"
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
