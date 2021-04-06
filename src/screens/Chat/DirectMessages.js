import React from "react";
import firebase from '../../Firebase/Firebase';
import { Menu, Icon ,Button } from "semantic-ui-react";
import axios from '../../Firebase/axios';
import "./Messages.css";
import { Segment, Comment } from "semantic-ui-react";
import savings from './Savings';
import Messages from './Messages';
import { YoutubeSearchedFor } from "@material-ui/icons";
import { waitFor } from "@testing-library/dom";

class DirectMessages extends React.Component {


  state = {
    user: '',
    users: [],
    email: '',
    usersRef: firebase.database().ref("Clinets"),
    connectedRef: firebase.database().ref(".info/connected"),
    presenceRef: firebase.database().ref("presence"),
    currentChannel: '',
    privateChannel: '',
    activeChannel: '',
    id: '',
  };


  componentDidMount() {

    
    this.h();
    firebase.auth().onAuthStateChanged((userResult) => {
        
        this.setState({ user: userResult });
        this.setState({ email: userResult.email });
    


    

        axios.get('/Clients.json')
        .then(res => {
            const fetchedEvents = [];
            for (let key in res.data) {
                if (res.data[key].email == this.state.email)
                {
                   this.setState({ id: res.data[key].idNumber });
                }  
                else {
                    fetchedEvents.push({
                        ...res.data[key],
                        id: key
                    });
                    

                }   
            }
           
            this.setState({  users: fetchedEvents }); 
               
            
        })




        .catch(err => {
           console.log(err)
        })
        
    
        
})



  }

  changeChannel = user => {
    const channelId = this.getChannelId(user.id);

  
    const channelData = {
      id: channelId,
      name: user.fullName
    };

    axios.put(`CurrentChannel/` + this.state.id + '.json', channelData)
    this.setState({  currentChannel: channelData });

    this.setState({  privateChannel: true });

    this.setState({  activeChannel: user.id });
    axios.put(`ActiveChannel/` + this.state.id + '.json', user.id)
    
  

 
  };



  getChannelId = userId => {
    console.log("currentUserId " + this.state.id)
    console.log("userId" + userId)
    const currentUserId = this.state.id;
/*
    axios.get('/privateMessages.json')
        .then(res => {
            const fetchedEvents = [];
            for (let key in res.data) {
                if (res.data[key].email == this.state.email)
                {
                   this.setState({ id: res.data[key].idNumber });
                }  
                else {
                    fetchedEvents.push({
                        ...res.data[key],
                        id: key
                    });
                }   
            }
            this.setState({  users: fetchedEvents });
            
        })
        .catch(err => {
           console.log(err)
        })
*/
    if ( userId < this.state.id) 
    return  userId+this.state.id
    else 
    return this.state.id+userId
    //return `${userId}/${this.state.id}`;
   // else return this.state.id/userId;

    //  ? `${userId}/${this.state.id}`
     // : `${this.state.id}/${userId}`;

    
  };


h() {


  var seconds = 0;
var el;

function incrementSeconds() {
  /*
    seconds += 1;
    el = "You have been here for " + seconds + " seconds.";
    console.log(el);
    */
    axios.get('/Clients.json')
    .then(res => {
      /*
        const fetchedEvents = [];
        for (let key in res.data) {
            if (res.data[key].email == this.state.email)
            {
               //this.setState({ id: res.data[key].idNumber });
            }  
            else {
                fetchedEvents.push({
                    ...res.data[key],
                    id: key
                });
                

            }   
            
        }
       */
      //  this.setState({  users: fetchedEvents }); 
        //console.log(this.state.users);
          console.log(res); 
        
    })




    .catch(err => {
       console.log(err)
    })
}

var cancel = setInterval(incrementSeconds, 1000);
}
  
isUserOnline = user => {

  if ( user.Online == "Yes")
  return true
//console.log(user.Online);
  /*
  console.log(user);
//console.log(this.state.users);
axios.get('/Clients/' + user.id + '/Online' + '.json')
.then( res => {
  if (res.data == null)
  {
    console.log(res.data);
    return false;
  } 
   
  else {
    console.log(res.data);
    return true;
  }
   
})
.catch(err => {
  console.log(err)
})

*/

}

        
  



  render() {
    const { users, activeChannel , currentChannel } = this.state;

    
    return (

      
        <Menu.Menu className="menu" >


    {users.map(user => (
          <Menu.Item
            key={user.uid}
            onClick = {() => this.changeChannel(user) }
            style={{ opacity: 0.7,  }}
          >
            <Icon
              name="circle"
              color={this.isUserOnline(user) ? "green" : "red"}
            />
            {user.fullName}
            <h2></h2>
          </Menu.Item>
      
        ))}
       
  

      </Menu.Menu>

     

    );

    }
  }
  export default DirectMessages;


