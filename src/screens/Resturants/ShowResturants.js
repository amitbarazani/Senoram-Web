import React, { Component } from 'react';
import '../../screens/General.css';
import Button from '@material-ui/core/Button';
import axios from '../../Firebase/axios';
import Resturant from './Resturant';
import Grid from '@material-ui/core/Grid';
import Geocode from "react-geocode";
import savings from '../Resturants/Savings3';



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


class ShowResturants extends Component {

    state = {
        resturants: [],
        loading: true,
        pointer: this.props.location.pointer
    }
    constructor(props) {
        super(props);

    }

   
    componentWillMount() {

        if (savings.try1.length == 0) {
            console.log("ERROR");
            
            this.props.history.push({
                pathname: '/NoResults',
            });
            

        }
    }


    componentDidMount() {
        
        let that = this;
        let temp;
        axios.get('/Temp/' + this.state.pointer + '.json')
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

                    if (savings.try1[key].photoUrl.length < 15 )
                    {
                        savings.try1.splice(key, 1);
                        console.log("1")
                        this.setState({ loading: false, resturants: savings.try1 });  
                    }


                    this.setState({ loading: false, resturants: savings.try1 });     

                }  

               
            })
            .then(something => {

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



            })
            
            .then(something => { 
                
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

                <h2 >Top Resturants In The Area</h2>
                <Grid container justify="center">
              
                   
                        
                        { 
                        this.state.resturants.map(resturant => (
                            <div width="50%" class="w">
                            <Resturant
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
                         this.props.history.push({
                            pathname: '/DataSent',
                        });
                    }} > Send Resutrants To My Email! </Button>




            </div>
        );
    }
}

export default ShowResturants;


// address={resturant.address}