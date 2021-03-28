import React, { Component } from "react";

let TIME_INTERVAL = 1000;
let WORK_CYCLES = 4;
let WORK_TIME = 25;
let BREAK_TIME = 5;
let LONG_BREAK_TIME = 25;


class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workCycles: WORK_CYCLES,

      isWorkTime: true,
      isLongBreakTime: false,
      isPaused: true,

      workSeconds: 0,
      workMinutes: WORK_TIME,

      breakSeconds: 0,
      breakMinutes: BREAK_TIME,

      longBreakSeconds: 0,
      longBreakMinutes: LONG_BREAK_TIME,
    };

    this.startLongBreakTimer = this.startLongBreakTimer.bind(this);
    this.startBreakAndPause = this.startBreakAndPause.bind(this);
    this.startWorkAndPause = this.startWorkAndPause.bind(this);
    this.startWork = this.startWork.bind(this);
    this.startBreak = this.startBreak.bind(this);
    this.startWorkTimer = this.startWorkTimer.bind(this);
    this.startWorkTimer = this.startWorkTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.resetApp = this.resetApp.bind(this);
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

  static getDerivedStateFromProps() {
    return 1;
  }

  resetTimer() {
    this.setState({
      isPaused: true,

      workSeconds: 0,
      workMinutes: WORK_TIME,

      breakSeconds: 0,
      breakMinutes: BREAK_TIME,

      longBreakSeconds: 0,
      longBreakMinutes: LONG_BREAK_TIME,
    });

    this.clearAllTimers();
  }

  resetApp() {
    this.setState({
      workCycles: WORK_CYCLES,

      isWorkTime: true,
      isLongBreakTime: false,
      isPaused: true,

      workSeconds: 0,
      workMinutes: WORK_TIME,

      breakSeconds: 0,
      breakMinutes: BREAK_TIME,

      longBreakSeconds: 0,
      longBreakMinutes: LONG_BREAK_TIME,
    });

    this.clearAllTimers();
  }

  startWorkTimer() {
    clearInterval(this.workTimerInterval);
    this.unpauseTimer();
    this.workTimerInterval = setInterval(() => {
      if (!this.state.isPaused) {
        // When there are no seconds left
        // but as long as there are minutes left
        if (this.state.workMinutes > 0 && this.state.workSeconds === 0) {
          this.resetWorkSeconds();
          this.decrementWorkMinutes();

          // As long as there are seconds and minutes left
        } else if (this.state.workMinutes >= 0 && this.state.workSeconds > 0) {
          this.decrementWorkSeconds();

          // When the timer ends, switch to break timer
        } else if (this.state.workCycles > 1) {
          this.startBreak();
        } else {
          this.startLongBreak();
        }
      }
    }, TIME_INTERVAL);
  }

  startBreakTimer() {
    clearInterval(this.breakTimerInterval);
    this.unpauseTimer();
    this.breakTimerInterval = setInterval(() => {
      if (!this.state.isPaused) {
        // When there are no seconds left
        // but as long as there are minutes left
        if (this.state.breakMinutes > 0 && this.state.breakSeconds === 0) {
          this.resetBreakSeconds();
          this.decrementBreakMinutes();

          // As long as there are seconds and minutes left
        } else if (
          this.state.breakMinutes >= 0 &&
          this.state.breakSeconds > 0
        ) {
          this.decrementBreakSeconds();

          // When the timer ends, switch to work timer
        } else {
          this.startWork();
        }
      }
    }, TIME_INTERVAL);
  }

  startLongBreakTimer() {
    clearInterval(this.longBreakTimeInterval);
    this.unpauseTimer();
    this.longBreakTimeInterval = setInterval(() => {
      if (!this.state.isPaused) {
        // When there are no seconds left
        // but as long as there are minutes left
        if (
          this.state.longBreakMinutes > 0 &&
          this.state.longBreakSeconds === 0
        ) {
          this.resetLongBreakSeconds();
          this.decrementLongBreakMinutes();

          // As long as there are seconds and minutes left
        } else if (
          this.state.longBreakMinutes >= 0 &&
          this.state.longBreakSeconds > 0
        ) {
          this.decrementLongBreakSeconds();

          // When the timer ends, switch to work timer
        } else {
          this.resetApp();
          this.startWork();
        }
      }
    }, TIME_INTERVAL);
  }

  decrementWorkCycles() {
    this.setState({
      workCycles: this.state.workCycles - 1,
    });
  }

  unpauseTimer() {
    this.setState({
      isPaused: false,
    });
  }

  pauseTimer() {
    this.setState({
      isPaused: true,
    });

    this.clearAllTimers();
  }

  clearAllTimers() {
    clearInterval(this.longBreakTimeInterval);
    clearInterval(this.breakTimerInterval);
    clearInterval(this.workTimerInterval);
  }

  resetWorkSeconds() {
    if (this.state.workSeconds === 0) {
      this.setState({
        workSeconds: 59,
      });
    }
  }

  resetBreakSeconds() {
    if (this.state.breakSeconds === 0) {
      this.setState({
        breakSeconds: 59,
      });
    }
  }

  resetLongBreakSeconds() {
    if (this.state.breakSeconds === 0) {
      this.setState({
        longBreakSeconds: 59,
      });
    }
  }

  decrementWorkSeconds() {
    this.setState({
      workSeconds: this.state.workSeconds - 1,
    });
  }

  decrementLongBreakSeconds() {
    this.setState({
      longBreakSeconds: this.state.longBreakSeconds - 1,
    });
  }

  decrementBreakSeconds() {
    this.setState({
      breakSeconds: this.state.breakSeconds - 1,
    });
  }

  decrementWorkMinutes() {
    this.setState({
      workMinutes: this.state.workMinutes - 1,
    });
  }

  decrementBreakMinutes() {
    this.setState({
      breakMinutes: this.state.breakMinutes - 1,
    });
  }

  decrementLongBreakMinutes() {
    this.setState({
      longBreakMinutes: this.state.longBreakMinutes - 1,
    });
  }

  adjustDigitsFormat(num) {
    let format = num > 9 ? num : "0" + num;
    return format;
  }

  startWork() {
    this.setState({
      isWorkTime: true,
      isLongBreakTime: false,
      isPaused: true,

      workSeconds: 0,
      workMinutes: WORK_TIME,

      breakSeconds: 0,
      breakMinutes: BREAK_TIME,

      longBreakSeconds: 0,
      longBreakMinutes: LONG_BREAK_TIME,
    });

    this.clearAllTimers();
    this.startWorkTimer();
  }

  startBreak() {
    this.decrementWorkCycles();

    this.setState({
      isWorkTime: false,
      isLongBreakTime: false,
      isPaused: true,

      workSeconds: 0,
      workMinutes: WORK_TIME,

      breakSeconds: 0,
      breakMinutes: BREAK_TIME,

      longBreakSeconds: 0,
      longBreakMinutes: LONG_BREAK_TIME,
    });

    this.clearAllTimers();
    this.startBreakTimer();
  }

  startLongBreak() {
    this.setState({
      isWorkTime: false,
      isLongBreakTime: true,
      isPaused: true,

      workSeconds: 0,
      workMinutes: WORK_TIME,

      breakSeconds: 0,
      breakMinutes: BREAK_TIME,

      longBreakSeconds: 0,
      longBreakMinutes: LONG_BREAK_TIME,

      workCycles: WORK_CYCLES, // reset the number of work cycles
    });

    this.clearAllTimers();
    this.startLongBreakTimer();
  }

  startLongBreakAndPause() {
    this.resetTimer();
    this.setState({
      isWorkTime: false,
      isLongBreakTime: true,
    });
  }

  startWorkAndPause() {
    this.resetTimer();
    this.setState({
      isWorkTime: true,
      isLongBreakTime: false,
    });
    this.clearAllTimers();
  }

  startBreakAndPause() {
    this.resetTimer();
    this.setState({
      isWorkTime: false,
    });
    this.clearAllTimers();
  }

  render() {
    let minutesToDisplay;
    let secondsToDisplay;
    if (!this.state.isLongBreakTime && this.state.isWorkTime) {
      minutesToDisplay = this.adjustDigitsFormat(this.state.workMinutes);
      secondsToDisplay = this.adjustDigitsFormat(this.state.workSeconds);

    } else if (!this.state.isLongBreakTime && !this.state.isWorkTime) {
      minutesToDisplay = this.adjustDigitsFormat(this.state.breakMinutes);
      secondsToDisplay = this.adjustDigitsFormat(this.state.breakSeconds);
    
    } else {
      minutesToDisplay = this.adjustDigitsFormat(this.state.longBreakMinutes);
      secondsToDisplay = this.adjustDigitsFormat(this.state.longBreakSeconds);
    }

    let startButton;
    if (this.state.isPaused) {
      startButton = (
        <button
          onClick={() => {
            if (!this.state.isLongBreakTime && this.state.isWorkTime) {
              this.startWorkTimer();
            } else if (!this.state.isLongBreakTime && !this.state.isWorkTime) {
              this.startBreakTimer();
            } else {
              this.startLongBreakTimer();
            }
          }}
        >
          Start
        </button>
      );
    } else {
      startButton = <button onClick={this.pauseTimer}>Pause</button>;
    }

    let workButton;
    if (!this.state.isLongBreakTime && this.state.isWorkTime) {
      workButton = (
        <button
          onClick={() => {
            this.startBreakAndPause();
          }}
        >
          Short Break
        </button>
      );
    } else if (!this.state.isLongBreakTime && !this.state.isWorkTime) {
      workButton = (
        <button
          onClick={() => {
            this.startWorkAndPause();
          }}
        >
          Work
        </button>
      );
    } else {
      workButton = (
        <button
          onClick={() => {
            this.startWorkAndPause();
          }}
        >
          Work
        </button>
      );
    }

    let displayColour;
    if (!this.state.isLongBreakTime && this.state.isWorkTime) {
      displayColour = "#9c1c00";
    } else if (!this.state.isLongBreakTime && !this.state.isWorkTime) {
      displayColour = "#039054";
    } else {
      displayColour = "#003eb3";
    }
    return (
      <div>
        <div></div>
        <div>
          <h1 key={this.props.workMinutes} style={{ color: displayColour }}>
            {minutesToDisplay}:{secondsToDisplay}
          </h1>
        </div>
        <div>
          {startButton}

          <button onClick={this.resetTimer}>Reset Time</button>

          {workButton}

          <button
            onClick={() => {
              this.startLongBreakAndPause();
            }}
          >
            Long Break
          </button>
        </div>
        <div>
          <button onClick={this.resetApp}>Reset Pomodoro</button>
        </div>

        <div>
          {!this.state.isLongBreakTime ? (
            <h1>{this.state.workCycles} pomodoros left</h1>
          ) : (
            <h1>Pomodoro Complete!</h1>
          )}
        </div>

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

export default Timer;
