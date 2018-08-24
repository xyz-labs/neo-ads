import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import './Header.css';
import { checkNeoLinkStatus } from '../../reducers/neolink';

export class Header extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.checkNeoLinkStatus()
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="Header">
        Header
      </div>
    );
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  address: PropTypes.string,
  checkNeoLinkStatus: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.getIn(['neolink', 'isConnected']),
    address: state.getIn(['neolink', 'address'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkNeoLinkStatus: () => {
			return dispatch(checkNeoLinkStatus());
		},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
