import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWarpedTime } from '../../reducers/blockchain';
import { sendInvoke } from '../../reducers/neolink';
import { createInvokeObject } from '../../lib/neon'
import './TimeMachine.css';

Date.prototype.monthNames = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"
];

Date.prototype.getMonthName = function() {
  return this.monthNames[this.getMonth()];
};

export class TimeMachine extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      daysForward: 0
    }

    this.handleDaysChange = this.handleDaysChange.bind(this)
    this.handleTimeWarp = this.handleTimeWarp.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  componentWillMount() {
    this.props.getWarpedTime()
  }

  componentWillReceiveProps(nextProps) {

  }

  handleDaysChange(e) {
    this.setState({
      daysForward: e.target.value
    })
  }

  handleTimeWarp() {
    const args = [parseInt(this.state.daysForward)]
    const invocationObject = createInvokeObject('setTimeMachine', args)

    this.props.sendInvoke(invocationObject)
  }

  handleReset() {
    const invocationObject = createInvokeObject('resetTimeMachine', [])

    this.props.sendInvoke(invocationObject)
  }

  render() {
    const { warpedTime, hasSubmitted, txid } = this.props
    const date = new Date(warpedTime * 1000)

    return (
      <div className="content">
        <div className="content-body">
          <div className="general-header-2 w-clearfix">
            <div>
              <h2 className="h2">Smart contract time machine</h2>
            </div>
          </div>
          <div className="w-form">
            <div>
              <div classNames="div-block-4"><label htmlFor="name" className="t1">Current Contract Time </label>
              <div className="time-machine-6">
                <div className="div-block-2 time-machine-1">
                  <div className="time-machine-2 t4">{date.getDate()}</div>
                </div>
              <div className="time-machine-1 div-block-2">
                <div className="time-machine-2 t4">{date.getMonthName()}</div>
              </div>
              <div className="time-machine-3 div-block-2"><div className="time-machine-2 t4">{date.getFullYear()}</div>
              </div>
            </div>
          </div>
          <div className="div-block-4 gas time-machine-7"><label htmlFor="name" className="t1">Move Date Forward</label>
            <div className="div-block-2 time-machine-4">
              <input 
                type="number" 
                className="t4 field w-input" 
                maxlength="256" 
                name="bid" 
                data-name="time" 
                placeholder="0" 
                id="time"
                required=""
                onChange={this.handleDaysChange}
                />
              <div className="div-block-3">
                <p className="t4 mark">Days</p>
              </div>
            </div>
          </div>
          <div className="div-block-11 time-machine-5">
            <div className="button-primary w-button" onClick={this.handleTimeWarp}>Warp Time</div><div className="button-secondary back w-button" onClick={this.handleReset}>Reset Date</div>
          </div>
        </div>
      </div>
    </div>
        { hasSubmitted ? 
            (<Redirect to={{
                pathname: '/success',
                state: { referrer: '/admin/time_machine', message: 'Successfully submitted', txid: txid }
              }} />
            ) :
            null }
      </div>
    );
  }
}

TimeMachine.propTypes = {
  hasSubmitted: PropTypes.bool,
  txid: PropTypes.string,
  warpedTime: PropTypes.string,
  getWarpedTime: PropTypes.func,
  sendInvoke: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    warpedTime: state.getIn(['blockchain', 'warpedTime']),
    hasSubmitted: state.getIn(['neolink', 'hasSubmitted']),
    txid: state.getIn(['neolink', 'transactionID'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWarpedTime: () => {
      return dispatch(getWarpedTime())
    },
    sendInvoke: (data) => {
      return dispatch(sendInvoke(data))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeMachine);
