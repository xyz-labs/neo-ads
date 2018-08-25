import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import './Tags.css';

export class Tags extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: props.match.params.name 
    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="Tags">
      </div>
    );
  }
}

Tags.propTypes = {
  address: PropTypes.string,
  match: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    address: state.getIn(['neolink', 'address']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
