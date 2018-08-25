import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserPublications, getUserFunds } from '../../reducers/blockchain'

import './Account.css';

export class Account extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    const { address } = this.props

    this.props.getUserPublications(address)
    this.props.getUserFunds(address)
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    const { publications, funds } = this.props

    return (
      <div className="Account">
        <Link to="/publications/a/b/3">Account</Link>
      </div>
    );
  }
}

Account.propTypes = {
  address: PropTypes.string,
  funds: PropTypes.number,
  publications: PropTypes.instanceOf(Immutable.List),
  getUserPublications: PropTypes.func,
  getUserFunds: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    address: state.getIn(['neolink', 'address']),
    publications: state.getIn(['blockchain', 'activePublicationList'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserPublications: (address) => {
      return dispatch(getUserPublications(address))
    },
    getUserFunds: (address) => {
      return dispatch(getUserFunds(address))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
