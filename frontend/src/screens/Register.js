import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

const Register = () => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (fname == "") {
      alert("Enter first name");
      return;
    }
    if (fname.match("[A-Za-z ]*[A-Za-z]") == null) {
      alert("Invalid first name entered");
      return;
    }

    if (lname == "") {
      alert("Enter last name");
      return;
    }
    if (lname.match("[A-Za-z ]*[A-Za-z]") == null) {
      alert("Invalid last name entered");
      return;
    }
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
    <div classname="container register">
      <form onSubmit={handleSubmit}>
        <label for="fname">First Name</label>
        <br />
        <input
          type="text"
          placeholder="Enter first name"
          name="fname"
          value={fname}
          onChange={(e) => setfname(e.target.value)}
          required
        />
        <br />
        <label for="lname">Last Name</label>
        <br />
        <input
          type="text"
          placeholder="Enter last name"
          name="lname"
          value={fname}
          onChange={(e) => setlname(e.target.value)}
          required
        />
        <br />
        <label for="email">Email</label>
        <br />
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label for="password">Password</label>
        <br />
        <input
          type="text"
          placeholder="Enter password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label for="password2">Confirm Password</label>
        <br />
        <input
          type="text"
          placeholder="Reenter Password"
          name="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />

        <br />
        <br />
        <button type="submit" name="register">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
