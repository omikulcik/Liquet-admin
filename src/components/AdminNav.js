
import React from "react";
import {Link} from "react-router-dom";
import "../scss/nav.scss"
import firebase from "../firebase/firebase";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
  
  export default class Navigation extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    logOut = () =>{
      firebase.auth().signOut()
    }

    render() {
      return (
        <div  className="container-fluid nav-container">
          <div className="container">
            <Navbar  light expand="md">
              <NavbarBrand href="/">OM Admin</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                      <Link to="/" className="nav-link">Dashboard</Link>
                  </NavItem>
                  <NavItem>
                      <Link to="/addevent" className="nav-link">Přidat událost</Link>
                  </NavItem>
                  <NavItem>
                      <Link to="/registeredtable" className="nav-link">Přehled registrací</Link>
                  </NavItem>
                  <NavItem>
                      <Link to="/editevent" className="nav-link">Upravit událost</Link>
                  </NavItem>
                  <NavItem>
                      <button className="nav-link" onClick={this.logOut} >Odhlásit</button>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        </div>
      );
    }
  }
