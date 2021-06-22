import React, { Component } from 'react';
import firebase from '../../Firebase/Firebase';
import TextField from '@material-ui/core/TextField';
import axios from '../../Firebase/axios';
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
        this.login = this.login.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            password: '',
            blocked: 'no',
        };
    }

    login(e) {
        e.preventDefault();

        axios.get('/Blocked.json')
        .then(res => {

            for (let key in res.data) {
                if (res.data[key].email == this.state.email)
                {
                    this.setState({ blocked: "yes" });
                    console.log(this.state.blocked)
                   alert("Sorry, You have been blocked!");
          
                

                }  
                
                  
            }

        }) .then (

        axios.get('/Clients.json')
            .then(res => {
    
                for (let key in res.data) {
                    if (res.data[key].email == this.state.email)
                    {
                       this.setState({ id: res.data[key].idNumber });
                    }  
                    
                      
                }

                if (this.state.blocked == "yes" )
                {
                    console.log("im inn")
                    window.location.href = "../Login"; 
                }
               
                else 
                {
                    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
                    
                   
                    })
            
            
                    .then((something) =>{
            
                        window.location.href = "../MenuAgent";
                   
                     
                       
                       // window.location.href = "../MenuClient";
                        //console.log(response);
                     
                            
            
                
                      })
        
                      
                .catch((error) => {
                    alert("One of the fields is invalid!");
                });
                }
              
        
                
            })
            .catch(err => {
               console.log(err)
            })

            
        )

       

         
        
        
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
                <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
                <br></br>
                <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">

                    <form className="">
                        <label htmlFor="userEmail" className="block">
                            Email:
          </label>

          <br></br>
                <TextField id="outlined-basic"  required={true}  value={this.state.email} name="email" label="Email" variant="outlined"  onChange={this.handleChange}/>
                <br></br>
                <br></br>
                <TextField id="outlined-basic"  required={true}  value={this.state.password} name="password" label="Password" type='password' variant="outlined"  onChange={this.handleChange}/>


                       
                <br></br>
                <br></br>

                        <button id="buttClose" type="button" onClick={this.login} class="btn btn-lg btn-primary">Log In</button>


                    </form>

                    <p className="text-center my-3">
                        Don't have an account?{" "}
                        <a href="/signUpAgent" className="text-blue-500 hover:text-blue-600"> Sign up here</a>
                        <br />{" "}
                        <a href="/passwordResetAgent" className="text-blue-500 hover:text-blue-600"> Forgot Password?</a>
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