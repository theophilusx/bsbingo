import React from "react";
import Logo from "./bull.svg";

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={Logo} alt="Bull Icon" className="icon-image" />
      </div>
      <div className="header-title">
        <h1 className="title-main">Bullshit Bingo</h1>
        <h2 className="title-subtitle">Make meetings fun again!</h2>
      </div>
    </header>
  );
}

export default Header;
