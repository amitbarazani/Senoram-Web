import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import logo from '../logo_Royal.jpeg';
import ship from '../ship.jpeg';
import './menu.css'
import UserInfo from '../ToolBar/UserInfo';
import firebase from '../../Firebase/Firebase';
import axios from '../../Firebase/axios';

const useStyles = makeStyles({
  root: {
      width: "500px",
      margin: "10px",
      background: "#D3D3D3",
    
  },
  
 
  
  
});

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Calibri Light"
      ].join(','),
      
    }
  });


  function h(){
    console.log("hi");
  }  
  
 
export default function MediaCard() {
 
h();
const [userName, setUserName] = useState(null);
const [user, setUser] = useState(null);
const [email, setEmail] = useState(null);
const [id, setID] = useState(null);


authListener();
 function authListener() {
    firebase.auth().onAuthStateChanged((userResult) => {

      if(userResult == null)
      window.location.href ="/HomePage";
    
          setUserName(userResult.displayName);
          setEmail(userResult.email);

          const itemsRef = firebase.database().ref(`Clients/`);
          itemsRef.on('value', (snapshot) => {
              let reservations = snapshot.val();
              for (let reservation in reservations) {
          
                  if (reservations[reservation].email == email)
                  {
                      setID(reservations[reservation].idNumber);
                      if (id)
                      axios.patch('/Clients/'+ id + '.json', {Online: 'No',}).then(function (response) {console.log(response);});
                  }
                }});
    
    });
}


  const classes = useStyles();


  function logout(e) {
    console.log("bye");
   // user.preventDefault();
    firebase.auth().signOut().then(()=>{
      //window.location.href ="/Login";
        window.location.href ="/HomePage";
    } );
    //window.location.reload();
}

  
  return (

    
    <div style={{ 
      backgroundImage: `url(${ship})` ,backgroundPositionX:'50% ' ,height: '1000px' ,backgroundRepeat: 'no-repeat' , margin:' 0 auto'}} >
        <span>
       <a href="/MenuClient" target="_self" >           
       <img src={"https://logodownload.org/wp-content/uploads/2020/02/royal-caribbean-logo-4.png"}   style={{ 
     padding: '30px ',
     width: "400px",
  height: "150px",}} />
     </a>
   </span>
           
          


          <Grid container justify="center" >

      
           
              
    <Card className={classes.root}>
        
      <CardActionArea >
        <CardContent >
        <ThemeProvider theme={theme}> 
          <Typography gutterBottom variant="h5" component="h2" onClick={function(){
     window.location.href ="/Profile";
 
}}>
           Personal Information
          </Typography>
          </ThemeProvider>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>

    <Grid container justify="center">
    <Card className={classes.root} >
      <CardActionArea>
        <CardContent>
        <ThemeProvider theme={theme}> 
          <Typography gutterBottom variant="h5" component="h2" onClick={function(){
     window.location.href ="/TripPlan";
 
}}>
            Trip Planner
          </Typography>
          </ThemeProvider>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>

    <Grid container justify="center">
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
        <ThemeProvider theme={theme}> 
          <Typography gutterBottom variant="h5" component="h2" onClick={function(){
     window.location.href ="/Chat";
 
}}>
            Chat
          </Typography>
          </ThemeProvider>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>

  

    <Grid container justify="center">
    <Card className={classes.root} onClick={function(){
    console.log("bye");
    // user.preventDefault();
     firebase.auth().signOut().then(()=>{

       
       //window.location.href ="/Login";
        window.location.href ="/HomePage";
     } );
}} >
      <CardActionArea>
        <CardContent>
        <ThemeProvider theme={theme}> 
          <Typography gutterBottom variant="h5" component="h2">
          Sign out {userName}
          </Typography>
          </ThemeProvider>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>


    


    
    
    </div>
  );
}

