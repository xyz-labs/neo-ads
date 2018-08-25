import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { getWarpedTime } from '../../reducers/blockchain';
import { sendInvoke } from '../../reducers/neolink';
import { createInvokeObject } from '../../lib/neon'
import './TimeMachine.css';

export class TimeMachine extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      daysForward: 0
    }

    this.handleDaysChange = this.handleDaysChange.bind(this)
    this.handleTimeWarp = this.handleTimeWarp.bind(this)
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
    const args = [this.state.daysForward]
    const invocationObject = createInvokeObject('setTimeMachine', args)

    this.props.sendInvoke(invocationObject)
  }

  render() {
    console.log(this.props)
    return (
      <div class="content">
        <div class="content-body">
          <div class="general-header-2 w-clearfix">
            <div>
              <h2 class="h2">Smart contract time machine</h2>
            </div>
          </div>
          <div class="w-form">
            <div>
              <div clasNames="div-block-4"><label htmlFor="name" class="t1">Current Contract Time </label>
              <div className="time-machine-6">
                <div className="div-block-2 time-machine-1">
                  <div className="time-machine-2 t4">26</div>
                </div>
              <div className="time-machine-1 div-block-2">
                <div className="time-machine-2 t4">August</div>
              </div>
              <div className="time-machine-3 div-block-2"><div className="time-machine-2 t4">2018</div>
              </div>
            </div>
          </div>
          <div className="div-block-4 gas"><label for="name" className="t1">Move Date Forward</label>
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
            <a href="#" className="button-primary w-button">Warp Time</a><a href="#" className="button-secondary back w-button">Reset Date</a>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

TimeMachine.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    warpedTime: state.getIn(['blockchain', 'warpedTime'])
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
