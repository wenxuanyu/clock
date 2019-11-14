import React, { Component } from 'react';
import './App.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      inputMinute: '',
      inputSecond: '',
      tick: false
    }
    this.intervalId = 0;
    this.handleMinute = this.handleMinute.bind(this);
    this.handleSecond = this.handleSecond.bind(this);
    this.start = this.start.bind(this);
    this.setTime = this.setTime.bind(this);
    this.clearTime = this.clearTime.bind(this);
    this.stop = this.stop.bind(this);
  }

  handleMinute = (event) => {
    this.setState({ inputMinute: event.target.value });
  }

  handleSecond = (event) => {
    this.setState({ inputSecond: event.target.value });
  }

  setTime = () => {
    let m = 0;
    let s = 0;   
    if (this.state.inputMinute) { m = parseInt(this.state.inputMinute); }
    if (this.state.inputSecond) { s = parseInt(this.state.inputSecond); }
    if (Number.isNaN(m) || Number.isNaN(s)){alert('input error')}
    this.setState({
      time: m * 60 + s,
    });
  }

  clearTime = () => {
    clearInterval(this.intervalId);
    this.setState({
      inputMinute: '',
      inputSecond: '',
      time: 0,
      tick: false
    });
  }

  start() {
    if (!this.state.ticking) {
      this.intervalId = setInterval(() => {
        if (this.state.time > 0) {
          this.setState({
            time: this.state.time - 1,
            tick: true
          });
        }
      }, 1000);
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.setState({ tick: false });
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timeFormat(t) {
    let s = t % 60;
    let m = (t - t % 60) / 60;
    if (m < 10) { m = '0' + m; }
    if (s < 10) { s = '0' + s; }
    return m +':'+ s;
  }

  render() {
    return (
      <div className="app-outer">
        <h1>Countdown Clock</h1>
        <h3>Please input your time</h3>
        <input className="app-input" value={this.state.inputMinute} onChange={this.handleMinute} placeholder="Minute" />
        <input className="app-input" value={this.state.inputSecond} onChange={this.handleSecond} placeholder="Second" />
        <button className="app-button" type="button" onClick={this.setTime} >Set Time</button>
        <button className="app-button" type="button" onClick={this.clearTime} >Reset </button>
        <h1>{this.timeFormat(this.state.time)}</h1>
        <button className="app-button" type="button" onClick={this.start}> start</button>
        <button className="app-button" type="button" onClick={this.stop}> stop </button>
      </div>
    );
  }
}

export default Clock;
