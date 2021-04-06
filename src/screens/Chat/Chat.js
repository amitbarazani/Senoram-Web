import React, { Component } from 'react';
import ship from '../ship.jpeg';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import firebase from '../../Firebase/Firebase';
import { Header, Icon, Dropdown, Image, Input, Button} from "semantic-ui-react";

import AvatarEditor from "react-avatar-editor";
import Modal from '@material-ui/core/Modal';
import DirectMessages from './DirectMessages';
import Messages from './Messages';
import 'semantic-ui-css/semantic.min.css'
import axios from '../../Firebase/axios';


const style ={
    
  width: '100%',
  position: 'center',
  margin: '20px'

}

const style2 ={
    
  width: '15%',
  position: 'center',
  

}

const style3 ={
    
  height: '30%',
  position: 'center',
 // margin: '20px'

}


const row ={
  content: '',
  display: 'table',
  clear: 'both',
  width: '95%',
 

}


const column = {
  
  float: 'left',
  width: '50%',
  padding: '10px',
  height: '420px', /* Should be removed. Only for demonstration */
}




class Chat extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            clicked: false,
            previewImage: '',
            currentChannel: '', // NOT YET MOMASH 
            fullName: '',
            file: '',
            email: '',
            id: '',
            user: '',
            photoURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAMFBMVEXU1NT////Y2Nj7+/va2trm5ubz8/Pf39/29vbe3t7j4+P8/Pzt7e3Z2dn09PTp6enlgXfuAAAEj0lEQVR4nO2dCZarOgxEMVPCkGT/u31N8+mEEIIHVUmf47sC6ghNRhZFkclkMplMJpPJZDKZTCaTyWQymUwmk8lsKLuu75sf+r7rSu2niaNrxrZyK6p2bDrt5wqibtrB7TC0Ta39fH6Uj+ueiIXrw/5r1rdHKmbaXvtJv9JUxxL+PKbRfto9yhAZsxSTb1gfKONXir0XrPb0jXdaYyHssRtujxge2s/+wu0w4H7jetN+/oU+2hz/GcWIp4xpMiZGbQ0TkV6+ptVWUZR3CR3O3ZVTSpnk5q9cVZWUEUlwj0pRiZw9JhRtIuQfC3ctHSLx6hWl2PWQ1uGcSrlykdfh3IWvQzJgPVEIXeIOMkN3kwajwzlyA1wmFrz7DNyXS6Di3YNaCXc4Hc4xDyNFS5N3rjwdPVKHc7yGEWoQokkgOf0VVn4HG4RmEmjImuEELmAOWeDkEki1uKZi6ADH3hlGBAaVvWsYRTCsXHxlwOuAJ5EZfCoBdOqfwHfv8Gw4A8+JJUeHc+j+iuQieCeB9ervoHt3Qn0yg65SKOlwAp0SCYXWDLrcYulwDquDFn3R8bfmCcGORBC6wwVsl3gaIbTEjk7tlPZwBtsknsYip/GR0wg5TR45TYlynqKR1LLjm/bT9COk0yD8edBpDh9OcxzEClv4DwukYxT8px5S/Yv/QEJyEsJECiUlMr7rUg5NGcNOlHeLMutEqFI4c3SEuEUaq4HnRMpn9oLg7qy5RtxA4wxvrBFcy/PmsTHDywvMIWaol1Anf4F1CnE2s4Ae1JGv7sPaEvZNPpS/868r1JBkMijcQYaUXCqXXQFuonTVVTwGcyPvE2mH17tS2Yk6/KC4/KWTvOKqusSmFlNSKS9/kFKiraMobiJKKgN7HySuUOteZv8jOTOaWPkwcUl6vSqFC7p7lAmHdq2N12ohdjeKlZ0oT25RnjIaiFYbuuDwdbW6ke4S5CqtISff0Hi7ymB24VlR9mNQGK7G3lbA+qVsonaL3I1tb/PdBfgJO/sB67A3aks1qpe+P1xE1tXctSPYRW6bk6aUXnYJkpazyFnjT4qGVW6Qr9QtvfaKX8z4HfLaxph1n74Q14KmtFE+sFqttMbWB07zSxmhwx9H1KxLx+CqJXVtqT/YZp42vjwBDMS0i7ozKEeRXS/pA+YkVe4Lgj+IM3oNHQglOjrklWjpkFYi+a0wWIngcaSePX6ViNkEOzDnoUQoCvPzxztC+YR2P2wfkclscl3yGYFqhbbR5TvJZ/fEW8bfSQzC2gHrSWLoMuDoC0kOb8RBZhLcBDOAGUvC4KZ6JlwTPSlI7dB9iOzibb1YE5Evl6GItRAVuYi7XPyJOOyykwpfiUiLJmrFLcHVI/pCWCzBF8mMGiTYJFYNEmwSswYJNMnNrEF+TBLy4dewQYJMYtdDJgK8xFy1uMa/djSZ1J943xInLpqLw/frtcGyd41nEUzcVxqLn7sbd/UJP3c31ql/wqt7Jy7+i8en5zV1lrWHzxmX8E8OMXj8OvF/ELMmjuOWyTOHLcenEOaz4cxxTjRd+D7Z/KDkH+MbT03dnEr6AAAAAElFTkSuQmCC',  
        };
    }

    clicked = () => {
      if (this.state.clicked == false)
      this.setState({ clicked: true });
      else
      this.setState({ clicked: false });

    }

 


    componentDidMount() {

      var photo ;
      firebase.auth().onAuthStateChanged((userResult) => {
        
        
          this.setState({ fullName: userResult.displayName });
          this.setState({ email: userResult.email });
          this.setState({ user: userResult });
         

          const itemsRef = firebase.database().ref(`Clients/`);
itemsRef.on('value', (snapshot) => {
    let reservations = snapshot.val();
    for (let reservation in reservations) {

        if (reservations[reservation].email == this.state.email)
        {
            this.setState({ id: reservations[reservation].idNumber });
            axios.put('/Clients/'+ this.state.id + '/Online' + '.json', JSON.stringify("Yes")).then(function (response) {});
            
            photo = this.state.id + '.jpg';
       
          var that = this;
          var storageRef = firebase.storage().ref("images/");
    storageRef.listAll().then(function (result) {
        result.items.forEach(function (imageRef) {
            // And finally display them
            imageRef.getDownloadURL().then(function (url) {
              
              firebase.storage()
                  .ref("images")
                  .child(photo)
                  .getDownloadURL()
                  .then(url => {
                    that.setState({ photoURL: url });

                    
                  });
              
          })
        });
    }).catch(function (error) {
        // Handle any errors
    });
        }  //ds
       
    }
   
});

          /*
          if (userResult.photoURL != null)
          {
            // CHANGE PHOTO
          }
          */
         
         


    });
   
  

    }


    


    handleChange = event => {
      const file = event.target.files[0];
      this.setState({ file: file });
      const reader = new FileReader();
  
      if (file) {
        reader.readAsDataURL(file);
  
        reader.addEventListener("load", () => {
          this.setState({ previewImage: reader.result });
          this.setState({ photoURL: reader.result });
        });


      }
    };


    rollBack = event => {

      axios.delete('/Clients/'+ this.state.id + '/Online' + '.json').then(function (response) {
      });
      console.log("rollBack");
      const channelData = {
        id: '',
        name: '',
      };
  
      axios.put(`CurrentChannel/` + this.state.id + '.json', channelData)
      .then(url => {
        window.location.href = "../MenuClient";

        
      });
      
      //window.location.href = "../MenuClient";

    }


    handleChange2 = event => {


      firebase.auth().onAuthStateChanged((userResult) => {
      
      

////

const itemsRef = firebase.database().ref(`Clients/`);
itemsRef.on('value', (snapshot) => {
    let reservations = snapshot.val();
    for (let reservation in reservations) {

        if (reservations[reservation].email == this.state.email)
        {
            this.setState({ id: reservations[reservation].idNumber });

        }
       
    }
   
});


const uploadTask = firebase.storage().ref(`images/` + this.state.id + '.jpg').put(this.state.file);
        
this.setState({ clicked: false });


/////




    
          })
        }
        
        

      
   

    render() {

    
      
        return (
          <div style={{ 
            backgroundImage: `url(${ship})` ,height: '900px' ,width:'80%' ,backgroundRepeat: 'no-repeat' , margin:' 0 auto'}} >
             
    
        
    <span onClick={this.rollBack}>
              
           <img src={"https://logodownload.org/wp-content/uploads/2020/02/royal-caribbean-logo-4.png"}   style={{ 
     padding: '30px ',
     width: "400px",
  height: "150px",}} />
         
       </span>

    
    
       <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
 
 >

<Card style={style2}>

<h2></h2>
<h4><b>{this.state.fullName}</b></h4>
<Image src={this.state.photoURL} spaced="right" avatar style={{ 
     width: "100px",
  height: "100px",}} 
  onClick={this.clicked}/>



              

<div>
       <b>{this.state.clicked ? 
       <Input
                onChange={this.handleChange}
                fluid
                type="file"
                name="previewImage"
                
              /> : ''}</b>
              
    </div>

    <div>
       <b>{this.state.clicked ? 
           <Button onClick={this.handleChange2}><b>Change</b></Button>: ''}</b>
              
    </div>

<h2></h2>

</Card>
</Grid>



<div style={row}>

<Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
 
 >

<Card style={style}>
<div style={column}> 
<h2></h2>
<h4>Messages</h4>
  <DirectMessages/>
  </div> 
  <h2></h2>
  <div style={column}> 
  <Messages
        
        currentChannel={this.state.currentChannel}
        currentUser={this.state.user}
        isPrivateChannel={true}
      />
  </div> 


</Card>


</Grid>

</div>

    
    






            </div>




        );
    }
}
export default Chat;