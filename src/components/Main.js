import React from 'react';
import Card from "./Card";

function Main ({
           onEditAvatar,
           onEditProfile,
           onAddPlace,
           userName,
           userDescription,
           userAvatar,
           cards,
           onCardClick
         }) {
  const cardList = cards.map((cardItem, i) => <Card card={cardItem} onCardClick={onCardClick} key={i}/>)

  return (
    <main className="content">

      <section className="profile">
        <div onClick={onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
          <div className="profile__edit-avatar"></div>
        </div>
        <div className="profile__info">
          <div>
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__about">{userDescription}</p>
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