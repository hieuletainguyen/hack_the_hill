import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "./Home";
import { Assessment } from "./Assessment";
import { GoalSetting } from "./GoalSetting";
import { PlanSelection } from "./PlanSelection";
import {Login} from './Login';
import {Signup} from './Signup'
import {Survey} from './Survey'
// import { Login } from "./Login";

function App() {

  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/survey" element={<Survey />} />
        <Route path="/home" element={<Home />} />
         <Route path= "/login" element={<Login />}/> 
         <Route path="/signup" element={<Signup />}/>
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/goal-setting" element={<GoalSetting />} />
        <Route path="/plan" element={<PlanSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
