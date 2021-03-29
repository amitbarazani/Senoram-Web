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
import { NightLifeChecked} from './Count';
import { sightsChecked } from './Count';
import { sightsSeeing } from './Count';
import { nights } from './Count';
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







    //classes = useStyles();

    state = {
        sights: [],
        ending: 0,
        location: this.props.location.dataToSend1, //this.props.location.dataToSend.location,
    }
    constructor(props) {
        super(props);

    }

    componentDidMount() {

        console.log(this.state.sights);
   
       if (sightsSeeing.length >=1 && nights.length >= 1)
       {
           for(var i = 0 ; i < this.state.sights.length ; i ++ )
       {
       
           if ( this.state.sights[i].c == "Night Life") 
           {
           
     
               var temp = this.state.sights;
               temp[i].c = "Sight Seeing";
               this.setState({ sights: temp});
   
           }
   
           if ( this.state.sights[i].c == undefined)
           {
             
               var temp = this.state.sights;
               temp[i].c = "Night Life";
               this.setState({ sights: temp});
           }
       }
   
       }    
       
   
       }


    componentWillMount() {

        // Just 1 SightSeeing
        if (nights.length == 0 && sightsSeeing.length == 1)
        {
            sorted.push(sightsSeeing[0]);
            sightsSeeing[0].c = "Sight Seeing"
            sorted[0].resturant1 = {name: "No Resturant Found"};
            this.setState({ sights: sorted });
            console.log(sorted);
            
            let tt = distance(sorted[0].geoCode.latitude, sorted[0].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
           
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
                latitude: sorted[0].geoCode.latitude,
                longitude: sorted[0].geoCode.longitude,
                radius: 3,
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
        // Just 1 NightLife
        if (nights.length == 1 && sightsSeeing.length == 0)
        {
            sorted.push(nights[0]);
            nights[0].c = "Night Life"
            this.setState({ sights: sorted });
            console.log(sorted);
            
            let tt = distance(sorted[0].geoCode.latitude, sorted[0].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            
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
                latitude: sorted[0].geoCode.latitude,
                longitude: sorted[0].geoCode.longitude,
                radius: 3,
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
        // 2 NightLife
        if (nights.length == 2 && sightsSeeing.length == 0)
        {
            if (nights[0].distance > nights[1].distance) {
                var temp = nights[0];
                nights[0] = nights[1];
                nights[1] = temp;
            }
            this.setState({ sights: nights });
            nights[0].resturant1 = {name: "No Resturant Found"};
            nights[0].resturant2 = {name: "No Resturant Found"};
            nights[1].resturant1 = {name: "No Resturant Found"};
            nights[1].resturant2 = {name: "No Resturant Found"};
            


            let tt = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });

            let t = distance(nights[0].geoCode.latitude, nights[0].geoCode.longitude, nights[1].geoCode.latitude, nights[1].geoCode.longitude, 'K');
            nights[1].distance = t;


            nights[0].c = "Night Life"
            nights[1].c = "Night Life"
            this.setState({ sights: nights });


            const Amadeus = require("amadeus");
            const amadeus = new Amadeus({
                clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
                clientSecret: "jURdf96v6iemuPBy",
                hostname: 'production',
            });

       

            var that = this;
            amadeus.referenceData.locations.pointsOfInterest.get({
                latitude: nights[0].geoCode.latitude,
                longitude: nights[0].geoCode.longitude,
                radius: 3,
                category: "RESTAURANT"
            }).then(function (response) {
                console.log(response.data);
                //console.log("checking"+ i);
                if (response.data.length == 1) {
                    nights[0].resturant1 = response.data[0];
                    //nights[0].resturant2 = " ";

                }

                if (response.data.length >= 2) {
                    //console.log(actuallSightsChecked[0]);
                    //console.log(i);
                    nights[0].resturant1 = response.data[0];
                    nights[0].resturant2 = response.data[1];
                    
                }

             

            }).then(function (response) {
                that.setState({ sights: nights });
            });


            

       

            var that = this;
            amadeus.referenceData.locations.pointsOfInterest.get({
                latitude: nights[1].geoCode.latitude,
                longitude: nights[1].geoCode.longitude,
                radius: 3,
                category: "RESTAURANT"
            }).then(function (response) {
                console.log(response.data);
               // console.log("checking"+ i);
                if (response.data.length == 1) {
                    nights[1].resturant1 = response.data[0];
                   // nights[1].resturant2 = " ";

                }

                if (response.data.length >= 2) {
                    //console.log(actuallSightsChecked[0]);
                    //console.log(i);
                    nights[1].resturant1 = response.data[response.data.length-1];
                    nights[1].resturant2 = response.data[response.data.length-2];
                    
                }

             

            }).then(function (response) {
                that.setState({ sights: nights });
            });
          
            


        }

        // 2 SightSeeing
        if (nights.length == 0 && sightsSeeing.length == 2)
        {
            if (sightsSeeing[0].distance > sightsSeeing[1].distance) {
                var temp = sightsSeeing[0];
                sightsSeeing[0] = sightsSeeing[1];
                sightsSeeing[1] = temp;
            }
            
            this.setState({ sights: sightsSeeing });
            sightsSeeing[0].resturant1 = {name: "No Resturant Found"};
            sightsSeeing[0].resturant2 = {name: "No Resturant Found"};
            sightsSeeing[1].resturant1 = {name: "No Resturant Found"};
            sightsSeeing[1].resturant2 = {name: "No Resturant Found"};


            let tt = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });

            let t = distance(sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, 'K');
            sightsSeeing[1].distance = t;


            sightsSeeing[0].c = "Sight Seeing";
            sightsSeeing[1].c = "Sight Seeing";
            this.setState({ sights: sightsSeeing });

            const Amadeus = require("amadeus");
            const amadeus = new Amadeus({
                clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
                clientSecret: "jURdf96v6iemuPBy",
                hostname: 'production',
            });

       

            var that = this;
            amadeus.referenceData.locations.pointsOfInterest.get({
                latitude: sightsSeeing[0].geoCode.latitude,
                longitude: sightsSeeing[0].geoCode.longitude,
                radius: 3,
                category: "RESTAURANT"
            }).then(function (response) {
                console.log(response.data);
                //console.log("checking"+ i);
                if (response.data.length == 1) {
                    sightsSeeing[0].resturant1 = response.data[0];
                    //nights[0].resturant2 = " ";

                }

                if (response.data.length >= 2) {
                    //console.log(actuallSightsChecked[0]);
                    //console.log(i);
                    sightsSeeing[0].resturant1 = response.data[0];
                    sightsSeeing[0].resturant2 = response.data[1];
                    
                }

             

            }).then(function (response) {
                that.setState({ sights: sightsSeeing });
            });


            

       

            var that = this;
            amadeus.referenceData.locations.pointsOfInterest.get({
                latitude: sightsSeeing[1].geoCode.latitude,
                longitude: sightsSeeing[1].geoCode.longitude,
                radius: 3,
                category: "RESTAURANT"
            }).then(function (response) {
                console.log(response.data);
               // console.log("checking"+ i);
                if (response.data.length == 1) {
                    sightsSeeing[1].resturant1 = response.data[0];
                   // nights[1].resturant2 = " ";

                }

                if (response.data.length >= 2) {
                    //console.log(actuallSightsChecked[0]);
                    //console.log(i);
                    sightsSeeing[1].resturant1 = response.data[response.data.length-1];
                    sightsSeeing[1].resturant2 = response.data[response.data.length-2];
                    
                }

             

            }).then(function (response) {
                that.setState({ sights: sightsSeeing });
            });

        }

        // 1 Night and 1 Seight Seeing 
        if (nights.length == 1 && sightsSeeing.length == 1)
        {
            sorted.push(sightsSeeing[0]);
            sorted[0].c = "Sight Seeing";

            sorted.push(nights[0]);
            sorted[0].c = "Night Life";

            this.setState({ sights: sorted });
            sorted[0].resturant1 = {name: "No Resturant Found"};
            sorted[0].resturant2 = {name: "No Resturant Found"};
            sorted[1].resturant1 = {name: "No Resturant Found"};
            sorted[1].resturant2 = {name: "No Resturant Found"};

            let tt = distance(sorted[1].geoCode.latitude, sorted[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });

            let t = distance(sorted[0].geoCode.latitude, sorted[0].geoCode.longitude, sorted[1].geoCode.latitude, sorted[1].geoCode.longitude, 'K');
            sorted[1].distance = t;


            const Amadeus = require("amadeus");
            const amadeus = new Amadeus({
                clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
                clientSecret: "jURdf96v6iemuPBy",
                hostname: 'production',
            });

       

            var that = this;
            amadeus.referenceData.locations.pointsOfInterest.get({
                latitude: sorted[0].geoCode.latitude,
                longitude: sorted[0].geoCode.longitude,
                radius: 2,
                category: "RESTAURANT"
            }).then(function (response) {
                console.log(response.data);
                //console.log("checking"+ i);
                if (response.data.length == 1) {
                    sorted[0].resturant1 = response.data[0];
                    //actuallSightsChecked[0].resturant2 = " ";

                }

                if (response.data.length >= 2) {
                    //console.log(actuallSightsChecked[0]);
                    //console.log(i);
                    sorted[0].resturant1 = response.data[0];
                    sorted[0].resturant2 = response.data[1];
                    
                }

             

            }).then(function (response) {
                that.setState({ sights: sorted });
            });


            

       

            var that = this;
            amadeus.referenceData.locations.pointsOfInterest.get({
                latitude: sorted[1].geoCode.latitude,
                longitude: sorted[1].geoCode.longitude,
                radius: 2,
                category: "RESTAURANT"
            }).then(function (response) {
                console.log(response.data);
                
                if (response.data.length == 1) {
                    sorted[1].resturant1 = response.data[0];
                   // actuallSightsChecked[1].resturant2 = " ";

                }

                if (response.data.length >= 2) {
                    //console.log(actuallSightsChecked[0]);
                    //console.log(i);
                    sorted[1].resturant1 = response.data[response.data.length-1];
                    sorted[1].resturant2 = response.data[response.data.length-2];
                    
                }

             

            }).then(function (response) {
                that.setState({ sights: sorted });
            });
          

        }
        
        // 3 Night life
        if (nights.length == 3 && sightsSeeing.length == 0)
        {
           

            let temp1 =  distance(nights[0].geoCode.latitude, nights[0].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp2 =  distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp3 =  distance(nights[2].geoCode.latitude, nights[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            this.setState({ sights: nights });
            nights[0].resturant1 = {name: "No Resturant Found"};
            nights[0].resturant2 = {name: "No Resturant Found"};
            nights[1].resturant1 = {name: "No Resturant Found"};
            nights[1].resturant2 = {name: "No Resturant Found"};
            nights[2].resturant1 = {name: "No Resturant Found"};
            nights[2].resturant2 = {name: "No Resturant Found"}; 
            
            if ( (temp1 <= temp2) && (temp1 <= temp3) )
            {
                temp2 = distance(nights[0].geoCode.latitude, nights[0].geoCode.longitude, nights[1].geoCode.latitude, nights[1].geoCode.longitude, 'K');
                temp3 = distance(nights[0].geoCode.latitude, nights[0].geoCode.longitude, nights[2].geoCode.latitude, nights[2].geoCode.longitude, 'K');

                if ( temp2 <= temp3 )
                {
         
                }
                else 
                {
                    var temp = nights[1];
                    nights[1] = nights[2];
                    nights[2] = temp;
                   
                }

            }

            if ( (temp2 <= temp1) && (temp2 <= temp3) )
            {
                temp1 = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, nights[0].geoCode.latitude, nights[0].geoCode.longitude, 'K');
                temp3 = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, nights[2].geoCode.latitude, nights[2].geoCode.longitude, 'K');

                if ( temp1 <= temp3 )
                {
                    var temp = nights[0];
                    nights[0] = nights[1];
                    nights[1] = temp;
       
                }
                else 
                {
                    var temp = nights[0];
                    var tempp = nights[2];
                    nights[0] = nights[1];
                    nights[1] = tempp;
                    nights[2] = temp;
                         
                }
                

            }

            if ( (temp3 <= temp1) && (temp3 <= temp2) )
            {

                temp1 = distance(nights[0].geoCode.latitude, nights[0].geoCode.longitude, nights[2].geoCode.latitude, nights[2].geoCode.longitude, 'K');
                temp2 = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, nights[2].geoCode.latitude, nights[2].geoCode.longitude, 'K');

                if ( temp1 <= temp2 )
                {
                    var temp = nights[0]; // 1
                    var tempp = nights[1]; // 2
                    nights[0] = nights[2]; // 3
                    nights[1] = temp;
                    nights[2] = tempp;
                  
                }
                else 
                {
                    var temp = nights[0]; // 1
                    nights[0] = nights[2]; // 3
                    nights[2] = temp;
              
                }

            }
           
           
            
            let tt = distance(nights[2].geoCode.latitude, nights[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
    
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });


        let t = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, nights[0].geoCode.latitude, nights[0].geoCode.longitude, 'K');

        nights[1].distance = t;
        let ttt = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, nights[2].geoCode.latitude, nights[2].geoCode.longitude, 'K');

        nights[2].distance = ttt;
        nights[0].c = "Night Life";
        nights[1].c = "Night Life";
        nights[2].c = "Night Life";
        this.setState({ sights: nights }); 

        const Amadeus = require("amadeus");
                const amadeus = new Amadeus({
                    clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
                    clientSecret: "jURdf96v6iemuPBy",
                    hostname: 'production',
                });
    
           
    
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: nights[0].geoCode.latitude,
                    longitude: nights[0].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                   
                    if (response.data.length == 1) {
                        nights[0].resturant1 = response.data[0];
                        //nights[0].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        nights[0].resturant1 = response.data[0];
                        nights[0].resturant2 = response.data[1];
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: nights });
                });
    
    
                
    
           
    
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: nights[1].geoCode.latitude,
                    longitude: nights[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                   
                    if (response.data.length == 1) {
                        nights[1].resturant1 = response.data[0];
                        //nights[1].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        nights[1].resturant1 = response.data[response.data.length-1];
                        nights[1].resturant2 = response.data[response.data.length-2];
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: nights });
                });
                
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: nights[1].geoCode.latitude,
                    longitude: nights[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                    
                    if (response.data.length == 1) {
                        nights[2].resturant1 = response.data[0];
                        nights[2].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        var found1 = false;
                        var j = 0 ;

                        while (found1 == false && j < response.data.length) {
                            if (response.data[j].id != nights[0].resturant1.id 
                                && response.data[j].id != nights[0].resturant2.id
                                && response.data[j].id != nights[1].resturant1.id 
                                && response.data[j].id != nights[1].resturant2.id)
                            {
                                nights[2].resturant1 = response.data[j];
                                found1 = true;
                            }

                            j ++ ;

                          }
                          
                          var found2 = false;
                          j = 0 ;
                          while (found2 == false && j < response.data.length) {
                            if (response.data[j].id != nights[0].resturant1.id 
                                && response.data[j].id != nights[0].resturant2.id
                                && response.data[j].id != nights[1].resturant1.id 
                                && response.data[j].id != nights[1].resturant2.id
                                && response.data[j].id != nights[2].resturant1.id)
                            {
                                nights[2].resturant2 = response.data[j];
                                found2 = true;
                            }

                            j ++ ;

                          }
                        if (found1 == false)
                        {
                            nights[2].resturant1 = response.data[0]; 
                        }
                        if (found2 == false)
                        {
                            nights[2].resturant2 = response.data[1]; 
                        }
                        
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: nights });
                });
        

        }
        
        // 3 Sight Seeing 
        if (nights.length == 0 && sightsSeeing.length == 3)
        {
            
            let temp1 =  distance(sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp2 =  distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp3 =  distance(sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            this.setState({ sights: sightsSeeing }); 
            sightsSeeing[0].resturant1 = {name: "No Resturant Found"};
            sightsSeeing[0].resturant2 = {name: "No Resturant Found"};
            sightsSeeing[1].resturant1 = {name: "No Resturant Found"};
            sightsSeeing[1].resturant2 = {name: "No Resturant Found"};
            sightsSeeing[2].resturant1 = {name: "No Resturant Found"};
            sightsSeeing[2].resturant2 = {name: "No Resturant Found"}; 
            
            
            if ( (temp1 <= temp2) && (temp1 <= temp3) )
            {
                temp2 = distance(sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, 'K');
                temp3 = distance(sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, 'K');

                if ( temp2 <= temp3 )
                {
         
                }
                else 
                {
                    var temp = sightsSeeing[1];
                    sightsSeeing[1] = sightsSeeing[2];
                    sightsSeeing[2] = temp;
                   
                }

            }

            if ( (temp2 <= temp1) && (temp2 <= temp3) )
            {
                temp1 = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, 'K');
                temp3 = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, 'K');

                if ( temp1 <= temp3 )
                {
                    var temp = sightsSeeing[0];
                    sightsSeeing[0] = sightsSeeing[1];
                    sightsSeeing[1] = temp;
       
                }
                else 
                {
                    var temp = sightsSeeing[0];
                    var tempp = sightsSeeing[2];
                    sightsSeeing[0] = sightsSeeing[1];
                    sightsSeeing[1] = tempp;
                    sightsSeeing[2] = temp;
                         
                }
                

            }

            if ( (temp3 <= temp1) && (temp3 <= temp2) )
            {

                temp1 = distance(sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, 'K');
                temp2 = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, 'K');

                if ( temp1 <= temp2 )
                {
                    var temp = sightsSeeing[0]; // 1
                    var tempp = sightsSeeing[1]; // 2
                    sightsSeeing[0] = sightsSeeing[2]; // 3
                    sightsSeeing[1] = temp;
                    sightsSeeing[2] = tempp;
                  
                }
                else 
                {
                    var temp = sightsSeeing[0]; // 1
                    sightsSeeing[0] = sightsSeeing[2]; // 3
                    sightsSeeing[2] = temp;
              
                }

            }
           
           
            
            let tt = distance(sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
    
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });


        let t = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, 'K');

        sightsSeeing[1].distance = t;
        let ttt = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, 'K');

        sightsSeeing[2].distance = ttt;
        sightsSeeing[0].c = "Sight Seeing";
        sightsSeeing[1].c = "Sight Seeing";
        sightsSeeing[2].c = "Sight Seeing";
        this.setState({ sights: sightsSeeing }); 

        const Amadeus = require("amadeus");
                const amadeus = new Amadeus({
                    clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
                    clientSecret: "jURdf96v6iemuPBy",
                    hostname: 'production',
                });
    
           
    
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: sightsSeeing[0].geoCode.latitude,
                    longitude: sightsSeeing[0].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                   
                    if (response.data.length == 1) {
                        sightsSeeing[0].resturant1 = response.data[0];
                        //nights[0].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        sightsSeeing[0].resturant1 = response.data[0];
                        sightsSeeing[0].resturant2 = response.data[1];
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: sightsSeeing });
                });
    
    
                
    
           
    
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: sightsSeeing[1].geoCode.latitude,
                    longitude: sightsSeeing[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                   
                    if (response.data.length == 1) {
                        sightsSeeing[1].resturant1 = response.data[0];
                        //nights[1].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        sightsSeeing[1].resturant1 = response.data[response.data.length-1];
                        sightsSeeing[1].resturant2 = response.data[response.data.length-2];
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: sightsSeeing });
                });
                
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: sightsSeeing[1].geoCode.latitude,
                    longitude: sightsSeeing[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                    
                    if (response.data.length == 1) {
                        sightsSeeing[2].resturant1 = response.data[0];
                        sightsSeeing[2].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        var found1 = false;
                        var j = 0 ;

                        while (found1 == false && j < response.data.length) {
                            if (response.data[j].id != sightsSeeing[0].resturant1.id 
                                && response.data[j].id != sightsSeeing[0].resturant2.id
                                && response.data[j].id != sightsSeeing[1].resturant1.id 
                                && response.data[j].id != sightsSeeing[1].resturant2.id)
                            {
                                sightsSeeing[2].resturant1 = response.data[j];
                                found1 = true;
                            }

                            j ++ ;

                          }
                          
                          var found2 = false;
                          j = 0 ;
                          while (found2 == false && j < response.data.length) {
                            if (response.data[j].id != sightsSeeing[0].resturant1.id 
                                && response.data[j].id != sightsSeeing[0].resturant2.id
                                && response.data[j].id != sightsSeeing[1].resturant1.id 
                                && response.data[j].id != sightsSeeing[1].resturant2.id
                                && response.data[j].id != sightsSeeing[2].resturant1.id)
                            {
                                sightsSeeing[2].resturant2 = response.data[j];
                                found2 = true;
                            }

                            j ++ ;

                          }
                        if (found1 == false)
                        {
                            sightsSeeing[2].resturant1 = response.data[0]; 
                        }
                        if (found2 == false)
                        {
                            sightsSeeing[2].resturant2 = response.data[1]; 
                        }
                        
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: sightsSeeing });
                });






            
        }
        // 1 Night Life 2 Sight Seeing 
        if (nights.length == 1 && sightsSeeing.length == 2)
        {
            
            if (sightsSeeing[0].distance > sightsSeeing[1].distance) {
                var temp = sightsSeeing[0];
                sightsSeeing[0] = sightsSeeing[1];
                sightsSeeing[1] = temp;
            }

            sorted.push(sightsSeeing[0]);
            sorted.push(sightsSeeing[1]);
            sorted.push(nights[0]);
            sorted[0].c = "Sight Seeing";
            sorted[1].c = "Sight Seeing";
            sorted[2].c = "Night Life";

            this.setState({ sights: sorted }); 
            sorted[0].resturant1 = {name: "No Resturant Found"};
            sorted[0].resturant2 = {name: "No Resturant Found"};
            sorted[1].resturant1 = {name: "No Resturant Found"};
            sorted[1].resturant2 = {name: "No Resturant Found"};
            sorted[2].resturant1 = {name: "No Resturant Found"};
            sorted[2].resturant2 = {name: "No Resturant Found"}; 



            let tt = distance(sorted[2].geoCode.latitude, sorted[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });

            let t = distance(sorted[0].geoCode.latitude, sorted[0].geoCode.longitude, sorted[1].geoCode.latitude, sorted[1].geoCode.longitude, 'K');
            sorted[1].distance = t;

            let tp = distance(sorted[1].geoCode.latitude, sorted[1].geoCode.longitude, sorted[2].geoCode.latitude, sorted[2].geoCode.longitude, 'K');
            sorted[2].distance = tp;


          
            this.setState({ sights: sorted });

            const Amadeus = require("amadeus");
                const amadeus = new Amadeus({
                    clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
                    clientSecret: "jURdf96v6iemuPBy",
                    hostname: 'production',
                });
    
           
    
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: sorted[0].geoCode.latitude,
                    longitude: sorted[0].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                   
                    if (response.data.length == 1) {
                        sorted[0].resturant1 = response.data[0];
                        //nights[0].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        sorted[0].resturant1 = response.data[0];
                        sorted[0].resturant2 = response.data[1];
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: sorted });
                });
    
    
                
    
           
    
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: sorted[1].geoCode.latitude,
                    longitude: sorted[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                   
                    if (response.data.length == 1) {
                        sorted[1].resturant1 = response.data[0];
                        //nights[1].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        sorted[1].resturant1 = response.data[response.data.length-1];
                        sorted[1].resturant2 = response.data[response.data.length-2];
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: sorted });
                });
                
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: sorted[1].geoCode.latitude,
                    longitude: sorted[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                    
                    if (response.data.length == 1) {
                        sorted[2].resturant1 = response.data[0];
                        sorted[2].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        var found1 = false;
                        var j = 0 ;

                        while (found1 == false && j < response.data.length) {
                            if (response.data[j].id != sorted[0].resturant1.id 
                                && response.data[j].id != sorted[0].resturant2.id
                                && response.data[j].id != sorted[1].resturant1.id 
                                && response.data[j].id != sorted[1].resturant2.id)
                            {
                                sorted[2].resturant1 = response.data[j];
                                found1 = true;
                            }

                            j ++ ;

                          }
                          
                          var found2 = false;
                          j = 0 ;
                          while (found2 == false && j < response.data.length) {
                            if (response.data[j].id != sorted[0].resturant1.id 
                                && response.data[j].id != sorted[0].resturant2.id
                                && response.data[j].id != sorted[1].resturant1.id 
                                && response.data[j].id != sorted[1].resturant2.id
                                && response.data[j].id != sorted[2].resturant1.id)
                            {
                                sorted[2].resturant2 = response.data[j];
                                found2 = true;
                            }

                            j ++ ;

                          }
                        if (found1 == false)
                        {
                            sorted[2].resturant1 = response.data[0]; 
                        }
                        if (found2 == false)
                        {
                            sorted[2].resturant2 = response.data[1]; 
                        }
                        
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: sorted });
                });



        }

        // 2 Night Life 1 Sight Seeing 
        if (nights.length == 2 && sightsSeeing.length == 1)
        {
            nights[0].distance = distance(nights[0].geoCode.latitude, nights[0].geoCode.longitude, sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, 'K');
            nights[1].distance = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, 'K');
            
            if (nights[0].distance > nights[1].distance) {
                var temp = nights[0];
                nights[0] = nights[1];
                nights[1] = temp;
            }

            sorted.push(sightsSeeing[0]);
            sorted.push(nights[0]);
            sorted.push(nights[1]);
            sorted[0].c = "Sight Seeing";
            sorted[1].c = "Night Life";
            sorted[2].c = "Night Life";

            this.setState({ sights: sorted }); 
            sorted[0].resturant1 = {name: "No Resturant Found"};
            sorted[0].resturant2 = {name: "No Resturant Found"};
            sorted[1].resturant1 = {name: "No Resturant Found"};
            sorted[1].resturant2 = {name: "No Resturant Found"};
            sorted[2].resturant1 = {name: "No Resturant Found"};
            sorted[2].resturant2 = {name: "No Resturant Found"}; 



            let tt = distance(sorted[2].geoCode.latitude, sorted[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });

            let t = distance(sorted[0].geoCode.latitude, sorted[0].geoCode.longitude, sorted[1].geoCode.latitude, sorted[1].geoCode.longitude, 'K');
            sorted[1].distance = t;

            let tp = distance(sorted[1].geoCode.latitude, sorted[1].geoCode.longitude, sorted[2].geoCode.latitude, sorted[2].geoCode.longitude, 'K');
            sorted[2].distance = tp;


          
            this.setState({ sights: sorted });

            const Amadeus = require("amadeus");
                const amadeus = new Amadeus({
                    clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
                    clientSecret: "jURdf96v6iemuPBy",
                    hostname: 'production',
                });
    
           
    
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: sorted[0].geoCode.latitude,
                    longitude: sorted[0].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                   
                    if (response.data.length == 1) {
                        sorted[0].resturant1 = response.data[0];
                        //nights[0].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        sorted[0].resturant1 = response.data[0];
                        sorted[0].resturant2 = response.data[1];
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: sorted });
                });
    
    
                
    
           
    
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: sorted[1].geoCode.latitude,
                    longitude: sorted[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                   
                    if (response.data.length == 1) {
                        sorted[1].resturant1 = response.data[0];
                        //nights[1].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        sorted[1].resturant1 = response.data[response.data.length-1];
                        sorted[1].resturant2 = response.data[response.data.length-2];
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: sorted });
                });
                
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: sorted[1].geoCode.latitude,
                    longitude: sorted[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                    
                    if (response.data.length == 1) {
                        sorted[2].resturant1 = response.data[0];
                        sorted[2].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        var found1 = false;
                        var j = 0 ;

                        while (found1 == false && j < response.data.length) {
                            if (response.data[j].id != sorted[0].resturant1.id 
                                && response.data[j].id != sorted[0].resturant2.id
                                && response.data[j].id != sorted[1].resturant1.id 
                                && response.data[j].id != sorted[1].resturant2.id)
                            {
                                sorted[2].resturant1 = response.data[j];
                                found1 = true;
                            }

                            j ++ ;

                          }
                          
                          var found2 = false;
                          j = 0 ;
                          while (found2 == false && j < response.data.length) {
                            if (response.data[j].id != sorted[0].resturant1.id 
                                && response.data[j].id != sorted[0].resturant2.id
                                && response.data[j].id != sorted[1].resturant1.id 
                                && response.data[j].id != sorted[1].resturant2.id
                                && response.data[j].id != sorted[2].resturant1.id)
                            {
                                sorted[2].resturant2 = response.data[j];
                                found2 = true;
                            }

                            j ++ ;

                          }
                        if (found1 == false)
                        {
                            sorted[2].resturant1 = response.data[0]; 
                        }
                        if (found2 == false)
                        {
                            sorted[2].resturant2 = response.data[1]; 
                        }
                        
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: sorted });
                });

        }

         // 4  Night Life
         if (nights.length == 4 && sightsSeeing.length == 0)
         {
            let temp1 =  distance(nights[0].geoCode.latitude, nights[0].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp2 =  distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp3 =  distance(nights[2].geoCode.latitude, nights[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp4 =  distance(nights[3].geoCode.latitude, nights[3].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            this.setState({ sights: nights });
            nights[0].resturant1 = {name: "No Resturant Found"};
            nights[0].resturant2 = {name: "No Resturant Found"};
            nights[1].resturant1 = {name: "No Resturant Found"};
            nights[1].resturant2 = {name: "No Resturant Found"};
            nights[2].resturant1 = {name: "No Resturant Found"};
            nights[2].resturant2 = {name: "No Resturant Found"};
            nights[3].resturant1 = {name: "No Resturant Found"};
            nights[3].resturant2 = {name: "No Resturant Found"};
            
            if ( (temp1 <= temp2) && (temp1 <= temp3) && (temp1 <= temp4)) // 1
            {

                if ( (temp2 <= temp3) && (temp2 <= temp4) )
                {
                    if (temp3 <= temp4) // 1 2 3 4
                    {
                        // nothing to do 
                    }
                    else  // 1 2 4 3 
                    {
                        var temp = nights[2]; 
                        nights[2] = nights[3]; 
                        nights[3] = temp;
                    }

                }

                if ( (temp3 <= temp2) && (temp3 <= temp4) ) 
                {
                    if (temp2 <= temp4) // 1 3 2 4
                    {
                        var temp = nights[1]; 
                        nights[1] = nights[2]; 
                        nights[2] = temp;
                    }
                    else // 1 3 4 2
                    {
                        var temp = nights[1];
                        var tempp = nights[2];
                        var temppp = nights[3]; 
                        nights[1] = tempp;
                        nights[2] = temppp;
                        nights[3] = temp;            
                    }

                }

                if ( (temp4 <= temp2) && (temp4 <= temp3) )
                {
                    if (temp2 <= temp3) // 1 4 2 3 
                    {
                        var temp = nights[1];
                        var tempp = nights[2];
                        var temppp = nights[3]; 
                        nights[1] = temppp;
                        nights[2] = temp;
                        nights[3] = tempp; 
                    }
                    else // 1 4 3 2 
                    {
                        var temp = nights[1];
                        var tempp = nights[2];
                        var temppp = nights[3]; 
                        nights[1] = temppp;
                        nights[2] = tempp;
                        nights[3] = temp;                     
                    }
                }
            }

            if ( (temp2 <= temp1) && (temp2 <= temp3) && (temp2 <= temp4)) // 2
            {

                if ( (temp1 <= temp3) && (temp1 <= temp4) )
                {
                    if (temp3 <= temp4) // 2 1 3 4 
                    {
                        var temp = nights[0];
                        var tempp = nights[1];
                        nights[1] = temp;
                        nights[0] = tempp;                   
                    }
                    else // 2 1 4 3
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = tem;
                        nights[1] = temp;
                        nights[2] = temppp;
                        nights[3] = tempp;                     
                    }

                }

                if ( (temp3 <= temp1) && (temp3 <= temp4) )
                {
                    if (temp1 <= temp4) // 2 3 1 4 
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = tem;
                        nights[1] = tempp;
                        nights[2] = temp;
                        nights[3] = temppp;                     
                    }
                    else // 2 3 4 1
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = tem;
                        nights[1] = tempp;
                        nights[2] = temppp;
                        nights[3] = temp;                     
                    }

                }

                if ( (temp4 <= temp1) && (temp4 <= temp3) )
                {
                    if (temp1 <= temp3) // 2 4 1 3 
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = tem;
                        nights[1] = temppp;
                        nights[2] = temp;
                        nights[3] = tempp; 
                    }
                    else // 2 4 3 1 
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = tem;
                        nights[1] = temppp;
                        nights[2] = tempp;
                        nights[3] = temp; 
                    }

                }
                
            }

            if ( (temp3 <= temp1) && (temp3 <= temp2) && (temp3 <= temp4)) // 3
            {

                if ( (temp1 <= temp2) && (temp1 <= temp4) )
                {
                    if (temp2 <= temp4) // 3 1 2 4 
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var tem = nights[1]; 
                        nights[0] = tempp;
                        nights[1] = temp;
                        nights[2] = tem; 
                    }
                    else // 3 1 4 2
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = tempp;
                        nights[1] = temp;
                        nights[2] = temppp;
                        nights[3] = tem;  
                    }

                }

                if ( (temp2 <= temp1) && (temp2 <= temp4) )
                {
                    if (temp1 <= temp4) // 3 2 1 4
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var tem = nights[1]; 
                        nights[0] = tempp;
                        nights[1] = tem;
                        nights[2] = temp; 
                    }
                    else // 3 2 4 1
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = tempp;
                        nights[1] = tem;
                        nights[2] = temppp;
                        nights[3] = temp;  
                    }

                }

                if ( (temp4 <= temp1) && (temp4 <= temp2) )
                {
                    if (temp1 <= temp2) // 3 4 1 2
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = tempp;
                        nights[1] = temppp;
                        nights[2] = temp;
                        nights[3] = tem;  
                    }
                    else // 3 4 2 1
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = tempp;
                        nights[1] = temppp;
                        nights[2] = tem;
                        nights[3] = temp;  
                    }

                }
                
            }

            if ( (temp4 <= temp1) && (temp4 <= temp2) && (temp4 <= temp3)) // 4
            {

                if ( (temp1 <= temp2) && (temp1 <= temp3) )
                {
                    if (temp2 <= temp3) // 4 1 2 3 
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = temppp;
                        nights[1] = temp;
                        nights[2] = tem;
                        nights[3] = tempp;  
                    }
                    else // 4 1 3 2 
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = temppp;
                        nights[1] = temp;
                        nights[2] = tempp;
                        nights[3] = tem;  
                    }

                }

                if ( (temp2 <= temp1) && (temp2 <= temp3) )
                {
                    if (temp1 <= temp3) // 4 2 1 3 
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = temppp;
                        nights[1] = tem;
                        nights[2] = temp;
                        nights[3] = tempp;  
                    }
                    else // 4 2 3 1 
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = temppp;
                        nights[1] = tem;
                        nights[2] = tempp;
                        nights[3] = temp;  
                    }

                }

                if ( (temp3 <= temp1) && (temp3 <= temp2) )
                {
                    if (temp1 <= temp2) // 4 3 1 2 
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = temppp;
                        nights[1] = tempp;
                        nights[2] = temp;
                        nights[3] = tem;  
                    }
                    else // 4 3 2 1 
                    {
                        var temp = nights[0];
                        var tempp = nights[2];
                        var temppp = nights[3];
                        var tem = nights[1]; 
                        nights[0] = temppp;
                        nights[1] = tempp;
                        nights[2] = temp;
                        nights[3] = tem;  
                    }

                }
                
                
            }


        let tt = distance(nights[3].geoCode.latitude, nights[3].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            //console.log(lan_sight);
        let c = "Distance: " + tt + " KM"
        this.setState({ ending: c });


        let t = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, nights[0].geoCode.latitude, nights[0].geoCode.longitude, 'K');

        nights[1].distance = t;
        let ttt = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, nights[2].geoCode.latitude, nights[2].geoCode.longitude, 'K');

        nights[2].distance = ttt;

        let tttt = distance(nights[3].geoCode.latitude, nights[3].geoCode.longitude, nights[2].geoCode.latitude, nights[2].geoCode.longitude, 'K');

        nights[3].distance = tttt;

        nights[0].c = "Night Life";
        nights[1].c = "Night Life";
        nights[2].c = "Night Life";
        nights[3].c = "Night Life";


        this.setState({ sights: nights }); 


        const Amadeus = require("amadeus");
                const amadeus = new Amadeus({
                    clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
                    clientSecret: "jURdf96v6iemuPBy",
                    hostname: 'production',
                });
    
           
    
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: nights[0].geoCode.latitude,
                    longitude: nights[0].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                
                    if (response.data.length == 1) {
                        nights[0].resturant1 = response.data[0];
                        nights[0].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        nights[0].resturant1 = response.data[0];
                        nights[0].resturant2 = response.data[1];
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: nights });
                });
    
    
                
    
           
    
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: nights[1].geoCode.latitude,
                    longitude: nights[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                    
                    if (response.data.length == 1) {
                        nights[1].resturant1 = response.data[0];
                        nights[1].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        nights[1].resturant1 = response.data[response.data.length-1];
                        nights[1].resturant2 = response.data[response.data.length-2];
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: nights });
                });
                
                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: nights[1].geoCode.latitude,
                    longitude: nights[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                   
                    if (response.data.length == 1) {
                        nights[2].resturant1 = response.data[0];
                        nights[2].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        var found1 = false;
                        var j = 0 ;

                        while (found1 == false && j < response.data.length) {
                            if (response.data[j].id != nights[0].resturant1.id 
                                && response.data[j].id != nights[0].resturant2.id
                                && response.data[j].id != nights[1].resturant1.id 
                                && response.data[j].id != nights[1].resturant2.id)
                            {
                                nights[2].resturant1 = response.data[j];
                                found1 = true;
                            }

                            j ++ ;

                          }
                          
                          var found2 = false;
                          j = 0 ;
                          while (found2 == false && j < response.data.length) {
                            if (response.data[j].id != nights[0].resturant1.id 
                                && response.data[j].id != nights[0].resturant2.id
                                && response.data[j].id != nights[1].resturant1.id 
                                && response.data[j].id != nights[1].resturant2.id
                                && response.data[j].id != nights[2].resturant1.id)
                            {
                                nights[2].resturant2 = response.data[j];
                                found2 = true;
                            }

                            j ++ ;

                          }
                        if (found1 == false)
                        {
                            nights[2].resturant1 = response.data[0]; 
                        }
                        if (found2 == false)
                        {
                            nights[2].resturant2 = response.data[1]; 
                        }
                        
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: nights });
                });


                var that = this;
                amadeus.referenceData.locations.pointsOfInterest.get({
                    latitude: nights[1].geoCode.latitude,
                    longitude: nights[1].geoCode.longitude,
                    radius: 5,
                    category: "RESTAURANT"
                }).then(function (response) {
                    console.log(response.data);
                   
                    if (response.data.length == 1) {
                        nights[2].resturant1 = response.data[0];
                        nights[2].resturant2 = " ";
    
                    }
    
                    if (response.data.length >= 2) {
                        //console.log(actuallSightsChecked[0]);
                        //console.log(i);
                        var found11 = false;
                        var j = 0 ;

                        while (found11 == false && j < response.data.length) {
                            if (response.data[j].id != nights[0].resturant1.id 
                                && response.data[j].id != nights[0].resturant2.id
                                && response.data[j].id != nights[1].resturant1.id 
                                && response.data[j].id != nights[1].resturant2.id
                                && response.data[j].id != nights[2].resturant1.id 
                                && response.data[j].id != nights[2].resturant2.id)
                            {
                                nights[3].resturant1 = response.data[j];
                                found11 = true;
                            }

                            j ++ ;

                          }
                          
                          var found22 = false;
                          j = 0 ;
                          while (found22 == false && j < response.data.length) {
                            if (response.data[j].id != nights[0].resturant1.id 
                                && response.data[j].id != nights[0].resturant2.id
                                && response.data[j].id != nights[1].resturant1.id 
                                && response.data[j].id != nights[1].resturant2.id
                                && response.data[j].id != nights[2].resturant1.id 
                                && response.data[j].id != nights[2].resturant2.id
                                && response.data[j].id != nights[3].resturant1.id)
                            {
                                nights[3].resturant2 = response.data[j];
                                found22 = true;
                            }

                            j ++ ;

                          }
                        if (found11 == false)
                        {
                            nights[3].resturant1 = response.data[0]; 
                        }
                        if (found22 == false)
                        {
                            nights[3].resturant2 = response.data[1]; 
                        }
                        
                        
                    }
    
                 
    
                }).then(function (response) {
                    that.setState({ sights: nights });
                });






        }
         
        // 4  Sight Seeing 
        if (nights.length == 0 && sightsSeeing.length == 4)
        {
           let temp1 =  distance(sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

           let temp2 =  distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

           let temp3 =  distance(sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

           let temp4 =  distance(sightsSeeing[3].geoCode.latitude, sightsSeeing[3].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

           this.setState({ sights: sightsSeeing });
           sightsSeeing[0].resturant1 = {name: "No Resturant Found"};
           sightsSeeing[0].resturant2 = {name: "No Resturant Found"};
           sightsSeeing[1].resturant1 = {name: "No Resturant Found"};
           sightsSeeing[1].resturant2 = {name: "No Resturant Found"};
           sightsSeeing[2].resturant1 = {name: "No Resturant Found"};
           sightsSeeing[2].resturant2 = {name: "No Resturant Found"};
           sightsSeeing[3].resturant1 = {name: "No Resturant Found"};
           sightsSeeing[3].resturant2 = {name: "No Resturant Found"};
           
           if ( (temp1 <= temp2) && (temp1 <= temp3) && (temp1 <= temp4)) // 1
           {

               if ( (temp2 <= temp3) && (temp2 <= temp4) )
               {
                   if (temp3 <= temp4) // 1 2 3 4
                   {
                       // nothing to do 
                   }
                   else  // 1 2 4 3 
                   {
                       var temp = sightsSeeing[2]; 
                       sightsSeeing[2] = sightsSeeing[3]; 
                       sightsSeeing[3] = temp;
                   }

               }

               if ( (temp3 <= temp2) && (temp3 <= temp4) ) 
               {
                   if (temp2 <= temp4) // 1 3 2 4
                   {
                       var temp = sightsSeeing[1]; 
                       sightsSeeing[1] = sightsSeeing[2]; 
                       sightsSeeing[2] = temp;
                   }
                   else // 1 3 4 2
                   {
                       var temp = sightsSeeing[1];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3]; 
                       sightsSeeing[1] = tempp;
                       sightsSeeing[2] = temppp;
                       sightsSeeing[3] = temp;            
                   }

               }

               if ( (temp4 <= temp2) && (temp4 <= temp3) )
               {
                   if (temp2 <= temp3) // 1 4 2 3 
                   {
                       var temp = sightsSeeing[1];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3]; 
                       sightsSeeing[1] = temppp;
                       sightsSeeing[2] = temp;
                       sightsSeeing[3] = tempp; 
                   }
                   else // 1 4 3 2 
                   {
                       var temp = sightsSeeing[1];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3]; 
                       sightsSeeing[1] = temppp;
                       sightsSeeing[2] = tempp;
                       sightsSeeing[3] = temp;                     
                   }
               }
           }

           if ( (temp2 <= temp1) && (temp2 <= temp3) && (temp2 <= temp4)) // 2
           {

               if ( (temp1 <= temp3) && (temp1 <= temp4) )
               {
                   if (temp3 <= temp4) // 2 1 3 4 
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[1];
                       sightsSeeing[1] = temp;
                       sightsSeeing[0] = tempp;                   
                   }
                   else // 2 1 4 3
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = tem;
                       sightsSeeing[1] = temp;
                       sightsSeeing[2] = temppp;
                       sightsSeeing[3] = tempp;                     
                   }

               }

               if ( (temp3 <= temp1) && (temp3 <= temp4) )
               {
                   if (temp1 <= temp4) // 2 3 1 4 
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = tem;
                       sightsSeeing[1] = tempp;
                       sightsSeeing[2] = temp;
                       sightsSeeing[3] = temppp;                     
                   }
                   else // 2 3 4 1
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = tem;
                       sightsSeeing[1] = tempp;
                       sightsSeeing[2] = temppp;
                       sightsSeeing[3] = temp;                     
                   }

               }

               if ( (temp4 <= temp1) && (temp4 <= temp3) )
               {
                   if (temp1 <= temp3) // 2 4 1 3 
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = tem;
                       sightsSeeing[1] = temppp;
                       sightsSeeing[2] = temp;
                       sightsSeeing[3] = tempp; 
                   }
                   else // 2 4 3 1 
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = tem;
                       sightsSeeing[1] = temppp;
                       sightsSeeing[2] = tempp;
                       sightsSeeing[3] = temp; 
                   }

               }
               
           }

           if ( (temp3 <= temp1) && (temp3 <= temp2) && (temp3 <= temp4)) // 3
           {

               if ( (temp1 <= temp2) && (temp1 <= temp4) )
               {
                   if (temp2 <= temp4) // 3 1 2 4 
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = tempp;
                       sightsSeeing[1] = temp;
                       sightsSeeing[2] = tem; 
                   }
                   else // 3 1 4 2
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = tempp;
                       sightsSeeing[1] = temp;
                       sightsSeeing[2] = temppp;
                       sightsSeeing[3] = tem;  
                   }

               }

               if ( (temp2 <= temp1) && (temp2 <= temp4) )
               {
                   if (temp1 <= temp4) // 3 2 1 4
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = tempp;
                       sightsSeeing[1] = tem;
                       sightsSeeing[2] = temp; 
                   }
                   else // 3 2 4 1
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = tempp;
                       sightsSeeing[1] = tem;
                       sightsSeeing[2] = temppp;
                       sightsSeeing[3] = temp;  
                   }

               }

               if ( (temp4 <= temp1) && (temp4 <= temp2) )
               {
                   if (temp1 <= temp2) // 3 4 1 2
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = tempp;
                       sightsSeeing[1] = temppp;
                       sightsSeeing[2] = temp;
                       sightsSeeing[3] = tem;  
                   }
                   else // 3 4 2 1
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = tempp;
                       sightsSeeing[1] = temppp;
                       sightsSeeing[2] = tem;
                       sightsSeeing[3] = temp;  
                   }

               }
               
           }

           if ( (temp4 <= temp1) && (temp4 <= temp2) && (temp4 <= temp3)) // 4
           {

               if ( (temp1 <= temp2) && (temp1 <= temp3) )
               {
                   if (temp2 <= temp3) // 4 1 2 3 
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = temppp;
                       sightsSeeing[1] = temp;
                       sightsSeeing[2] = tem;
                       sightsSeeing[3] = tempp;  
                   }
                   else // 4 1 3 2 
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = temppp;
                       sightsSeeing[1] = temp;
                       sightsSeeing[2] = tempp;
                       sightsSeeing[3] = tem;  
                   }

               }

               if ( (temp2 <= temp1) && (temp2 <= temp3) )
               {
                   if (temp1 <= temp3) // 4 2 1 3 
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = temppp;
                       sightsSeeing[1] = tem;
                       sightsSeeing[2] = temp;
                       sightsSeeing[3] = tempp;  
                   }
                   else // 4 2 3 1 
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = temppp;
                       sightsSeeing[1] = tem;
                       sightsSeeing[2] = tempp;
                       sightsSeeing[3] = temp;  
                   }

               }

               if ( (temp3 <= temp1) && (temp3 <= temp2) )
               {
                   if (temp1 <= temp2) // 4 3 1 2 
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = temppp;
                       sightsSeeing[1] = tempp;
                       sightsSeeing[2] = temp;
                       sightsSeeing[3] = tem;  
                   }
                   else // 4 3 2 1 
                   {
                       var temp = sightsSeeing[0];
                       var tempp = sightsSeeing[2];
                       var temppp = sightsSeeing[3];
                       var tem = sightsSeeing[1]; 
                       sightsSeeing[0] = temppp;
                       sightsSeeing[1] = tempp;
                       sightsSeeing[2] = temp;
                       sightsSeeing[3] = tem;  
                   }

               }
               
               
           }


       let tt = distance(sightsSeeing[3].geoCode.latitude, sightsSeeing[3].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
           //console.log(lan_sight);
       let c = "Distance: " + tt + " KM"
       this.setState({ ending: c });


       let t = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, 'K');

       sightsSeeing[1].distance = t;
       let ttt = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, 'K');

       sightsSeeing[2].distance = ttt;

       let tttt = distance(sightsSeeing[3].geoCode.latitude, sightsSeeing[3].geoCode.longitude, sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, 'K');

       sightsSeeing[3].distance = tttt;

       sightsSeeing[0].c = "Sight Seeing";
       sightsSeeing[1].c = "Sight Seeing";
       sightsSeeing[2].c = "Sight Seeing";
       sightsSeeing[3].c = "Sight Seeing";


       this.setState({ sights: sightsSeeing }); 

       const Amadeus = require("amadeus");
       const amadeus = new Amadeus({
           clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
           clientSecret: "jURdf96v6iemuPBy",
           hostname: 'production',
       });

  

       var that = this;
       amadeus.referenceData.locations.pointsOfInterest.get({
           latitude: sightsSeeing[0].geoCode.latitude,
           longitude: sightsSeeing[0].geoCode.longitude,
           radius: 5,
           category: "RESTAURANT"
       }).then(function (response) {
           console.log(response.data);
       
           if (response.data.length == 1) {
            sightsSeeing[0].resturant1 = response.data[0];
            sightsSeeing[0].resturant2 = " ";

           }

           if (response.data.length >= 2) {
               //console.log(actuallSightsChecked[0]);
               //console.log(i);
               sightsSeeing[0].resturant1 = response.data[0];
               sightsSeeing[0].resturant2 = response.data[1];
               
           }

        

       }).then(function (response) {
           that.setState({ sights: sightsSeeing });
       });


       

  

       var that = this;
       amadeus.referenceData.locations.pointsOfInterest.get({
           latitude: sightsSeeing[1].geoCode.latitude,
           longitude: sightsSeeing[1].geoCode.longitude,
           radius: 5,
           category: "RESTAURANT"
       }).then(function (response) {
           console.log(response.data);
           
           if (response.data.length == 1) {
            sightsSeeing[1].resturant1 = response.data[0];
            sightsSeeing[1].resturant2 = " ";

           }

           if (response.data.length >= 2) {
               //console.log(actuallSightsChecked[0]);
               //console.log(i);
               sightsSeeing[1].resturant1 = response.data[response.data.length-1];
               sightsSeeing[1].resturant2 = response.data[response.data.length-2];
               
           }

        

       }).then(function (response) {
           that.setState({ sights: sightsSeeing });
       });
       
       var that = this;
       amadeus.referenceData.locations.pointsOfInterest.get({
           latitude: sightsSeeing[1].geoCode.latitude,
           longitude: sightsSeeing[1].geoCode.longitude,
           radius: 5,
           category: "RESTAURANT"
       }).then(function (response) {
           console.log(response.data);
          
           if (response.data.length == 1) {
            sightsSeeing[2].resturant1 = response.data[0];
            sightsSeeing[2].resturant2 = " ";

           }

           if (response.data.length >= 2) {
               //console.log(actuallSightsChecked[0]);
               //console.log(i);
               var found1 = false;
               var j = 0 ;

               while (found1 == false && j < response.data.length) {
                   if (response.data[j].id != sightsSeeing[0].resturant1.id 
                       && response.data[j].id != sightsSeeing[0].resturant2.id
                       && response.data[j].id != sightsSeeing[1].resturant1.id 
                       && response.data[j].id != sightsSeeing[1].resturant2.id)
                   {
                    sightsSeeing[2].resturant1 = response.data[j];
                       found1 = true;
                   }

                   j ++ ;

                 }
                 
                 var found2 = false;
                 j = 0 ;
                 while (found2 == false && j < response.data.length) {
                   if (response.data[j].id != sightsSeeing[0].resturant1.id 
                       && response.data[j].id != sightsSeeing[0].resturant2.id
                       && response.data[j].id != sightsSeeing[1].resturant1.id 
                       && response.data[j].id != sightsSeeing[1].resturant2.id
                       && response.data[j].id != sightsSeeing[2].resturant1.id)
                   {
                    sightsSeeing[2].resturant2 = response.data[j];
                       found2 = true;
                   }

                   j ++ ;

                 }
               if (found1 == false)
               {
                sightsSeeing[2].resturant1 = response.data[0]; 
               }
               if (found2 == false)
               {
                sightsSeeing[2].resturant2 = response.data[1]; 
               }
               
               
           }

        

       }).then(function (response) {
           that.setState({ sights: sightsSeeing });
       });


       var that = this;
       amadeus.referenceData.locations.pointsOfInterest.get({
           latitude: sightsSeeing[1].geoCode.latitude,
           longitude: sightsSeeing[1].geoCode.longitude,
           radius: 5,
           category: "RESTAURANT"
       }).then(function (response) {
           console.log(response.data);
          
           if (response.data.length == 1) {
            sightsSeeing[2].resturant1 = response.data[0];
            sightsSeeing[2].resturant2 = " ";

           }

           if (response.data.length >= 2) {
               //console.log(actuallSightsChecked[0]);
               //console.log(i);
               var found11 = false;
               var j = 0 ;

               while (found11 == false && j < response.data.length) {
                   if (response.data[j].id != sightsSeeing[0].resturant1.id 
                       && response.data[j].id != sightsSeeing[0].resturant2.id
                       && response.data[j].id != sightsSeeing[1].resturant1.id 
                       && response.data[j].id != sightsSeeing[1].resturant2.id
                       && response.data[j].id != sightsSeeing[2].resturant1.id 
                       && response.data[j].id != sightsSeeing[2].resturant2.id)
                   {
                    sightsSeeing[3].resturant1 = response.data[j];
                       found11 = true;
                   }

                   j ++ ;

                 }
                 
                 var found22 = false;
                 j = 0 ;
                 while (found22 == false && j < response.data.length) {
                   if (response.data[j].id != sightsSeeing[0].resturant1.id 
                       && response.data[j].id != sightsSeeing[0].resturant2.id
                       && response.data[j].id != sightsSeeing[1].resturant1.id 
                       && response.data[j].id != sightsSeeing[1].resturant2.id
                       && response.data[j].id != sightsSeeing[2].resturant1.id 
                       && response.data[j].id != sightsSeeing[2].resturant2.id
                       && response.data[j].id != sightsSeeing[3].resturant1.id)
                   {
                    sightsSeeing[3].resturant2 = response.data[j];
                       found22 = true;
                   }

                   j ++ ;

                 }
               if (found11 == false)
               {
                sightsSeeing[3].resturant1 = response.data[0]; 
               }
               if (found22 == false)
               {
                sightsSeeing[3].resturant2 = response.data[1]; 
               }
               
               
           }

        

       }).then(function (response) {
           that.setState({ sights: sightsSeeing });
       });




       }

       // 1 Night Life 3 Sight Seeing 
       if (nights.length == 1 && sightsSeeing.length == 3)
       {
            
        let temp1 =  distance(sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

        let temp2 =  distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

        let temp3 =  distance(sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

        if ( (temp1 <= temp2) && (temp1 <= temp3) )
        {
            temp2 = distance(sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, 'K');
            temp3 = distance(sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, 'K');

            if ( temp2 <= temp3 )
            {
     
            }
            else 
            {
                var temp = sightsSeeing[1];
                sightsSeeing[1] = sightsSeeing[2];
                sightsSeeing[2] = temp;
               
            }

        }

        if ( (temp2 <= temp1) && (temp2 <= temp3) )
        {
            temp1 = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, 'K');
            temp3 = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, 'K');

            if ( temp1 <= temp3 )
            {
                var temp = sightsSeeing[0];
                sightsSeeing[0] = sightsSeeing[1];
                sightsSeeing[1] = temp;
   
            }
            else 
            {
                var temp = sightsSeeing[0];
                var tempp = sightsSeeing[2];
                sightsSeeing[0] = sightsSeeing[1];
                sightsSeeing[1] = tempp;
                sightsSeeing[2] = temp;
                     
            }
            

        }

        if ( (temp3 <= temp1) && (temp3 <= temp2) )
        {

            temp1 = distance(sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, 'K');
            temp2 = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, 'K');

            if ( temp1 <= temp2 )
            {
                var temp = sightsSeeing[0]; // 1
                var tempp = sightsSeeing[1]; // 2
                sightsSeeing[0] = sightsSeeing[2]; // 3
                sightsSeeing[1] = temp;
                sightsSeeing[2] = tempp;
              
            }
            else 
            {
                var temp = sightsSeeing[0]; // 1
                sightsSeeing[0] = sightsSeeing[2]; // 3
                sightsSeeing[2] = temp;
          
            }

        }
       
       
        sightsSeeing.push(nights[0]);
        let tt = distance(sightsSeeing[3].geoCode.latitude, sightsSeeing[3].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

        let c = "Distance: " + tt + " KM"
        this.setState({ ending: c });


    let t = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, 'K');

    sightsSeeing[1].distance = t;
    let ttt = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, 'K');

    sightsSeeing[2].distance = ttt;

    let tp = distance(sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, sightsSeeing[3].geoCode.latitude, sightsSeeing[3].geoCode.longitude, 'K');

    sightsSeeing[3].distance = tp;


    sightsSeeing[0].c = "Sight Seeing";
    sightsSeeing[1].c = "Sight Seeing";
    sightsSeeing[2].c = "Sight Seeing";
    sightsSeeing[3].c = "Night Life";
    this.setState({ sights: sightsSeeing }); 


    this.setState({ sights: sightsSeeing });
    sightsSeeing[0].resturant1 = {name: "No Resturant Found"};
    sightsSeeing[0].resturant2 = {name: "No Resturant Found"};
    sightsSeeing[1].resturant1 = {name: "No Resturant Found"};
    sightsSeeing[1].resturant2 = {name: "No Resturant Found"};
    sightsSeeing[2].resturant1 = {name: "No Resturant Found"};
    sightsSeeing[2].resturant2 = {name: "No Resturant Found"};
    sightsSeeing[3].resturant1 = {name: "No Resturant Found"};
    sightsSeeing[3].resturant2 = {name: "No Resturant Found"};


    this.setState({ sights: sightsSeeing }); 

       const Amadeus = require("amadeus");
       const amadeus = new Amadeus({
           clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
           clientSecret: "jURdf96v6iemuPBy",
           hostname: 'production',
       });

  

       var that = this;
       amadeus.referenceData.locations.pointsOfInterest.get({
           latitude: sightsSeeing[0].geoCode.latitude,
           longitude: sightsSeeing[0].geoCode.longitude,
           radius: 5,
           category: "RESTAURANT"
       }).then(function (response) {
           console.log(response.data);
       
           if (response.data.length == 1) {
            sightsSeeing[0].resturant1 = response.data[0];
            sightsSeeing[0].resturant2 = " ";

           }

           if (response.data.length >= 2) {
               //console.log(actuallSightsChecked[0]);
               //console.log(i);
               sightsSeeing[0].resturant1 = response.data[0];
               sightsSeeing[0].resturant2 = response.data[1];
               
           }

        

       }).then(function (response) {
           that.setState({ sights: sightsSeeing });
       });


       

  

       var that = this;
       amadeus.referenceData.locations.pointsOfInterest.get({
           latitude: sightsSeeing[1].geoCode.latitude,
           longitude: sightsSeeing[1].geoCode.longitude,
           radius: 5,
           category: "RESTAURANT"
       }).then(function (response) {
           console.log(response.data);
           
           if (response.data.length == 1) {
            sightsSeeing[1].resturant1 = response.data[0];
            sightsSeeing[1].resturant2 = " ";

           }

           if (response.data.length >= 2) {
               //console.log(actuallSightsChecked[0]);
               //console.log(i);
               sightsSeeing[1].resturant1 = response.data[response.data.length-1];
               sightsSeeing[1].resturant2 = response.data[response.data.length-2];
               
           }

        

       }).then(function (response) {
           that.setState({ sights: sightsSeeing });
       });
       
       var that = this;
       amadeus.referenceData.locations.pointsOfInterest.get({
           latitude: sightsSeeing[1].geoCode.latitude,
           longitude: sightsSeeing[1].geoCode.longitude,
           radius: 5,
           category: "RESTAURANT"
       }).then(function (response) {
           console.log(response.data);
          
           if (response.data.length == 1) {
            sightsSeeing[2].resturant1 = response.data[0];
            sightsSeeing[2].resturant2 = " ";

           }

           if (response.data.length >= 2) {
               //console.log(actuallSightsChecked[0]);
               //console.log(i);
               var found1 = false;
               var j = 0 ;

               while (found1 == false && j < response.data.length) {
                   if (response.data[j].id != sightsSeeing[0].resturant1.id 
                       && response.data[j].id != sightsSeeing[0].resturant2.id
                       && response.data[j].id != sightsSeeing[1].resturant1.id 
                       && response.data[j].id != sightsSeeing[1].resturant2.id)
                   {
                    sightsSeeing[2].resturant1 = response.data[j];
                       found1 = true;
                   }

                   j ++ ;

                 }
                 
                 var found2 = false;
                 j = 0 ;
                 while (found2 == false && j < response.data.length) {
                   if (response.data[j].id != sightsSeeing[0].resturant1.id 
                       && response.data[j].id != sightsSeeing[0].resturant2.id
                       && response.data[j].id != sightsSeeing[1].resturant1.id 
                       && response.data[j].id != sightsSeeing[1].resturant2.id
                       && response.data[j].id != sightsSeeing[2].resturant1.id)
                   {
                    sightsSeeing[2].resturant2 = response.data[j];
                       found2 = true;
                   }

                   j ++ ;

                 }
               if (found1 == false)
               {
                sightsSeeing[2].resturant1 = response.data[0]; 
               }
               if (found2 == false)
               {
                sightsSeeing[2].resturant2 = response.data[1]; 
               }
               
               
           }

        

       }).then(function (response) {
           that.setState({ sights: sightsSeeing });
       });


       var that = this;
       amadeus.referenceData.locations.pointsOfInterest.get({
           latitude: sightsSeeing[1].geoCode.latitude,
           longitude: sightsSeeing[1].geoCode.longitude,
           radius: 5,
           category: "RESTAURANT"
       }).then(function (response) {
           console.log(response.data);
          
           if (response.data.length == 1) {
            sightsSeeing[2].resturant1 = response.data[0];
            sightsSeeing[2].resturant2 = " ";

           }

           if (response.data.length >= 2) {
               //console.log(actuallSightsChecked[0]);
               //console.log(i);
               var found11 = false;
               var j = 0 ;

               while (found11 == false && j < response.data.length) {
                   if (response.data[j].id != sightsSeeing[0].resturant1.id 
                       && response.data[j].id != sightsSeeing[0].resturant2.id
                       && response.data[j].id != sightsSeeing[1].resturant1.id 
                       && response.data[j].id != sightsSeeing[1].resturant2.id
                       && response.data[j].id != sightsSeeing[2].resturant1.id 
                       && response.data[j].id != sightsSeeing[2].resturant2.id)
                   {
                    sightsSeeing[3].resturant1 = response.data[j];
                       found11 = true;
                   }

                   j ++ ;

                 }
                 
                 var found22 = false;
                 j = 0 ;
                 while (found22 == false && j < response.data.length) {
                   if (response.data[j].id != sightsSeeing[0].resturant1.id 
                       && response.data[j].id != sightsSeeing[0].resturant2.id
                       && response.data[j].id != sightsSeeing[1].resturant1.id 
                       && response.data[j].id != sightsSeeing[1].resturant2.id
                       && response.data[j].id != sightsSeeing[2].resturant1.id 
                       && response.data[j].id != sightsSeeing[2].resturant2.id
                       && response.data[j].id != sightsSeeing[3].resturant1.id)
                   {
                    sightsSeeing[3].resturant2 = response.data[j];
                       found22 = true;
                   }

                   j ++ ;

                 }
               if (found11 == false)
               {
                sightsSeeing[3].resturant1 = response.data[0]; 
               }
               if (found22 == false)
               {
                sightsSeeing[3].resturant2 = response.data[1]; 
               }
               
               
           }

        

       }).then(function (response) {
           that.setState({ sights: sightsSeeing });
       });
        
    }

    // 2 Night Life 2 Sight Seeing 
    if (nights.length == 2 && sightsSeeing.length == 2)
    {
        if (sightsSeeing[0].distance > sightsSeeing[1].distance) {
            var temp = sightsSeeing[0];
            sightsSeeing[0] = sightsSeeing[1];
            sightsSeeing[1] = temp;
        }

        nights[0].distance = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, nights[0].geoCode.latitude, nights[0].geoCode.longitude, 'K');
        nights[1].distance = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, nights[1].geoCode.latitude, nights[1].geoCode.longitude, 'K');
        
        if (nights[0].distance > nights[1].distance) {
            var temp = nights[0];
            nights[0] = nights[1];
            nights[1] = temp;
        }

        sightsSeeing.push(nights[0]);
        sightsSeeing.push(nights[1]);

        this.setState({ sights: sightsSeeing });
           sightsSeeing[0].resturant1 = {name: "No Resturant Found"};
           sightsSeeing[0].resturant2 = {name: "No Resturant Found"};
           sightsSeeing[1].resturant1 = {name: "No Resturant Found"};
           sightsSeeing[1].resturant2 = {name: "No Resturant Found"};
           sightsSeeing[2].resturant1 = {name: "No Resturant Found"};
           sightsSeeing[2].resturant2 = {name: "No Resturant Found"};
           sightsSeeing[3].resturant1 = {name: "No Resturant Found"};
           sightsSeeing[3].resturant2 = {name: "No Resturant Found"};


        let tt = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
        let c = "Distance: " + tt + " KM"
        this.setState({ ending: c });

        let t = distance(sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, 'K');
        sightsSeeing[1].distance = t;

        let ttt = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, 'K');
        sightsSeeing[2].distance = ttt;

        let tp = distance(sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, sightsSeeing[3].geoCode.latitude, sightsSeeing[3].geoCode.longitude, 'K');
        sightsSeeing[3].distance = tp;


        sightsSeeing[0].c = "Sight Seeing";
        sightsSeeing[1].c = "Sight Seeing";
        sightsSeeing[2].c = "Night Life";
        sightsSeeing[3].c = "Night Life";
        this.setState({ sights: sightsSeeing });

        const Amadeus = require("amadeus");
       const amadeus = new Amadeus({
           clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
           clientSecret: "jURdf96v6iemuPBy",
           hostname: 'production',
       });

  

       var that = this;
       amadeus.referenceData.locations.pointsOfInterest.get({
           latitude: sightsSeeing[0].geoCode.latitude,
           longitude: sightsSeeing[0].geoCode.longitude,
           radius: 5,
           category: "RESTAURANT"
       }).then(function (response) {
           console.log(response.data);
       
           if (response.data.length == 1) {
            sightsSeeing[0].resturant1 = response.data[0];
            sightsSeeing[0].resturant2 = " ";

           }

           if (response.data.length >= 2) {
               //console.log(actuallSightsChecked[0]);
               //console.log(i);
               sightsSeeing[0].resturant1 = response.data[0];
               sightsSeeing[0].resturant2 = response.data[1];
               
           }

        

       }).then(function (response) {
           that.setState({ sights: sightsSeeing });
       });


       

  

       var that = this;
       amadeus.referenceData.locations.pointsOfInterest.get({
           latitude: sightsSeeing[1].geoCode.latitude,
           longitude: sightsSeeing[1].geoCode.longitude,
           radius: 5,
           category: "RESTAURANT"
       }).then(function (response) {
           console.log(response.data);
           
           if (response.data.length == 1) {
            sightsSeeing[1].resturant1 = response.data[0];
            sightsSeeing[1].resturant2 = " ";

           }

           if (response.data.length >= 2) {
               //console.log(actuallSightsChecked[0]);
               //console.log(i);
               sightsSeeing[1].resturant1 = response.data[response.data.length-1];
               sightsSeeing[1].resturant2 = response.data[response.data.length-2];
               
           }

        

       }).then(function (response) {
           that.setState({ sights: sightsSeeing });
       });
       
       var that = this;
       amadeus.referenceData.locations.pointsOfInterest.get({
           latitude: sightsSeeing[1].geoCode.latitude,
           longitude: sightsSeeing[1].geoCode.longitude,
           radius: 5,
           category: "RESTAURANT"
       }).then(function (response) {
           console.log(response.data);
          
           if (response.data.length == 1) {
            sightsSeeing[2].resturant1 = response.data[0];
            sightsSeeing[2].resturant2 = " ";

           }

           if (response.data.length >= 2) {
               //console.log(actuallSightsChecked[0]);
               //console.log(i);
               var found1 = false;
               var j = 0 ;

               while (found1 == false && j < response.data.length) {
                   if (response.data[j].id != sightsSeeing[0].resturant1.id 
                       && response.data[j].id != sightsSeeing[0].resturant2.id
                       && response.data[j].id != sightsSeeing[1].resturant1.id 
                       && response.data[j].id != sightsSeeing[1].resturant2.id)
                   {
                    sightsSeeing[2].resturant1 = response.data[j];
                       found1 = true;
                   }

                   j ++ ;

                 }
                 
                 var found2 = false;
                 j = 0 ;
                 while (found2 == false && j < response.data.length) {
                   if (response.data[j].id != sightsSeeing[0].resturant1.id 
                       && response.data[j].id != sightsSeeing[0].resturant2.id
                       && response.data[j].id != sightsSeeing[1].resturant1.id 
                       && response.data[j].id != sightsSeeing[1].resturant2.id
                       && response.data[j].id != sightsSeeing[2].resturant1.id)
                   {
                    sightsSeeing[2].resturant2 = response.data[j];
                       found2 = true;
                   }

                   j ++ ;

                 }
               if (found1 == false)
               {
                sightsSeeing[2].resturant1 = response.data[0]; 
               }
               if (found2 == false)
               {
                sightsSeeing[2].resturant2 = response.data[1]; 
               }
               
               
           }

        

       }).then(function (response) {
           that.setState({ sights: sightsSeeing });
       });


       var that = this;
       amadeus.referenceData.locations.pointsOfInterest.get({
           latitude: sightsSeeing[1].geoCode.latitude,
           longitude: sightsSeeing[1].geoCode.longitude,
           radius: 5,
           category: "RESTAURANT"
       }).then(function (response) {
           console.log(response.data);
          
           if (response.data.length == 1) {
            sightsSeeing[2].resturant1 = response.data[0];
            sightsSeeing[2].resturant2 = " ";

           }

           if (response.data.length >= 2) {
               //console.log(actuallSightsChecked[0]);
               //console.log(i);
               var found11 = false;
               var j = 0 ;

               while (found11 == false && j < response.data.length) {
                   if (response.data[j].id != sightsSeeing[0].resturant1.id 
                       && response.data[j].id != sightsSeeing[0].resturant2.id
                       && response.data[j].id != sightsSeeing[1].resturant1.id 
                       && response.data[j].id != sightsSeeing[1].resturant2.id
                       && response.data[j].id != sightsSeeing[2].resturant1.id 
                       && response.data[j].id != sightsSeeing[2].resturant2.id)
                   {
                    sightsSeeing[3].resturant1 = response.data[j];
                       found11 = true;
                   }

                   j ++ ;

                 }
                 
                 var found22 = false;
                 j = 0 ;
                 while (found22 == false && j < response.data.length) {
                   if (response.data[j].id != sightsSeeing[0].resturant1.id 
                       && response.data[j].id != sightsSeeing[0].resturant2.id
                       && response.data[j].id != sightsSeeing[1].resturant1.id 
                       && response.data[j].id != sightsSeeing[1].resturant2.id
                       && response.data[j].id != sightsSeeing[2].resturant1.id 
                       && response.data[j].id != sightsSeeing[2].resturant2.id
                       && response.data[j].id != sightsSeeing[3].resturant1.id)
                   {
                    sightsSeeing[3].resturant2 = response.data[j];
                       found22 = true;
                   }

                   j ++ ;

                 }
               if (found11 == false)
               {
                sightsSeeing[3].resturant1 = response.data[0]; 
               }
               if (found22 == false)
               {
                sightsSeeing[3].resturant2 = response.data[1]; 
               }
               
               
           }

        

       }).then(function (response) {
           that.setState({ sights: sightsSeeing });
       });

    }
    // 3 Night Life 1 Sight Seeing 
    if (nights.length == 3 && sightsSeeing.length == 1)
    {
            
        let temp1 =  distance(nights[0].geoCode.latitude, nights[0].geoCode.longitude, sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, 'K');

        let temp2 =  distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, 'K');

        let temp3 =  distance(nights[2].geoCode.latitude, nights[2].geoCode.longitude, sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, 'K');

        if ( (temp1 <= temp2) && (temp1 <= temp3) )
        {
            temp2 = distance(nights[0].geoCode.latitude, nights[0].geoCode.longitude, nights[1].geoCode.latitude, nights[1].geoCode.longitude, 'K');
            temp3 = distance(nights[0].geoCode.latitude, nights[0].geoCode.longitude, nights[2].geoCode.latitude, nights[2].geoCode.longitude, 'K');

            if ( temp2 <= temp3 )
            {
     
            }
            else 
            {
                var temp = nights[1];
                nights[1] = nights[2];
                nights[2] = temp;
               
            }

        }

        if ( (temp2 <= temp1) && (temp2 <= temp3) )
        {
            temp1 = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, nights[0].geoCode.latitude, nights[0].geoCode.longitude, 'K');
            temp3 = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, nights[2].geoCode.latitude, nights[2].geoCode.longitude, 'K');

            if ( temp1 <= temp3 )
            {
                var temp = nights[0];
                nights[0] = nights[1];
                nights[1] = temp;
   
            }
            else 
            {
                var temp = nights[0];
                var tempp = nights[2];
                nights[0] = nights[1];
                nights[1] = tempp;
                nights[2] = temp;
                     
            }
            

        }

        if ( (temp3 <= temp1) && (temp3 <= temp2) )
        {

            temp1 = distance(nights[0].geoCode.latitude, nights[0].geoCode.longitude, nights[2].geoCode.latitude, nights[2].geoCode.longitude, 'K');
            temp2 = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, nights[2].geoCode.latitude, nights[2].geoCode.longitude, 'K');

            if ( temp1 <= temp2 )
            {
                var temp = nights[0]; // 1
                var tempp = nights[1]; // 2
                nights[0] = nights[2]; // 3
                nights[1] = temp;
                nights[2] = tempp;
              
            }
            else 
            {
                var temp = nights[0]; // 1
                nights[0] = nights[2]; // 3
                nights[2] = temp;
          
            }

        }
       
       
        
        let tt = distance(nights[2].geoCode.latitude, nights[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

        let c = "Distance: " + tt + " KM"
        this.setState({ ending: c });


    let t = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, nights[0].geoCode.latitude, nights[0].geoCode.longitude, 'K');

    nights[1].distance = t;
    let ttt = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, nights[2].geoCode.latitude, nights[2].geoCode.longitude, 'K');

    nights[2].distance = ttt;


    sightsSeeing.push(nights[0]);
    sightsSeeing.push(nights[1]);
    sightsSeeing.push(nights[2]);
    sightsSeeing[0].c = "Sight Seeing";
    sightsSeeing[1].c = "Night Life";
    sightsSeeing[2].c = "Night Life";
    sightsSeeing[3].c = "Night Life";

    this.setState({ sights: sightsSeeing }); 

    this.setState({ sights: sightsSeeing });
           sightsSeeing[0].resturant1 = {name: "No Resturant Found"};
           sightsSeeing[0].resturant2 = {name: "No Resturant Found"};
           sightsSeeing[1].resturant1 = {name: "No Resturant Found"};
           sightsSeeing[1].resturant2 = {name: "No Resturant Found"};
           sightsSeeing[2].resturant1 = {name: "No Resturant Found"};
           sightsSeeing[2].resturant2 = {name: "No Resturant Found"};
           sightsSeeing[3].resturant1 = {name: "No Resturant Found"};
           sightsSeeing[3].resturant2 = {name: "No Resturant Found"};


           const Amadeus = require("amadeus");
           const amadeus = new Amadeus({
               clientId: "UNsEf8gOfR76Xk4hIFdbREVwPHRQFdyk",
               clientSecret: "jURdf96v6iemuPBy",
               hostname: 'production',
           });
    
      
    
           var that = this;
           amadeus.referenceData.locations.pointsOfInterest.get({
               latitude: sightsSeeing[0].geoCode.latitude,
               longitude: sightsSeeing[0].geoCode.longitude,
               radius: 5,
               category: "RESTAURANT"
           }).then(function (response) {
               console.log(response.data);
           
               if (response.data.length == 1) {
                sightsSeeing[0].resturant1 = response.data[0];
                sightsSeeing[0].resturant2 = " ";
    
               }
    
               if (response.data.length >= 2) {
                   //console.log(actuallSightsChecked[0]);
                   //console.log(i);
                   sightsSeeing[0].resturant1 = response.data[0];
                   sightsSeeing[0].resturant2 = response.data[1];
                   
               }
    
            
    
           }).then(function (response) {
               that.setState({ sights: sightsSeeing });
           });
    
    
           
    
      
    
           var that = this;
           amadeus.referenceData.locations.pointsOfInterest.get({
               latitude: sightsSeeing[1].geoCode.latitude,
               longitude: sightsSeeing[1].geoCode.longitude,
               radius: 5,
               category: "RESTAURANT"
           }).then(function (response) {
               console.log(response.data);
               
               if (response.data.length == 1) {
                sightsSeeing[1].resturant1 = response.data[0];
                sightsSeeing[1].resturant2 = " ";
    
               }
    
               if (response.data.length >= 2) {
                   //console.log(actuallSightsChecked[0]);
                   //console.log(i);
                   sightsSeeing[1].resturant1 = response.data[response.data.length-1];
                   sightsSeeing[1].resturant2 = response.data[response.data.length-2];
                   
               }
    
            
    
           }).then(function (response) {
               that.setState({ sights: sightsSeeing });
           });
           
           var that = this;
           amadeus.referenceData.locations.pointsOfInterest.get({
               latitude: sightsSeeing[1].geoCode.latitude,
               longitude: sightsSeeing[1].geoCode.longitude,
               radius: 5,
               category: "RESTAURANT"
           }).then(function (response) {
               console.log(response.data);
              
               if (response.data.length == 1) {
                sightsSeeing[2].resturant1 = response.data[0];
                sightsSeeing[2].resturant2 = " ";
    
               }
    
               if (response.data.length >= 2) {
                   //console.log(actuallSightsChecked[0]);
                   //console.log(i);
                   var found1 = false;
                   var j = 0 ;
    
                   while (found1 == false && j < response.data.length) {
                       if (response.data[j].id != sightsSeeing[0].resturant1.id 
                           && response.data[j].id != sightsSeeing[0].resturant2.id
                           && response.data[j].id != sightsSeeing[1].resturant1.id 
                           && response.data[j].id != sightsSeeing[1].resturant2.id)
                       {
                        sightsSeeing[2].resturant1 = response.data[j];
                           found1 = true;
                       }
    
                       j ++ ;
    
                     }
                     
                     var found2 = false;
                     j = 0 ;
                     while (found2 == false && j < response.data.length) {
                       if (response.data[j].id != sightsSeeing[0].resturant1.id 
                           && response.data[j].id != sightsSeeing[0].resturant2.id
                           && response.data[j].id != sightsSeeing[1].resturant1.id 
                           && response.data[j].id != sightsSeeing[1].resturant2.id
                           && response.data[j].id != sightsSeeing[2].resturant1.id)
                       {
                        sightsSeeing[2].resturant2 = response.data[j];
                           found2 = true;
                       }
    
                       j ++ ;
    
                     }
                   if (found1 == false)
                   {
                    sightsSeeing[2].resturant1 = response.data[0]; 
                   }
                   if (found2 == false)
                   {
                    sightsSeeing[2].resturant2 = response.data[1]; 
                   }
                   
                   
               }
    
            
    
           }).then(function (response) {
               that.setState({ sights: sightsSeeing });
           });
    
    
           var that = this;
           amadeus.referenceData.locations.pointsOfInterest.get({
               latitude: sightsSeeing[1].geoCode.latitude,
               longitude: sightsSeeing[1].geoCode.longitude,
               radius: 5,
               category: "RESTAURANT"
           }).then(function (response) {
               console.log(response.data);
              
               if (response.data.length == 1) {
                sightsSeeing[2].resturant1 = response.data[0];
                sightsSeeing[2].resturant2 = " ";
    
               }
    
               if (response.data.length >= 2) {
                   //console.log(actuallSightsChecked[0]);
                   //console.log(i);
                   var found11 = false;
                   var j = 0 ;
    
                   while (found11 == false && j < response.data.length) {
                       if (response.data[j].id != sightsSeeing[0].resturant1.id 
                           && response.data[j].id != sightsSeeing[0].resturant2.id
                           && response.data[j].id != sightsSeeing[1].resturant1.id 
                           && response.data[j].id != sightsSeeing[1].resturant2.id
                           && response.data[j].id != sightsSeeing[2].resturant1.id 
                           && response.data[j].id != sightsSeeing[2].resturant2.id)
                       {
                        sightsSeeing[3].resturant1 = response.data[j];
                           found11 = true;
                       }
    
                       j ++ ;
    
                     }
                     
                     var found22 = false;
                     j = 0 ;
                     while (found22 == false && j < response.data.length) {
                       if (response.data[j].id != sightsSeeing[0].resturant1.id 
                           && response.data[j].id != sightsSeeing[0].resturant2.id
                           && response.data[j].id != sightsSeeing[1].resturant1.id 
                           && response.data[j].id != sightsSeeing[1].resturant2.id
                           && response.data[j].id != sightsSeeing[2].resturant1.id 
                           && response.data[j].id != sightsSeeing[2].resturant2.id
                           && response.data[j].id != sightsSeeing[3].resturant1.id)
                       {
                        sightsSeeing[3].resturant2 = response.data[j];
                           found22 = true;
                       }
    
                       j ++ ;
    
                     }
                   if (found11 == false)
                   {
                    sightsSeeing[3].resturant1 = response.data[0]; 
                   }
                   if (found22 == false)
                   {
                    sightsSeeing[3].resturant2 = response.data[1]; 
                   }
                   
                   
               }
    
            
    
           }).then(function (response) {
               that.setState({ sights: sightsSeeing });
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
                                c={element.c}
                                resturant1={element.resturant1.name}
                                resturant2={element.resturant2.name}

                            />
                        ))
                        }
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
                    tempLink.setAttribute('download', 'SightSeeingNightLifeResturants.html');
                    tempLink.click();
                    }} > Save </Button>

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
