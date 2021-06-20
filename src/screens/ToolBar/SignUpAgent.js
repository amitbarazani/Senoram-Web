import React, { Component } from 'react';
//import './Toolbar.css';
import firebase from '../../Firebase/Firebase';
import TextField from '@material-ui/core/TextField';
import UserInfo from './UserInfo';
import logo from '../logo_Royal.jpeg';
import ship from '../ship.jpeg';
import axios from '../../Firebase/axios';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const style ={
    
  width: '50%',
  position: 'center',
}

//import {nameUser} from './UserInfo';

class Login extends Component {
    constructor(props) {
        super(props);
        this.SignUp = this.SignUp.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            fullName: '',
            password: '',
            idNumber: '',
            role: 'Agent',

            
        };
    }


    SignUp(e) {


      let a;
      if (this.state.email != '' && this.state.fullName != '' && this.state.password != '' && this.state.idNumber != '')
      {
       
        UserInfo.nameUser = this.state.fullName;
        console.log(UserInfo.nameUser);
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            
        }).then((res) => {
          const user = firebase.auth().currentUser;
           user.updateProfile({ displayName: this.state.fullName })
        

           
          })

          .then(()=>{
            firebase.auth().onAuthStateChanged((userResult) => {
             
              axios.put('/Agents/' + this.state.idNumber + '.json', this.state).then(function (response) {
                console.log(response);
                a = response.data.name;
                
            
  
                 
                    

        })


              if (userResult) {
                userResult.updateProfile({
                  displayName: this.state.fullName,
                 
                  
              
               
                })
                .catch(function(error) {
                  // An error happened.
                });
              } 
          });
          })
          .then((something) =>{

            axios.put('/Clients/' + this.state.idNumber + '.json', this.state).then(function (response) {
              console.log(response);
              a = response.data.name;
              window.location.href = "../MenuAgent";
               
                  

      })

            
            
          })
        
          

      .then(()=>{
        //window.location.href = "../MenuAgent";
       
      })
        
        .catch((error) => {
            alert("Error Accured. Try Again!");
        });

      }

      else {
        alert("Make Sure To Follow The Instructions");
      }
       
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

   

    render() {
        return (
          <div style={{ 
            backgroundImage: `url(${ship})` ,backgroundPositionX:'50% ' ,height: '1000px' ,backgroundRepeat: 'no-repeat' , margin:' 0 auto'}} >
             
    
        
    <span>
           <a href="/HomePage" target="_self" >           
           <img src={"https://logodownload.org/wp-content/uploads/2020/02/royal-caribbean-logo-4.png"}   style={{ 
     padding: '30px ',
     width: "400px",
  height: "150px",}} />
         </a>
       </span>

       <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
 
 >

<Card style={style}>
              
              <br></br>
                <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
                <br></br>
                <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">

                <br></br>
                <TextField id="outlined-basic"  required={true}  value={this.state.fullName} name="fullName" label="Full Name" variant="outlined"  onChange={this.handleChange}/>
                <br></br>
                <br></br>
                     

                        <TextField id="outlined-basic" required={true} value={this.state.email} name="email" label="Email" variant="outlined" onChange={this.handleChange} />
                        
                        <br></br>
                        <br></br>
                        <TextField id="outlined-basic"  required={true}  value={this.state.password} name="password" label="Password" type='password' variant="outlined"  onChange={this.handleChange}/>
                    
                    <br></br>
                    <br></br>

                        <TextField id="outlined-basic"  required={true}  value={this.state.idNumber} name="idNumber" label="ID" variant="outlined"  onChange={this.handleChange}/>
                    
            
                    
                    <br></br>
                    <br></br>

                        <button id="buttClose" type="button" onClick={this.SignUp} class="btn btn-lg btn-primary">Create an Acount</button>


                    

                    <p className="text-center my-3">
                       Already have an acount? {" "}
                        <a href="/LoginAgent" className="text-blue-500 hover:text-blue-600"> Sign in here</a>
                        <br />{" "}
                     
                    </p>
                    
                </div>
                <br></br>
                <br></br>

                </Card>
                </Grid>
            </div>




        );
    }
}
export default Login;


// <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="הכנס אימייל" />