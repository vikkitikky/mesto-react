import React from 'react';
import './App.css';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import PopupWithForm from "./components/PopupWithForm";
import apiUser from "./utils/Api";
import ImagePopup from "./components/ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [userName, setUserName] = React.useState('...');
  const [userDescription, setUserDescription] = React.useState('...');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState('');

  React.useEffect(() => {
    apiUser.prepareDataForRender()
      .then((value => {
        const [userInfo, cardList] = value;
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards([...cardList]);
      }))
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }, [])

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
    setSelectedCard(false);
  }

  function handleCardClick (props) {
    setSelectedCard(props)
  }

  return (
    <div className="page">

      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        userName={userName}
        userDescription={userDescription}
        userAvatar={userAvatar}
        cards={cards}
        onCardClick={handleCardClick}
      />

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name={'edit-avatar'}
        title={'Обновить аватар'}
        children={
          <>
            <input name="avatar" id="edit-avatar" type="url" className="popup__input popup__input_type_avatar" required />
            <span id="edit-avatar-error" className="popup__error"></span>
          </>
        }
        buttonText={'Сохранить'}
      />

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name={'edit-profile'}
        title={'Редактировать профиль'}
        children={
          <>
            <input name="name" id="edit-name" className="popup__input popup__input_type_name" placeholder="Имя" required
                   minLength="2" maxLength="40" />
            <span id="edit-name-error" className="popup__error"></span>
            <input name="about" id="edit-about" className="popup__input popup__input_type_job" placeholder="О себе"
                   required minLength="2" maxLength="200" />
            <span id="edit-about-error" className="popup__error"></span>
          </>
        }
        buttonText={'Сохранить'}
      />

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name={'add-img'}
        title={'Новое место'}
        children={
          <>
            <input name="name" id="add-title" className="popup__input popup__input_type_title" placeholder="Название"
                   required minLength="2" maxLength="30" />
            <span id="add-title-error" className="popup__error"></span>
            <input name="link" id="add-url" type="url" className="popup__input popup__input_type_src"
                   placeholder="Ссылка на картинку" required />
            <span id="add-url-error" className="popup__error"></span>
          </>
        }
        buttonText={'Создать'}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <Footer />

    </div>
  );
}

export default App;
