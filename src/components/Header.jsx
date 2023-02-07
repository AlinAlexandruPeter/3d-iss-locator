import { useState } from "react";

export default function Header(props) {
  const { handleClick } = props;

  return (
    <header>
      <section className="header">
        <img src="./src/assets/logo.png" alt="Logo" />
        <h1>ISS Tracker</h1>
      </section>
      <button onClick={handleClick}>Camera</button>
    </header>
  );
}
