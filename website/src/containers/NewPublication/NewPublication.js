import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { sendInvoke } from '../../reducers/neolink';
import './NewPublication.css';

export class NewPublication extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    // const scriptHash = process.env.REACT_APP_SCRIPT_HASH;
    // const invocationObject = {
    //   scriptHash,
    //   operation: 'create',
    //   args: ['test.com'],
    //   assetType: 'GAS',
    //   assetAmount: 0.00000001,
    // };

    // this.props.sendInvoke(invocationObject)
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="NewPublication">
        NewPublication
      </div>
    );
  }
}

NewPublication.propTypes = {
  sendInvoke: PropTypes.func
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendInvoke: (data) => {
      return dispatch(sendInvoke(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPublication);
