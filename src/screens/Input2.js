import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import "./Input.css";
import Switch from '@material-ui/core/Switch';
import Geocode from "react-geocode";
import axios from '../Firebase/axios';
import savings from './SightSeeing/Savings';
import savings2 from './NightLife/Savings2';
import savings3 from './Resturants/Savings3';
import savings4 from './SightSeeingAndNightLife/Savings4';
import Unsplash, { toJson } from "unsplash-js";

const useStyles = makeStyles({
    sliderWidth: {
        width: "400px",
        padding: "25px"
    }
});


const Input = (props) => { 






 function convertNameLocationToLatAndLong(location, checkedSightseeing, checkedNightLife, checkedRestaurants) {

    Geocode.setApiKey("AIzaSyAlsDSqPYncPQDXhREqVsYgj6YiVGSyNMo");
    const current = [];
    //console.log(location.location);
    Geocode.fromAddress(location.location).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            //console.log(lat, lng);
            senarios(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants);
        },
        error => {
            alert("Please Insert a Valid Location");

        }
    );

    
    

}

function senarios(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants) {
    setLat(prevInputState => ({
        lat_original: lat,
    }));
    setState({ ...state, lat_original: lat });
    setLng(prevInputState => ({
        lng_original: lng,
    }));
    setState({ ...state, lng_original: lng });

    // Just Resturant
    if (checkedSightseeing === false && checkedNightLife === false && checkedRestaurants === true) {
        getResturants(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants);

   }
   // Just SightSeeing
   if (checkedSightseeing === true && checkedNightLife === false && checkedRestaurants === false) {
  
    getSightseeing(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants);

}

    // Just NightLife
    if (checkedSightseeing === false && checkedNightLife === true && checkedRestaurants === false) {
  
    getNightLife(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants);

}

 // Sight Seeing AND NightLife
 if (checkedSightseeing === true && checkedNightLife === true && checkedRestaurants === false) {
  
    getSightSeeingAndNightLife(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants);

}

// Sight Seeing AND Resturants
if (checkedSightseeing === true && checkedNightLife === false && checkedRestaurants === true) {
  
    getSightSeeingAndResturants(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants);

}
// Sight Seeing AND Resturants AND Night Life
if (checkedSightseeing === true && checkedNightLife === true && checkedRestaurants === true) {
  
    getSightSeeingAndResturantsAndNightLife(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants);

}
}

function getSightSeeingAndResturantsAndNightLife(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants) {

    const Amadeus = require("amadeus");
    const amadeus = new Amadeus({
        clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
        clientSecret: "jURdf96v6iemuPBy",
        hostname: 'production',
    });

    var a;
    var b;
    var that = this;
    amadeus.referenceData.locations.pointsOfInterest.get({
        latitude: lat,
        longitude: lng,
        radius: 20,
        category: "SIGHTS"
    }).then(function (response) {
       
        
        axios.post('/Temp.json', response.data).then(function (response) {
        a = response.data.name;
        amadeus.referenceData.locations.pointsOfInterest.get({
            latitude: lat,
            longitude: lng,
            radius: 20,
            category: "NIGHTLIFE"
        }).then(function (response) {
           
            
            axios.post('/Temp.json', response.data).then(function (response) {
            b = response.data.name;
    
            changePage2(location,"/ShowSightSeeingAndResturantsAndNightLife", lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants,a,b);
       
    
            }).catch(function (responseError) {
                alert("TO DO");
                console.log(responseError);
            });
            
        });

       

        }).catch(function (responseError) {
            alert("TO DO");
            console.log(responseError);
        });
        
    });

    

}







function getSightSeeingAndResturants(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants) {

    
    const Amadeus = require("amadeus");
    const amadeus = new Amadeus({
        clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
        clientSecret: "jURdf96v6iemuPBy",
        hostname: 'production',
    });

    var that = this;
    amadeus.referenceData.locations.pointsOfInterest.get({
        latitude: lat,
        longitude: lng,
        radius: 20,
        category: "SIGHTS"
    }).then(function (response) {
       
        
        axios.post('/Temp.json', response.data).then(function (response) {
            changePage(location,"/ShowSightSeeingAndResturants", lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants,response.data.name);
       

        }).catch(function (responseError) {
            alert("TO DO");
            console.log(responseError);
        });
    });
}




function getSightSeeingAndNightLife (location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants) {


            changePage2(location,"/ShowSightSeeingAndNightLife2", lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants,"nothing","nothing");

}
  
function getNightLife(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants) {

            changePage(location,"/ShowNightLife2", lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants,"nothing");  
}



function getResturants(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants) {
        
            changePage(location,'/ShowResturants2',lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants,"nothing");
       
}

function getSightseeing(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants) {

        changePage(location,"/ShowSightSeeing2", lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants,"nothing");
}


   function changePage (location,changeto,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants,pointer) {


    
    props.history.push({
        pathname: changeto,
        pointer,
        lat,
        lng,
        checkedSightseeing,
        checkedNightLife,
        checkedRestaurants,
        location,


    });
    
    }

    function changePage2 (location,changeto,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants,pointerA, pointerB) {

    
        props.history.push({
            pathname: changeto,
            pointerA,
            pointerB,
            lat,
            lng,
            checkedSightseeing,
            checkedNightLife,
            checkedRestaurants,
            location,
    
    
        });
        
        }
    

    








   let test = 0;
    const [pointerToData, setPointerToData] = useState({ pointerToData: 0 });
    const [data_original, setData] = useState({ data_original: "" });
    const [lat_original, setLat] = useState({ lat_original: 0 });
    const [lng_original, setLng] = useState({ lng_original: 0 });
    const [location, setLocation] = useState({ location: "" });
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedSightseeing: true,
        checkedNightLife: false,
        checkedRestaurants: true,
        location : location,
        lat_original : 0,
        lng_original : 0,
        data : data_original,
        pointer : 0,
     
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };




    return (
        <div>
            <h2> Trip Planner </h2>

            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Where are you traveling to?" variant="outlined" onChange={event => {
                    const newLocation = event.target.value;
                    setLocation(prevInputState => ({
                        location: newLocation,
                    }));
                }} />
            </form>

            <p><b> Sight Seeing </b></p>

            <Grid container justify="center">

                <div className={classes.sliderWidth}>
                    <Switch
                        checked={state.checkedSightseeing}
                        onChange={handleChange}
                        color="primary"
                        name="checkedSightseeing"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
            </Grid>


            <p><b> Night Life </b></p>
            <Grid container justify="center">
                <div className={classes.sliderWidth}>
                    <Switch
                        checked={state.checkedNightLife}
                        onChange={handleChange}
                        color="primary"
                        name="checkedNightLife"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
            </Grid>


            <p><b> Restaurants </b></p>
            <Grid container justify="center">
                <div className={classes.sliderWidth}>
                    <Switch
                        checked={state.checkedRestaurants}
                        onChange={handleChange}
                        color="primary"
                        name="checkedRestaurants"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
            </Grid>


            <h2></h2>
           
 


            <Button variant="contained" color="primary" onClick={ async () => {

                convertNameLocationToLatAndLong(location, state.checkedSightseeing, state.checkedNightLife, state.checkedRestaurants);
               /*setData(prevInputState => ({
                    data_original: got_back,
                   
                }));
                */
               
            
            }} > Go! </Button>



            
            <h2></h2>

          
        

            

        </div>
    );
};

export default Input;
