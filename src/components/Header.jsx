import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Header = () => {
  const [context, setcontext] = useContext(ThemeContext);
  const mode = context === "light" ? false : true;

  const handleClick = () => {
    setcontext(context === "light" ? "dark" : "light");
  };

  return (
    <div className="Header">
      <h1>Rick and Morty</h1>
      <button type="button" onClick={handleClick} className={!mode ? "btnlight" : "btndark"}>
        {!mode ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
};

export default Header;
