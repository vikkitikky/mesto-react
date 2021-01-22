import React from 'react';

function PopupWithForm ({
              isOpen,
              onClose,
              name,
              title,
              children,
              buttonText
            }) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? ' popup_visible' : ''}`}>
      <form className='popup__form' name={name} noValidate>
        <button type="button" className="popup__close-btn" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        {children}
        <button type="submit" className="popup__submit-btn">{buttonText}</button>
      </form>
    </section>
  )
}

export default PopupWithForm;