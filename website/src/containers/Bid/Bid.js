import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getWinningBid } from '../../reducers/blockchain';
import { sendInvoke } from '../../reducers/neolink';
import { createInvokeObject } from '../../lib/neon';
import './Bid.css';

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

  handleSubmit() {
    const { address, name, date } = this.props.match.params

    // not the nicest way to go about this
    const imageUrlArray = [this.state.imageURL_0, this.state.imageURL_1, this.state.imageURL_2]

    const args = [address, name, date, this.state.adURL, imageUrlArray.join()]
    const invocationObject = createInvokeObject('placeBid', args, this.state.bid)

    this.props.sendInvoke(invocationObject)
  }

  render() {
    return (
      <div class="content">
        <div class="content-body">
          <div class="general-header-2 w-clearfix">
            <div>
              <h2 class="h2">August 26, 2018</h2>
            </div>
            <div class="cookie-trail"><a href="#" class="t5">Publications</a>
              <p class="t5">   &gt;  </p><a href="#" class="t5">Crypto Mag</a>
              <p class="t5">   &gt;  </p><a href="#" class="t5">Auction</a></div>
          </div>
          <div class="w-form">
            <form id="email-form" name="email-form" data-name="Email Form">
              <div class="div-block-4 gas"><label for="name" class="t1">Bid</label>
                <div class="div-block-2"><input type="text" class="t4 field w-input" maxlength="256" name="bid" data-name="Bid" placeholder="0.00" id="bid" required=""/>
                  <div class="div-block-3">
                    <p class="t4 mark">GAS</p>
                  </div>
                </div><label for="name" id="bid-tag" class="t9 tag">Minimum 32.5 GAS</label></div>
              <div class="div-block-4"><label for="name" class="t1">Ad URL</label>
                <div class="div-block-2"><input type="text" class="t4 field w-input" maxlength="256" name="ad-url" data-name="Ad Url" placeholder="https://" id="ad-url" required=""/></div>
              </div>
              <div class="div-block-4"><label for="name" class="t1 listheading">Ad Image URLs</label>
                <div class="div-block-5">
                  <div class="div-block-6">
                    <div class="div-block-2">
                      <input type="text" class="t4 field w-input" maxlength="256" name="ad-url-2" data-name="Ad Url 2" placeholder="https://" id="ad-url-2" required=""/>
                    </div>
                    <label for="name" id="bid-tag" class="t9 tag">Leaderboard: 728px x 90px</label>
                  </div>
                  <div class="div-block-6">
                    <div class="div-block-2">
                      <input type="text" class="t4 field w-input" maxlength="256" name="ad-url-2" data-name="Ad Url 2" placeholder="https://" id="ad-url-2" required=""/>
                    </div>
                    <label for="name" id="bid-tag" class="t9 tag">Medium Rectangle (M-REC): 300px x 250px</label>
                  </div>
                </div>
              </div>
              <input type="submit" value="Place Bid" data-wait="Please wait..." class="button-primary submit w-button"/>
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
