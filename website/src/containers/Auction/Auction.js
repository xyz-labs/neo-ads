import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Redirect } from 'react-router-dom';
import Calendar from 'react-calendar/dist/entry.nostyle';
import CookieTrail from '../../components/CookieTrail/CookieTrail';
import { connect } from 'react-redux';
import { getAuction } from '../../reducers/blockchain'
import { getStartOfMonth } from '../../lib/utils';
import './Auction.css';

import NextImage from '../../images/NA-arrow-right.png'
import PrevImage from '../../images/NA-arrow-left.png'

export class Auction extends Component {
  constructor(props, context) {
    super(props, context);

    let date = new Date();
    
    this.state = {
      cookieItems: [],
      activeFirstDate: getStartOfMonth(date),
      activeMonth: date.getMonth(),
      redirect: false,
      dateClicked: null
    }

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleMonthClick = this.handleMonthClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.getTileClassNames = this.getTileClassNames.bind(this);
    this.getGasByDate = this.getGasByDate.bind(this);
    this.checkValidItem = this.checkValidItem.bind(this);
  }

  componentWillMount() {
    const { name, address } = this.props.match.params
    const date = this.state.activeFirstDate.getTime() / 1000

    this.setState({
      cookieItems: [
        {
          name: 'Publications',
          link: '/publications'
        },
        {
          name: name,
          link: `/publications/${address}/${name}`
        }
      ]
    })

    this.props.getAuction({name, address, date})
  }

  componentWillReceiveProps(nextProps) {

  }

  get nextLabel() {
    return <img src={NextImage} className="arrow-img"/>
  }

  get prevLabel() {
    return <img src={PrevImage} className="arrow-img"/>
  }


  handleDayClick(date) {
    this.setState({
      dateClicked: (date.getTime() / 1000),
      redirect: true
    })
  }

  handleMonthClick(date) {
    const { name, address } = this.props.match.params
    const startOfMonth = getStartOfMonth(date)
    const unix = startOfMonth.getTime() / 1000

    this.setState({
      activeFirstDate: startOfMonth
    })

    this.props.getAuction({name, address, date: unix})
  }

  handleDateChange({activeStartDate}) {
    const { name, address } = this.props.match.params
    const startOfMonth = getStartOfMonth(activeStartDate)
    const unix = startOfMonth.getTime() / 1000

    this.setState({
      activeFirstDate: startOfMonth
    })

    this.props.getAuction({name, address, date: unix})
  }

  getTileClassNames({date, view}) {
    const { auction, isLoading } = this.props

    var classnames = []
    const timeNow = new Date()

    if (timeNow > date && view == 'month') {
      classnames.push('react-calendar__tile-ended')
    }

    const item = auction && auction.get(date.getDate())

    return classnames
  }

  getGasByDate({date, view}) {
    const { auction, isLoading } = this.props
    const item = auction && auction.get(date.getDate() - 1)
    
    if (!this.checkValidItem(item, date)) return <div className="react-calendar_price-false">0 GAS</div>

    const gasAmount = item.value[1].value / 100000000

    return <div className="react-calendar_price-true">{gasAmount} GAS</div>
  }

  checkValidItem(item, date) {
    if (!item) return false
    
    if (item.value.length < 1) return false
    
    if (date.getMonth() != this.state.activeMonth) return false

    if (this.props.isLoading) return false

    return true
  }

  render() {
    const { name, address } = this.props.match.params

    return (
      <div className="content">
        <div className="content-body">
          <div className="general-header-2 w-clearfix">
            <div>
              <h2 className="h2">Select a day to bid on</h2>
            </div>
            <CookieTrail
                items={this.state.cookieItems} 
              />
            <Calendar
                onClickDay={this.handleDayClick}
                onClickMonth={this.handleMonthClick}
                tileContent={this.getGasByDate}
                onActiveDateChange={this.handleDateChange}
                nextLabel={this.nextLabel}
                prevLabel={this.prevLabel}
                tileClassName={this.getTileClassNames}
              />
          </div>
        </div>
        {this.state.redirect ? <Redirect to={`/publications/${address}/${name}/${this.state.dateClicked}`}/> : null}
      </div>
    );
  }
}

Auction.propTypes = {
  match: PropTypes.object,
  auction: PropTypes.instanceOf(Immutable.List),
  getAuction: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    auction: state.getIn(['blockchain', 'activeAuction']),
    isLoading: state.getIn(['blockchain', 'isLoading'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAuction: (data) => {
      return dispatch(getAuction(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auction);
