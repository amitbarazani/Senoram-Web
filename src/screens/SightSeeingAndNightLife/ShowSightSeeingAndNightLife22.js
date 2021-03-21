import React, { Component } from 'react';
import '../../screens/General.css';
import Button from '@material-ui/core/Button';
import axios from '../../Firebase/axios';
import Sight from './Sight';
import Night from './Night';
import Grid from '@material-ui/core/Grid';
import { count } from './Count';
import { sightsChecked } from './Count';
import { NightLifeChecked } from './Count';
import { actuallSightsChecked } from './Count';
import { lng_sight } from './Count';
import { lan_sight } from './Count';
import { sightsSeeing } from './Count';
import { nights } from './Count';
import savings from './Savings4';
import { locationCount } from './Count';




function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist.toFixed(1);
    }
}


function mergeSort(array) {
    const half = array.length / 2
    
    // Base case or terminating case
    if(array.length < 2){
      return array 
    }
    
    const left = array.splice(0, half)
    return merge(mergeSort(left),mergeSort(array))
  }


  function merge(left, right) {
    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        if ((left[0].rank/left[0].distance)> (right[0].rank/right[0].distance)) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }
    
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [ ...arr, ...left, ...right ]
}




class ShowSightSeeing extends Component {

    

    state = {
        resturants: [],
        resturantsB: [],
        loading: true,
        pointerA: this.props.location.pointerA,
        pointerB: this.props.location.pointerB,
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
            latitude:  savings.lat1,
            longitude: savings.lng1,
            radius: 20,
            category: "NIGHTLIFE"
        })
        .then(function (response) {
           
            savings.try2 = response.data;
         
            savings.lat1 = that.state.lat_to_pass;
            savings.lng1 = that.state.lng_to_pass;
            savings.location1 = that.state.location;
    
            
            for (let key in savings.try2) {
                savings.try2[key].photoUrl = "http://img.arirang.com/A_UpFile/Template/TP170927111345_A1.png"; //not yet"; 
                savings.try2[key].place_id = 0;
                savings.try2[key].address = "";
                savings.try2[key].open = "Closed";
                savings.try2[key].type = undefined;
                let photoName = savings.try2[key].name;
                var map;
                var service;
                var infowindow;
                const google = window.google;
                initMap(savings.try2[key]);
    
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
                                            savings.try2[key].type = temp_type[i];
                                            
                                        
                                        }
                                        if (savings.try2[key].type == undefined)
                                            {
                                                savings.try2[key].type = "tourist_attraction";
                                                
                                            }
                                    
                                        savings.try2[key].type = savings.try2[key].type.split('_').join(' ')
                                      
                                        
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
                                    savings.try2[key].open = "Open"
                                    
                            }
                        }
                        catch(err) {
                            console.log(err);
                            that.props.history.push({
                                pathname: '/NoResults',
                            });
                          }
                           
                            
                            if (savings.try2[key] == undefined || savings.try2[key] == undefined)
                            {
                            
                                that.props.history.push({
                                    pathname: '/NoResults',
                                });
                               
    
                            }
    
                            //savings.try1[key].place_id = results[0].place_id;
                            try {
                                savings.try2[key].place_id = results[0].place_id;
                              }
                              catch(err) {
                                console.log(err);
                                that.props.history.push({
                                    pathname: '/NoResults',
                                });
                              }
    
                              try {
                                if (results[0].formatted_address != undefined)
                                savings.try2[key].address = results[0].formatted_address;
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
                                
                                savings.try2[key].photoUrl = results[0].photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
                            }
                              }
                              catch(err) {
                                  console.log(err);
                                that.props.history.push({
                                    pathname: '/NoResults',
                                });
                              }
                          
                              that.setState({ loading: false, resturantsB: savings.try2 });
                            
                        }
                    })
                    
    
    
                }
                
            }
        
        })
        
    /// 14/03/2021
    
    .then(something => {
    
        var temp = savings.try2;
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
    
    
    
        <div >
           
           
            <h2 >Now, Choose Top Night Life In The Area</h2>
           
            
            
            <Grid container justify="center">
          
               
                    
                    { 
                    this.state.resturantsB.map(resturant => (
                        <div width="50%" class="w">
                        <Night
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
            let dataToSend1; 
                if (count <= 0) {
                    alert("Please select at least 1 activity")
                   // dataToSend = this.props.location.location;
                }
                else {
                    //console.log(sightsChecked);
                    for( var i = 0; i < NightLifeChecked.length; i++){ 
                        for( var j = 0; j < this.state.resturantsB.length; j++){
                        if ( NightLifeChecked[i] === this.state.resturantsB[j].id) {

                            nights.push(this.state.resturantsB[j]);
                          //sightsChecked.splice(i, 1); 
                        }
                    
                    }
                    //dataToSend = this.props.location.location.location;
                }
               dataToSend1 = this.props.location.location.location;
               
               

                    
                  
                  
                    let a = this.props.location.a;
         
                   let b = this.props.location.b;
                   
                    this.props.history.push({
                        pathname: '/FinalTrackSightSeeingAndNightLife',
                        dataToSend1,
                        a,
                        b,



                    });




                }

            }} > Now Show Me Top Night Life </Button>

        


        </div>
    );
}
}
export default ShowSightSeeing;



