import React from "react";
import AdminNav from "./AdminNav";
import ReactTable from "react-table";
import firebase from "../firebase/firebase"
import 'react-table/react-table.css';
import Footer from "./Footer";

class RegisteredTable extends React.Component {

  constructor(){
    super()
    this.state={data:[]}
  }

  componentWillMount= () => {
   firebase.database().ref("Events").once("value").then((snapshot) => {
     const data = [];
     snapshot.forEach((childSnapshot) =>{
       data.push(childSnapshot.val())
     });
     this.setState(() => ({data}))
   })
  };

    render(){
      const columns = [{
        Header: 'Událost',
        accessor: 'name'
      }, {
        Header: 'Datum',
        accessor: 'date',
      }, {
        Header: 'Registrovaní lidé',
        columns:[{
          Header: "Jméno",
          id:"RegisteredNames",
          accessor: d => d.registration && Object.values(d.registration).map((singleReg) => <p key={singleReg.registrationTimeStamp}>{singleReg.name}</p>)
        },
        {
          Header: "Počet osob",
          id:"RegisteredCount",
          accessor: d => d.registration && Object.values(d.registration).map((singleReg) => <p key={singleReg.registrationTimeStamp}>{singleReg.personCount}</p>)
        },
        {
          Header: "Voucher",
          id:"RegisteredVoucher",
          accessor: d => d.registration && Object.values(d.registration).map((singleReg) => <p key={singleReg.registrationTimeStamp}>{singleReg.voucherCode}</p>)
        },
      
      ]
      }];

        return(
          <div>
            <AdminNav />
            <ReactTable
            data={this.state.data}
            columns={columns}
            />
            <Footer />
          </div>
        )
    }
} 

export default RegisteredTable