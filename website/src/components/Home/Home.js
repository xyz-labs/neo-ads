import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LogoWImage from '../../images/logo-w.svg';
import LogoBImage from '../../images/logo-b.svg';

import './Home.css';

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hasClickedButton: false
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  get homeOne() {
    return (
      <div className="div-block-10">
        <h1 className="h1">Neo Ads</h1>
        <h1 className="h3 hero-sub">Decentralized Advertising Network</h1>
        <div onClick={this.handleButtonClick} className="button-primary hero w-button">Get Started</div>
      </div>
    )
  }

  get homeTwo() {
    return (
      <div className="div-block-10">
        <h1 className="h3 hero-sub _2">Are you an advertiser or publisher?</h1>
          <div className="context hero-content">
            <div className="row-2 w-row">
              <div className="column-3 w-col w-col-6">
                <Link to="/publications" className="link-block-2 w-inline-block">
                  <div className="div-block-7">
                    <div className="div-block-8"><img src={LogoWImage} className="image"/></div>
                    <div className="div-block-9">
                      <p className="h3 white">Advertiser</p>
                      <p className="t7 white">I want to advertise my brand</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="column-4 w-col w-col-6">
                <Link to="/account" className="link-block-2 w-inline-block">
                  <div className="div-block-7 pub">
                    <div className="div-block-8"><img src={LogoBImage} className="image"/></div>
                    <div className="div-block-9">
                      <p className="h3 blue">Publisher</p>
                      <p className="t7 blue">I want to rent ad space on my website</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
    )
  }

  handleButtonClick() {
    this.setState({
      hasClickedButton: true
    })
  }

  render() {
    return (
      <div className="home-container home">
        <div className="heading">
            {this.state.hasClickedButton ?
              this.homeTwo :
              this.homeOne
            }
        </div>
      </div>
    );
  }
}

Home.propTypes = {

};

export default Home;
