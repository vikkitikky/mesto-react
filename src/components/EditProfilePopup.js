import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {currentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup ({isOpen, onClose, stopClose, onUpdateUser, onInput}) {
  const currentUser = React.useContext(currentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.description);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      stopClose={stopClose}
      onSubmit={handleSubmit}
      name={'edit-profile'}
      title={'Редактировать профиль'}
      buttonText={'Сохранить'}
    >
      <>
        <input name="name" id="edit-name" className="popup__input popup__input_type_name" placeholder="Имя" required
               minLength="2" maxLength="40" value={name} onChange={e => setName(e.target.value)}
               onInput={e => onInput(e)}
        />
        <span id="edit-name-error" className="popup__error"></span>
        <input name="about" id="edit-about" className="popup__input popup__input_type_job" placeholder="О себе"
               required minLength="2" maxLength="200" value={description}
               onChange={(e => setDescription(e.target.value))} onInput={e => onInput(e)} />
        <span id="edit-about-error" className="popup__error"></span>
      </>
    </PopupWithForm>
  )
}

export default EditProfilePopup;