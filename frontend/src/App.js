import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "./Home";
import { Assessment } from "./Assessment";
import { GoalSetting } from "./GoalSetting";
import { PlanSelection } from "./PlanSelection";
// import { Login } from "./Login";

function App() {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordClick = () => {
    setShowPassword(!showPassword);
  }
  const submitClick = () => {
    
  }

  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        {/* <Route path "/login" element={<Login />} /> */}
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/goal-setting" element={<GoalSetting />} />
        <Route path="/plan" element={<PlanSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
