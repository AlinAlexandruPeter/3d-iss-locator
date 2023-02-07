import { useState } from "react";
import logo from "../assets/logo.png"

export default function Header(props) {
  const { handleClick } = props;

  return (
    <header>
      <section className="header">
        <img src={logo} alt="Logo" />
        <h1>ISS Tracker</h1>
      </section>
      <button onClick={handleClick}>Camera</button>
    </header>
  );
}
