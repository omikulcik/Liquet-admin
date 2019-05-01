import React from "react";
import AdminNav from "./AdminNav";
import Footer from "./Footer";
import firebase from "../firebase/firebase";
import moment from "moment";
import {Progress} from "reactstrap";


export default class Admin extends React.Component {

    constructor(){
      super()
      this.state={}
    }
  
    componentWillMount= () => {
     firebase.database().ref("Events").once("value").then((snapshot) => {
       const events = [];
       const timeStamps = [];
       snapshot.forEach((childSnapshot) =>{
         events.push(childSnapshot.val());
         childSnapshot.val().registration && timeStamps.push(Object.values(childSnapshot.val().registration).map((singleReg) => singleReg.registrationTimeStamp)[0])
       });
       this.setState(() => ({events, timeStamps}))
     })
    };

    render(){
        return(
            <div>
                <AdminNav />
                <div className="container">
                    <p>Nové registrace tento týden :</p>
                    <Progress 
                        striped color="success"
                        max="25"
                        value={this.state.timeStamps && this.state.timeStamps.filter(timeStamp => timeStamp > moment().startOf("week").format("x") && timeStamp < moment().endOf("week").format("x")).length}
                        >
                        {this.state.timeStamps && this.state.timeStamps.filter(timeStamp => timeStamp > moment().startOf("week").format("x") && timeStamp < moment().endOf("week").format("x")).length} Z cíle 25
                    </Progress>
                    <p>Nové registrace tento měsíc :</p>
                    <Progress 
                        striped color="primary"
                        max="25"
                        value={this.state.timeStamps && this.state.timeStamps.filter(timeStamp => timeStamp > moment().startOf("month").format("x") && timeStamp < moment().endOf("month").format("x")).length}
                        >
                        {this.state.timeStamps && this.state.timeStamps.filter(timeStamp => timeStamp > moment().startOf("month").format("x") && timeStamp < moment().endOf("month").format("x")).length} Z cíle 100
                    </Progress>
                    
                </div>
                <Footer />
            </div>
        )
    }

}