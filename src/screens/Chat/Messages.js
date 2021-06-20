import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import "./Messages.css"
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import firebase from '../../Firebase/Firebase';
import savings from './Savings';
import axios from '../../Firebase/axios';

class Messages extends React.Component {

  constructor(props) {
    super(props)
    this.mySecondFunction = this.mySecondFunction.bind(this)
}

  state = {
    privateChannel: true,
    privateMessagesRef: firebase.database().ref("privateMessages"),
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messagesLoading: true,
    channel:  '',
    user: '',
    numUniqueUsers: "",
    searchTerm: "",
    searchLoading: false,
    searchResults: [],
    id: '',
    fullName: '',
    email: '',
    photoURL: '',
  };


  

  componentWillMount(){
   
 
    firebase.auth().onAuthStateChanged((userResult) => {
      this.setState({ user:   userResult });
      this.setState({ email: userResult.email });

      axios.get('/Clients.json')
      .then(res => {
          const fetchedEvents = [];
          for (let key in res.data) {
              if (res.data[key].email == this.state.email)
              {
                 this.setState({ id: res.data[key].idNumber });
                 this.setState({ fullName: res.data[key].fullName });

                 var photo = this.state.id + '.jpg';
       
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
              }  
             
          }
      })
      .catch(err => {
         console.log(err)
      })


  
      
      axios.get('/CurrentChannel.json')
      .then(res => {
  
          const fetchedEvents = [];
          for (let key in res.data) {
              if (key == this.state.id)
              {
                 this.setState({ channel: res.data[key] });
                 this.addListeners(this.state.channel.id);
                
              }  
             
          }
      })
      .catch(err => {
         console.log(err)
      })
  
     this.help() 
  
    

      
    });

 

   
  }


  help() {

    document.addEventListener("click", this.mySecondFunction);
  }

   mySecondFunction() {
    
    var that = this
    
    axios.get('/CurrentChannel.json')
      .then(res => {

        //

        firebase.auth().onAuthStateChanged((userResult) => {
          this.setState({ user:   userResult });
          this.setState({ email: userResult.email });
    
          axios.get('/Clients.json')
          .then(res => {
              const fetchedEvents = [];
              for (let key in res.data) {
                  if (res.data[key].email == this.state.email)
                  {
                     this.setState({ id: res.data[key].idNumber });
                     this.setState({ fullName: res.data[key].fullName });
    
                     var photo = this.state.id + '.jpg';
           
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
                  }  
                 
              }
          })
          .catch(err => {
             console.log(err)
          })
    
    
      
          
          axios.get('/CurrentChannel.json')
          .then(res => {
      
              const fetchedEvents = [];
              for (let key in res.data) {
                  if (key == this.state.id)
                  {
                     this.setState({ channel: res.data[key] });
                     this.addListeners(this.state.channel.id);
                    
                  }  
                 
              }
          })
          .catch(err => {
             console.log(err)
          })
      
      
      
        
    
          
        });

        //

      });

  
  }
  /*

  componentDidMount() {
   
   
   
    const { channel, user } = this.state;

    if (channel && user) {

      this.addListeners(channel.id);
    }
  }
  */

  addListeners = channelId => {


    
    this.addMessageListener(channelId);
  };

  
  addMessageListener = channelId => {

   
    let loadedMessages = [];
    const ref = this.getMessagesRef();
    ref.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      });
      this.countUniqueUsers(loadedMessages);
    });
  };


  getMessagesRef = () => {
    const { messagesRef, privateMessagesRef, privateChannel } = this.state;
    savings.privateMessagesRef = privateMessagesRef;
    return privateChannel ? privateMessagesRef : messagesRef;
  };

  handleSearchChange = event => {
    this.setState(
      {
        searchTerm: event.target.value,
        searchLoading: true
      },
      () => this.handleSearchMessages()
    );
  };

  handleSearchMessages = () => {
    const channelMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, "gi");
    const searchResults = channelMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
    setTimeout(() => this.setState({ searchLoading: false }), 1000);
  };

  countUniqueUsers = messages => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
    this.setState({ numUniqueUsers });
  };

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
        fullName = {message.user.name}
        photoURL = {message.user.avatar}
        //fullName= {this.state.fullName}
        //photoURL = {this.state.photoURL}
        
      />
    ));

  displayChannelName = channel => {
    return channel
      ? `${this.state.privateChannel ? "@" : "#"}${channel.name}`
      : "";
  };



  render() {
    const { messagesRef, messages, channel, user, numUniqueUsers, searchTerm, searchResults, searchLoading, privateChannel } = this.state;
    return (
      <div>
      <React.Fragment>

      <Segment>
          <Comment.Group className="messages">
              {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
          isPrivateChannel={true}
          getMessagesRef={this.getMessagesRef}
        />
      </React.Fragment>
      </div>
    );
  }
}

export default Messages;