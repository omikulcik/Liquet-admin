import React from "react";
import EventForm from "./EventForm";
import firebase from "../firebase/firebase";
import AdminNav from "./AdminNav"
import Footer from "./Footer";


export default class AddEvent extends React.Component  {

    constructor(){
        super()
        this.state = {
            uploaded: false
        }
    }

    onSubmit = (newEvent) => {
        firebase.database().ref("Events").push(newEvent).then(() =>{
            this.setState(() => ({uploaded:true}));
            setTimeout(function(){this.setState(() => ({uploaded:false}))}.bind(this), 3000)
        })
      };

    render(){
        return(
            <div>
            <div>
                <AdminNav />
                <EventForm btn="Vytvořit událost" onSubmit={this.onSubmit} uploaded={this.state.uploaded}/>
                <Footer />
            </div>
        </div>
        )
    }
}

