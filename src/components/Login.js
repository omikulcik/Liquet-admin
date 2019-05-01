import React from "react";
import firebase from "../firebase/firebase";
import {Button} from "reactstrap"




export default class Login extends React.Component {
  constructor(){
    super()
    this.state={
      email: "",
      pass: ""
    }
  }
  handleEmailchange = (e) => {
    const email = e.target.value;
    this.setState(() => ({email}))
  }

  handlePasschange = (e) => {
    const pass = e.target.value;
    this.setState(() => ({pass}))
  }

  onSubmit = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).catch((e) => console.log(e))
  }



  render() {
      return(
<div className="auth container-fluid">
<div className="row">
  <form className="mx-auto" onSubmit={this.onSubmit}>
    <div className="form-item">
      <label >E-mail: </label><input  onChange={this.handleEmailchange} type="text" />
    </div>
    <div className="form-item">
      <label>Heslo: </label> <input onChange={this.handlePasschange} type="password" />
    </div>
    <Button type="submit">Přihlásit</Button>
  </form>
 </div>
</div>
  )}
} 