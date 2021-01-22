import React from 'react';

function Card ({
           card,
           onCardClick
         }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="element">
      <img className="element__img" src={card.link} alt={card.name} onClick={handleClick} />
      <button type="button" className="element__delete-btn"></button>
      <h2 className="element__title">{card.name}</h2>
      <div className="element__like-group">
        <button type="button" className="element__like-btn"></button>
        <p className="element__like-count">{card.likes.length}</p>
      </div>
    </article>
  )
}

export default Card;