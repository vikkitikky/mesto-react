import React from 'react';

function ImagePopup () {
  return (
    <section className="popup popup_type_card-view">
      <div className="popup__card-view">
        <button type="button" className="popup__close-btn popup__close-btn_form_view"></button>
        <img className="popup__image" src="#" alt="" />
        <h3 className="popup__card-title"></h3>
      </div>
    </section>
  )
}

export default ImagePopup;