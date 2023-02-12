import React, { useState } from "react";


function SignUp(props) {
  const [fields, setFields] = useState({ username: "", email:"",password: "" }); //dictionary record attributes in fields
  const [errorMessage, setErrorMessage] = useState(null);


  // Generic change handler.
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;   
    

    // Copy fields.
    const temp = { username: fields.username , email:fields.email , password: fields.password }; // copy state
    // OR use spread operator.
    // const temp = { ...fields };

    // Update field and state.
    temp[name] = value;
    setFields(temp); 
  }

  const handleSubmit = (event) => { // prevent default action    action handler
    event.preventDefault(); 

  

    const VALID_EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    // Reset password field to blank.

    if (!VALID_EMAIL_REGEX.test(fields.email) || (localStorage.getItem(fields.username) !== null)) {
      setErrorMessage("Email invalid or already existed, please try again.");
      return;
    }

    const VALID_PASSWORD_REGEX = /^(?=.*[A-Z].*)(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/g;
    //const VALID_PASSWORD_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

// (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
// (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
// (?=.*[0-9])	The string must contain at least 1 numeric character
// (?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
// (?=.{8,})	The string must be eight characters or longer

    if (!VALID_PASSWORD_REGEX.test(fields.password)) {
      setErrorMessage("password isn't strong enough, please try again.");
      return;
    }

    if ((fields.username.length === 0) || (localStorage.getItem(fields.username) !== null)) {
      setErrorMessage("username isn't entered or already existed , please try again.");
      return;
    }
    
    fields.date = (new Date().toLocaleString()); //get local computer time
    // localStorage.setItem(fields.email, fields.password);
    localStorage.setItem(fields.email, JSON.stringify(fields));//JSON.stringify restore complex fields    this line restore data to local storage
    
    alert("You have registered successfully")
  }

  return (
    <div>
      <h1>Hi: {fields.username} </h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="control-label">Username</label>
              <input name="username" id="username" className="form-control"
                value={fields.username} onChange={handleInputChange} placeholder='Name' /> 
              {/* onChange web touches onCange event will invoke handelInputChange function */}
            </div>

              <div className="form-group">
              <label htmlFor="email" className="control-label">Email</label>
              <input name="email" id="email" className="form-control" required 
                value={fields.email} onChange={handleInputChange} placeholder='Email' />
            </div>


            <div className="form-group">
              <label htmlFor="password" className="control-label">Password</label>
              <input type="password" name="password" id="password" className="form-control"
                value={fields.password} onChange={handleInputChange} placeholder='Password'/>
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-primary" value="Sign Up" />
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

export default SignUp;