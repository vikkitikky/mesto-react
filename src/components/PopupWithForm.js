import React from 'react';

function PopupWithForm ({
                          isOpen,
                          onClose,
                          stopClose,
                          onSubmit,
                          name,
                          title,
                          children,
                          buttonText
}) {

  return (
    <section className={`popup popup_type_${name} ${isOpen && ' popup_visible'}`} onClick={onClose}>
      <form className='popup__form' name={name} onSubmit={onSubmit} noValidate onClick={stopClose}>
        <button type="button" className="popup__close-btn" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        {children}
        <button type="submit" className="popup__submit-btn">{buttonText}</button>
      </form>
    </section>
  )
}

export default PopupWithForm;