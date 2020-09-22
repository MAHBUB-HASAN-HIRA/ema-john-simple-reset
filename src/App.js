import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Notfound from './components/Notfound/Notfound';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProductDetails from './components/ProductDetails/ProductDetails';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h1>Email: {loggedInUser.email}</h1>
        <Router>
          <Header/>
          <Switch>
            <Route path='/shop'>
              <Shop></Shop>
            </Route>
            <Route path='/review'>
              <Review></Review>
            </Route>
            <PrivateRoute path='/inventory'>
              <Inventory></Inventory>
            </PrivateRoute>
            <Route path='/login'>
              <Login/>
            </Route>
            <PrivateRoute path='/shipment'>
              <Shipment/>
              </PrivateRoute>
            <Route exact path='/'> 
              <Shop></Shop>
            </Route>
            <Route path='/product/:productKey'>
              <ProductDetails></ProductDetails>
            </Route>
            <Route path='*'>
              <Notfound></Notfound>
            </Route>
          </Switch>
        </Router>
    </UserContext.Provider>
  );
}

export default App;
