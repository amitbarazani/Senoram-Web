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
import { count } from './Count';
import { up } from  './Count';
import { down } from  './Count';
import { sightsChecked } from  './Count';

const WhiteTextTypography = withStyles({
    root: {
      "fontFamily": "Calibri Light",
      color: "#FFFFFF",
    }
  })(Typography);

  const WhiteTextTypography2 = withStyles({
    root: {
      "fontFamily": "Calibri Light",
      "fontSize": 30,
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

const Sight = (props) => {

    
 
    const [state, setState] = React.useState({
      checkedB: false,
    });
  

  const handleChange = (event) => {

    if (event.target.checked == false)
    {
      let answer = down("hello");
      
      setState({ ...state, [event.target.name]: event.target.checked });
      
      for( var i = 0; i < sightsChecked.length; i++){
       
    
        if ( sightsChecked[i] === 5) { 
    
          sightsChecked.splice(i, 1);  
          
        }


        if ( sightsChecked[i] == props.id) { 
    
          sightsChecked.splice(i, 1); 
          
          
        }
           
    }
    }


    else 
    {
      let answer = up("hello");
     
      if (answer == "good")
      {
        sightsChecked.push(props.id);
        console.log(sightsChecked);
        setState({ ...state, [event.target.name]: event.target.checked });
      }
      else
      {
        alert ("You Can Choose Up To 4 Activities")
        down("hello");
      }
      
    }

  
    
   };

    const classes = useStyles();
    return ( 
    <div>

<Card className={classes.root} variant="outlined" style={{backgroundColor: "#757de8"}}>

      <CardContent>
     
        <Typography className={classes.title} color="textSecondary" gutterBottom>  <WhiteTextTypography>Rank: {props.rank} </WhiteTextTypography> </Typography>
        <Typography  variant="h6" component="h2"> <WhiteTextTypography2> {props.name} </WhiteTextTypography2></Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>  <WhiteTextTypography>Distance: {props.distance} KM </WhiteTextTypography> </Typography>
  
        <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Yes"
      />
        
       
       
      </CardContent>
    
    </Card>

    &nbsp;

        

    </div>
);
    }


export default Sight;

//<Typography className={classes.title} color="textSecondary" gutterBottom>  <WhiteTextTypography>{props.address} </WhiteTextTypography> </Typography>