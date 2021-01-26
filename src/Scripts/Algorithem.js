import React from 'react';
import Geocode from "react-geocode";
import Component from 'react';


export let data;


Geocode.setApiKey("AIzaSyAlsDSqPYncPQDXhREqVsYgj6YiVGSyNMo");

// convert location to lat and long 
export function convertNameLocationToLatAndLong(location, checkedSightseeing, checkedNightLife, checkedRestaurants) {

    
    Geocode.fromAddress(location.location).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
             senarios(lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants);

        },
        error => {
            alert("TO DO");

        }
    );

}

// Senarios 
export function senarios(lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants) {

    // Just Resturant
    if (checkedSightseeing === false && checkedNightLife === false && checkedRestaurants === true) {
         getResturants(lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants);

    }
    // Just SightSeeing 

    // Just NightLife

}




export function tempJustResturants(lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants, data_input) {
    data = data_input
  



}





// API setup 

export function getResturants(lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants) {

    const Amadeus = require("amadeus");
    const amadeus = new Amadeus({
        clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
        clientSecret: "jURdf96v6iemuPBy",
        hostname: 'production',
    });

    console.log("im in getResturants")
    amadeus.referenceData.locations.pointsOfInterest.get({
        latitude: lat,
        longitude: lng,
        radius: 20,
        category: "RESTAURANT"
    }).then(function (response) {
        tempJustResturants(lat, lng, checkedSightseeing, checkedNightLife, checkedRestaurants, response.data);
    }).catch(function (responseError) {
        alert("TO DO")
    });
}










// Get Resturants attraction



// Get SightSeeing attraction
export function getSightSeeing(lat, lng) {

    const Amadeus = require("amadeus");
    const amadeus = new Amadeus({
        clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
        clientSecret: "jURdf96v6iemuPBy",
        hostname: 'production',
    });

    amadeus.referenceData.locations.pointsOfInterest.get({
        latitude: lat,
        longitude: lng,
        category: "SIGHTS"
    }).then(function (response) {
        console.log(response.data);
    }).catch(function (responseError) {
        console.log(responseError.code);
    });
}

// Get Night Life attraction
export function getNightLife(lat, lng) {

    const Amadeus = require("amadeus");
    const amadeus = new Amadeus({
        clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
        clientSecret: "jURdf96v6iemuPBy",
        hostname: 'production',
    });

    amadeus.referenceData.locations.pointsOfInterest.get({
        latitude: lat,
        longitude: lng,
        category: "NIGHTLIFE"
    }).then(function (response) {
        console.log(response.data);
    }).catch(function (responseError) {
        console.log(responseError.code);
    });
}

