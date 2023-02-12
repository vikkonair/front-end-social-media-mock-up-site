import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

function Login(props) {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  
  // Generic change handler.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Copy fields.
    const temp = { email: fields.email, password: fields.password };
    // OR use spread operator.
    // const temp = { ...fields };

    // Update field and state.
    temp[name] = value;
    setFields(temp);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // const verified = verifyUser(fields.username, fields.password);
    localStorage.getItem(fields.email)  // localStorage is global var
    const verified = (fields.password === JSON.parse(localStorage.getItem(fields.email))['password']);

    // If verified login the user.
    if (localStorage.getItem(fields.email) == null) {
      setErrorMessage("Email or Password invalid, please try again.");
      return;
    }
    if(verified === true) {
            props.loginUser(JSON.parse(localStorage.getItem(fields.email))['username'], fields.email);
      // Navigate to the home page.
      navigate('/');
      return;
    }

    // Reset password field to blank.
    const temp = { ...fields };
    temp.password = "";
    setFields(temp);

    // Set error message.
    
  }

  return (
    <div>
      <h1>Login</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="control-label">Email</label>
              <input name="email" id="email" className="form-control" placeholder="email" 
                value={fields.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">Password</label>
              <input type="password" name="password" id="password" className="form-control" placeholder = "password"
                value={fields.password} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
            {errorMessage !== null &&
              <div className="form-group">
                <span className="text-danger">{errorMessage}</span>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
