import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ConfirmedImage from '../../images/confirmed.svg';
import { resetTransaction } from '../../reducers/neolink'
import './TransactionSuccess.css';

class TransactionSuccess extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      txid: props.location.state.txid
    }
  }

  componentWillMount() {
    this.props.resetTransaction()
  }

  render() {
    const { message, referrer } = this.props.location.state
    const { txid } = this.state.txid
    const neoscanBase = process.env.REACT_APP_NEOSCAN_BASE

    return (
      <div className="home-container"><img src={ConfirmedImage} className="image-4"/>
        <div className="context process">
          <p className="t2 blue">{message}</p>
          <div className="div-block-11">
            <a href={`${neoscanBase}/transaction/${txid}`} className="button-primary w-button" target="_blank">View Transaction</a>
            <Link to={referrer} className="button-secondary back w-button">Back‍</Link>
          </div>
        </div>
      </div>
    );
  }
}

TransactionSuccess.propTypes = {
  location: PropTypes.object,
  resetTransaction: PropTypes.func
};

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetTransaction: () => {
      return dispatch(resetTransaction())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionSuccess);

