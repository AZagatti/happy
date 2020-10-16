import React from "react";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";

import Routes from "./routes";

import GlobalStyles from "./styles/global";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
