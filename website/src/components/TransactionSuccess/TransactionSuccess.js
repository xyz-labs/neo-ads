import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ConfirmedImage from '../../images/confirmed.svg'
import './TransactionSuccess.css';

class TransactionSuccess extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { message, backURL, neoscanURL } = this.props

    return (
      <div className="home-container"><img src={ConfirmedImage} className="image-4"/>
        <div className="context process">
          <p className="t2 blue">{message}</p>
          <div className="div-block-11">
            <Link to={neoscanURL} className="button-primary w-button">View Transaction</Link>
            <Link to={`/${backURL}`} className="button-secondary back w-button">Back‍</Link>
          </div>
        </div>
      </div>
    );
  }
}

TransactionSuccess.propTypes = {
  message: PropTypes.string,
  backURL: PropTypes.string,
  neoscanURL: PropTypes.string
};

export default TransactionSuccess;
