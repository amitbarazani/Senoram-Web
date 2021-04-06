import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import firebase from '../../Firebase/Firebase';
import savings from './Savings';
import axios from '../../Firebase/axios';


class MessageForm extends React.Component {

  state = {
    storageRef: firebase.storage().ref(),
    uploadTask: null,
    uploadState: "",
    percentUploaded: 0,
    message: "",
    channel: '' ,
    user: '',
    email: '',
    id: '',
    loading: false,
    errors: [],
    photoURL: '',
    //modal: false
  };


  componentDidMount() {
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
               
            }  
           
        }
    })
    .catch(err => {
       console.log(err)
    })


    });







  }


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

    axios.get('/CurrentChannel.json')
    .then(res => {

        const fetchedEvents = [];
        for (let key in res.data) {
            
            if (key == this.state.id)
            {
               this.setState({ channel: res.data[key] });
               
            }  
           
        }
    })
    .catch(err => {
       console.log(err)
    })
    
  };


  
  createMessage = (fileUrl = null) => {

    var time = new Date().toLocaleString();
 

    const message = {
      timestamp: time,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.photoURL,
      }
    };
    if (fileUrl !== null) {
      message["image"] = fileUrl;
    } else {
      message["content"] = this.state.message;
    }
    return message;

    
  };


  sendMessage = () => {


    axios.get('/CurrentChannel.json')
    .then(res => {

        const fetchedEvents = [];
        for (let key in res.data) {
          
            if (key == this.state.id)
            {
               this.setState({ channel: res.data[key] });
               
            }  
           
        }
    })
    .catch(err => {
       console.log(err)
    })

    

    

    const { getMessagesRef } = this.props;
    const { message, channel } = this.state;
  
   
    if (message) {
      this.setState({ loading: true });
     firebase.database().ref("privateMessages")
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message" })
      });
    }
    
  };



  render() {
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          value={this.state.message}
          onChange={this.handleChange}
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
          <Button
            onClick={this.sendMessage}
            color="blue"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
          />
          
        </Button.Group>
      </Segment>
    );
  }
}

export default MessageForm;
