import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimeRunning: false,
    timeInSeconds: 60,
    timeInMinutes: 25,
    timeLimit: 25,
  }

  onReset = () => {
    clearInterval(this.intervalID)
    this.setState({
      timeInSeconds: 60,
      timeInMinutes: 25,
      timeLimit: 25,
    })
  }

  onMinus = () => {
    const {timeLimit} = this.state
    this.setState({timeInMinutes: timeLimit, timeInSeconds: 60})
    this.setState(prevState => ({
      timeInMinutes: prevState.timeInMinutes - 1,
      timeLimit: prevState.timeLimit - 1,
    }))
  }

  onPlus = () => {
    const {timeLimit} = this.state
    this.setState({timeInMinutes: timeLimit, timeInSeconds: 60})
    this.setState(prevState => ({
      timeInMinutes: prevState.timeInMinutes + 1,
      timeLimit: prevState.timeLimit + 1,
    }))
  }

  onStartOrPause = () => {
    const {isTimeRunning} = this.state
    if (isTimeRunning === false) {
      this.intervalID = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.intervalID)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  tick = () => {
    const {timeInSeconds, timeInMinutes} = this.state
    if (timeInMinutes < 1) {
      clearInterval(this.intervalID)
      this.setState(prevState => ({
        timeInSeconds: 60,
        timeInMinutes: 0,
        isTimeRunning: !prevState.isTimeRunning,
      }))
    } else if (timeInSeconds > 0) {
      this.setState(prevState => ({timeInSeconds: prevState.timeInSeconds - 1}))
    } else {
      this.setState(prevState => ({
        timeInSeconds: 60,
        timeInMinutes: prevState.timeInMinutes - 1,
      }))
    }
  }

  render() {
    const {isTimeRunning, timeInSeconds, timeInMinutes, timeLimit} = this.state
    const timeElapsedSeconds = timeInSeconds === 60 ? 0 : timeInSeconds
    const seconds =
      timeElapsedSeconds > 9 ? timeElapsedSeconds : `0${timeElapsedSeconds}`
    const minutes = timeInMinutes > 9 ? timeInMinutes : `0${timeInMinutes}`
    const startOrPauseImageUrl = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimeRunning ? 'pause icon' : 'play icon'
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-time-container">
          <div className="time-container">
            <div className="time-show">
              <h1 className="time">
                {minutes}:{seconds}
              </h1>
              <p className="status">{isTimeRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="buttons-container">
            <div className="time-controller">
              <button
                className="btn-controller"
                type="button"
                onClick={this.onStartOrPause}
              >
                <img
                  src={startOrPauseImageUrl}
                  alt={startOrPauseAltText}
                  className="time-icon"
                />
                <p className="btn-text">{isTimeRunning ? 'Pause' : 'Start'}</p>
              </button>
              <button
                className="btn-controller"
                type="button"
                onClick={this.onReset}
                disabled={isTimeRunning}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="time-icon"
                />
                <p className="btn-text">Reset</p>
              </button>
            </div>
            <div className="limit-container">
              <p className="limit-heading">Set Timer Limit</p>
              <div className="btn-plus-or-minus">
                <button
                  className="btn-minus-plus"
                  type="button"
                  disabled={isTimeRunning}
                  onClick={this.onMinus}
                >
                  -
                </button>
                <div className="limit">
                  <p>{timeLimit}</p>
                </div>
                <button
                  className="btn-minus-plus"
                  type="button"
                  disabled={isTimeRunning}
                  onClick={this.onPlus}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
