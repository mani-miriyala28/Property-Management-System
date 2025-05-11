import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Signup from "./pages/auth/Signup";
import CheckAccount from "./components/auth/CheckAccount";
import SignupPrompt from "./components/auth/SignupPrompt";
import LoginV2 from "./pages/auth/LoginV2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<LoginV2 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/check-account" element={<CheckAccount />} />
        <Route path="/signup-prompt" element={<SignupPrompt />} />
      </Routes>
    </Router>
  );
}

export default App;
