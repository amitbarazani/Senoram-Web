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
import savings from './Savings4';

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
        location: this.props.location.dataToSend1//"London",
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
            this.setState({ sights: sorted });
            console.log(sorted);
            
            let tt = distance(sorted[0].geoCode.latitude, sorted[0].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
           
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });

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

        }
        // 2 NightLife
        if (nights.length == 2 && sightsSeeing.length == 0)
        {
            if (nights[0].distance > nights[1].distance) {
                var temp = nights[0];
                nights[0] = nights[1];
                nights[1] = temp;
            }


            let tt = distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });

            let t = distance(nights[0].geoCode.latitude, nights[0].geoCode.longitude, nights[1].geoCode.latitude, nights[1].geoCode.longitude, 'K');
            nights[1].distance = t;


            nights[0].c = "Night Life"
            nights[1].c = "Night Life"
            this.setState({ sights: nights });


        }

        // 2 SightSeeing
        if (nights.length == 0 && sightsSeeing.length == 2)
        {
            if (sightsSeeing[0].distance > sightsSeeing[1].distance) {
                var temp = sightsSeeing[0];
                sightsSeeing[0] = sightsSeeing[1];
                sightsSeeing[1] = temp;
            }


            let tt = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });

            let t = distance(sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, 'K');
            sightsSeeing[1].distance = t;


            sightsSeeing[0].c = "Sight Seeing";
            sightsSeeing[1].c = "Sight Seeing";
            this.setState({ sights: sightsSeeing });
        }

        // 1 Night and 1 Seight Seeing 
        if (nights.length == 1 && sightsSeeing.length == 1)
        {
            sorted.push(sightsSeeing[0]);
            sorted[0].c = "Sight Seeing";

            sorted.push(nights[0]);
            sorted[0].c = "Night Life";

            this.setState({ sights: sorted });

            let tt = distance(sorted[1].geoCode.latitude, sorted[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });

            let t = distance(sorted[0].geoCode.latitude, sorted[0].geoCode.longitude, sorted[1].geoCode.latitude, sorted[1].geoCode.longitude, 'K');
            sorted[1].distance = t;

        }
        
        // 3 Night life
        if (nights.length == 3 && sightsSeeing.length == 0)
        {
           

            let temp1 =  distance(nights[0].geoCode.latitude, nights[0].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp2 =  distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp3 =  distance(nights[2].geoCode.latitude, nights[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

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
        

        }
        
        // 3 Sight Seeing 
        if (nights.length == 0 && sightsSeeing.length == 3)
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
           
           
            
            let tt = distance(sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
    
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });


        let t = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, 'K');

        sightsSeeing[1].distance = t;
        let ttt = distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, 'K');

        sightsSeeing[2].distance = ttt;
        sightsSeeing[0].c = "Night Life";
        sightsSeeing[1].c = "Night Life";
        sightsSeeing[2].c = "Night Life";
        this.setState({ sights: sightsSeeing }); 
            
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



            let tt = distance(sorted[2].geoCode.latitude, sorted[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });

            let t = distance(sorted[0].geoCode.latitude, sorted[0].geoCode.longitude, sorted[1].geoCode.latitude, sorted[1].geoCode.longitude, 'K');
            sorted[1].distance = t;

            let tp = distance(sorted[1].geoCode.latitude, sorted[1].geoCode.longitude, sorted[2].geoCode.latitude, sorted[2].geoCode.longitude, 'K');
            sorted[2].distance = tp;


          
            this.setState({ sights: sorted });

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



            let tt = distance(sorted[2].geoCode.latitude, sorted[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');
            let c = "Distance: " + tt + " KM"
            this.setState({ ending: c });

            let t = distance(sorted[0].geoCode.latitude, sorted[0].geoCode.longitude, sorted[1].geoCode.latitude, sorted[1].geoCode.longitude, 'K');
            sorted[1].distance = t;

            let tp = distance(sorted[1].geoCode.latitude, sorted[1].geoCode.longitude, sorted[2].geoCode.latitude, sorted[2].geoCode.longitude, 'K');
            sorted[2].distance = tp;


          
            this.setState({ sights: sorted });

        }

         // 4  Night Life
         if (nights.length == 4 && sightsSeeing.length == 0)
         {
            let temp1 =  distance(nights[0].geoCode.latitude, nights[0].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp2 =  distance(nights[1].geoCode.latitude, nights[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp3 =  distance(nights[2].geoCode.latitude, nights[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

            let temp4 =  distance(nights[3].geoCode.latitude, nights[3].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

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

        }
         
        // 4  Sight Seeing 
        if (nights.length == 0 && sightsSeeing.length == 4)
        {
           let temp1 =  distance(sightsSeeing[0].geoCode.latitude, sightsSeeing[0].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

           let temp2 =  distance(sightsSeeing[1].geoCode.latitude, sightsSeeing[1].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

           let temp3 =  distance(sightsSeeing[2].geoCode.latitude, sightsSeeing[2].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

           let temp4 =  distance(sightsSeeing[3].geoCode.latitude, sightsSeeing[3].geoCode.longitude, this.props.location.a, this.props.location.b, 'K');

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
        
    }
    
   
    
      

    }






    render() {

        return (

            <div >
                <Grid container justify="center">
                    <h5>
                        <h1>Trip Plan</h1>
                     
                        <p>{this.state.location} </p>
                        <p>Starting Point</p>
                        {this.state.sights.map(element => (

                            <Final
                                id={element.id}
                                name={element.name}
                                rank={element.rank}
                                distance={element.distance}
                                url= {element.photoUrl}
                                type= {element.type}
                                c={element.c}

                            />
                        ))
                        }
                        
                        <p>{this.state.location} </p>
                        <p>{this.state.ending} </p>
                    </h5>
                    


                </Grid>
                <Button variant="contained" color="primary" onClick={async () => {
                         this.props.history.push({
                            pathname: '/DataSent',
                        });
                    }} > Send Plan To My Email! </Button>
            </div>
        );
    }
}

export default FinalTrack;


// address={resturant.address}
//ddsdsdsdsdsdsdsdsdsdsds