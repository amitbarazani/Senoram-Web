import React from 'react';
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
import '../MenuPage/menu.css'
import ButtonBase from '@material-ui/core/ButtonBase';


const useStyles = makeStyles({
  root: {
      width: "500px",
      margin: "10px",
      background: "#D3D3D3",
    
  },font: {
    fontFamily:  "Calibri Light",
    fontSize: "25px",
  

  }
  
 
  
  
});

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Calibri Light"
      ].join(','),
      
    }
  });

  

export default function MediaCard() {
  const classes = useStyles();


  //  backgroundImage: `url(${ship})` ,height: '900px' ,width:'1500px' }} >
         
  return (

       
<div >








  <span>
       <a href="/HomePage" target="_self" >           
       <img src={"https://logodownload.org/wp-content/uploads/2020/02/royal-caribbean-logo-4.png"}   style={{ 
     padding: '30px ',
     width: "400px",
  height: "150px",}} />
     </a>
   </span>
           
          


          <Grid container justify="center" >

      
           
              
    <Card className={classes.root} onClick={event => window.location.href ="/Login"}>
        
      <CardActionArea >
        <CardContent >
        <ThemeProvider theme={theme}> 
          <Typography gutterBottom variant="h5" component="h2">
            Log In Customers
          </Typography>
          </ThemeProvider>
        </CardContent>
      </CardActionArea>

    </Card>
    </Grid>

    <Grid container justify="center">
    <Card className={classes.root} onClick={event => window.location.href ="/LoginAgent"} >
      <CardActionArea>
        <CardContent>
        <ThemeProvider theme={theme}> 
          <Typography gutterBottom variant="h5" component="h2">
          Log In Agents
          </Typography>
          </ThemeProvider>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>



    <Grid container justify="center">
    <Card className={classes.root}  onClick={event => window.location.href ="/ContactUs"}>
      <CardActionArea>
        <CardContent>
        <ThemeProvider theme={theme}> 
          <Typography gutterBottom variant="h5" component="h2">
            Contact Us
          </Typography>
          </ThemeProvider>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <h2 className={classes.font}>Don't Have a Cruise Yet? </h2>
    <h2 className={classes.font}><a href="https://www.royalcaribbean.com/" style={{color:"#000000"}}>Click To Check All Your Options! </a></h2>
    





    
    
    </div>
  );
}