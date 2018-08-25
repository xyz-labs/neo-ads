import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserPublications, getUserFunds } from '../../reducers/blockchain'
import { sendInvoke } from '../../reducers/neolink'
import { addressToScriptHash, createInvokeObject } from '../../lib/neon'
import './Account.css';

export class Account extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleWithdrawClick = this.handleWithdrawClick.bind(this)
  }

  componentWillMount() {
    const { address } = this.props

    this.props.getUserPublications(address)
    this.props.getUserFunds(address)
  }

  componentWillReceiveProps(nextProps) {

  }

  handleWithdrawClick() {
    const { address, funds } = this.props

    const args = [addressToScriptHash(address), funds]
    const invocationObject = createInvokeObject('withdrawFunds', args)

    this.props.sendInvoke(invocationObject)
  }

  render() {
    const { publications, funds } = this.props

    return (
      <div className="Account">
        <Link to="/publications/a/b">Account</Link>
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
    sendInvoke: (data) => {
      return dispatch(sendInvoke(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
