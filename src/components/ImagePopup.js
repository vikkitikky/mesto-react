import React from 'react';

function ImagePopup ({card, onClose}) {
  return (
    <section className={`popup popup_type_card-view ${card ? ' popup_visible' : ''}`}>
      <div className="popup__card-view">
        <button type="button" className="popup__close-btn popup__close-btn_form_view"
            onClick={onClose}></button>
        <img className="popup__image" src={card ? card.link : '#'} alt={card.name} />
        <h3 className="popup__card-title">{card.name}</h3>
      </div>
    </section>
  )
}

export default ImagePopup;