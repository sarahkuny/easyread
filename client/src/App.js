import "./App.css";
import "./output.css";
import "./components/SignUp"
import SignUp from "./components/SignUp";
import Header from "./components/Header";

function App() {
  return (
  <>

    <Header buttonOne="Sign Up" buttonTwo="Log In" linkOne="/signup" linkTwo="/login"/>
  </>
  )
}

export default App;
