import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import './CookieTrail.css';

const CookieTrail = ({ items }) => {

  const mapItems = items.map((item, idx) => {
    return (
      <Link key={idx} to={item.link} className="t5 cookie-trail-item">
        {item.name} &gt;
      </Link>
    )
  });

  return (
    <div className="cookie-trail">
      {mapItems}
    </div>
  )
}

CookieTrail.propTypes = {
  items: PropTypes.array.isRequired
};

export default CookieTrail;
