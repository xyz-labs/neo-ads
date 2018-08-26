import React, { Component } from 'react';
import Neon, { rpc, u } from '@cityofzion/neon-js';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendInvoke } from '../../reducers/neolink';
import { createInvokeObject, testInvokeContract } from '../../lib/neon';
import CookieTrail from '../../components/CookieTrail/CookieTrail';
import './NewPublication.css';

const cookieItems = [
  {
    name: 'Account',
    link: '/account'
  },
  {
    name: 'New Publication',
    link: '/account/new'
  }
]

export class NewPublication extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      url: '',
      category: '',
      cookie: cookieItems
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(name) {
    return (e) => {
      return this.setState({
        [name]: e.target.value
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { name, url, category } = this.state
    const { address } = this.props

    const args = [address, name, url, category]
    const invocationObject = createInvokeObject('createPublication', args)

    this.props.sendInvoke(invocationObject)
  }

  render() {
    const { hasSubmitted, txid } = this.props

    return (
      <div className="content">
        <div className="content-body">
          <div className="general-header-2 w-clearfix">
            <CookieTrail 
                items={this.state.cookie}
              />
              <h2 className="h2">Create a new publication</h2>
            </div>
          </div>
          <div className="w-form">
            <form id="email-form" name="email-form" data-name="Email Form" onSubmit={this.handleSubmit}>
              <div className="div-block-4">
                <label htmlFor="name" className="t1">Publication Name</label>
                <div className="div-block-2">
                  <input 
                      type="text" 
                      className="t4 field w-input" 
                      maxLength="256" 
                      placeholder="Name" 
                      required=""
                      onChange={this.handleChange('name')}
                      value={this.state.name} 
                    />
                </div>
              </div>
              <div className="div-block-4">
                <label htmlFor="name" className="t1">Website URL</label>
                <div className="div-block-2">
                  <input 
                    type="text" 
                    className="t4 field w-input" 
                    maxLength="256" 
                    placeholder="https://" 
                    id="ad-url" 
                    required=""
                    onChange={this.handleChange('url')}
                    value={this.state.url} 
                  />
                </div>
              </div>
              <div className="div-block-4">
                <label htmlFor="name" className="t1">Category</label>
                <div className="div-block-2 drop-down">
                  <select 
                    id="field" 
                    name="field" 
                    required="" 
                    className="select-field w-select" 
                    onChange={this.handleChange('category')
                    }>
                    <option value="">Select one...</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Technology">Technology</option>
                    <option value="News">News</option>
                    <option value="Finance">Finance</option>
                    <option value="Business">Business</option>
                    <option value="Politics">Politics</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div><input type="submit" value="Create Publication" data-wait="Please wait..." className="button-primary w-button"/></form>
          </div>
          { hasSubmitted ? 
            (<Redirect to={{
                pathname: '/success',
                state: { referrer: '/account', message: 'New Publication Submitted', txid: txid }
              }} />
            ) :
            null }
      </div>
    );
  }
}

NewPublication.propTypes = {
  sendInvoke: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    address: state.getIn(['neolink', 'address']),
    hasSubmitted: state.getIn(['neolink', 'hasSubmitted']),
    txid: state.getIn(['neolink', 'transactionID'])
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
