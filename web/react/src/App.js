"use strict";

import React, { useState } from "react";
import { render } from "react-dom";
import Header from "./Header";
import Footer from "./Footer";
import Dashboard from "./Dashboard";

function App() {
  return (
    <React.StrictMode>
      <div>
        <Header />
        <main>
          <Dashboard />
          <div className="game-card" id="game-card"></div>
        </main>
        <Footer />
      </div>
    </React.StrictMode>
  );
}

render(<App />, document.getElementById("root"));
