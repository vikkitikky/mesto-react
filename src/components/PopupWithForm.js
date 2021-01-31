import React from 'react';
import {loadingContext} from "../contexts/LoadingContext";

function PopupWithForm ({
                          isOpen,
                          onClose,
                          stopClose,
                          onSubmit,
                          name,
                          title,
                          children,
                          isValid
}) {
  const loadingText = React.useContext(loadingContext);

  return (
    <section className={`popup popup_type_${name} ${isOpen && ' popup_visible'}`} onClick={onClose}>
      <form className='popup__form' name={name} onSubmit={onSubmit} noValidate onClick={stopClose}>
        <button type="button" className="popup__close-btn" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        {children}
        <button type="submit" disabled={!isValid} className="popup__submit-btn">{loadingText}</button>
      </form>
    </section>
  )
}

export default PopupWithForm;