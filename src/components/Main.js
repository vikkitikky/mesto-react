import React from 'react';
import Card from "./Card";
import api from "../utils/api";
import {currentUserContext} from "../contexts/CurrentUserContext";

function Main ({
           onEditAvatar,
           onEditProfile,
           onAddPlace,
           onCardClick
         }) {
  const [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(currentUserContext);

  React.useEffect(() => {
    api.prepareDataForRender()
      .then((([userInfo, cardList] ) => {
        setCards([...cardList]);
      }))
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(c => c._id !== card._id);
        setCards(newCards);
      });
  }

  const cardList = cards.map((cardItem) =>
    <Card
    card={cardItem}
    onCardClick={onCardClick}
    onCardLike={handleCardLike}
    onCardDelete={handleCardDelete}
    key={cardItem._id}
    />)

  return (
    <main className="content">

      <section className="profile">
        <div onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          <div className="profile__edit-avatar"></div>
        </div>
        <div className="profile__info">
          <div>
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about">{currentUser.description}</p>
          </div>
          <button type="button" className="profile__edit-btn" onClick={onEditProfile}></button>
        </div>
        <button type="button" className="profile__add-btn" onClick={onAddPlace}></button>
      </section>

      <section className="photo">
        {cardList}
      </section>

      <section className="popup popup_type_confirm">
        <form className="popup__form popup__form_type_confirm" name="confirm-form" noValidate>
          <button type="button" className="popup__close-btn popup__close-btn_form_confirm"></button>
          <h3 className="popup__title">Вы уверены?</h3>
          <button type="submit" className="popup__submit-btn popup__submit-btn_form_add">Да</button>
        </form>
      </section>

    </main>
  )
}

export default Main;