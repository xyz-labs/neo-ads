import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import './Login.css';

import ConfirmedImage from '../../images/confirmed.svg'
import DisconnectedImage from '../../images/neolink.svg'
import RefreshImage from '../../images/refresh.svg'

export class Login extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.checkStatus(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.checkStatus(nextProps)
  }

  get statusMessage() {
    const { isConnected, isLoggedIn } = this.props;
    
    if (!isConnected) {
      return (
        <div className="home-container">
          <img src={DisconnectedImage} className="image-3"/>
          <div className="context process">
            <p className="t2 blue">NeoLink wallet not detected</p>
            <div className="div-block-11">
              <div className="button-secondary _1x1">
                <img src={RefreshImage} className="cross ref"/>
              </div>
              <div className="t6 sep">or</div>
              <Link to={`https://github.com/CityOfZion/NeoLink`} target="_blank" className="button-primary w-button">Install NeoLink</Link>
            </div>
          </div>
        </div>
      )
    } else if (isConnected && !isLoggedIn) {
      return (
        <div className="home-container">
          <img src={DisconnectedImage} className="image-3"/>
          <div className="context process">
            <p className="t2 blue">No account detected, please login via NeoLink</p>
            <div className="div-block-11">
              <div className="button-secondary _1x1">
                <img src={RefreshImage} className="cross ref"/>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Redirect to="/account"/>
      )
    }
  }

  checkStatus(props) {
    const { isConnected, isLoggedIn, history } = props;
    if (isConnected && isLoggedIn) {
      history.push('/account')
    }
  }

  render() {
    return (
      <div>
        {this.statusMessage}
      </div>
    )
  }
}

Login.propTypes = {
  isConnected: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  history: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    isConnected: state.getIn(['neolink', 'isConnected']),
    isLoggedIn: state.getIn(['neolink', 'isLoggedIn'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
