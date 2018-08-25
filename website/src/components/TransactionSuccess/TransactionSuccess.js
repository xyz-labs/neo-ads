import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Confirmed from '../../images/confirmed.svg'
import './TransactionSuccess.css';

class TransactionSuccess extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { message, backURL, neoscanURL } = this.props

    return (
      <div class="home-container"><img src={Confirmed} class="image-4"/>
        <div class="context process">
          <p class="t2 blue">{message}</p>
          <div class="div-block-11">
            <Link to={neoscanURL} class="button-primary w-button">View Transaction</Link>
            <Link to={`/${backURL}`} class="button-secondary back w-button">Back‍</Link>
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
