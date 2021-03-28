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
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import LocationOnIcon from '@material-ui/icons/LocationOn';



const Location = (props) => {

    
    
    return ( 
    <div>



<List>
                    <ListItem>
                        <ListItemAvatar>
                        
                        </ListItemAvatar>
                        <ListItemText primary={props.location} secondary = {props.name} />
                    </ListItem>
                </List>

        

    </div>
);
    }


export default Location;
