import React, { Component } from "react";
import Timer from "../timer/Timer";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workMinutes: 25,
      breakMinutes: 5,
      longBreakMinutes: 15,
      workCycles: 4,
    };

    this.updateWorkMinutes = this.updateWorkMinutes.bind(this);
    this.updateWorkCycles = this.updateWorkCycles.bind(this);
    this.updateBreakMinutes = this.updateBreakMinutes.bind(this);
    this.updateLongBreakMinutes = this.updateLongBreakMinutes.bind(this);
  }

  updateWorkMinutes(min) {
    this.setState({
      workMinutes: min.target.value,
    });
  }

  updateBreakMinutes(min) {
    this.setState({
      breakMinutes: min.target.value,
    });
  }

  updateLongBreakMinutes(min) {
    this.setState({
      longBreakMinutes: min.target.value,
    });
  }

  updateWorkCycles(cycles) {
    this.setState({
      workCycles: cycles.target.value,
    });
  }

  render() {
    return (
      <div>
        <Timer
          workMinutes={this.state.workMinutes}
          breakMinutes={this.state.breakMinutes}
          longBreakMinutes={this.state.longBreakMinutes}
          workCycles={this.state.workCycles}
        />

        <div>
          <h2>Settings:</h2>
        </div>

        <div>
          <div>
            <div>
              <div>
                <form>
                  <label>Work interval duration: </label>
                  <select 
                  onChange={this.updateWorkMinutes} >
                    <option value="25">25 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="35">35 minutes</option>
                    <option value="40">40 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="50">50 minutes</option>
                    <option value="55">55 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                    <option value="120">120 minutes</option>
                  </select>
                </form>
              </div>
              <div>
                minutes: {this.state.workMinutes}
              </div>

              <div>
                <form>
                  <label>Short break duration: </label>
                  <select onChange={this.updateBreakMinutes}>
                    <option value="5">5 minutes</option>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes</option>
                  </select>
                </form>
              </div>

              <div>
                <label>Long break duration: </label>
                <select  onChange={this.updateLongBreakMinutes}>
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="25">25 minutes</option>
                  <option value="30">30 minutes</option>
                </select>
              </div>

              <div>
                <label>Long break after: </label>
                <select  onChange={this.updateWorkCycles}>
                  <option value="1">1 pomodoro</option>
                  <option value="2">2 pomodoros</option>
                  <option value="3">3 pomodoros</option>
                  <option value="4">4 pomodoros</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
