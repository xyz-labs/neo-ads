import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getUserPublications } from '../../reducers/blockchain'

import './Account.css';

export class Account extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    const { address } = this.props

    this.props.getUserPublications(address)
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    const { publications } = this.props

    return (
      <div className="Account">
        Account
      </div>
    );
  }
}

Account.propTypes = {
  address: PropTypes.string,
  publications: PropTypes.instanceOf(Immutable.List),
  getUserPublications: PropTypes.func
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
