import React, { Component } from 'react';
//import './Toolbar.css';
import firebase from '../../Firebase/Firebase';
import TextField from '@material-ui/core/TextField';
import logo from '../logo_Royal.jpeg';
import ship from '../ship.jpeg';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const style ={
    
    width: '50%',
    position: 'center',
}

class Login extends Component {
    constructor(props) {
        super(props);
       

        this.handleChange = this.handleChange.bind(this);
        this.forgetPassword = this.forgetPassword.bind(this);

        this.state = {
            email: '',
            password: '',
        };
    }




    forgetPassword(e) {
      e.preventDefault();
      firebase.auth().sendPasswordResetEmail(this.state.email).then(function () {
          alert("Email Sent");
      }).then(function (response) {
        window.location.href = "../LoginAgent";
      }).catch(function (error) {
          alert("Email Not Valid");
      });
  }
  handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
  }

    render() {
        return (
            <div style={{ 
                backgroundImage: `url(${ship})` ,height: '900px' ,width:'80%' ,backgroundRepeat: 'no-repeat' , margin:' 0 auto'}} >
                 
        
            
        <span>
               <a href="/HomePage" target="_self" >           
               <img src={"https://logodownload.org/wp-content/uploads/2020/02/royal-caribbean-logo-4.png"}   style={{ 
     padding: '30px ',
     width: "400px",
  height: "150px",}} />
             </a>
           </span>
                          <br></br>
        
                          <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
         
         >
        
        <Card style={style}>
                   <br></br>
             <h1 className="text-3xl mb-2 text-center font-bold">Password Reset</h1>
             
                <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
                <br></br>
                <TextField id="outlined-basic"  required={true}  value={this.state.email} name="email" label="Email" variant="outlined"  onChange={this.handleChange}/>
                <br></br>
                <br></br>


                <button id="buttClose" type="button" onClick={this.forgetPassword} class="btn btn-lg btn-primary">Reset Password</button>
        
                <br></br> 
                <br></br> 

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