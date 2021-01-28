import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup () {
  return (
    <PopupWithForm
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
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