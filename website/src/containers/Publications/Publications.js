import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getNewPublications, getUserPublications } from '../../reducers/blockchain'
import './Publications.css';

import SearchImage from '../../images/search.svg'

export class Publications extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.getNewPublications()
  }

  componentWillReceiveProps(nextProps) {

  }

  publicationTable(publications) {
    const array = []

    array.push(
      <div className="table-head w-row" id="header">
        <div className="w-col w-col-2">
          <p className="t3"></p>
        </div>
        <div className="w-col w-col-3">
          <p className="t3 heading">Website</p>
        </div>
        <div className="w-col w-col-2">
          <p className="t3 heading">Category</p>
        </div>
        <div className="w-col w-col-2">
          <p className="t3 heading">Auction</p>
        </div>
        <div className="w-col w-col-2"></div>
        <div className="w-col w-col-1"></div>
      </div>
    )

    publications.forEach((publication, idx) => {
      array.push(
        <div className="table-body w-row" id={idx}>
          <div className="w-col w-col-2">
            <p className="t3">{publication[1]}</p>
          </div>
          <div className="w-col w-col-3">
            <p className="t7">{publication[2]}</p>
          </div>
          <div className="w-col w-col-2">
            <p className="t7">{publication[3]}</p>
          </div>
          <div className="w-col w-col-2">
            <Link to={`/publications/${publication[0]}/${publication[1]}`} className="button-secondary w-button">View</Link>
          </div>
          <div className="w-col w-col-2"></div>
          <div className="w-col w-col-1"></div>
        </div>
      )
    })

    return array
  }

  render() {
    const { publications } = this.props

    return (
    <div className="content">
        <div className="content-body">
          <div className="general-header">
            <div>
              <h2 className="h2">Publisher Network</h2>
            </div>
            <div className="search-form w-form">
              <form id="email-form" name="email-form" data-name="Email Form" className="search-form">
                <div className="div-block-4">
                  <div className="div-block-2">
                    <img src={SearchImage} className="image-5"/>
                    <input 
                      type="text" 
                      className="t4 field search w-input" 
                      maxlength="256" name="search" 
                      data-name="search" 
                      placeholder="Search..." 
                      id="search" 
                      required=""
                      />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="table">
            {this.publicationTable(publications)}
          </div>
        </div>
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
