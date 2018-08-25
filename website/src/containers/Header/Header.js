import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';
import { checkNeoLinkStatus } from '../../reducers/neolink';

import Logo from '../../images/logo.svg'

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
      <div className="header">
        <div>
          <div className="row w-row">
            <div className="column w-col w-col-6">
                <Link to="/home" className="link-block w-inline-block">
                  <img src={Logo} width="83" className="logo-img"/>
               </Link>
            </div>
            <div className="column-2 w-col w-col-6">
              <div className="text-block">AyM4...6Su3</div>
                <Link to="/account" className="button-secondary w-button">
                  Account
                </Link>
              </div>
          </div>
        </div>
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
    isLoggedIn: state.getIn(['neolink', 'isLoggedIn']),
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
