import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dateformat from 'dateformat';
import { u, wallet } from '@cityofzion/neon-js'
import { getAuctionDetail } from '../../reducers/blockchain';
import CookieTrail from '../../components/CookieTrail/CookieTrail';
import './AuctionDetail.css';

export class AuctionDetail extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cookieItems: []
    }
  }

  componentWillMount() {
    const { name, address, date } = this.props.match.params

    this.setState({
      cookieItems: [
        {
          name: 'Publications',
          link: '/publications'
        },
        {
          name: name,
          link: `/publications/${address}/${name}`
        },
        {
          name: 'Auction',
          link: `/publications/${address}/${name}/${date}`
        },
      ]
    })

    this.props.getAuctionDetail(this.props.match.params)
  }

  componentWillReceiveProps(nextProps) {

  }


  bidTable(auctionDetail) {
    const array = []

    array.push(
      <div className="table-head w-row" key="header">
        <div className="col1 w-col w-col-1">
          <p className="t3 heading">Rank</p>
        </div>
        <div className="bid-offset w-col w-col-2">
          <p className="t3 heading">Bid</p>
        </div>
        <div className="w-col w-col-2">
          <p className="t3 heading">Address</p>
        </div>
        <div className="w-col w-col-5"></div>
        <div className="w-col w-col-1"></div>
        <div className="w-col w-col-1"></div>
      </div>
    )

    auctionDetail.forEach((bid, idx) => {
      const gasAmount = bid.value[1].value / 100000000
      const address = wallet.getAddressFromScriptHash(u.reverseHex(bid.value[0].value))
      const subHash = address.substr(0,4) + '....' + address.substr(29,4)

      array.push(
        <div className="table-body w-row" key={idx}>
          <div className="col1 w-col w-col-1">
            <p className="t3">{idx + 1}</p>
          </div>
          <div className="bid-offset w-col w-col-2">
            <p className="t7">{gasAmount} GAS</p>
          </div>
          <div className="w-col w-col-2">
            <p className="t7">{subHash}</p>
          </div>
          <div className="w-col w-col-5"></div>
          <div className="w-col w-col-1"></div>
          <div className="w-col w-col-1"></div>
        </div>
      )
    })

    return array
  }
  
  getDateHeading(date) {
    const newDate = new Date(date*1000) 
  
    return dateformat(newDate, 'mmmm dS, yyyy')
  }

  render() {
    const { auctionDetail } = this.props
    const { name, address, date } = this.props.match.params

    return (
      <div className="content">
        <div className="content-body">
          <div className="general-header-2 w-clearfix">
            <div>
              <h2 className="h2">{this.getDateHeading(date)}</h2>
            </div>
            <CookieTrail 
              items={this.state.cookieItems}
              />
            <Link to={`/publications/${address}/${name}/${date}/bid`} className="button-primary header-btn w-button">Place Bid</Link>
          </div>
          <div className="table">
            {this.bidTable(auctionDetail)}
          </div>
        </div>
      </div>
    );
  }
}

AuctionDetail.propTypes = {
  auctionDetail: PropTypes.instanceOf(Immutable.List),
  getAuctionDetail: PropTypes.func,
  match: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    auctionDetail: state.getIn(['blockchain', 'activeAuctionDetail'])
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
