import React from "react";
import EventForm from "./EventForm";
import firebase from "../firebase/firebase";
import Footer from "./Footer";
import AdminNav from "./AdminNav"


class EditSingleEvent extends React.Component {

    constructor(){
        super()
        this.state={
        }
    }

    componentWillMount = () => {
        firebase.database().ref("Events/" + this.props.match.params.eventkey).once("value").then((snapshot) => {
            const eventToEdit = snapshot.val();
            this.setState(() => ({eventToEdit}))
        })
    }

    onSubmit = (updates) => {
        const ref = firebase.storage().ref("images")
        firebase.database().ref("Events/" + this.props.match.params.eventkey).update(updates)
        ref.put(updates.img).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
          });
    }

    render(){
        return(
            <div>
            <AdminNav />
            {this.state.eventToEdit && <EventForm {...this.state.eventToEdit} btn="Upravit" onSubmit={this.onSubmit}/>}
            <Footer />
            </div>
        )
    }

}

export default EditSingleEvent