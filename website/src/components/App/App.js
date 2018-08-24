import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AuthRoute from '../../containers/AuthRoute/AuthRoute';

import './App.css';

import Home from '../Home/Home';
import Header from '../../containers/Header/Header';
import Login from '../../containers/Login/Login';
import Account from '../../containers/Account/Account';
import NewPublication from '../../containers/NewPublication/NewPublication';
import Publications from '../../containers/Publications/Publications';
import UserPublications from '../../containers/UserPublications/UserPublications';
import Auction from '../../containers/Auction/Auction';
import Bid from '../../containers/Bid/Bid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Header/>
        </header>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Redirect exact from="/" to="/home" />
          <Route exact path="/login" component={Login} />
          <AuthRoute exact path="/account" component={Account} />
          <AuthRoute exact path="/account/new" component={NewPublication} />
          <Route exact path="/publications" component={Publications} />
          <Route exact path="/publications/:address" component={UserPublications} />
          <Route exact path="/publications/:address/:name" component={Auction} />
          <AuthRoute exact path="/publications/:address/:name/:date" component={Bid} />
        </Switch>
      </div>
    );
  }
}

export default App;
