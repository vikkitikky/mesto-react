import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, stopClose, onUpdateAvatar}) {
  const avatar = React.useRef('');

  React.useEffect(() => {
    !isOpen && avatar.current.parentElement.reset();
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value
    });
  }

  return(
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      stopClose={stopClose}
      onSubmit={handleSubmit}
      name={'edit-avatar'}
      title={'Обновить аватар'}
      buttonText={'Сохранить'}
    >
      <>
        <input name="avatar" id="edit-avatar" type="url" ref={avatar} className="popup__input popup__input_type_avatar"
               required />
        <span id="edit-avatar-error" className="popup__error"></span>
      </>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;