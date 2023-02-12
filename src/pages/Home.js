import React from "react";
import {Link} from "react-router-dom";

function Home(props) {
  return (
    <div className="text-center">
      <h1 className="display-4">Loop Agile Now</h1>
      <br></br>
      <p>Your Community, Your Social Media</p>
      <br></br>
      <p>Please login to resume your journey</p>
      <p>If you do not have a profile yet, please signup to begin</p>
      <br></br>
      <p>Click <Link to="/about">here</Link> to see more detailed information of this platform</p>
      {props.user.username !== null && 
      <>
      <h4><strong>Hello {props.user.username}!</strong></h4>
      <h5>Anything new today?</h5>
      <h5>Feel free to post anything or comment down other's post</h5>
      <br></br>
      <h5>Head to <Link to="/forum">here</Link> to do so</h5>
      </>
      }
    </div>
  );
}

export default Home;
