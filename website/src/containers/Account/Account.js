import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserPublications, getUserFunds } from '../../reducers/blockchain'
import { sendInvoke } from '../../reducers/neolink'
import { createInvokeObject } from '../../lib/neon'
import './Account.css';

import CrossImage from '../../images/cross.svg'

export class Account extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleWithdrawClick = this.handleWithdrawClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  componentWillMount() {
    const { addressHash } = this.props

    this.props.getUserPublications(addressHash)
    this.props.getUserFunds(addressHash)
  }

  componentWillReceiveProps(nextProps) {

  }

  get noPublicationsMessage() {
    return <div class="no-pubs">You haven't created any publications. Click the button above to get started!</div>
  }

  publicationTable(publications) {
    const array = []

    array.push(
      <div class="table-head w-row" id="header">
        <div class="w-col w-col-2">
          <p class="t3"> </p>
        </div>
        <div class="w-col w-col-3">
          <p class="t3 heading">Website</p>
        </div>
        <div class="w-col w-col-2">
          <p class="t3 heading">Category</p>
        </div>
        <div class="w-col w-col-2">
          <p class="t3 heading">Auction</p>
        </div>
        <div class="w-col w-col-2">
          <p class="t3 heading">Site Tags</p>
        </div>
        <div class="w-col w-col-1">
          <p class="t3 heading">Delete</p>
        </div>
      </div>
    )

    publications.forEach((publication, idx) => {
      array.push(
        <div class="table-body w-row" id={idx}>
          <div class="w-col w-col-2">
            <p class="t3">{publication[1]}</p>
          </div>
          <div class="w-col w-col-3">
            <p class="t7">{publication[2]}</p>
          </div>
          <div class="w-col w-col-2">
            <p class="t7">{publication[3]}</p>
          </div>
          <div class="w-col w-col-2">
            <Link to={`/publications/${publication[0]}/${publication[1]}`} class="button-secondary w-button">View</Link>
          </div>
          <div class="w-col w-col-2">
            <Link to={`/account/tags/${publication[1]}`} class="button-secondary w-button">View</Link>
          </div>
          <div class="w-col w-col-1">
            <div onClick={this.handleDeleteClick(publication)} class="button-secondary _1x1"><img src={CrossImage} class="cross"/></div>
          </div>
        </div>
      )
    })

    return array
  }

  handleDeleteClick(publication) {
    return () => {

    }
  }
  handleWithdrawClick() {
    const { address, funds } = this.props

    const args = [address, funds]
    const invocationObject = createInvokeObject('withdrawFunds', args)

    this.props.sendInvoke(invocationObject)
  }

  render() {
    const { address, publications, funds } = this.props

    return (
      <div>
         <div class="content">
          <div class="content-body">
            <div class="general-header-2">
              <div>
                <h2 class="h2">My Publications</h2>
              </div>
              <Link to="/account/new" class="button-primary header-btn w-button">Create New Publication</Link>
            </div>
            <div class="div-block">
             { publications.size > 0 ?
                this.publicationTable(publications) :
                this.noPublicationsMessage
              }
            </div>
          </div>
        </div>
        <div class="widthraw">
          <div>
            <h2 class="h2">Account Funds</h2>
          </div>
          <div class="div-block-12">
            <p class="t4 funds">{funds ? funds : 0} GAS</p>
            <div onClick={this.handleWithdrawClick} class="button-secondary w-button">Withdraw</div>
          </div>
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  address: PropTypes.string,
  addressHash: PropTypes.string,
  funds: PropTypes.number,
  publications: PropTypes.instanceOf(Immutable.List),
  getUserPublications: PropTypes.func,
  getUserFunds: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    address: state.getIn(['neolink', 'address']),
    addressHash: state.getIn(['neolink', 'addressHash']),
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
