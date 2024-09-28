import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "./components/Home";
import { Assessment } from "./components/Assessment";
import { GoalSetting } from "./components/GoalSetting";
import { PlanSelection } from "./components/PlanSelection";
import {LoginSignup} from './components/LoginSignup';
import {Survey} from './components/Survey'
// import { Login } from "./Login";

function App() {

  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/survey" element={<Survey />} />
        <Route path="/home" element={<Home />} />
         <Route path= "/signup" element={<LoginSignup />}/> 
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/goal-setting" element={<GoalSetting />} />
        <Route path="/plan" element={<PlanSelection />} />
      </Routes>
    </Router>
  );
}

export default App;