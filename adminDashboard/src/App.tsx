import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Landing from "./components/Landing";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        padding: 0,
        margin: 0,
        backgroundColor: "#eeeeee",
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<SignIn></SignIn>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/" element={<Landing></Landing>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
