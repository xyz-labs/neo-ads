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

    const args = ["AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y", name, date, this.state.adURL, imageUrlArray.join()]
    const invocationObject = createInvokeObject('placeBid', args, this.state.bid)

    this.props.sendInvoke(invocationObject)
  }

  render() {
    return (
      <div className="Bid">
        Bid
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
