import React from "react";
import firebase from '../../Firebase/Firebase';
import { Menu, Icon ,Button , Label} from "semantic-ui-react";
import axios from '../../Firebase/axios';
import "./Messages.css";
import { Segment, Comment } from "semantic-ui-react";
import savings from './Savings';
import Messages from './Messages';
import { FilterTiltShiftSharp, YoutubeSearchedFor } from "@material-ui/icons";
import { waitFor } from "@testing-library/dom";

class DirectMessages extends React.Component {

  constructor(props) {
    super(props)
    this.incrementSeconds = this.incrementSeconds.bind(this)
}

  state = {
    user: '',
    users: [],
    searchUsers: [],
    searchToken: '',
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
                        id: key,
                        role: res.data[key].role,
                        show: "",
                                      
                        
                    });

                    for (let key in fetchedEvents) {
                      console.log(fetchedEvents);
                      if (fetchedEvents[key].role == "Agent")
                      fetchedEvents[key].show = "Agent"

        
                    }
                    

                }   

              
            }

           
          
            this.setState({  users: fetchedEvents });  
            this.setState({  searchUsers: fetchedEvents });
    
          
            
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
   

    axios.put(`ActiveChannel/` + this.state.id + '.json', user.id);
    
  

 


 
  };





  getChannelId = userId => {
    //console.log("currentUserId " + this.state.id)
    //console.log("userId" + userId)
    const currentUserId = this.state.id;

    if ( userId < this.state.id) 
    return  userId+this.state.id
    else 
    return this.state.id+userId
 
  };


h() {


  var seconds = 0;
  var el;


    var cancel = setInterval(this.incrementSeconds, 1000);

    
    
}
  


incrementSeconds() {

 
  
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
                    id: key,
              
                });
                

            }   
        }
       
        this.setState({  users: fetchedEvents }); 
        
    


           
        
    })

    .then(res => {

     


    })


    .catch(err => {
       console.log(err)
    })
    

    
})


 


}


isUserOnline = user => {

  if ( user.Online == "Yes")
  return true


  

}


getNotifications = user => {

//return user.idNumber;





  // this.state.users[key].counter = 0;

   var temp = user.idNumber;
if (temp < this.state.id)
temp = temp+this.state.id;
else
temp = this.state.id + temp;
var counterT = 0;
// var that = this;
axios.get(`privateMessages/` + temp + '.json')
.then(res => {

for (let key in res.data) {
if (res.data[key].user.id != this.state.user.uid )
if (res.data[key].seen == "False")
return true
else return false
}
//counterT++;
// that.state.users[key].counter = counterT;

//}
//console.log(counterT)
//return counterT;

//this.state.users[keyy].counter = counterT;
//console.log(this.state.users);
//this.state.users[keyy].counter = counterT;
//console.log(that.state.users[key] +that.state.users[key].counter );

});


 

  // this.state.users[key].counter = 0;


 

 


}
  



  render() {
    const { users, activeChannel , currentChannel,searchUsers } = this.state;
    
   

  
    let condition;
    if (activeChannel) {
      condition = <Label color="grey">{this.getNotifications(activeChannel)}</Label>
    }

    else
    condition = <p>{this.getNotifications(activeChannel)}</p>


    return (

      
        <Menu.Menu className="menu" >

<input
placeholder= "Seach People ..."
onChange = {(event) => {
  
  if (event.target.value == "")
  {
    console.log("hi");
    this.setState({  searchUsers: this.state.users }); 
    this.componentDidMount();
  }
    

  this.setState({  searchToken: event.target.value }); 
 
  let a = [];
  for (let key in this.state.users) 
  if (this.state.users[key].fullName.includes(this.state.searchToken) )
  {
    
    a.push(this.state.users[key]);
    

  }

  this.setState({  searchUsers: a }); 

  console.log(this.state.searchUsers);
 

   
  }}

  
  

/>
<h2></h2>


    {searchUsers.map(user => (
          <Menu.Item 
            key={user.uid}
            onClick = {() => this.changeChannel(user) }
            style={{ opacity: 0.7,  }}
            
          
          >
            
            {activeChannel == user.idNumber ? <Label color="blue"></Label> : ''}
            <Icon
              name="circle"
              color={this.isUserOnline(user) ? "green" : "red"}
            />
            {user.role=="Agent" ? user.fullName + " " + user.role : user.fullName}
            <h2></h2>
          </Menu.Item>
      
        ))}
       
  

      </Menu.Menu>

     

    );

    }
  }
  export default DirectMessages;


//{condition}