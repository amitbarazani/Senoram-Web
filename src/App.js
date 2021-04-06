import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import ShowResturants from "./screens/Resturants/ShowResturants";
import { BrowserRouter, Route, Switch  } from "react-router-dom";
import TripPlan from './screens/Input2';
import Resturant from "./screens/Resturants/Resturant";
import DataSent from './screens/DataSent';
import ShowSightSeeing from './screens/SightSeeing/ShowSightSeeing';

import ShowSightSeeing2 from './screens/SightSeeing/ShowSightSeeing2';
import ShowNightLife2 from './screens/NightLife/ShowSightSeeing2';
import ShowResturants2 from "./screens/Resturants/ShowResturants2";
import ShowSightSeeingAndNightLife2 from './screens/SightSeeingAndNightLife/ShowSightSeeingAndNightLife2';
import ShowSightSeeingAndNightLife22 from './screens/SightSeeingAndNightLife/ShowSightSeeingAndNightLife22';
import ShowNightLifeAndResturants from './screens/NightLifeAndResturants/ShowNightLifeAndResturants';
import FinalTrackNightLifeAndResturants from './screens/NightLifeAndResturants/FinalTrackNightLifeAndResturants';
import ShowSightSeeingAndResturantsAndNightLife from './screens/SightSeeingResturantsNightLife2/ShowSightSeeingAndResturantsAndNightLife';
import ShowSightSeeingAndResturantsAndNightLife2 from './screens/SightSeeingResturantsNightLife2/ShowSightSeeingAndResturantsAndNightLife22';

import FinalTrackSightSeeing from './screens/SightSeeing/FinalTrack';
import NoResults from './screens/NoResults';
import FinalTrackNightLife from './screens/NightLife/FinalTrack';
import ShowNightLife from './screens/NightLife/ShowSightSeeing';
import ShowSightSeeingAndNightLife from './screens/SightSeeingAndNightLife/ShowSightSeeingAndNightLife';
import FinalTrackSightSeeingAndNightLife from './screens/SightSeeingAndNightLife/FinalTrackSightSeeingAndNightLife';
import ShowSightSeeingAndResturants from './screens/SightSeeingAndResturants/ShowSightSeeingAndResturants';
import FinalTrackSightSeeingAndResturants from './screens/SightSeeingAndResturants/FinalTrackSightSeeingAndResturants';
import FinalTrackSightSeeingAndResturantsAndNightLife from './screens/SightSeeingResturantsNightLife2/FinalTrackSightSeeingAndResturantsAndNightLife';

import MenuClient from './screens/MenuPage/MenuClient';
import HomePage from './screens/HomePage/HomePage';
import Login from './screens/ToolBar/Login';
import SignUp from './screens/ToolBar/SignUp';
import passwordReset from './screens/ToolBar/PasswordReset';
import Profile from './screens/Profile/Profile';

import MenuAgent from './screens/MenuPage/MenuAgent';
import LoginAgent from './screens/ToolBar/LoginAgent';
import SignUpAgent from './screens/ToolBar/SignUpAgent';
import passwordResetAgent from './screens/ToolBar/PasswordResetAgent';
import ProfileAgent from './screens/Profile/ProfileAgent';
import ContactUs from './screens/ContactUs/ContactUs';
import Chat from './screens/Chat/Chat';
import ChangePhoto from './screens/Chat/ChangePhoto';


class App extends Component {

  

  
  render() {
    return (

     
  
      <BrowserRouter>
   
      <div className="App">
        <div className="App-header">
        <Switch>
       
        <Route path="/ShowResturants" component={ShowResturants} />

        <Route path="/ShowSightSeeing2" component={ShowSightSeeing2} />
        <Route path="/TripPlan" component={TripPlan} />
        <Route path="/ShowNightLife2" component={ShowNightLife2} />
        <Route path="/ShowResturants2" component={ShowResturants2} />
        <Route path="/ShowSightSeeingAndNightLife2" component={ShowSightSeeingAndNightLife2} />
        <Route path="/ShowSightSeeingAndNightLife22" component={ShowSightSeeingAndNightLife22} />
        <Route path="/ShowNightLifeAndResturants" component={ShowNightLifeAndResturants} />
        <Route path="/FinalTrackNightLifeAndResturants" component={FinalTrackNightLifeAndResturants} />
        <Route path="/ShowSightSeeingAndResturantsAndNightLife" component={ShowSightSeeingAndResturantsAndNightLife} />
        <Route path="/ShowSightSeeingAndResturantsAndNightLife2" component={ShowSightSeeingAndResturantsAndNightLife2} />
      
        <Route path="/FinalTrackSightSeeingAndResturantsAndNightLife" component={FinalTrackSightSeeingAndResturantsAndNightLife} />
        <Route path="/FinalTrackSightSeeingAndResturants" component={FinalTrackSightSeeingAndResturants} />
        <Route path="/ShowSightSeeingAndResturants" component={ShowSightSeeingAndResturants} />
        <Route path="/ShowSightSeeingAndNightLife" component={ShowSightSeeingAndNightLife} />
        <Route path="/FinalTrackSightSeeingAndNightLife" component={FinalTrackSightSeeingAndNightLife} />
      
        <Route path="/Resturant" component={Resturant} />
        <Route path="/DataSent" component={DataSent} />
        <Route path="/ShowSightSeeing" component={ShowSightSeeing} />
        <Route path="/FinalTrackSightSeeing" component={FinalTrackSightSeeing} />
        <Route path="/NoResults" component={NoResults} />
        <Route path="/ShowNightLife" component={ShowNightLife} />
        <Route path="/FinalTrackNightLife" component={FinalTrackNightLife} />

        <Route path="/MenuClient" component={MenuClient} />
        <Route path="/HomePage" component={HomePage} />
        <Route path="/Login" component={Login} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/passwordReset" component={passwordReset} />
        <Route path="/Profile" component={Profile} />


        <Route path="/MenuAgent" component={MenuAgent} />
        <Route path="/LoginAgent" component={LoginAgent} />
        <Route path="/SignUpAgent" component={SignUpAgent} />
        <Route path="/passwordResetAgent" component={passwordResetAgent} />
        <Route path="/ProfileAgent" component={ProfileAgent} />
        <Route path="/ContactUs" component={ContactUs} />
        <Route path="/Chat" component={Chat} />
        <Route path="/ChangePhoto" component={ChangePhoto} />
        
        </Switch>
       
          </div>
      </div>

      </BrowserRouter>
    
    );
  }
}

export default App;
