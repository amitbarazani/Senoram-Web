import React, { Component } from 'react';
import ShowResturants from "./screens/Resturants/ShowResturants";
import { BrowserRouter, Route, Switch  } from "react-router-dom";
import Input from './screens/Input';
import Resturant from "./screens/Resturants/Resturant";
import DataSent from './screens/DataSent';
import ShowSightSeeing from './screens/SightSeeing/ShowSightSeeing';
import FinalTrackSightSeeing from './screens/SightSeeing/FinalTrack';
import NoResults from './screens/NoResults';
import FinalTrackNightLife from './screens/NightLife/FinalTrack';
import ShowNightLife from './screens/NightLife/ShowSightSeeing';
import ShowSightSeeingAndNightLife from './screens/SightSeeingAndNightLife/ShowSightSeeingAndNightLife';
import FinalTrackSightSeeingAndNightLife from './screens/SightSeeingAndNightLife/FinalTrackSightSeeingAndNightLife';
import ShowSightSeeingAndResturants from './screens/SightSeeingAndResturants/ShowSightSeeingAndResturants';
import FinalTrackSightSeeingAndResturants from './screens/SightSeeingAndResturants/FinalTrackSightSeeingAndResturants';
import FinalTrackSightSeeingAndResturantsAndNightLife from './screens/SightsResturantsNight/FinalTrackSightSeeingAndResturantsAndNightLife';
import ShowSightSeeingAndResturantsAndNightLife from './screens/SightsResturantsNight/ShowSightSeeingAndResturantsAndNightLife';
class App extends Component {

  
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <div className="App-header">
        <Switch>
       
        <Route path="/ShowResturants" component={ShowResturants} />
        <Route path="/ShowSightSeeingAndResturantsAndNightLife" component={ShowSightSeeingAndResturantsAndNightLife} />
        <Route path="/FinalTrackSightSeeingAndResturantsAndNightLife" component={FinalTrackSightSeeingAndResturantsAndNightLife} />
        <Route path="/FinalTrackSightSeeingAndResturants" component={FinalTrackSightSeeingAndResturants} />
        <Route path="/ShowSightSeeingAndResturants" component={ShowSightSeeingAndResturants} />
        <Route path="/ShowSightSeeingAndNightLife" component={ShowSightSeeingAndNightLife} />
        <Route path="/FinalTrackSightSeeingAndNightLife" component={FinalTrackSightSeeingAndNightLife} />
        <Route path="/Input" component={Input} />
        <Route path="/Resturant" component={Resturant} />
        <Route path="/DataSent" component={DataSent} />
        <Route path="/ShowSightSeeing" component={ShowSightSeeing} />
        <Route path="/FinalTrackSightSeeing" component={FinalTrackSightSeeing} />
        <Route path="/NoResults" component={NoResults} />
        <Route path="/ShowNightLife" component={ShowNightLife} />
        <Route path="/FinalTrackNightLife" component={FinalTrackNightLife} />
       
        </Switch>
       
          </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
