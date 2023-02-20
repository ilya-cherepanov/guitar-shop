import { ChangeEventHandler, MouseEventHandler, useRef, useState } from "react";
import { BACKEND_STATIC_URL } from "../../constants";

interface ImageInputProps {
  initialImage?: string;
}

export default function ImageInput({initialImage}: ImageInputProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleAddClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    if (fileInput.current === null) {
      return;
    }

    fileInput.current.disabled = false;
    fileInput.current.click()
  };

  const handleResetClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    setImagePreview('');

    if (fileInput.current === null) {
      return;
    }
    fileInput.current.type = 'text';
    fileInput.current.type = 'file';
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const file = evt.target.files?.item(0);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const showImage = (imagePreview !== null && imagePreview !== '') || (initialImage && initialImage !== '' && imagePreview !== '');

  return (
    <div className="edit-item-image add-item__form-image">
      <input className="visually-hidden" type="file" name="photo" required disabled={initialImage !== null && initialImage !== '' && imagePreview === null} ref={fileInput} onChange={handleInputChange} />
      <div className="edit-item-image__image-wrap">
        {showImage && <img className="edit-item-image__image" src={imagePreview || `${BACKEND_STATIC_URL}/${initialImage}`} width="133" height="332" alt="Preview" />}
      </div>
      <div className="edit-item-image__btn-wrap">
        <button className="button button--small button--black-border edit-item-image__btn" type="button" onClick={handleAddClick}>
          Добавить
        </button>
        <button className="button button--small button--black-border edit-item-image__btn" type="button" onClick={handleResetClick}>
          Удалить
        </button>
      </div>
    </div>
  );
}
