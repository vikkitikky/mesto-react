import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {currentUserContext} from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import SubmitDeletePopup from "./SubmitDeletePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardToDelete, setCardToDelete] = React.useState(null);

  React.useEffect(() => {
    api.prepareDataForRender()
      .then(([userProfile, cardList]) => {
        setCurrentUser(userProfile);
        setCards([...cardList]);
      })
      .catch(err => {
        console.log(err)
      })
  },[])

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
    document.addEventListener('keydown', handleEscButton);
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
    document.addEventListener('keydown', handleEscButton);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
    document.addEventListener('keydown', handleEscButton);
  }

  function handleDeleteCardClick(card) {
    setIsDeletePopupOpen(true);
    setCardToDelete(card);
    document.addEventListener('keydown', handleEscButton);
  }

  function handleEscButton (e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  function stopEvent(e) {
    e.stopPropagation();
  }

  function closeAllPopups() {
    document.removeEventListener('keydown', handleEscButton);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false)
    setSelectedCard({name: '', link: ''});
  }

  function handleCardClick (card) {
    setSelectedCard(card);
    document.addEventListener('keydown', handleEscButton);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    });
  }

  function handleCardDelete() {
    api.deleteCard(cardToDelete)
      .then(() => {
        const newCards = cards.filter(c => c._id !== cardToDelete);
        setCards(newCards);
        closeAllPopups();
      });
  }

  function handleUpdateUser (userInfo) {
    api.setUserInfo(userInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })

  }

  function handleUpdateAvatar(user) {
    api.setAvatar(user.avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
  }

  return (
   <currentUserContext.Provider value={currentUser}>

      <Header />

       <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />


          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            stopClose={stopEvent}
            onUpdateAvatar={handleUpdateAvatar}
          />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          stopClose={stopEvent}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          stopClose={stopEvent}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          stopClose={stopEvent}
        />

        <SubmitDeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          stopClose={stopEvent}
          onDelete={handleCardDelete}
        />

      <Footer />
    </currentUserContext.Provider>
  );
}

export default App;