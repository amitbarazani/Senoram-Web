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

        //<3
        savings4.try1 = response.data;
        savings4.lat1 = lat;
        savings4.lng1 = lng;
        savings4.location1 = location;

        ////////////////////////////
       
        for (let key in savings4.try1) {
            savings4.try1[key].photoUrl = "not yet";
            savings4.try1[key].place_id = 0;
            savings4.try1[key].address = "";
            savings4.try1[key].open = "Closed";
            savings4.try1[key].type = undefined;
            savings4.try1[key].location = location;
            let photoName = savings4.try1[key].name;
            var map;
            var service;
            var infowindow;
            const google = window.google;
            initMap(savings4.try1[key]);

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
                                        temp_type[i] != "establishment" )
                                        savings4.try1[key].type = temp_type[i];
                                        
                                    
                                    }
                                    if (savings4.try1[key].type == undefined)
                                        {
                                            savings4.try1[key].type = "tourist_attraction";
                                            
                                        }
                                
                                        savings4.try1[key].type = savings4.try1[key].type.split('_').join(' ')
                                  
                                    
                            }
                        }
                        catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }



                        try {
                        if (results[0].opening_hours != undefined)
                        {
                            if (results[0].opening_hours.open_now == true)
                            savings4.try1[key].open = "Open"
                                
                        }
                    }
                    catch(err) {
                        props.history.push({
                            pathname: '/NoResults',
                        });
                      }
                       
                        
                        if (savings4.try1[key] == undefined || savings4.try1[key] == undefined)
                        {
                        
                            props.history.push({
                                pathname: '/NoResults',
                            });
                           

                        }

                        //savings4.try1[key].place_id = results[0].place_id;
                        try {
                            savings4.try1[key].place_id = results[0].place_id;
                          }
                          catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }

                          try {
                            if (results[0].formatted_address != undefined)
                            savings4.try1[key].address = results[0].formatted_address;
                          }
                          catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }

                          try {
                            if (results[0].photos != undefined ) 
                        {
                            
                            savings4.try1[key].photoUrl = results[0].photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
                        }
                          }
                          catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }
                      
                        
                        
                    }
                })
                


            }
            
        }

        //<3

        axios.post('/Temp.json', response.data).then(function (response) {
        a = response.data.name;
        
        amadeus.referenceData.locations.pointsOfInterest.get({
            latitude: lat,
            longitude: lng,
            radius: 20,
            category: "NIGHTLIFE"
        }).then(function (response) {
            
            //<3
        savings4.try2 = response.data;
        savings4.lat1 = lat;
        savings4.lng1 = lng;
        savings4.location1 = location;

        ////////////////////////////
       
        for (let key in savings4.try2) {
            savings4.try2[key].photoUrl = "not yet";
            savings4.try2[key].place_id = 0;
            savings4.try2[key].address = "";
            savings4.try2[key].open = "Closed";
            savings4.try2[key].type = undefined;
            savings4.try2[key].location = location;
            let photoName = savings4.try2[key].name;
            var map;
            var service;
            var infowindow;
            const google = window.google;
            initMap(savings4.try2[key]);

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
                                        temp_type[i] != "establishment" )
                                        savings4.try2[key].type = temp_type[i];
                                        
                                    
                                    }
                                    if (savings4.try2[key].type == undefined)
                                        {
                                            savings4.try2[key].type = "tourist_attraction";
                                            
                                        }
                                
                                        savings4.try2[key].type = savings4.try2[key].type.split('_').join(' ')
                                  
                                    
                            }
                        }
                        catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }



                        try {
                        if (results[0].opening_hours != undefined)
                        {
                            if (results[0].opening_hours.open_now == true)
                            savings4.try2[key].open = "Open"
                                
                        }
                    }
                    catch(err) {
                        props.history.push({
                            pathname: '/NoResults',
                        });
                      }
                       
                        
                        if (savings4.try2[key] == undefined || savings4.try1[key] == undefined)
                        {
                        
                            props.history.push({
                                pathname: '/NoResults',
                            });
                           

                        }

                        //savings4.try2[key].place_id = results[0].place_id;
                        try {
                            savings2.try2[key].place_id = results[0].place_id;
                          }
                          catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }

                          try {
                            if (results[0].formatted_address != undefined)
                            savings4.try2[key].address = results[0].formatted_address;
                          }
                          catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }

                          try {
                            if (results[0].photos != undefined ) 
                        {
                            
                            savings4.try2[key].photoUrl = results[0].photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
                        }
                          }
                          catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }
                      
                        
                        
                    }
                })
                


            }
            
        }

        //<3
            
            axios.post('/Temp.json', response.data).then(function (response) {
            b = response.data.name;
    
            changePage2(location,"/ShowSightSeeingAndNightLife", lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants,a,b);
       
    
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
  
function getNightLife(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants) {

    
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
        category: "NIGHTLIFE"
    }).then(function (response) {

        //<3
        savings2.try1 = response.data;
        savings2.lat1 = lat;
        savings2.lng1 = lng;
        savings2.location1 = location;

        ////////////////////////////
       
        for (let key in savings2.try1) {
            savings2.try1[key].photoUrl = "not yet";
            savings2.try1[key].place_id = 0;
            savings2.try1[key].address = "";
            savings2.try1[key].open = "Closed";
            savings2.try1[key].type = undefined;
            let photoName = savings2.try1[key].name;
            var map;
            var service;
            var infowindow;
            const google = window.google;
            initMap(savings2.try1[key]);

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
                                        temp_type[i] != "establishment" )
                                        savings2.try1[key].type = temp_type[i];
                                        
                                    
                                    }
                                    if (savings2.try1[key].type == undefined)
                                        {
                                            savings2.try1[key].type = "tourist_attraction";
                                            
                                        }
                                
                                        savings2.try1[key].type = savings2.try1[key].type.split('_').join(' ')
                                  
                                    
                            }
                        }
                        catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }



                        try {
                        if (results[0].opening_hours != undefined)
                        {
                            if (results[0].opening_hours.open_now == true)
                            savings2.try1[key].open = "Open"
                                
                        }
                    }
                    catch(err) {
                        props.history.push({
                            pathname: '/NoResults',
                        });
                      }
                       
                        
                        if (savings2.try1[key] == undefined || savings2.try1[key] == undefined)
                        {
                        
                            props.history.push({
                                pathname: '/NoResults',
                            });
                           

                        }

                        //savings2.try1[key].place_id = results[0].place_id;
                        try {
                            savings2.try1[key].place_id = results[0].place_id;
                          }
                          catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }

                          try {
                            if (results[0].formatted_address != undefined)
                            savings2.try1[key].address = results[0].formatted_address;
                          }
                          catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }

                          try {
                            if (results[0].photos != undefined ) 
                        {
                            
                            savings2.try1[key].photoUrl = results[0].photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
                        }
                          }
                          catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }
                      
                        
                        
                    }
                })
                


            }
            
        }

        //<3
       
        
        axios.post('/Temp.json', response.data).then(function (response) {
            changePage(location,"/ShowNightLife", lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants,response.data.name);
       

        }).catch(function (responseError) {
            alert("TO DO");
            console.log(responseError);
        });
    });
}



function getResturants(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants) {

    
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
        category: "RESTAURANT"
    }).then(function (response) {

        //<3

        savings3.try1 = response.data;
        savings3.lat1 = lat;
        savings3.lng1 = lng;
        savings3.location1 = location;

        ////////////////////////////
       
        for (let key in savings3.try1) {
            savings3.try1[key].photoUrl = "not yet";
            savings3.try1[key].place_id = 0;
            savings3.try1[key].address = "";
            savings3.try1[key].open = "Closed";
            savings3.try1[key].type = undefined;
            let photoName = savings3.try1[key].name;
            var map;
            var service;
            var infowindow;
            const google = window.google;
            initMap(savings3.try1[key]);

            function initMap(pointer) {
                var sydney = new google.maps.LatLng(-33.867, 151.195);

                infowindow = new google.maps.InfoWindow();

                map = new google.maps.Map(
                    document.createElement("p"), { center: sydney, zoom: 15 });


                var request = {
                    query: photoName  + location + ' Resturant',
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
                                        temp_type[i] != "establishment" )
                                        savings3.try1[key].type = temp_type[i];
                                        
                                    
                                    }
                                    if (savings3.try1[key].type == undefined)
                                        {
                                            savings3.try1[key].type = "tourist_attraction";
                                            
                                        }
                                
                                        savings3.try1[key].type = savings3.try1[key].type.split('_').join(' ')
                                  
                                    
                            }
                        }
                        catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }



                        try {
                        if (results[0].opening_hours != undefined)
                        {
                            if (results[0].opening_hours.open_now == true)
                            savings3.try1[key].open = "Open"
                                
                        }
                    }
                    catch(err) {
                        props.history.push({
                            pathname: '/NoResults',
                        });
                      }
                       
                        
                        if (savings3.try1[key] == undefined || savings3.try1[key] == undefined)
                        {
                        
                            props.history.push({
                                pathname: '/NoResults',
                            });
                           

                        }

                        //savings3.try1[key].place_id = results[0].place_id;
                        try {
                            savings3.try1[key].place_id = results[0].place_id;
                          }
                          catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }

                          try {
                            if (results[0].formatted_address != undefined)
                            savings3.try1[key].address = results[0].formatted_address;
                          }
                          catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }

                          try {
                            if (results[0].photos != undefined ) 
                        {
                            
                            savings3.try1[key].photoUrl = results[0].photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
                        }
                          }
                          catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }
                      
                        
                        
                    }
                })
                


            }
            
        }

        

        //<3

       
        
        axios.post('/Temp.json', response.data).then(function (response) {
            changePage(location,'/ShowResturants',lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants,response.data.name);
       

        }).catch(function (responseError) {
            alert("TO DO");
            console.log(responseError);
        });
    });
}

function getSightseeing(location,lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants) {

  
      
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
    })
    .then(function (response) {
       
        savings.try1 = response.data;
        savings.lat1 = lat;
        savings.lng1 = lng;
        savings.location1 = location;

        ////////////////////////////

        
        const unsplash = new Unsplash({
            accessKey: "e8G_4rvS91r0Jvd70eCKkvbp4vl0zTdeMK95lOek76Q",
           
          
          });

        for (let key in savings.try1) {

            let photoName = savings.location1.location + " " +  savings.try1[key].name;
            photoName = photoName.replace(/%20/g, " ");
            console.log(photoName);

        

            unsplash.search.photos(photoName).then(toJson).then((json) => {
            //console.log(json.results[0].urls.full);
            savings.try1[key].photoUrl = json.results[0].urls.small;
             });




        }
        /*
        for (let key in savings.try1) {
            savings.try1[key].photoUrl = "not yet"; //'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
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
                    fields: ['geometry', 'place_id', 'photos', 'formatted_address', 'opening_hours','type',"icon"],
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
                            props.history.push({
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
                        props.history.push({
                            pathname: '/NoResults',
                        });
                      }
                       
                        
                        if (savings.try1[key] == undefined || savings.try1[key] == undefined)
                        {
                        
                            props.history.push({
                                pathname: '/NoResults',
                            });
                           

                        }

                        //savings.try1[key].place_id = results[0].place_id;
                        try {
                            savings.try1[key].place_id = results[0].place_id;
                          }
                          catch(err) {
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }

                          try {
                            if (results[0].formatted_address != undefined)
                            savings.try1[key].address = results[0].formatted_address;
                          }
                          catch(err) {
                            props.history.push({
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
                            props.history.push({
                                pathname: '/NoResults',
                            });
                          }
                      
                        
                        
                    }
                })
                


            }
            
        }

      */

        ///////////////////////////




     

        axios.post('/Temp.json', response.data).then(function (response) {
            
          changePage(location,"/ShowSightSeeing", lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants,response.data.name);
       

        }).catch(function (responseError) {
            alert("TO DO");
            console.log(responseError);
        });
    });
    
    
    
        
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
   //const [test, setTest] = useState({ test: 0 });
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


// <Button variant="contained" color="primary"  data={data1} onClick={ async () => {