import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import AuthRoute from '../../containers/AuthRoute/AuthRoute';

import './App.css';

import Home from '../Home/Home';
import Header from '../../containers/Header/Header';
import Login from '../../containers/Login/Login';
import Account from '../../containers/Account/Account';
import NewPublication from '../../containers/NewPublication/NewPublication';
import Publications from '../../containers/Publications/Publications';
import Auction from '../../containers/Auction/Auction';
import AuctionDetail from '../../containers/AuctionDetail/AuctionDetail';
import Bid from '../../containers/Bid/Bid';
import Tags from '../../containers/Tags/Tags';
import TransactionSuccess from '../../containers/TransactionSuccess/TransactionSuccess';
import TimeMachine from '../../containers/TimeMachine/TimeMachine';

import MobileWarningImage from '../../images/mobile-warning.svg';

class App extends Component {
  render() {
    const pathname = this.props.location.pathname

    return (
      <div>
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
            <Route exact path="/publications/:address/:name" component={Auction} />
            <Route exact path="/publications/:address/:name/:date" component={AuctionDetail} />
            <AuthRoute exact path="/publications/:address/:name/:date/bid" component={Bid} />
            <Route exact path="/success" component={TransactionSuccess} />
            <AuthRoute exact path="/admin/time_machine" component={TimeMachine}/>
          </Switch>
            {
              pathname == '/home' ?
              <div className="hero-img"></div> :
              null
            }
        </div>
        <div className="mobile-warning"><img src={MobileWarningImage} className="image-2"/></div>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object
}

export default withRouter(App);
