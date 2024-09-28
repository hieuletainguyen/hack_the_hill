import {useState} from "react";

function App() {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordClick = () => {
    setShowPassword(!showPassword);
  }
  const submitClick = () => {
    
  }

  return (
    <div>
      <div>
        <label>Email Address</label>
        <input type="text" />
      </div>
      <div>
        <label>Password</label>
        <input type="text"  /> 
      </div>
      <button>Submit</button>
    </div>
  );
}

export default App;
