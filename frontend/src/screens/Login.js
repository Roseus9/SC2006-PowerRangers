import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email == "") {
      alert("Please enter an email");
      return;
    }
    if (email.match("/[A-Za-z0-9._]+@([a-z]+.){1,}[a-z]+/") == null) {
      alert("Invalid email entered");
      return;
    }

    if (password == "") {
      alert("Please enter a password");
      return;
    }
  };

  return (
    <div className="container login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email </label>
        <br />
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password </label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="checkbox" name="rememberflag"></input>
        <label htmlFor="rememberflag">Remember me</label>
        <br />
        <a href="forgotpassword.html">Forgot password</a>
        <br />
        <button type="submit">Login</button>
        <br />
        <a href="register.html">Create Account</a>
      </form>
    </div>
  );
};

export default Login;
