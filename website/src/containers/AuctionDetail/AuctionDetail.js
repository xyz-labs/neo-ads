import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getAuctionDetail } from '../../reducers/blockchain';
import './AuctionDetail.css';

export class AuctionDetail extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.getAuctionDetail(this.props.match.params)
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="AuctionDetail">
      </div>
    );
  }
}

AuctionDetail.propTypes = {
  auctionDetail: PropTypes.instanceOf(Immutable.List),
  getAuctionDetail: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    auction: state.getIn(['blockchain', 'activeAuction'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAuctionDetail: (data) => {
      return dispatch(getAuctionDetail(data))
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AuctionDetail);
