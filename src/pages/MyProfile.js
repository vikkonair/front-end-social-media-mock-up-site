import logo from "../profile.png";
import React, { useState } from "react";

function MyProfile(props) {
  const [fields, setFields] = useState({
    'email': props.email,
    'username': JSON.parse(localStorage.getItem(props.email))['username'],
    'password': JSON.parse(localStorage.getItem(props.email))['password'],
    'date':JSON.parse(localStorage.getItem(props.email))['date']
  }); //dictionary record attributes in fields

  const handleEdit = (event) => { 
    localStorage.removeItem(props.email); //remove props' email data
      localStorage.setItem(fields.email, JSON.stringify(fields)) //edit local storage's data
      alert('edit successfully')
    }
  
    const handleDelete = (event) => {   //delete account
      
      if (window.confirm('are you sure to delete this account?')) {
        localStorage.removeItem(props.email);
        alert('delete successfully')
      }
    }
    const handleInputChange = (event) => {   // for typing word
    const name = event.target.name;
    const value = event.target.value;   
    

    // Copy fields.
    const temp = { username: fields.username , email:fields.email , password: fields.password  }; // copy state
    // OR use spread operator.
    // const temp = { ...fields };

    // Update field and state.
    temp[name] = value;
      setFields(temp); 
      

    }
      const handleSubmit = (event) => { // prevent default action    action handler
        event.preventDefault();
      }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h1 className="display-4">My Profile</h1>
      <div style={{ width: "200px;" }}>
        <div style={{ "float": "left" }}>
          <img src={logo} alt="logo" width ="90px" height ="96px"/>
        </div>
        <div style={{ "float": "left" }}>
          {/* style = dic css format */}
            <div className="form-group">
              {/* <label htmlFor="email" className="control-label"></label> */}
              <input name="username" id="username" className="form-control" placeholder="Username" 
                value={fields.username} onChange={handleInputChange}/>
            </div>
            <div>
              {/* <label htmlFor="email" className="control-label"></label> */}
              <input name="email" id="email" className="form-control" placeholder="email" style={{width : "300px"}} 
              value={fields.email} onChange={handleInputChange}/>
          </div> 
          
        </div>
        <div style={{ "float": "right" }}>
          <h5 className="form-group">
              <input type="button" onClick ={handleEdit}  className="btn btn-primary" value="edit" />
              
          </h5>
          <h5 className="form-group">
              <input type="button" onClick={handleDelete } className="btn btn-primary" value="delete" />
          </h5>
          </div>
        
      </div>
      <br></br>
      <div>
        <h5 style={{ "clear": "both" }}> Joined:{JSON.parse(localStorage.getItem(props.email))['date']}</h5>
          {/* joined date */}
        </div>
        </form>
    </div>
  );
}

export default MyProfile;
