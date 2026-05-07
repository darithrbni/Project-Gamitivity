import PauseIcon from "../assets/PauseIcon.png";
import ResumeIcon from "../assets/ResumeIcon.png";
import StopIcon from "../assets/StopIcon.png";

function StopwatchPage({
  setPage,

  stopwatchHours,
  stopwatchMinutes,
  stopwatchSeconds,

  isStopwatchRunning,
  setIsStopwatchRunning,

  setStopwatchHours,
  setStopwatchMinutes,
  setStopwatchSeconds,

  setHours,
  setMinutes,
  setSeconds,

  setActiveDisplay,
  setIsTimerRunning,
}) {
  return (
    <>
      {/* OVERLAY */}
      <div className="menu-overlay" onClick={() => setPage("main")} />

      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => setPage("timerMenu")}>
        BACK
      </button>

      {/* STOPWATCH LAYOUT */}
      <div className="menu-wrapper">
        <div className="timer-panel">
          {/* DISPLAY */}
          <div className="timer-display">
            <div className="time-column">
              <div className="stopwatch-time-part">
                {String(stopwatchHours).padStart(2, "0")}
              </div>
            </div>

            <span className="time-separator">:</span>

            <div className="time-column">
              <div className="stopwatch-time-part">
                {String(stopwatchMinutes).padStart(2, "0")}
              </div>
            </div>

            <span className="time-separator">:</span>

            <div className="time-column">
              <div className="stopwatch-time-part">
                {String(stopwatchSeconds).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* CONTROLS */}
          {!isStopwatchRunning &&
          stopwatchHours === 0 &&
          stopwatchMinutes === 0 &&
          stopwatchSeconds === 0 ? (
            <button
              className="set-timer-button"
              onClick={() => {
                // STOP TIMER
                setIsTimerRunning(false);
                setHours(0);
                setMinutes(0);
                setSeconds(0);
                setActiveDisplay("stopwatch");
                // START STOPWATCH
                setIsStopwatchRunning(true);
              }}
            >
              START
            </button>
          ) : (
            <div className="stopwatch-controls">
              <button
                className="timer-control-button"
                onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
              >
                <img
                  src={isStopwatchRunning ? PauseIcon : ResumeIcon}
                  alt="Stopwatch Control"
                  className="timer-control-icon"
                />
              </button>

              <button
                className="timer-control-button"
                onClick={() => {
                  setIsStopwatchRunning(false);

                  setStopwatchHours(0);
                  setStopwatchMinutes(0);
                  setStopwatchSeconds(0);
                }}
              >
                <img src={StopIcon} alt="Stop" className="timer-control-icon" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default StopwatchPage;
