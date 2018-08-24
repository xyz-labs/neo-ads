import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import './Login.css';

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

  checkStatus(props) {
    const { isConnected, isLoggedIn, history } = props;

    if (isConnected && isLoggedIn) {
      history.push('/account')
    }
  }

  render() {
    return (
      <div className="Login">
        Login
      </div>
    );
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
