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
                
                if(userResult == null)
                    window.location.href ="/HomePage";
                
                if (userResult.uid != "KzHcw5sAFuSPwgklaLFsC6FhQOp1")
                     window.location.href ="/HomePage";
             
             
            });

      
   

                   
        const itemsRef2 = firebase.database().ref(`Clients/`);
        itemsRef2.on('value', (snapshot) => {
            let reservations = snapshot.val();

           
            let newState = [];
            let newState2 = [];

            for (let reservation in reservations) {
                if (reservations[reservation].role == "Client") {
                    newState.push({
                        fullName: reservations[reservation].fullName,
                        idNumber: reservations[reservation].idNumber,
                        email: reservations[reservation].email,
                        
                    });
                    newState2.push({
                        fullName: reservations[reservation].fullName,
                        idNumber: reservations[reservation].idNumber,
                        email: reservations[reservation].email,

                    });

                    
                }
               
            }
            this.setState({ reservations: newState });
            this.setState({ presentable: newState2 });
        
           
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
            title="Clients"
        


            options={{
                search: true,
                selection: true,
                exportButton: true
              }}


            data={reservations}

            columns={[
                { title: "Full Name", field: 'fullName' } ,
                { title: "ID", field: 'idNumber' },
            ]}

            actions={[
                {
                    tooltip: 'Disable All Selected Clients',
                    icon: 'delete',
                    onClick: (evt, data) => {
                        if (window.confirm("Would you really like to DISABLE ?") === true) {
                            data.forEach(data1 => {
                                
                            

                                axios.delete(`Clients/` + data1.idNumber + '.json');
                              
                                var toPost = { email:  data1.email};
                                axios.put('/Blocked/' +  data1.idNumber + '.json', toPost).then(function (response) {
         
                        
                                     
                                        
                    
                            })
                               

                            });
                        }


                        //axios.delete(`coordinators/` + data[0].id + '.json'),



                    }
                }


            ]}

        ></MaterialTable>


        } else {
            condition = <h3>No Clients Yet!</h3>;
        }

      
       
      
        return (
            <div style={{ 
                backgroundImage: `url(${ship})` ,backgroundPositionX:'50% ' ,height: '1000px' ,backgroundRepeat: 'no-repeat' , margin:' 0 auto'}} >
                 

                 <span>
               <a href="/MenuAdmin" target="_self" >           
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
