import React, { Component } from 'react';
import ShowResturants from "./screens/Resturants/ShowResturants";
import { BrowserRouter, Route, Switch  } from "react-router-dom";
import Input from './screens/Input';
import Resturant from "./screens/Resturants/Resturant";
import DataSent from './screens/DataSent';
import ShowSightSeeing from './screens/SightSeeing/ShowSightSeeing';

import ShowSightSeeing2 from './screens/SightSeeing/ShowSightSeeing2';
import Input2 from './screens/Input2';
import ShowNightLife2 from './screens/NightLife/ShowSightSeeing2';
import ShowResturants2 from "./screens/Resturants/ShowResturants2";
import ShowSightSeeingAndNightLife2 from './screens/SightSeeingAndNightLife/ShowSightSeeingAndNightLife2';
import ShowSightSeeingAndNightLife22 from './screens/SightSeeingAndNightLife/ShowSightSeeingAndNightLife22';

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

        <Route path="/ShowSightSeeing2" component={ShowSightSeeing2} />
        <Route path="/Input2" component={Input2} />
        <Route path="/ShowNightLife2" component={ShowNightLife2} />
        <Route path="/ShowResturants2" component={ShowResturants2} />
        <Route path="/ShowSightSeeingAndNightLife2" component={ShowSightSeeingAndNightLife2} />
        <Route path="/ShowSightSeeingAndNightLife22" component={ShowSightSeeingAndNightLife22} />
        

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
