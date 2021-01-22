import React from 'react';
import logo from '../image/logo.svg';

function Header () {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Место.Россия" />
    </header>
  )
}

export default Header;