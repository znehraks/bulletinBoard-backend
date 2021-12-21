import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import isLoggedInContext from "./components/screenComponents/Context";
import { theme } from "./components/styles/theme";
import Home from "./screens/Home";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [me, setMe] = useState({ code: "", user_id: "" });
  return (
    <isLoggedInContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, me, setMe }}
    >
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </isLoggedInContext.Provider>
  );
};

export default App;
