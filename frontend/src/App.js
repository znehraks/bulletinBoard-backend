import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/styles/theme";
import Home from "./screens/Home";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Home></Home>
      </ThemeProvider>
    </>
  );
};

export default App;
