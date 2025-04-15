import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/SignIn";
import Profile from "./pages/User";
import ReduxTest from "./components/ReduxTest";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<><Home /><ReduxTest /></>} />
        <Route path="/signin" element={<Login />} />
        <Route path="/user" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
