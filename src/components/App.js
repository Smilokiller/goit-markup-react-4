import React, { Fragment } from "react";
import Nav from "./Nav";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
