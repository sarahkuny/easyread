import React from "react";
import "./App.css";
import "./output.css";
import "./components/SignUp";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div>
      <Header
        buttonOne="Sign Up"
        buttonTwo="Log In"
        linkOne="/signup"
        linkTwo="/login"
      />
      <Homepage />
    </div>
  );
}

export default App;
