import './App.css';
import SignIn from './Components/Login';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import { getToken } from './Components/Utils/Common';

function App() {

  return (
    <>
   <Router>
     
     <Switch>
       <Route path="/login">
         <Login />
         
       </Route>

       <Route exact path="/" >
         <Home />
         
       </Route>
     </Switch>
 </Router>
 </>
  );
}

function Login() {
  return  <SignIn />;
}


function Home() {
  return  <Dashboard />;
}



export default App;
