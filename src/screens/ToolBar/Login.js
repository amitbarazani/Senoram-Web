import React, { Component } from 'react';
import firebase from '../../Firebase/Firebase';
import TextField from '@material-ui/core/TextField';
import axios from '../../Firebase/axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            password: '',
        };
    }


    login(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            window.location.href = "../MenuClient";
        })
        
        
        .catch((error) => {
            alert("One of the fields is invalid!");
        });
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="mt-8">
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
                        <a href="/signUp" className="text-blue-500 hover:text-blue-600"> Sign up here</a>
                        <br />{" "}
                        <a href="/passwordReset" className="text-blue-500 hover:text-blue-600"> Forgot Password?</a>
                    </p>
                </div>
                <br></br>
                <br></br>
            </div>




        );
    }
}
export default Login;