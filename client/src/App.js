import "./App.css";
import "./output.css";
import "./components/SignUp";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import Banner from "./components/Banner";

function App() {
  return (
    <>
      <Header
        buttonOne="Sign Up"
        buttonTwo="Log In"
        // buttonThree="About"
        linkOne="/signup"
        linkTwo="/login"
        // linkThree="/about"
      />
    </>
  );
}

export default App;
