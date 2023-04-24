import React, { Component } from 'react';
import { FaBiking, FaWalking, FaRunning, FaSwimmer} from 'react-icons/fa';
import "./App.css";

class Like extends Component {
  render() {
    return (
    <div >
      <p><b>Below workout benefits you if you exceed your calorie limit😃.</b></p>
      <FaBiking color="purple" fontSize="80px" /><p><b>You have to bike for 30 minutes.</b></p>
       <FaWalking color="purple" fontSize="80px" /><p><b>You have to walk for 45 Minutes</b></p>
       <FaRunning color="purple" fontSize="80px" /><p><b>You have to run for 35 Minutes</b></p>
       <FaSwimmer color="purple" fontSize="80px" /><p><b>You have to swim for 20 Minutes</b></p>
       
    </div>
    ) 
  }
}

export default Like