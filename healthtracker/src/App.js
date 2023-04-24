
import React from "react";
import SearchBar from "./search";
import Like from "./workout";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>🍕🥗Calories Tracker🏋️</h1>
        <h3>Women need 1,600–2,400 daily calories.</h3>
        <h3>Men need 2,000–3,000 calories.</h3>
        <div className="cardPart">
          <card className="container">
            <SearchBar />
          </card>
          <card className="iconFa">
            <Like />
          </card>
        </div>
      </div>
    </div>
  );
}

export default App;