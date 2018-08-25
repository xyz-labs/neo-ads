import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

import './AuthRoute.css';

class AuthRoute extends Route {

  render() {
    const { isLoggedIn, computedMatch, isChecking } = this.props;

    // Add loader
    if (isChecking) return null;

    return isLoggedIn ? 
      <this.props.component match={computedMatch} /> :
      <Redirect to="/login"/>
  }
}

AuthRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
  component: PropTypes.func,
  computedMatch: PropTypes.object,
  isChecking: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.getIn(['neolink', 'isLoggedIn']),
    isChecking: state.getIn(['neolink', 'isChecking'])
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
