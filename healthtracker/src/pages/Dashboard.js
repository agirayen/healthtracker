import React, { Component } from 'react'
import SearchBar from '../search';
import Like from '../workout';
import '../App.css';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      userData:"",
    };
  }
  componentDidMount() {
    fetch("http://localhost:5002/dashboard",{
          method:"POST",
          crossDomain:true,
          headers:{
            "Content-Type": "application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*"
          },
          body:JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");
          this.setState({ userData: data.data })
          if(data.data === "token expired") {
            alert("Token expired login again")
            window.localStorage.clear();
            window.location.href = "./sign-in";
          }
        });
  }
  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  }
  render(){
  return (
    <div className ="dash">
        <div className="header">
        <h1>🍕🥗Nutrition Tracker🏋️</h1>
        <h4>Women need 1,600–2,400 daily calories.</h4>
        <h4>Men need 2,000–3,000 calories.</h4>
        <br />
        <button onClick={this.logOut}className="btn btn-primary">Logout</button>
        <div className="cardPart">
          <div className="container">
            <SearchBar />
          </div >
          <div className="iconFa">
            <Like />
          </div >
        </div>
      </div>
    </div>
  )
}
}

