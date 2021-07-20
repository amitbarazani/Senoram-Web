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
            reservations2: null,
            presentable: null,
            presentableBlocked: null,
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
                if (reservations[reservation].role == "Agent") {
                    newState.push({
                        fullName: reservations[reservation].fullName,
                        idNumber: reservations[reservation].idNumber,
                        email: reservations[reservation].email,
                        online: "No",
                        role: "Agent",
                        password: reservations[reservation].password,
                        
                    });
                    newState2.push({
                        fullName: reservations[reservation].fullName,
                        idNumber: reservations[reservation].idNumber,
                        email: reservations[reservation].email,
                        online: "No",
                        role: "Agent",
                        password: reservations[reservation].password,

                    });

                    
                }
               
            }
            this.setState({ reservations: newState });
            this.setState({ presentable: newState2 });
        
           
        });

        
        const itemsRef3 = firebase.database().ref(`Blocked/`);
        itemsRef3.on('value', (snapshot) => {
            let reservations = snapshot.val();

           
            let newState_2 = [];
            let newState2_2 = [];

            for (let reservation in reservations) {
                if (reservations[reservation].role == "Agent") {
                    newState_2.push({
                        fullName: reservations[reservation].fullName,
                        idNumber: reservations[reservation].idNumber,
                        email: reservations[reservation].email,
                        online: "No",
                        role: "Agent",
                        password: reservations[reservation].password,
                    });
                    newState2_2.push({
                        fullName: reservations[reservation].fullName,
                        idNumber: reservations[reservation].idNumber,
                        email: reservations[reservation].email,
                        online: "No",
                        role: "Agent",
                        password: reservations[reservation].password,

                    });

                    
                }
               
            }
            this.setState({ reservations2: newState_2 });
            this.setState({ presentableBlocked: newState2_2 });
        
           
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
        const reservations2 = this.state.presentableBlocked;
        let condition;
        let condition2;
        if (reservations) {
            condition =    <MaterialTable
            style={{ padding: '0 20px'}}
            title="Agents"
        


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
                    tooltip: 'Disable All Selected Agents',
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
            condition = <h3>No Agents Yet!</h3>;
        }

        if (reservations2) {
            condition2 =    <MaterialTable
            style={{ padding: '0 20px'}}
            title="Blocked Agents"
        


            options={{
                search: true,
                selection: true,
                exportButton: true
              }}


            data={reservations2}

            columns={[
                { title: "Full Name", field: 'fullName' } ,
                { title: "ID", field: 'idNumber' },
                { title: "email", field: 'email' },
                { title: "Role", field: 'role' },
                { title: "Online", field: 'online' },
            ]}

            actions={[
                {
                    tooltip: 'Disable All Selected Clients',
                    icon: 'add',
                    onClick: (evt, data) => {
                        if (window.confirm("Would you really like to Enable ?") === true) {
                            data.forEach(data1 => {
                                
                            

                                axios.delete(`Blocked/` + data1.idNumber + '.json');
                              
                                //var toPost = { email:  data1.email};

                                var toPost = { email:  data1.email ,  fullName:  data1.fullName , idNumber:  data1.idNumber , Online: "No", password:  data1.password, role: "Agent" };
                              /*  var toPost2 = [
                                    {"firstName":"John", "lastName":"Doe"},
                                    {"firstName":"Anna", "lastName":"Smith"},
                                    {"firstName":"Peter", "lastName":"Jones"}
                                  ]
                                  */
                                axios.put('/Clients/' +  data1.idNumber + '.json', toPost).then(function (response) {
         
                        
                                     
                                        
                    
                            })
                               

                            });
                        }


                        //axios.delete(`coordinators/` + data[0].id + '.json'),



                    }
                }


            ]}

        ></MaterialTable>


        } else {
            condition2 = <h3>No Blocked Agents Yet!</h3>;
        }
       
      
        return (
            <div style={{ 
                backgroundImage: `url(${ship})` ,backgroundPositionX:'100% ' ,height: '1100px' ,backgroundRepeat: 'repeat' , margin:' 0 auto'}} >

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




{condition2}




</Card>
</Grid>



</div>




            </div>




        );
    }
}
export default Profile;


//   <h3 className="text-3xl mb-2 text-center font-bold">Personal Information</h3>
