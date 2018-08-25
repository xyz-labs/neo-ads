import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getNewPublications, getUserPublications } from '../../reducers/blockchain'
import './Publications.css';

export class Publications extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.getNewPublications()
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="Publications">
        Pub
      </div>
    );
  }
}

Publications.propTypes = {
  publications: PropTypes.instanceOf(Immutable.List),
  getUserPublications: PropTypes.func,
  getNewPublications: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    publications: state.getIn(['blockchain', 'activePublicationList'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserPublications: (address) => {
      return dispatch(getUserPublications(address))
    },
    getNewPublications: () => {
      return dispatch(getNewPublications())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Publications);
