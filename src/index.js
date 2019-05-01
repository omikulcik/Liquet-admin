import "bootstrap/scss/bootstrap.scss";
import "./scss/general.scss"
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import firebase from "./firebase/firebase";
import AppRouter from "./routers/AppRouter";
import Login from "./components/Login";


firebase.auth().onAuthStateChanged((firebaseUser) => firebaseUser ? ReactDOM.render(<AppRouter />, document.getElementById('root')) : ReactDOM.render(<Login />, document.getElementById('root')))




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
