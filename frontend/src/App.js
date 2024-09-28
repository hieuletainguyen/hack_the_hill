import { useState, useEffect } from "react";
import Cookies from "js-cookie"

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const decodeToken = async () => {
      const token = Cookies.get("TOKENS")
      const response = await fetch(`http://localhost:9897/decode_token`, {
        method: "POST",
        withCredentials: true,
        credential: true,
        headers: { "Content-Type": "application/json"}, 
        body: JSON.stringify({ token: token})
      })

      const data = await response.json();
      if (data.message === "success"){
        setLogin(true);
      } else {
        setLogin(false)
      }
    }

    decodeToken();
  }, [])

  const showPasswordClick = () => {
    setShowPassword(!showPassword);
  }
  const submitClick = async () => {
    console.log(password)
    console.log(email)
    const response = await fetch(`http://localhost:9897/add-account`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ email: email, password: password })
    })

    const data = await response.json();
    console.log(data)
  }

  const submitLogin = async () => {
    const response = await fetch("http://localhost:9897/auth", {
      method: "POST", 
      withCredentials: true,
      credential: true,
      headers: { "Content-Type": "application/json"}, 
      body: JSON.stringify({ email: email, password: password})
    })

    const data = await response.json();
    console.log(data);
    if (data.message === "success") {
      Cookies.set("TOKENS", data.token, {expires: 1})
    }
  }

  const submitLogout = async () => {
    const response = await fetch(`http://localhost:9897/logout`, {
      method: "POST", 
      withCredentials: true,
      credential: true,
      headers: { "Content-Type": "application/json"}, 
      body: JSON.stringify({ token: Cookies.get("TOKENS")})
    })

    
    const data = await response.json();
    if (data.message === "success") {
      Cookies.remove("TOKENS");
      console.log(data);
    }
  }

  return (
    <div>
      <label>LOGIN: {String(login)}</label>
      <label>SIGN UP</label>
      <div>
        <div>
          <label>Email Address</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} /> 
        </div>
        <button onClick={submitClick}>Submit</button>
      </div>


      <label>SIGN IN</label>
      <div>
        <div>
          <label>Email Address</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} /> 
        </div>
        <button onClick={submitLogin}>Log in</button>
      </div>

      <label>LOG OUT</label>
      <div>
        <label>Remember only if already login</label>
        <button onClick={submitLogout}>Log out</button>

      </div>

    </div>
  );
}

export default App;
