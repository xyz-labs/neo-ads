import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import AuctionDetail from '../../containers/AuctionDetail/AuctionDetail';
import Bid from '../../containers/Bid/Bid';
import Tags from '../../containers/Tags/Tags';

class App extends Component {
  render() {
    return (
      <div className="body">
        <header>
          <Header/>
        </header>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Redirect exact from="/" to="/home" />
          <Route exact path="/login" component={Login} />
          <AuthRoute exact path="/account" component={Account} />
          <AuthRoute exact path="/account/new" component={NewPublication} />
          <AuthRoute exact path="/account/tags/:name" component={Tags}/>
          <Route exact path="/publications" component={Publications} />
          <Route exact path="/publications/:address" component={UserPublications} />
          <Route exact path="/publications/:address/:name" component={Auction} />
          <Route exact path="/publications/:address/:name/:date" component={AuctionDetail} />
          <AuthRoute exact path="/publications/:address/:name/:date/bid" component={Bid} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return 
}

export default App;
