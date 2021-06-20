import React, { Component } from 'react';
import firebase from '../../Firebase/Firebase';
import TextField from '@material-ui/core/TextField';
import axios from '../../Firebase/axios';
import logo from  '../logo_Royal.jpeg';
import ship from '../ship.jpeg';
import Card from '@material-ui/core/Card';
import { CenterFocusStrong } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';

import MaterialTable from 'material-table';




require('firebase/database');


const style ={
    
    width: '50%',
    position: 'center',
}




class Profile extends Component {

    

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            id: '',
            userName: '',
            reservations: null,
            presentable: null,
        };
    }


    componentWillMount() {

            firebase.auth().onAuthStateChanged((userResult) => {
                
                
                this.setState({ userName: userResult.displayName });
                this.setState({ email: userResult.email });
             
            });

      
                const itemsRef = firebase.database().ref(`Agents/`);
                itemsRef.on('value', (snapshot) => {
                    let reservations = snapshot.val();
                    for (let reservation in reservations) {
                
                        if (reservations[reservation].email == this.state.email)
                        {
                            this.setState({ id: reservations[reservation].idNumber });

                        }
                       
                    }
                   
                });

                   
        const itemsRef2 = firebase.database().ref(`Reservations/`);
        itemsRef2.on('value', (snapshot) => {
            let reservations = snapshot.val();

           
            let newState = [];
            let newState2 = [];

            for (let reservation in reservations) {
                if (reservations[reservation].IDAgent == this.state.id) {
                    newState.push({
                        ArriveAt: reservations[reservation].ArriveAt,
                        ArriveTo: reservations[reservation].ArriveTo,
                        departsAt: reservations[reservation].departsAt,
                        departsFrom: reservations[reservation].departsFrom,
                        fullName: reservations[reservation].fullName,
                        idClient: reservations[reservation].idClient,
                        numberNights: reservations[reservation].numberNights,
                        ReservationNumber: reservations[reservation].ReservationNumber,
                        roomCategory: reservations[reservation].roomCategory,
                        ship: reservations[reservation].ship,
                        Status: reservations[reservation].Status,
                        stopPlace: reservations[reservation].stopPlace,
                        stopTime: reservations[reservation].stopTime,
                        Price: reservations[reservation].Price,
                        IDAgent: reservations[reservation].IDAgent,
                        ClientEmail: reservations[reservation].ClientEmail,

                    });
                    newState2.push({
                        ReservationNumber: reservations[reservation].ReservationNumber,
                        Status: reservations[reservation].Status,
                        fullName: reservations[reservation].fullName,
                        ClientEmail: reservations[reservation].ClientEmail,

                    });

                    
                }
               
            }
            this.setState({ reservations: newState });
            this.setState({ presentable: newState2 });
            console.log(this.state.presentable);

           
        });

        

       
            
       
    }


   
    





    login(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            window.location.href = "../MenuAgent";
        })
        
        
        .catch((error) => {
            alert("One of the fields is invalid!");
        });
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    

    render() {
        

        const reservations = this.state.presentable;
        let condition;
        if (reservations) {
            condition =    <MaterialTable
            style={{ padding: '0 20px'}}
            title="Customers"
        
            detailPanel={rowData => {


                let pointer = rowData.ReservationNumber;
                let data;
                for (let i in this.state.reservations) {
                    if (this.state.reservations[i].ReservationNumber == pointer)
                    data = this.state.reservations[i];

                }

                let nights = data.numberNights;
                let stopPlace = data.stopPlace;
                let departsFrom = data.departsFrom;
                let ship = data.ship;
                let departsAt = data.departsAt;
                let ArriveAt = data.ArriveAt;
                let ArriveTo = data.ArriveTo;
                let Price = data.Price;
                let roomCategory = data.roomCategory;
                //console.log(data);
                
                return (
                    <div>
                         <br></br>
                    <p> <b>{nights} Nights on {ship}</b></p>
                    <p><b>Room Type:</b> {roomCategory}</p>
                    <p><b>LEAVING FROM:</b> {departsFrom}, {departsAt} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <b>VISITING:</b> {stopPlace} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <b>RETURNING TO:</b> {ArriveTo}, {ArriveAt} </p>
                      <p><b>{Price}</b></p>

                
               
                    
                    </div>
                        )
              }}


            options={{
                search: false
              }}


            data={reservations}

            columns={[
                { title: "Reservation Number", field: 'ReservationNumber' } ,
                { title: "Status", field: 'Status' },
                { title: "Client Name", field: 'fullName' },
                { title: "Client Email", field: 'ClientEmail' },
            ]}
        ></MaterialTable>


        } else {
            condition = <h3>No Clients Yet!</h3>;
        }

      
       
      
        return (
            <div style={{ 
                backgroundImage: `url(${ship})` ,backgroundPositionX:'50% ' ,height: '1000px' ,backgroundRepeat: 'no-repeat' , margin:' 0 auto'}} >
                 

                 <span>
               <a href="/MenuAgent" target="_self" >           
               <img src={"https://logodownload.org/wp-content/uploads/2020/02/royal-caribbean-logo-4.png"}   style={{ 
     padding: '30px ',
     width: "400px",
  height: "150px",}} />
             </a>
           </span>
 
           
           
              
                <br></br>
               <div>
               <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
 
 >
                <Card style={style}>
                <br></br>
                    <h6><b>Name:</b> {this.state.userName}</h6>
                    <h6><b>Email:</b> {this.state.email}</h6>
                    <h6><b>ID Number:</b> {this.state.id}</h6>
                   
                    <br></br>
                    </Card>
                    </Grid>
                </div>
                <br></br>
                
               

           

                
                <div>
                <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
 
 >
                <Card style={style}>
              
            


{condition}



                    </Card>
                    </Grid>
                    </div>




            </div>




        );
    }
}
export default Profile;


//   <h3 className="text-3xl mb-2 text-center font-bold">Personal Information</h3>
