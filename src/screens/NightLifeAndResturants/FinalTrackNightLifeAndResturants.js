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
import Final from './Final';
import Location from './Location';
import { lng_sight } from './Count';
import { lan_sight } from './Count';
import PriorityQueue from "priorityqueue";
import Button from '@material-ui/core/Button';
import axios from '../../Firebase/axios';
import { memory } from './Count';
import ship from '../ship.jpeg';
import Card from '@material-ui/core/Card';


const style ={
    
    width: '50%',
    position: 'center',
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


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








class FinalTrack extends Component {


    state = {
        sights: [],
        ending: 0,
        location: this.props.location.dataToSend.location,
    }
    constructor(props) {
        super(props);

    }


 


    componentDidMount() {
        if (actuallSightsChecked.length == 1) {
            console.log("1");
            for (var i = 0; i < actuallSightsChecked.length; i++)
                sorted.push(actuallSightsChecked[i]);
            
            this.setState({ sights: sorted });

            let tt = distance(actuallSightsChecked[0].geoCode.latitude, actuallSightsChecked[0].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });

            const Amadeus = require("amadeus");
            const amadeus = new Amadeus({
                clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
                clientSecret: "jURdf96v6iemuPBy",
                hostname: 'production',
            });

            sorted[0].resturant1 = " ";
            sorted[0].resturant2 = " ";

            var that = this;
            amadeus.referenceData.locations.pointsOfInterest.get({
                latitude: actuallSightsChecked[0].geoCode.latitude,
                longitude: actuallSightsChecked[0].geoCode.longitude,
                radius: 20,
                category: "RESTAURANT"
            }).then(function (response) {
                console.log(response.data);
                if (response.data.length == 1) {
                    sorted[0].resturant1 = response.data[0];
                    sorted[0].resturant2 = " ";

                }

                if (response.data.length >= 2) {
                    sorted[0].resturant1 = response.data[0];
                    sorted[0].resturant2 = response.data[1];
                    console.log(sorted[0].resturant1.name, sorted[0].resturant2.name);
                }

                

                

            }).then(function (response) {
                that.setState({ sights: sorted });
            });
        




        }
        if (actuallSightsChecked.length == 2) {

            console.log("2");

            this.setState({ sights: actuallSightsChecked });
            actuallSightsChecked[0].resturant1 = {name: "No Resturant Found"};
            actuallSightsChecked[0].resturant2 = {name: "No Resturant Found"};
            actuallSightsChecked[1].resturant1 = {name: "No Resturant Found"};
            actuallSightsChecked[1].resturant2 = {name: "No Resturant Found"};
            


            if (actuallSightsChecked[0].distance > actuallSightsChecked[1].distance) {
                var temp = actuallSightsChecked[0];
                actuallSightsChecked[0] = actuallSightsChecked[1];
                actuallSightsChecked[1] = temp;
            }


            let tt = distance(actuallSightsChecked[1].geoCode.latitude, actuallSightsChecked[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
          
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });


            let t = distance(actuallSightsChecked[0].geoCode.latitude, actuallSightsChecked[0].geoCode.longitude, actuallSightsChecked[1].geoCode.latitude, actuallSightsChecked[1].geoCode.longitude, 'K');

            actuallSightsChecked[1].distance = t;

        
            
            this.setState({ sights: actuallSightsChecked }, () =>{

            
                const Amadeus = require("amadeus");
            const amadeus = new Amadeus({
                clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
                clientSecret: "jURdf96v6iemuPBy",
                hostname: 'production',
            });

       

            var that = this;
            amadeus.referenceData.locations.pointsOfInterest.get({
                latitude: actuallSightsChecked[0].geoCode.latitude,
                longitude: actuallSightsChecked[0].geoCode.longitude,
                radius: 2,
                category: "RESTAURANT"
            }).then(function (response) {
                console.log(response.data);
                //console.log("checking"+ i);
                if (response.data.length == 1) {
                    actuallSightsChecked[0].resturant1 = response.data[0];
                    //actuallSightsChecked[0].resturant2 = " ";

                }

                if (response.data.length >= 2) {
                    //console.log(actuallSightsChecked[0]);
                    //console.log(i);
                    actuallSightsChecked[0].resturant1 = response.data[0];
                    actuallSightsChecked[0].resturant2 = response.data[1];
                    
                }

             

            }).then(function (response) {
                that.setState({ sights: actuallSightsChecked });
            });


            

       

            var that = this;
            amadeus.referenceData.locations.pointsOfInterest.get({
                latitude: actuallSightsChecked[1].geoCode.latitude,
                longitude: actuallSightsChecked[1].geoCode.longitude,
                radius: 2,
                category: "RESTAURANT"
            }).then(function (response) {
                console.log(response.data);
                console.log("checking"+ i);
                if (response.data.length == 1) {
                    actuallSightsChecked[1].resturant1 = response.data[0];
                   // actuallSightsChecked[1].resturant2 = " ";

                }

                if (response.data.length >= 2) {
                    //console.log(actuallSightsChecked[0]);
                    //console.log(i);
                    actuallSightsChecked[1].resturant1 = response.data[response.data.length-1];
                    actuallSightsChecked[1].resturant2 = response.data[response.data.length-2];
                    
                }

             

            }).then(function (response) {
                that.setState({ sights: actuallSightsChecked });
            });
          
            

    

            });

            
        
    


            


        }
        if (actuallSightsChecked.length == 3) {
            console.log("3");

            this.setState({ sights: actuallSightsChecked });
            actuallSightsChecked[0].resturant1 = {name: "No Resturant Found"};
            actuallSightsChecked[0].resturant2 = {name: "No Resturant Found"};
            actuallSightsChecked[1].resturant1 = {name: "No Resturant Found"};
            actuallSightsChecked[1].resturant2 = {name: "No Resturant Found"};
            actuallSightsChecked[2].resturant1 = {name: "No Resturant Found"};
            actuallSightsChecked[2].resturant2 = {name: "No Resturant Found"};

            let temp1 = distance(actuallSightsChecked[0].geoCode.latitude, actuallSightsChecked[0].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp2 = distance(actuallSightsChecked[1].geoCode.latitude, actuallSightsChecked[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp3 = distance(actuallSightsChecked[2].geoCode.latitude, actuallSightsChecked[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            if ((temp1 <= temp2) && (temp1 <= temp3)) {
                temp2 = distance(actuallSightsChecked[0].geoCode.latitude, actuallSightsChecked[0].geoCode.longitude, actuallSightsChecked[1].geoCode.latitude, actuallSightsChecked[1].geoCode.longitude, 'K');
                temp3 = distance(actuallSightsChecked[0].geoCode.latitude, actuallSightsChecked[0].geoCode.longitude, actuallSightsChecked[2].geoCode.latitude, actuallSightsChecked[2].geoCode.longitude, 'K');

                if (temp2 <= temp3) {
                    //this.setState({ sights: actuallSightsChecked }); 
                }
                else {
                    var temp = actuallSightsChecked[1];
                    actuallSightsChecked[1] = actuallSightsChecked[2];
                    actuallSightsChecked[2] = temp;
                    // this.setState({ sights: actuallSightsChecked });         
                }

            }

            if ((temp2 <= temp1) && (temp2 <= temp3)) {
                temp1 = distance(actuallSightsChecked[1].geoCode.latitude, actuallSightsChecked[1].geoCode.longitude, actuallSightsChecked[0].geoCode.latitude, actuallSightsChecked[0].geoCode.longitude, 'K');
                temp3 = distance(actuallSightsChecked[1].geoCode.latitude, actuallSightsChecked[1].geoCode.longitude, actuallSightsChecked[2].geoCode.latitude, actuallSightsChecked[2].geoCode.longitude, 'K');

                if (temp1 <= temp3) {
                    var temp = actuallSightsChecked[0];
                    actuallSightsChecked[0] = actuallSightsChecked[1];
                    actuallSightsChecked[1] = temp;
                    // this.setState({ sights: actuallSightsChecked }); 
                }
                else {
                    var temp = actuallSightsChecked[0];
                    var tempp = actuallSightsChecked[2];
                    actuallSightsChecked[0] = actuallSightsChecked[1];
                    actuallSightsChecked[1] = tempp;
                    actuallSightsChecked[2] = temp;
                    // this.setState({ sights: actuallSightsChecked });         
                }


            }

            if ((temp3 <= temp1) && (temp3 <= temp2)) {

                temp1 = distance(actuallSightsChecked[0].geoCode.latitude, actuallSightsChecked[0].geoCode.longitude, actuallSightsChecked[2].geoCode.latitude, actuallSightsChecked[2].geoCode.longitude, 'K');
                temp2 = distance(actuallSightsChecked[1].geoCode.latitude, actuallSightsChecked[1].geoCode.longitude, actuallSightsChecked[2].geoCode.latitude, actuallSightsChecked[2].geoCode.longitude, 'K');

                if (temp1 <= temp2) {
                    var temp = actuallSightsChecked[0]; // 1
                    var tempp = actuallSightsChecked[1]; // 2
                    actuallSightsChecked[0] = actuallSightsChecked[2]; // 3
                    actuallSightsChecked[1] = temp;
                    actuallSightsChecked[2] = tempp;
                    //  this.setState({ sights: actuallSightsChecked }); 
                }
                else {
                    var temp = actuallSightsChecked[0]; // 1
                    actuallSightsChecked[0] = actuallSightsChecked[2]; // 3
                    actuallSightsChecked[2] = temp;
                    //  this.setState({ sights: actuallSightsChecked });         
                }

            }



            let tt = distance(actuallSightsChecked[2].geoCode.latitude, actuallSightsChecked[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            //console.log(lan_sight);
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });


            let t = distance(actuallSightsChecked[1].geoCode.latitude, actuallSightsChecked[1].geoCode.longitude, actuallSightsChecked[0].geoCode.latitude, actuallSightsChecked[0].geoCode.longitude, 'K');

            actuallSightsChecked[1].distance = t;
            let ttt = distance(actuallSightsChecked[1].geoCode.latitude, actuallSightsChecked[1].geoCode.longitude, actuallSightsChecked[2].geoCode.latitude, actuallSightsChecked[2].geoCode.longitude, 'K');

            actuallSightsChecked[2].distance = ttt;
            this.setState({ sights: actuallSightsChecked }, () => {


                const Amadeus = require("amadeus");
                const amadeus = new Amadeus({
                    clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
                    clientSecret: "jURdf96v6iemuPBy",
                    hostname: 'production',
                });
    
           
    
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: actuallSightsChecked[0].geoCode.latitude,
                    longitude: actuallSightsChecked[0].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                    console.log("checking"+ i);
                    if (response.data.length == 1) {
                        actuallSightsChecked[0].resturant1 = response.data[0];
                        actuallSightsChecked[0].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        actuallSightsChecked[0].resturant1 = response.data[0];
                        actuallSightsChecked[0].resturant2 = response.data[1];
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: actuallSightsChecked });
                });
    
    
                
    
           
    
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: actuallSightsChecked[1].geoCode.latitude,
                    longitude: actuallSightsChecked[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                    console.log("checking"+ i);
                    if (response.data.length == 1) {
                        actuallSightsChecked[1].resturant1 = response.data[0];
                        actuallSightsChecked[1].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        actuallSightsChecked[1].resturant1 = response.data[response.data.length-1];
                        actuallSightsChecked[1].resturant2 = response.data[response.data.length-2];
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: actuallSightsChecked });
                });
                
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: actuallSightsChecked[1].geoCode.latitude,
                    longitude: actuallSightsChecked[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                    console.log("checking"+ i);
                    if (response.data.length == 1) {
                        actuallSightsChecked[2].resturant1 = response.data[0];
                        actuallSightsChecked[2].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        var found1 = false;
                        var j = 0 ;

                        while (found1 == false && j < response.data.length) {
                            if (response.data[j].id != actuallSightsChecked[0].resturant1.id 
                                && response.data[j].id != actuallSightsChecked[0].resturant2.id
                                && response.data[j].id != actuallSightsChecked[1].resturant1.id 
                                && response.data[j].id != actuallSightsChecked[1].resturant2.id)
                            {
                                actuallSightsChecked[2].resturant1 = response.data[j];
                                found1 = true;
                            }

                            j ++ ;

                          }
                          
                          var found2 = false;
                          j = 0 ;
                          while (found2 == false && j < response.data.length) {
                            if (response.data[j].id != actuallSightsChecked[0].resturant1.id 
                                && response.data[j].id != actuallSightsChecked[0].resturant2.id
                                && response.data[j].id != actuallSightsChecked[1].resturant1.id 
                                && response.data[j].id != actuallSightsChecked[1].resturant2.id
                                && response.data[j].id != actuallSightsChecked[2].resturant1.id)
                            {
                                actuallSightsChecked[2].resturant2 = response.data[j];
                                found2 = true;
                            }

                            j ++ ;

                          }
                        if (found1 == false)
                        {
                            actuallSightsChecked[2].resturant1 = response.data[0]; 
                        }
                        if (found2 == false)
                        {
                            actuallSightsChecked[2].resturant2 = response.data[1]; 
                        }
                        
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: actuallSightsChecked });
                });



            });








        }
        if (actuallSightsChecked.length == 4) {
            console.log("4");

            this.setState({ sights: actuallSightsChecked });
            actuallSightsChecked[0].resturant1 = {name: "No Resturant Found"};
            actuallSightsChecked[0].resturant2 = {name: "No Resturant Found"};
            actuallSightsChecked[1].resturant1 = {name: "No Resturant Found"};
            actuallSightsChecked[1].resturant2 = {name: "No Resturant Found"};
            actuallSightsChecked[2].resturant1 = {name: "No Resturant Found"};
            actuallSightsChecked[2].resturant2 = {name: "No Resturant Found"};
            actuallSightsChecked[3].resturant1 = {name: "No Resturant Found"};
            actuallSightsChecked[3].resturant2 = {name: "No Resturant Found"};

            let temp1 = distance(actuallSightsChecked[0].geoCode.latitude, actuallSightsChecked[0].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp2 = distance(actuallSightsChecked[1].geoCode.latitude, actuallSightsChecked[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp3 = distance(actuallSightsChecked[2].geoCode.latitude, actuallSightsChecked[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp4 = distance(actuallSightsChecked[3].geoCode.latitude, actuallSightsChecked[3].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            if ((temp1 <= temp2) && (temp1 <= temp3) && (temp1 <= temp4)) // 1
            {

                if ((temp2 <= temp3) && (temp2 <= temp4)) {
                    if (temp3 <= temp4) // 1 2 3 4
                    {
                        // nothing to do 
                    }
                    else  // 1 2 4 3 
                    {
                        var temp = actuallSightsChecked[2];
                        actuallSightsChecked[2] = actuallSightsChecked[3];
                        actuallSightsChecked[3] = temp;
                    }

                }

                if ((temp3 <= temp2) && (temp3 <= temp4)) {
                    if (temp2 <= temp4) // 1 3 2 4
                    {
                        var temp = actuallSightsChecked[1];
                        actuallSightsChecked[1] = actuallSightsChecked[2];
                        actuallSightsChecked[2] = temp;
                    }
                    else // 1 3 4 2
                    {
                        var temp = actuallSightsChecked[1];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        actuallSightsChecked[1] = tempp;
                        actuallSightsChecked[2] = temppp;
                        actuallSightsChecked[3] = temp;
                    }

                }

                if ((temp4 <= temp2) && (temp4 <= temp3)) {
                    if (temp2 <= temp3) // 1 4 2 3 
                    {
                        var temp = actuallSightsChecked[1];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        actuallSightsChecked[1] = temppp;
                        actuallSightsChecked[2] = temp;
                        actuallSightsChecked[3] = tempp;
                    }
                    else // 1 4 3 2 
                    {
                        var temp = actuallSightsChecked[1];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        actuallSightsChecked[1] = temppp;
                        actuallSightsChecked[2] = tempp;
                        actuallSightsChecked[3] = temp;
                    }
                }
            }

            if ((temp2 <= temp1) && (temp2 <= temp3) && (temp2 <= temp4)) // 2
            {

                if ((temp1 <= temp3) && (temp1 <= temp4)) {
                    if (temp3 <= temp4) // 2 1 3 4 
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[1];
                        actuallSightsChecked[1] = temp;
                        actuallSightsChecked[0] = tempp;
                    }
                    else // 2 1 4 3
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = tem;
                        actuallSightsChecked[1] = temp;
                        actuallSightsChecked[2] = temppp;
                        actuallSightsChecked[3] = tempp;
                    }

                }

                if ((temp3 <= temp1) && (temp3 <= temp4)) {
                    if (temp1 <= temp4) // 2 3 1 4 
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = tem;
                        actuallSightsChecked[1] = tempp;
                        actuallSightsChecked[2] = temp;
                        actuallSightsChecked[3] = temppp;
                    }
                    else // 2 3 4 1
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = tem;
                        actuallSightsChecked[1] = tempp;
                        actuallSightsChecked[2] = temppp;
                        actuallSightsChecked[3] = temp;
                    }

                }

                if ((temp4 <= temp1) && (temp4 <= temp3)) {
                    if (temp1 <= temp3) // 2 4 1 3 
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = tem;
                        actuallSightsChecked[1] = temppp;
                        actuallSightsChecked[2] = temp;
                        actuallSightsChecked[3] = tempp;
                    }
                    else // 2 4 3 1 
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = tem;
                        actuallSightsChecked[1] = temppp;
                        actuallSightsChecked[2] = tempp;
                        actuallSightsChecked[3] = temp;
                    }

                }

            }

            if ((temp3 <= temp1) && (temp3 <= temp2) && (temp3 <= temp4)) // 3
            {

                if ((temp1 <= temp2) && (temp1 <= temp4)) {
                    if (temp2 <= temp4) // 3 1 2 4 
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = tempp;
                        actuallSightsChecked[1] = temp;
                        actuallSightsChecked[2] = tem;
                    }
                    else // 3 1 4 2
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = tempp;
                        actuallSightsChecked[1] = temp;
                        actuallSightsChecked[2] = temppp;
                        actuallSightsChecked[3] = tem;
                    }

                }

                if ((temp2 <= temp1) && (temp2 <= temp4)) {
                    if (temp1 <= temp4) // 3 2 1 4
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = tempp;
                        actuallSightsChecked[1] = tem;
                        actuallSightsChecked[2] = temp;
                    }
                    else // 3 2 4 1
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = tempp;
                        actuallSightsChecked[1] = tem;
                        actuallSightsChecked[2] = temppp;
                        actuallSightsChecked[3] = temp;
                    }

                }

                if ((temp4 <= temp1) && (temp4 <= temp2)) {
                    if (temp1 <= temp2) // 3 4 1 2
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = tempp;
                        actuallSightsChecked[1] = temppp;
                        actuallSightsChecked[2] = temp;
                        actuallSightsChecked[3] = tem;
                    }
                    else // 3 4 2 1
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = tempp;
                        actuallSightsChecked[1] = temppp;
                        actuallSightsChecked[2] = tem;
                        actuallSightsChecked[3] = temp;
                    }

                }

            }

            if ((temp4 <= temp1) && (temp4 <= temp2) && (temp4 <= temp3)) // 4
            {

                if ((temp1 <= temp2) && (temp1 <= temp3)) {
                    if (temp2 <= temp3) // 4 1 2 3 
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = temppp;
                        actuallSightsChecked[1] = temp;
                        actuallSightsChecked[2] = tem;
                        actuallSightsChecked[3] = tempp;
                    }
                    else // 4 1 3 2 
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = temppp;
                        actuallSightsChecked[1] = temp;
                        actuallSightsChecked[2] = tempp;
                        actuallSightsChecked[3] = tem;
                    }

                }

                if ((temp2 <= temp1) && (temp2 <= temp3)) {
                    if (temp1 <= temp3) // 4 2 1 3 
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = temppp;
                        actuallSightsChecked[1] = tem;
                        actuallSightsChecked[2] = temp;
                        actuallSightsChecked[3] = tempp;
                    }
                    else // 4 2 3 1 
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = temppp;
                        actuallSightsChecked[1] = tem;
                        actuallSightsChecked[2] = tempp;
                        actuallSightsChecked[3] = temp;
                    }

                }

                if ((temp3 <= temp1) && (temp3 <= temp2)) {
                    if (temp1 <= temp2) // 4 3 1 2 
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = temppp;
                        actuallSightsChecked[1] = tempp;
                        actuallSightsChecked[2] = temp;
                        actuallSightsChecked[3] = tem;
                    }
                    else // 4 3 2 1 
                    {
                        var temp = actuallSightsChecked[0];
                        var tempp = actuallSightsChecked[2];
                        var temppp = actuallSightsChecked[3];
                        var tem = actuallSightsChecked[1];
                        actuallSightsChecked[0] = temppp;
                        actuallSightsChecked[1] = tempp;
                        actuallSightsChecked[2] = temp;
                        actuallSightsChecked[3] = tem;
                    }

                }


            }


            let tt = distance(actuallSightsChecked[3].geoCode.latitude, actuallSightsChecked[3].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            //console.log(lan_sight);
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });


            let t = distance(actuallSightsChecked[1].geoCode.latitude, actuallSightsChecked[1].geoCode.longitude, actuallSightsChecked[0].geoCode.latitude, actuallSightsChecked[0].geoCode.longitude, 'K');

            actuallSightsChecked[1].distance = t;
            let ttt = distance(actuallSightsChecked[1].geoCode.latitude, actuallSightsChecked[1].geoCode.longitude, actuallSightsChecked[2].geoCode.latitude, actuallSightsChecked[2].geoCode.longitude, 'K');

            actuallSightsChecked[2].distance = ttt;

            let tttt = distance(actuallSightsChecked[3].geoCode.latitude, actuallSightsChecked[3].geoCode.longitude, actuallSightsChecked[2].geoCode.latitude, actuallSightsChecked[2].geoCode.longitude, 'K');

            actuallSightsChecked[2].distance = tttt;


            this.setState({ sights: actuallSightsChecked }, () => {



                const Amadeus = require("amadeus");
                const amadeus = new Amadeus({
                    clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
                    clientSecret: "jURdf96v6iemuPBy",
                    hostname: 'production',
                });
    
           
    
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: actuallSightsChecked[0].geoCode.latitude,
                    longitude: actuallSightsChecked[0].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                    console.log("checking"+ i);
                    if (response.data.length == 1) {
                        actuallSightsChecked[0].resturant1 = response.data[0];
                        actuallSightsChecked[0].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        actuallSightsChecked[0].resturant1 = response.data[0];
                        actuallSightsChecked[0].resturant2 = response.data[1];
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: actuallSightsChecked });
                });
    
    
                
    
           
    
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: actuallSightsChecked[1].geoCode.latitude,
                    longitude: actuallSightsChecked[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                    console.log("checking"+ i);
                    if (response.data.length == 1) {
                        actuallSightsChecked[1].resturant1 = response.data[0];
                        actuallSightsChecked[1].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        actuallSightsChecked[1].resturant1 = response.data[response.data.length-1];
                        actuallSightsChecked[1].resturant2 = response.data[response.data.length-2];
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: actuallSightsChecked });
                });
                
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: actuallSightsChecked[1].geoCode.latitude,
                    longitude: actuallSightsChecked[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                    console.log("checking"+ i);
                    if (response.data.length == 1) {
                        actuallSightsChecked[2].resturant1 = response.data[0];
                        actuallSightsChecked[2].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        var found1 = false;
                        var j = 0 ;

                        while (found1 == false && j < response.data.length) {
                            if (response.data[j].id != actuallSightsChecked[0].resturant1.id 
                                && response.data[j].id != actuallSightsChecked[0].resturant2.id
                                && response.data[j].id != actuallSightsChecked[1].resturant1.id 
                                && response.data[j].id != actuallSightsChecked[1].resturant2.id)
                            {
                                actuallSightsChecked[2].resturant1 = response.data[j];
                                found1 = true;
                            }

                            j ++ ;

                          }
                          
                          var found2 = false;
                          j = 0 ;
                          while (found2 == false && j < response.data.length) {
                            if (response.data[j].id != actuallSightsChecked[0].resturant1.id 
                                && response.data[j].id != actuallSightsChecked[0].resturant2.id
                                && response.data[j].id != actuallSightsChecked[1].resturant1.id 
                                && response.data[j].id != actuallSightsChecked[1].resturant2.id
                                && response.data[j].id != actuallSightsChecked[2].resturant1.id)
                            {
                                actuallSightsChecked[2].resturant2 = response.data[j];
                                found2 = true;
                            }

                            j ++ ;

                          }
                        if (found1 == false)
                        {
                            actuallSightsChecked[2].resturant1 = response.data[0]; 
                        }
                        if (found2 == false)
                        {
                            actuallSightsChecked[2].resturant2 = response.data[1]; 
                        }
                        
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: actuallSightsChecked });
                });


                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: actuallSightsChecked[1].geoCode.latitude,
                    longitude: actuallSightsChecked[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                    console.log("checking"+ i);
                    if (response.data.length == 1) {
                        actuallSightsChecked[2].resturant1 = response.data[0];
                        actuallSightsChecked[2].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        var found11 = false;
                        var j = 0 ;

                        while (found11 == false && j < response.data.length) {
                            if (response.data[j].id != actuallSightsChecked[0].resturant1.id 
                                && response.data[j].id != actuallSightsChecked[0].resturant2.id
                                && response.data[j].id != actuallSightsChecked[1].resturant1.id 
                                && response.data[j].id != actuallSightsChecked[1].resturant2.id
                                && response.data[j].id != actuallSightsChecked[2].resturant1.id 
                                && response.data[j].id != actuallSightsChecked[2].resturant2.id)
                            {
                                actuallSightsChecked[3].resturant1 = response.data[j];
                                found11 = true;
                            }

                            j ++ ;

                          }
                          
                          var found22 = false;
                          j = 0 ;
                          while (found22 == false && j < response.data.length) {
                            if (response.data[j].id != actuallSightsChecked[0].resturant1.id 
                                && response.data[j].id != actuallSightsChecked[0].resturant2.id
                                && response.data[j].id != actuallSightsChecked[1].resturant1.id 
                                && response.data[j].id != actuallSightsChecked[1].resturant2.id
                                && response.data[j].id != actuallSightsChecked[2].resturant1.id 
                                && response.data[j].id != actuallSightsChecked[2].resturant2.id
                                && response.data[j].id != actuallSightsChecked[3].resturant1.id)
                            {
                                actuallSightsChecked[3].resturant2 = response.data[j];
                                found22 = true;
                            }

                            j ++ ;

                          }
                        if (found11 == false)
                        {
                            actuallSightsChecked[3].resturant1 = response.data[0]; 
                        }
                        if (found22 == false)
                        {
                            actuallSightsChecked[3].resturant2 = response.data[1]; 
                        }
                        
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: actuallSightsChecked });
                });









            });




        }

    }





    render() {

        return (

            <div style={{ 
                backgroundImage: `url(${ship})` ,height: '900px' ,width:'80%' ,backgroundRepeat: 'no-repeat' , margin:' 0 auto'}} >
<span>
       <a href="/MenuClient" target="_self" >           
       <img src={"https://logodownload.org/wp-content/uploads/2020/02/royal-caribbean-logo-4.png"}   style={{ 
     padding: '30px ',
     width: "400px",
  height: "150px",}} />
     </a>
   </span>

   <Grid 
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
 
 >

<Card style={style}>
                <Grid container justify="center">
                    <h5>
                    <br></br>
                        <p>{this.state.location} </p>
                        <p>Starting Point</p>
                        {this.state.sights.map(element => (

                            <Final
                                id={element.id}
                                name={element.name}
                                rank={element.rank}
                                url={element.photoUrl}
                                distance={element.distance}
                                resturant1={element.resturant1.name}
                                resturant2={element.resturant2.name}
                            />

                        ))

                        }

<br></br>
                        <p>{this.state.location} </p>
                        <p>{this.state.ending} </p>
                    </h5>



                </Grid>
                <Button variant="contained" color="primary" onClick={async () => {
               
               var pageHTML = document.documentElement.innerHTML;


               let data = new Blob([pageHTML], {type: 'data:attachment/text,'});
               let csvURL = window.URL.createObjectURL(data);
               let tempLink = document.createElement('a');
               tempLink.href = csvURL;
               tempLink.setAttribute('download', 'NightLifeAndResturants.html');
               tempLink.click();
                }} > SAVE </Button>
                    <br></br>
                     <br></br>

                     
</Card>
</Grid>
            </div>
        );
    }
}

export default FinalTrack;


// address={resturant.address}
