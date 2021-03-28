import '../General.css';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { actuallSightsChecked } from './Count';
import { sorted } from './Count';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
//import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import lightblue from "@material-ui/core/colors";
import DirectionsBoatOutlinedIcon from '@material-ui/icons/DirectionsBoatOutlined';
import { indigo, pink } from '@material-ui/core/colors';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    indigo: {
      color: theme.palette.getContrastText(indigo[500]),
      backgroundColor: indigo[500],
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      padding: "10px",
    },
    
  }));

const Final = (props) => {
  let help = props.url;
    const classes = useStyles();

    const stringB =  props.name + " (" +  props.c + ") " ;

    const string = "Distance: " + props.distance + " KM";

    return (
        <div>


            <List>
        
                <ListItem>
               
                <ListItemAvatar>
                    <Avatar className={classes.large} src= {`${help}`}>
                            <DirectionsBoatOutlinedIcon />
                            </Avatar> 
                       
                    </ListItemAvatar>
                   
                    <ListItemText primary={stringB} secondary={string} />
           
                    
                    <TimelineConnector />


                </ListItem>
            </List>

            



        </div>
    );
}


export default Final;