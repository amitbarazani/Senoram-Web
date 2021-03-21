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
        loading: true,
        pointer: this.props.location.pointer,
        lat_to_pass: this.props.location.lat,
        lng_to_pass: this.props.location.lng,
    }

    
    constructor(props) {
        super(props);
       
        //inputShowSightSeeing = this.props.location.location;
       

    }

   

    componentDidMount() {

        
        
        let temp;
        axios.get('/Temp/' + this.state.pointer + '.json')
            .then(res => {

                const fetchedResturants = [];
                for (let key in res.data) {
                    fetchedResturants.push({
                        ...res.data[key],
                        id: key + 1,
                        address: "temp",
                        photo_reference: "temp",
                        open_now: "temp",
                        distance: 0,

                    });

                }
                if (fetchedResturants.length == 0 )
                {
                    this.props.history.push({
                        pathname: '/NoResults',
                    });

                }
                let i;
                let j;
                for (i = 0; i < fetchedResturants.length; i++) {
                    for (j = 0; j < fetchedResturants.length; j++) {
                        if (i != j)
                            if (fetchedResturants[i].name == fetchedResturants[j].name)
                                fetchedResturants.splice(i, 1);

                    }
                }
                temp = fetchedResturants;
                this.setState({ loading: false, resturants: fetchedResturants });


            }).then(something => {

                const proxyUrl = "https://cors-anywhere.herokuapp.com/";
                //this.state.resturants
                for (let key in temp) {
                    //console.log("in");
                    // let photoName = temp[key].name;
                    let lat = temp[key].geoCode.latitude;
                    let lng = temp[key].geoCode.longitude;

                    //photoName = photoName.replace(/ /g, "%20");
                    //console.log(photoName);
                    let http = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyAlsDSqPYncPQDXhREqVsYgj6YiVGSyNMo';

/*
                    //axios.get(proxyUrl + http)
                    axios.get(proxyUrl + http)
                        .then(res => {
                            temp[key].address = res.data.results[0].formatted_address;
                            // console.log (res.data.results);
                            //temp[key].photo_reference = res.data.candidates[0].photos[0].photo_reference;
                            //temp[key].address = res.data.candidates[0].formatted_address; 
                            //temp[key].open_now = res.data.candidates[0].opening_hours.open_now;
                            //console.log(this.state.resturants[key])
                            //this.setState({ loading: false, resturants: temp });
                            this.setState({ loading: false, resturants: temp });
                        }).catch(err => {
                            console.log(console.log(err));

                        })

                        */
                }
            }).then(something => { 

              
                for (let key in temp) {

                    let t = distance(this.props.location.lat,this.props.location.lng,temp[key].geoCode.latitude,temp[key].geoCode.longitude,'K');
                    temp[key].distance = t;
                }
                this.setState({ loading: false, resturants: mergeSort(this.state.resturants) });
            
            })
            
            
            .then(something => { 
                
                //console.log(this.state.resturants); 
                //mergeSort(this.state.resturants);
                this.setState({ loading: false, resturants: mergeSort(this.state.resturants) });
                
            
            })
            
            
            
            .catch(err => { console.log(err); })
    }



    

 


    render() {





        return (



            <div >

                <h2 >Top Sight Seeing In The Area</h2>
                <h4 >Choose Up to 4 atractions </h4>
                <Grid container justify="center">
                    <h5  >
                        {this.state.resturants.map(resturant => (

                            <Sight
                                id={resturant.id}
                                name={resturant.name}
                                rank={resturant.rank}
                                distance={resturant.distance}
                                id = {resturant.id}
                            />
                        ))
                        }
                    </h5>

                    


                </Grid>

                <Button variant="contained" color="primary" onClick={async () => {

                      if ( count <= 0)
                      {
                          alert("Please select at least 1 activity")

                      }
                    else {
                        //console.log(sightsChecked);
                        for( var i = 0; i < sightsChecked.length; i++){ 
                            for( var j = 0; j < this.state.resturants.length; j++){
                            if ( sightsChecked[i] === this.state.resturants[j].id) {

                                actuallSightsChecked.push(this.state.resturants[j]);
                              //sightsChecked.splice(i, 1); 
                            }
                        
                        }
                    }
                            let dataToSend = this.props.location.location;
                            let a = this.state.lat_to_pass;
                            let b = this.state.lng_to_pass;
                            this.props.history.push({
                                pathname: '/FinalTrackSightSeeingAndResturants',
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


