import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (email == "") {
      alert("Please enter an email");
      return;
    }
    if (password == "") {
      alert("Please enter a new password");
      return;
    }
    if (password2 == "") {
      alert("Please reenter a new password");
      return;
    }

    if (email.match("/[A-Za-z0-9._]+@([a-z]+.){1,}[a-z]+/") == null) {
      alert("Invalid email entered");
      return;
    }

    if (password.match("/[A-Za-z0-9]{8, }") == null) {
      alert("Invalid password entered");
      return;
    }

    if (password != password2) {
      alert("Passwords do not match");
      return;
    }
  };

  return (
    <div className="forgotpassword container">
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email </label>
        <br />
        <input
          type=""
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">New Password </label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label htmlFor="password2">Reenter New Password </label>
        <br />
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
