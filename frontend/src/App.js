import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import { GoalSetting } from "./components/GoalSetting";
import { PlanSelection } from "./components/PlanSelection";
import {LoginSignup} from './components/LoginSignup';
import {Survey} from './components/Survey'
// import { Login } from "./Login";
import { useState } from 'react';

function App() {
  const [status, setStatus] = useState({
    login: true, 
    username: 'Scott'
  })
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/survey" element={<Survey  status={status}/>} />
        <Route path="/home" element={<Home status={status} />} />
         <Route path= "/" element={<LoginSignup status={status} setStatus={setStatus}/>}/> 
        <Route path="/goal-setting" element={<GoalSetting status={status}/>} />
        <Route path="/plan" element={<PlanSelection status={status}/>} />
      </Routes>
    </Router>
  );
}

export default App;