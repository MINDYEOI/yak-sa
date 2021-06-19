import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import UploadPage from './components/views/UploadPage/UploadPage'
import auth from './hoc/authentication'
import Navigation from './components/views/NavBar/NavBar'

function App() {  
  return (
    <Router>
      <Navigation />
      <div>
        
        <Switch>
                                               {/* null, false에 대한 옵션 설명은 auth로 가서 확인*/}
          
          <Route exact path="/" component={auth(LandingPage, null)} />     

          <Route exact path="/login" component={auth(LoginPage, false)}/>

          <Route exact path="/register" component={auth(RegisterPage, false)}/>
          
          <Route exact path="/product/upload" component={auth(UploadPage, true)}/>
          {/*
          <Route exact path="/" component={LandingPage} />     

          <Route exact path="/login" component={LoginPage}/>

          <Route exact path="/register" component={RegisterPage}/>
          */}
          </Switch>
      </div>
    </Router>
  );
}

export default App;
