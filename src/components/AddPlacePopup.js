import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({
                          isOpen,
                          onClose,
                          stopClose,
                          onAddPlace
}) {
  const name = React.useRef('');
  const link = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      link: link.current.value,
      name: name.current.value
    });
  }

  React.useEffect(() => {
    !isOpen && link.current.parentElement.reset();
  })

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      stopClose={stopClose}
      onSubmit={handleSubmit}
      name={'add-img'}
      title={'Новое место'}
      buttonText={'Создать'}
    >
      <>
        <input name="name" id="add-title" className="popup__input popup__input_type_title" placeholder="Название"
               required minLength="2" maxLength="30" ref={name} />
        <span id="add-title-error" className="popup__error"></span>
        <input name="link" id="add-url" type="url" className="popup__input popup__input_type_src"
               placeholder="Ссылка на картинку" required ref={link} />
        <span id="add-url-error" className="popup__error"></span>
      </>
    </PopupWithForm>
  )
}

export default AddPlacePopup;