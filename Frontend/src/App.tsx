import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Login1 from "./pages/auth/Login1";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/logi1" element={<Login1 />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
