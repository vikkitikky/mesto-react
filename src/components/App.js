import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {currentUserContext} from "../contexts/CurrentUserContext";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect (() => {
    api.prepareDataForRender()
      .then(([userProfile, cardList]) => {
        setCurrentUser(userProfile);
      })
      .catch(err => {
        console.log(err)
      })
  },[])

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
    document.addEventListener('keydown', handleEscButton)
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
    document.addEventListener('keydown', handleEscButton)
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
    document.addEventListener('keydown', handleEscButton)
  }

  function handleEscButton (evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function closeAllPopups () {
    document.removeEventListener('keydown', handleEscButton)
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  return (
   <currentUserContext.Provider value={currentUser}>

    <>

      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name={'edit-avatar'}
        title={'Обновить аватар'}
        buttonText={'Сохранить'}
      >
        <>
          <input name="avatar" id="edit-avatar" type="url" className="popup__input popup__input_type_avatar" required />
          <span id="edit-avatar-error" className="popup__error"></span>
        </>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name={'add-img'}
        title={'Новое место'}
        buttonText={'Создать'}
      >
        <>
          <input name="name" id="add-title" className="popup__input popup__input_type_title" placeholder="Название"
                 required minLength="2" maxLength="30" />
          <span id="add-title-error" className="popup__error"></span>
          <input name="link" id="add-url" type="url" className="popup__input popup__input_type_src"
                 placeholder="Ссылка на картинку" required />
          <span id="add-url-error" className="popup__error"></span>
        </>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <Footer />

    </>
    </currentUserContext.Provider>
  );
}

export default App;