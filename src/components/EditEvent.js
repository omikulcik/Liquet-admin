import React from "react";
import firebase from "../firebase/firebase";
import {Link} from "react-router-dom";
import AdminNav from "./AdminNav";
import {Button} from "reactstrap";
import Footer from "./Footer"



class EditEvent extends React.Component {

    constructor(){
        super()
        this.state={
            events:[]
        }
    }

    componentWillMount = () => {
        firebase.database().ref("Events").once("value").then((Snapshot) => {
            const events = [];

            Snapshot.forEach(childSnapshot => {
                events.push({
                    evkey: childSnapshot.key,
                    ...childSnapshot.val()})
            });
            this.setState(() => ({events}))
        })
    }

    render(){
        return(
            <div>
                <AdminNav />
                <div className="container">
                    <div className="row">
                        {this.state.events.map((event) => {
                         return   ( 
                        <div className="col-3" key={event.evkey}>
                            <h3>{event.name}</h3>
                            <img src={event.img} alt=""></img>
                            <p>{event.date}</p>
                            <p>{event.desc}</p>
                             <Button>
                                 <Link to={'editevent/'+ event.evkey}>Upravit</Link>
                             </Button>
                        </div>)}
                        )}
                    </div>                    
                </div>
                <Footer />
            </div>
        )
    }

}

export default EditEvent