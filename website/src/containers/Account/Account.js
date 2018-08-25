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
    return <div className="no-pubs">You haven't created any publications. Click the button above to get started!</div>
  }

  publicationTable(publications) {
    const array = []

    array.push(
      <div className="table-head w-row" key="header">
        <div className="w-col w-col-2">
          <p className="t3"> </p>
        </div>
        <div className="w-col w-col-3">
          <p className="t3 heading">Website</p>
        </div>
        <div className="w-col w-col-2">
          <p className="t3 heading">Category</p>
        </div>
        <div className="w-col w-col-2">
          <p className="t3 heading">Auction</p>
        </div>
        <div className="w-col w-col-2">
          <p className="t3 heading">Site Tags</p>
        </div>
        <div className="w-col w-col-1">
          <p className="t3 heading">Delete</p>
        </div>
      </div>
    )

    publications.forEach((publication, idx) => {
      array.push(
        <div className="table-body w-row" key={idx}>
          <div className="w-col w-col-2">
            <p className="t3">{publication[1]}</p>
          </div>
          <div className="w-col w-col-3">
            <p className="t7">{publication[2]}</p>
          </div>
          <div className="w-col w-col-2">
            <p className="t7">{publication[3]}</p>
          </div>
          <div className="w-col w-col-2">
            <Link to={`/publications/${publication[0]}/${publication[1]}`} className="button-secondary w-button">View</Link>
          </div>
          <div className="w-col w-col-2">
            <Link to={`/account/tags/${publication[1]}`} className="button-secondary w-button">View</Link>
          </div>
          <div className="w-col w-col-1">
            <div onClick={this.handleDeleteClick(publication)} className="button-secondary _1x1"><img src={CrossImage} className="cross"/></div>
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
         <div className="content">
          <div className="content-body">
            <div className="general-header-2">
              <div>
                <h2 className="h2">My Publications</h2>
              </div>
              <Link to="/account/new" className="button-primary header-btn w-button">Create New Publication</Link>
            </div>
            <div className="div-block">
             { publications.size > 0 ?
                this.publicationTable(publications) :
                this.noPublicationsMessage
              }
            </div>
          </div>
        </div>
        <div className="widthraw">
          <div>
            <h2 className="h2">Account Funds</h2>
          </div>
          <div className="div-block-12">
            <p className="t4 funds">{funds ? funds : 0} GAS</p>
            <div onClick={this.handleWithdrawClick} className="button-secondary w-button">Withdraw</div>
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
