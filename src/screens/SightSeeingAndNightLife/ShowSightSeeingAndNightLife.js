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
    }

    
    constructor(props) {
        super(props);
       
        //inputShowSightSeeing = this.props.location.location;
       

    }

    componentWillMount() {

        
        let that = this;
        let temp;
        axios.get('/Temp/' + this.state.pointerB + '.json')
            .then(res => {

                const fetchedResturants = [];
                for (let key in res.data) {
                    fetchedResturants.push({
                        ...savings.try2[key],
                        id: key + 1,
                       
                        photo_reference: "temp",
                        website: "temp",
                        
                        phone: "temp",
                        distance: 0,

                    });

                }
                if (savings.try2.length == 0 )
                {
                    this.props.history.push({
                        pathname: '/NoResults',
                    });

                }
                let i;
                let j;
                for (i = 0; i < savings.try2.length; i++) {
                    for (j = 0; j < savings.try2.length; j++) {
                        if (i != j)
                            if (savings.try2[i].name == savings.try2[j].name)
                            savings.try2.splice(i, 1);

                    }
                }
                temp = savings.try2;
                this.setState({ loading: false, resturantsB: savings.try2 });


            

            }).then(something => {

                
                for (var i = 0; i < savings.try2.length; i++) {
                    if (savings.try2[i].photoUrl == "not yet" ) {
                        savings.try2.splice(i, 1); // cache.splice(key) is working fine, ***
                            i--;
                        }
                    }
                    this.setState({ loading: false, resturantsB: savings.try2 }); 
                  

            }).then(something => {

                //<3//
                console.log(that.state.resturantsB);
                for (let key in that.state.resturantsB) {
                    
                    let id = that.state.resturantsB[key].place_id;
                    console.log(id);
                    var map;
                    var service;
                    var infowindow;
                    const google = window.google;
                    initMap(that.state.resturantsB[key]);
        
                    function initMap(pointer) {
                        var sydney = new google.maps.LatLng(-33.867, 151.195);
        
                        infowindow = new google.maps.InfoWindow();
        
                        map = new google.maps.Map(
                            document.createElement("p"), { center: sydney, zoom: 15 });
        
        
                        var request = {
                            placeId: id,
                            fields: ['formatted_phone_number','opening_hours'],
                        };
                        
                        var service = new google.maps.places.PlacesService(map);
                        service.getDetails(request, function (results, status) {
                            
                            
                            if (status == google.maps.places.PlacesServiceStatus.OK) {
        
                                console.log(results);
                              
                                
                                
                            }
                            else 
                            console.log(results);
                        })
                        
        
        
                    }
                    
                }

                //<3//



            
            }).then(something => { 

              
                for (let key in temp) {

                    let t = distance(this.props.location.lat,this.props.location.lng,temp[key].geoCode.latitude,temp[key].geoCode.longitude,'K');
                    temp[key].distance = t;
                }
                this.setState({ loading: false, resturantsB: mergeSort(this.state.resturantsB) });
            
            })
            
            
            .then(something => { 
                
                //console.log(this.state.resturants); 
                //mergeSort(this.state.resturants);
                this.setState({ loading: false, resturantsB: mergeSort(this.state.resturantsB) });
                
            
            })
//..
            .then(something => { 
                
                for (let i = 0; i < savings.try2.length; i++) {
                    
                            if (savings.try2[i].photoUrl == "not yet")
                            {
                                savings.try2.splice(i, 1);
                                console.log("2")
                                i--;
                                this.setState({ loading: false, resturantsB: savings.try2 });     
                            }
                                
                               
                            
                            if (savings.try2.length == 0)
                            {
                                
                                this.props.history.push({
                                    pathname: '/NoResults',
                                });
            
                            }         
                            

                    
                }
                

            })
            
            
            
            .catch(err => { console.log(err); })
    }

    componentDidMount() {

        
        let that = this;
        let temp;
        axios.get('/Temp/' + this.state.pointerA + '.json')
            .then(res => {

                const fetchedResturants = [];
                for (let key in res.data) {
                    fetchedResturants.push({
                        ...savings.try1[key],
                        id: key + 1,
                       
                        photo_reference: "temp",
                        website: "temp",
                        
                        phone: "temp",
                        distance: 0,

                    });

                }
                if (savings.try1.length == 0) {
                    this.props.history.push({
                        pathname: '/NoResults',
                    });

                }
                let i;
                let j;
                for (i = 0; i < savings.try1.length; i++) {
                    for (j = 0; j < savings.try1.length; j++) {
                        if (i != j)
                            if (savings.try1[i].name == savings.try1[j].name)
                            savings.try1.splice(i, 1);

                    }
                }
                temp = savings.try1;
                this.setState({ loading: false, resturants: savings.try1 });


            }).then(something => {

                
                
                for (let key in savings.try1) {
                   
                    
                    if (savings.try1[key].photoUrl == "not yet" )
                    {
                     
                        savings.try1.splice(key, 1);
                        console.log("1")
                        this.setState({ loading: false, resturants: savings.try1 });  
                    }

                    if (savings.try1[savings.try1.length-1].photoUrl == "not yet" )
                    {
                     
                        savings.try1.splice(savings.try1.length-1, 1);
                        console.log("1")
                        this.setState({ loading: false, resturants: savings.try1 });  
                    }

                    
                    else if (savings.try1[key].photoUrl.length < 15 )
                    {
                          
                        savings.try1.splice(key, 1);
                        console.log("1")
                        this.setState({ loading: false, resturants: savings.try1 });  
                    }

                    //console.log(savings.try1[key].photoUrl);
                    //this.setState({ loading: false, resturants: savings.try2 });     

                }    

            }).then(something => {

                //<3//
                console.log(that.state.resturants);
                for (let key in that.state.resturants) {
                    
                    let id = that.state.resturants[key].place_id;
                    console.log(id);
                    var map;
                    var service;
                    var infowindow;
                    const google = window.google;
                    initMap(that.state.resturants[key]);
        
                    function initMap(pointer) {
                        var sydney = new google.maps.LatLng(-33.867, 151.195);
        
                        infowindow = new google.maps.InfoWindow();
        
                        map = new google.maps.Map(
                            document.createElement("p"), { center: sydney, zoom: 15 });
        
        
                        var request = {
                            placeId: id,
                            fields: ['formatted_phone_number','opening_hours'],
                        };
                        
                        var service = new google.maps.places.PlacesService(map);
                        service.getDetails(request, function (results, status) {
                            
                            
                            if (status == google.maps.places.PlacesServiceStatus.OK) {
        
                                console.log(results);
                              
                                
                                
                            }
                            else 
                            console.log(results);
                        })
                        
        
        
                    }
                    
                }

                //<3//



            
            }).then(something => { 

              
                for (let key in temp) {

                    let t = distance(this.props.location.lat,this.props.location.lng,temp[key].geoCode.latitude,temp[key].geoCode.longitude,'K');
                    temp[key].distance = t;
                }
                this.setState({ loading: false, resturants: mergeSort(this.state.resturants) });
            
            })
            
            
            .then(something => { 
                
               
                this.setState({ loading: false, resturants: mergeSort(this.state.resturants) });
                this.setState({ loading: false, resturantsB: mergeSort(this.state.resturantsB) });
                
                
            
            }).then(something => { 
                
                let minT = this.state.resturants.length;
                let minT2 = this.state.resturantsB.length;
                let real_min = Math.min(minT,minT2);
                this.setState({ loading: false, resturants: this.state.resturants.splice(0,real_min) });
                this.setState({ loading: false, resturantsB: this.state.resturantsB.splice(0,real_min) });

                
                
            
            })
            
            .then(something => { 
                for (let i = 0; i < savings.try1.length; i++) {
                    
                            if (savings.try1[i].photoUrl == "not yet")
                            {
                                savings.try1.splice(i, 1);
                                console.log("2")
                                this.setState({ loading: false, resturants: savings.try1 });     
                            }
                                
                               
                            
                            if (savings.try1.length == 0)
                            {
                                
                                this.props.history.push({
                                    pathname: '/NoResults',
                                });
            
                            }         
                            

                    
                }
                

            })
            
            .catch(err => { console.log(err); })
    }



    

 


    render() {





        return (



            <div >

                <h2 >Top Attractions In The Area</h2>
                <h3 >Choose Up To 4 Attractions In Total </h3>
                
                <Grid container justify="center">
           
               
                    <h5  >
                    <h4 >Choose Sight Seeing </h4>
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
                    </h5>
               
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <h5  >
                    <h4 >Choose Night Life </h4>
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

                                sightsSeeing.push(this.state.resturants[j]);
                              //sightsChecked.splice(i, 1); 
                            }
                        
                        }
                    }

                    for( var i = 0; i < NightLifeChecked.length; i++){ 
                        for( var j = 0; j < this.state.resturantsB.length; j++){
                        if ( NightLifeChecked[i] === this.state.resturantsB[j].id) {

                            nights.push(this.state.resturantsB[j]);
                          //sightsChecked.splice(i, 1); 
                        }
                    
                    }
                }


                            let dataToSend = this.props.location.location;
                            let a = this.state.lat_to_pass;
                            let b = this.state.lng_to_pass;
                            this.props.history.push({
                                pathname: '/FinalTrackSightSeeingAndNightLife',
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


// address={resturant.address}