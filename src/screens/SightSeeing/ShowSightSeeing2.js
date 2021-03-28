import React, { Component } from 'react';
import '../../screens/General.css';
import Button from '@material-ui/core/Button';
import axios from '../../Firebase/axios';
import Sight from './Sight';
import Grid from '@material-ui/core/Grid';
import { count } from './Count';
import { sightsChecked } from './Count';
import { actuallSightsChecked } from './Count';
import { lng_sight } from './Count';
import { lan_sight } from './Count';
import logo from  '../logo_Royal.jpeg';
import ship from '../ship.jpeg';

//import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import savings from './Savings';

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist.toFixed(1);
    }
}


function mergeSort(array) {
    const half = array.length / 2

    // Base case or terminating case
    if (array.length < 2) {
        return array
    }

    const left = array.splice(0, half)
    return merge(mergeSort(left), mergeSort(array))
}


function merge(left, right) {
    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        if ((left[0].rank / left[0].distance) > (right[0].rank / right[0].distance)) {
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }
    }

    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [...arr, ...left, ...right]
}


function h(temp) {
    console.log("h");
    //console.log(temp);
    for (let key in ['a','b']) {
        var map;
        var infowindow;
        const google = window.google;




        var sydney = new google.maps.LatLng(-33.867, 151.195);

        infowindow = new google.maps.InfoWindow();

        console.log("h2");

        var sydney2 = new google.maps.LatLng(-33.867, 151.195);
        let map2 = new google.maps.Map(
            document.createElement("div"), { center: sydney2, zoom: 15 });

        const request2 = {
            placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
            fields: ["name", "formatted_address", "place_id", "geometry"],
        };

    
        const service = new google.maps.places.PlacesService(map2);
        service.getDetails(request2, (place, status) => {
            console.log(status);
            console.log("im in");
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(place);
                console.log("im in");

            }
        });


    }
   
}




class ShowSightSeeing extends Component {

    state = {
        resturants: [],
        loading: true,
        lat_to_pass: this.props.location.lat,
        lng_to_pass: this.props.location.lng,
        location: this.props.location.location,
  
    }


    constructor(props) {
        super(props);
    }

  

    componentDidMount() {

    var that = this;   
    const Amadeus = require("amadeus");
    const amadeus = new Amadeus({
        clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
        clientSecret: "jURdf96v6iemuPBy",
        hostname: 'production',
    });
    
    
    amadeus.referenceData.locations.pointsOfInterest.get({
        latitude: that.state.lat_to_pass,
        longitude: that.state.lng_to_pass,
        radius: 20,
        category: "SIGHTS"
    })
    .then(function (response) {
       
        savings.try1 = response.data;
        savings.lat1 = that.state.lat_to_pass;
        savings.lng1 = that.state.lng_to_pass;
        savings.location1 = that.state.location;

        
        for (let key in savings.try1) {
            savings.try1[key].photoUrl = "http://img.arirang.com/A_UpFile/Template/TP170927111345_A1.png"; //not yet"; 
            savings.try1[key].place_id = 0;
            savings.try1[key].address = "";
            savings.try1[key].open = "Closed";
            savings.try1[key].type = undefined;
            let photoName = savings.try1[key].name;
            var map;
            var service;
            var infowindow;
            const google = window.google;
            initMap(savings.try1[key]);

            function initMap(pointer) {
                var sydney = new google.maps.LatLng(-33.867, 151.195);

                infowindow = new google.maps.InfoWindow();

                map = new google.maps.Map(
                    document.createElement("p"), { center: sydney, zoom: 15 });


                var request = {
                    query: photoName,
                    fields: ['geometry', 'place_id', 'photos', 'formatted_address', 'opening_hours','type'],
                };
                
                var service = new google.maps.places.PlacesService(map);
                service.findPlaceFromQuery(request, function (results, status) {
                    
                    
                    if (status === google.maps.places.PlacesServiceStatus.OK) {

                        console.log(results[0]);
                        

                        try {
                            if (results[0].types != undefined)
                            {
                                    var temp_type = results[0].types;
                                    for ( var i = 0 ; i < temp_type.length ; i = i + 1)
                                    {
                                        if (temp_type[i] != "tourist_attraction" && 
                                        temp_type[i] != "point_of_interest" && 
                                        
                                        temp_type[i] != "premise"  && 
                                        temp_type[i] != "establishment" )
                                        savings.try1[key].type = temp_type[i];
                                        
                                    
                                    }
                                    if (savings.try1[key].type == undefined)
                                        {
                                            savings.try1[key].type = "tourist_attraction";
                                            
                                        }
                                
                                    savings.try1[key].type = savings.try1[key].type.split('_').join(' ')
                                  
                                    
                            }
                        }
                        catch(err) {
                            console.log(err);
                            that.props.history.push({
                                pathname: '/NoResults',
                            });
                          }



                        try {
                        if (results[0].opening_hours != undefined)
                        {
                            if (results[0].opening_hours.open_now == true)
                                savings.try1[key].open = "Open"
                                
                        }
                    }
                    catch(err) {
                        console.log(err);
                        that.props.history.push({
                            pathname: '/NoResults',
                        });
                      }
                       
                        
                        if (savings.try1[key] == undefined || savings.try1[key] == undefined)
                        {
                        
                            that.props.history.push({
                                pathname: '/NoResults',
                            });
                           

                        }

                        //savings.try1[key].place_id = results[0].place_id;
                        try {
                            savings.try1[key].place_id = results[0].place_id;
                          }
                          catch(err) {
                            console.log(err);
                            that.props.history.push({
                                pathname: '/NoResults',
                            });
                          }

                          try {
                            if (results[0].formatted_address != undefined)
                            savings.try1[key].address = results[0].formatted_address;
                          }
                          catch(err) {
                            console.log(err);
                            that.props.history.push({
                                pathname: '/NoResults',
                            });
                          }

                          try {
                            if (results[0].photos != undefined ) 
                        {
                            
                            savings.try1[key].photoUrl = results[0].photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
                        }
                          }
                          catch(err) {
                              console.log(err);
                            that.props.history.push({
                                pathname: '/NoResults',
                            });
                          }
                      
                          that.setState({ loading: false, resturants: savings.try1 });
                          console.log("hiiiiiii");
                          console.log(savings.try1);
                          if (savings.try1.length % 2 == 0)
                          {////////
                              //that.setState({ resturants: savings.try1.splice(0, savings.try1.length-2)});
                              console.log("hiiiiiii");
                          }
                          
                        
                    }
                })
                


            }
            
        }
    
    })
    
/// 14/03/2021

.then(something => {

    var temp = savings.try1;
    for (let key in temp) {

        let t = distance(that.props.location.lat, that.props.location.lng, temp[key].geoCode.latitude, temp[key].geoCode.longitude, 'K');
        temp[key].distance = t;
    }
    that.setState({ loading: false, resturants: mergeSort(that.state.resturants) });
    

})


.then(something => {


    that.setState({ loading: false, resturants: mergeSort(that.state.resturants) });
  


})





.catch(err => { console.log(err); })

/// 14/03/2021



}


      

      
    









    render() {





        return (



            <div>
               
               <img src={logo}   style={{ 
     padding: '30px '}}/>
               
               
                <h2 >Top Sight Seeing In The Area</h2>
               
                <h4 >Choose Up to 4 atractions </h4>
                
                <Grid container justify="center">
              
                   
                        
                        { 
                        this.state.resturants.map(resturant => (
                            <div width="50%" class="w">
                            <Sight
                                id={resturant.id}
                                name={resturant.name}
                                rank={resturant.rank}
                                distance={resturant.distance}
                                id={resturant.id}
                                url= {resturant.photoUrl}
                                type= {resturant.type}
                                open= {resturant.open}
                            />
                          </div>
                        ))
                        }
                   
                   

                



                </Grid>

                <Button variant="contained" color="primary" onClick={async () => {

                    if (count <= 0) {
                        alert("Please select at least 1 activity")

                    }
                    else {
                        //console.log(sightsChecked);
                        for (var i = 0; i < sightsChecked.length; i++) {
                            for (var j = 0; j < this.state.resturants.length; j++) {
                                if (sightsChecked[i] === this.state.resturants[j].id) {

                                    actuallSightsChecked.push(this.state.resturants[j]);
                                    //sightsChecked.splice(i, 1); 
                                }

                            }
                        }
                        let dataToSend = this.props.location.location;
                        let a = this.state.lat_to_pass;
                        let b = this.state.lng_to_pass;
                        this.props.history.push({
                            pathname: '/FinalTrackSightSeeing',
                            dataToSend,
                            a,
                            b,



                        });




                    }

                }} > Calculate the shortest track! </Button>

            


            </div>
        );
    }
}

export default ShowSightSeeing;

