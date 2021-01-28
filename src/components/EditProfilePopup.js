import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup ({isOpen, onClose}) {
  const {name, setName} = React.useState('');
  const {description, setDescription} = React.useState('');

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={'edit-profile'}
      title={'Редактировать профиль'}
      buttonText={'Сохранить'}
    >
      <>
        <input name="name" id="edit-name" className="popup__input popup__input_type_name" placeholder="Имя" required
               minLength="2" maxLength="40" />
        <span id="edit-name-error" className="popup__error"></span>
        <input name="about" id="edit-about" className="popup__input popup__input_type_job" placeholder="О себе"
               required minLength="2" maxLength="200" />
        <span id="edit-about-error" className="popup__error"></span>
      </>
    </PopupWithForm>
  )
}

export default EditProfilePopup;