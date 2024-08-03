import React from 'react';
import { Button } from '../button';

function Header() {
  return (
    <div className="header-container">
      <img src="/logo.svg" alt="Logo" className="logo" />
      <h1 className="header-title _text-purple-900">PACK&FLY</h1>
      <Button className=" heading-right sign-in-button">
        SIGN IN
      </Button>
    </div>
  );
}

export default Header;
