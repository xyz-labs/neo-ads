import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getAuction } from '../../reducers/blockchain'
import './Auction.css';

export class Auction extends Component {
  constructor(props, context) {
    super(props, context);
    
  }

  componentWillMount() {
    this.props.getAuction(this.props.match.params)
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="Auction">
        Auction
      </div>
    );
  }
}

Auction.propTypes = {
  auction: PropTypes.instanceOf(Immutable.List),
  getAuction: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    auction: state.getIn(['blockchain', 'activeAuction'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAuction: (data) => {
      return dispatch(getAuction(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auction);
