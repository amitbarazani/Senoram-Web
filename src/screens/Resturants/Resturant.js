import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './Resturant.css';

const WhiteTextTypography = withStyles({
  root: {
    "fontFamily": "Calibri Light",
    color: "#303030",
    
    
    
    //color: "#FFFFFF",
  }
})(Typography);


const WhiteTextTypography3 = withStyles({
  root: {
    "fontFamily": "Calibri Light",
    "fontSize": 15,
    color: "#303030",
    "font-weight": "bold",
   
    //color: "#FFFFFF",
  }
})(Typography);  
const WhiteTextTypography2 = withStyles({
  root: {
    "fontFamily": "Calibri Light",
    "fontSize": 30,
    
    //color: "#002984",
   
  }
})(Typography);
  
  
 




const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
      
    },
    pos: {
      marginBottom: 12,
    },
  });

const Resturant = (props) => {

  let help = props.url;
    
    const [counter, setCounter] = useState({ counter: 0 });
    const [state, setState] = React.useState({
      checkedB: false,
    });
  

  const handleChange = (event) => {

      setState({ ...state, [event.target.name]: event.target.checked });
     //console.log(props.id);
   
    
    
   };

    const classes = useStyles();
    return ( 
    <div>

<Card className={classes.root} variant="outlined" style={{backgroundColor: "#D3D3D3"}} >
<img src={`${help}`} className="photo" />
      <CardContent>
     
        <Typography className={classes.title} color="textSecondary" gutterBottom>  <WhiteTextTypography>Rank: {props.rank} </WhiteTextTypography> </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>  <WhiteTextTypography>Distance: {props.distance} KM </WhiteTextTypography> </Typography>
        <Typography  variant="h6" component="h2"> <WhiteTextTypography2> {props.name} </WhiteTextTypography2></Typography>

       
        
        
        
        <Typography className={classes.title} color="textSecondary" gutterBottom>  <WhiteTextTypography3> {props.open} </WhiteTextTypography3> </Typography>
        
        
       
       
      </CardContent>
    
    </Card>

      
    &nbsp;
        

    </div>
);
    }


export default Resturant;

//<Typography className={classes.title} color="textSecondary" gutterBottom>  <WhiteTextTypography>{props.address} </WhiteTextTypography> </Typography>