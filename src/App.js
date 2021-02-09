import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import Characters from "./components/Characters";
import ThemeContext from "./context/ThemeContext";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

function App() {
  // const [darkmode, setdarkmode] = useState(false);
  const [context, setcontext] = useState("light");

  return (
    <ThemeContext.Provider value={[context, setcontext]}>
      {/* <div className={darkmode ? "App light" : "App dark"}> */}
      <div className={`App ${ThemeContext}`}>
        {/* <Header mode={darkmode} setmode={(mode) => setdarkmode(mode)} /> */}
        <Header />
        <hr />
        <Characters />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
