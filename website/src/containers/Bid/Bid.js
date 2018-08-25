import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getWinningBid } from '../../reducers/blockchain';
import { sendInvoke } from '../../reducers/neolink';
import { createInvokeObject } from '../../lib/neon';
import { u, wallet } from '@cityofzion/neon-js'
import dateformat from 'dateformat';
import './Bid.css';
import CookieTrail from '../../components/CookieTrail/CookieTrail';

export class Bid extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      bid: 0,
      adURL: '',
      imageURL_0: '',
      imageURL_1: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
          name: 'Bid',
          link: `/publications/${address}/${name}/${date}/bid`
        },
      ]
    })

    this.props.getWinningBid(this.props.match.params)
  }

  componentWillReceiveProps(nextProps) {

  }

  handleChange(name) {
    return (e) => {
      return this.setState({
        [name]: e.target.value
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    
    const { address, name, date } = this.props.match.params

    // not the nicest way to go about this
    const imageUrlArray = [this.state.imageURL_0, this.state.imageURL_1]

    const args = [wallet.getAddressFromScriptHash(u.reverseHex(address)), name, parseInt(date), this.state.adURL, imageUrlArray]
    console.log(args)
    const invocationObject = createInvokeObject('placeBid', args, this.state.bid)

    this.props.sendInvoke(invocationObject)
  }

  getDateHeading(date) {
    const newDate = new Date(date*1000) 
  
    return dateformat(newDate, 'mmmm dS, yyyy')
  }

  getMinimumGas(bid) {
    return bid.size > 0 ? bid.get(1).value / 100000000 : 0
  }

  render() {
    const { activeBid } = this.props
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
          </div>
          <div className="w-form">
            <form id="email-form" name="email-form" data-name="Email Form" onSubmit={this.handleSubmit}>
              <div className="div-block-4 gas"><label for="name" className="t1">Bid</label>
                <div className="div-block-2">
                  <input 
                    type="test" 
                    className="t4 field w-input" 
                    maxlength="256" 
                    name="bid" 
                    data-name="Bid" 
                    placeholder="0.00" 
                    id="bid" 
                    required=""
                    onChange={this.handleChange('bid')}
                    />
                  <div className="div-block-3">
                    <p className="t4 mark">GAS</p>
                  </div>
                </div><label for="name" id="bid-tag" className="t9 tag">Minimum {this.getMinimumGas(activeBid)} GAS</label></div>
              <div className="div-block-4"><label for="name" className="t1">Ad URL</label>
                <div className="div-block-2">
                <input 
                  type="text" 
                  className="t4 field w-input" 
                  maxlength="256" 
                  name="ad-url" 
                  data-name="Ad Url" 
                  placeholder="https://" 
                  id="ad-url" 
                  required=""
                  onChange={this.handleChange('adURL')}
                  />
                </div>
              </div>
              <div className="div-block-4"><label for="name" className="t1 listheading">Ad Image URLs</label>
                <div className="div-block-5">
                  <div className="div-block-6">
                    <div className="div-block-2">
                      <input 
                        type="text" 
                        className="t4 field w-input" 
                        maxlength="256" 
                        name="ad-url-2" 
                        data-name="Ad Url 2" 
                        placeholder="https://" 
                        id="ad-url-2" 
                        required=""
                        onChange={this.handleChange('imageURL_0')}
                        />
                    </div>
                    <label for="name" id="bid-tag" className="t9 tag">Leaderboard: 728px x 90px</label>
                  </div>
                  <div className="div-block-6">
                    <div className="div-block-2">
                      <input 
                        type="text" 
                        className="t4 field w-input" 
                        maxlength="256" 
                        name="ad-url-2" 
                        data-name="Ad Url 2" 
                        placeholder="https://" 
                        id="ad-url-2" 
                        required=""
                        onChange={this.handleChange('imageURL_1')}
                        />
                    </div>
                    <label for="name" id="bid-tag" className="t9 tag">Medium Rectangle (M-REC): 300px x 250px</label>
                  </div>
                </div>
              </div>
              <input 
                type="submit" 
                value="Place Bid" 
                data-wait="Please wait..." 
                className="button-primary submit w-button"
                />
              </form>
            </div>
          </div>
        </div>
    );
  }
}

Bid.propTypes = {
  address: PropTypes.string,
  activeBid: PropTypes.instanceOf(Immutable.List),
  sendInvoke: PropTypes.func,
  getWinningBid: PropTypes.func,
  match: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    address: state.getIn(['neolink', 'address']),
    activeBid: state.getIn(['blockchain', 'activeBid'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendInvoke: (data) => {
      return dispatch(sendInvoke(data))
    },
    getWinningBid: (data) => {
      return dispatch(getWinningBid(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bid);
