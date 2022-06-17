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
        linkOne="/signup"
        linkTwo="/login"
      />
      <Banner />
    </>
  );
}

export default App;
