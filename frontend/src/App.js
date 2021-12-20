import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/styles/theme";
import Home from "./screens/Home";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Home></Home>
      </ThemeProvider>
    </div>
  );
};

export default App;
