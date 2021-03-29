import React, { Component } from 'react';
//import './Toolbar.css';
import firebase from '../../Firebase/Firebase';
import TextField from '@material-ui/core/TextField';

import logo from '../logo_Royal.jpeg';
import ship from '../ship.jpeg';
import axios from '../../Firebase/axios';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import emailjs from 'emailjs-com';

const style ={
    
  width: '50%',
  position: 'center',
}

//import {nameUser} from './UserInfo';

class Login extends Component {
    constructor(props) {
        super(props);
        this.Send = this.Send.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            fullName: '',
            subject: '',

            
        };
    }


    Send(e) {


     
      if (this.state.email != '' && this.state.fullName != '' && this.state.subject != '')
      {
       
        emailjs.send("service_8j87v64","template_dsjcrez", { location: this.state.fullName, to: "senormasenorma@gmail.com", attraction: this.state.email , km: this.state.subject}, 'user_QHLfJgEU8DbBaDPnuVHsS')
        .then(function (response) {
            window.location.href ="/HomePage";
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
            backgroundImage: `url(${ship})` ,height: '900px' ,width:'80%' ,backgroundRepeat: 'no-repeat' , margin:' 0 auto'}} >
             
    
        
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
                <h1 className="text-3xl mb-2 text-center font-bold">Contact Us</h1>
                <br></br>
                <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">

                <br></br>
                <TextField id="outlined-basic"  required={true}  value={this.state.fullName} name="fullName" label="Full Name" variant="outlined"  onChange={this.handleChange}/>
                <br></br>
                <br></br>
                     

                        <TextField id="outlined-basic" required={true} value={this.state.email} name="email" label="Email" variant="outlined" onChange={this.handleChange} />
                        
                        <br></br>
                        <br></br>
                        <TextField id="outlined-basic"  required={true}  label="Subject" multiline   name="subject" variant="outlined"  rowsMax={4} value={this.state.subject} onChange={this.handleChange} />
                    
                    <br></br>
                    <br></br>

                        <button id="buttClose" type="button" onClick={this.Send} class="btn btn-lg btn-primary"> Send </button>

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


// <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="הכנס אימייל" />