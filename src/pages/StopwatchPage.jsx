import PauseIcon from "../assets/PauseIcon.png";
import ResumeIcon from "../assets/ResumeIcon.png";
import StopIcon from "../assets/StopIcon.png";
import IconBackMenu from "../assets/IconBackMenu.png";

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

  setBasicTimerHours,
  setBasicTimerMinutes,
  setBasicTimerSeconds,
  setActiveDisplay,
  setIsBasicTimerRunning,

  setPomodoroHours,
  setPomodoroMinutes,
  setPomodoroSeconds,
  setIsPomodoroRunning,

  setCoins,
}) {
  return (
    <>
      {/* OVERLAY */}
      <div className="menu-overlay" onClick={() => setPage("main")} />

      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => setPage("timerMenu")}>
        <img src={IconBackMenu} alt="Back" className="back-button-icon" />
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
                // STOP BASIC TIMER
                setIsBasicTimerRunning(false);
                setBasicTimerHours(0);
                setBasicTimerMinutes(0);
                setBasicTimerSeconds(0);
                setActiveDisplay("stopwatch");

                // STOP POMODORO
                setIsPomodoroRunning(false);
                setPomodoroHours(0);
                setPomodoroMinutes(0);
                setPomodoroSeconds(0);

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
                  // GIVE REWARD
                  if (
                    stopwatchHours > 0 ||
                    stopwatchMinutes > 0 ||
                    stopwatchSeconds > 0
                  ) {
                    setCoins((prev) => prev + 100);
                  }

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
