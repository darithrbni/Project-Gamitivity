import { useEffect, useState } from "react";

import PauseIcon from "../assets/PauseIcon.png";
import ResumeIcon from "../assets/ResumeIcon.png";
import StopIcon from "../assets/StopIcon.png";

function TimerDisplay({
  activeDisplay,

  basicTimerHours,
  basicTimerMinutes,
  basicTimerSeconds,
  isBasicTimerRunning,
  setIsBasicTimerRunning,
  setBasicTimerHours,
  setBasicTimerMinutes,
  setBasicTimerSeconds,

  stopwatchHours,
  stopwatchMinutes,
  stopwatchSeconds,
  isStopwatchRunning,
  setIsStopwatchRunning,
  setStopwatchHours,
  setStopwatchMinutes,
  setStopwatchSeconds,

  pomodoroHours,
  pomodoroMinutes,
  pomodoroSeconds,
  pomodoroPhase,
  isPomodoroRunning,
  setIsPomodoroRunning,
  setPomodoroHours,
  setPomodoroMinutes,
  setPomodoroSeconds,
  setCurrentPomodoroSession,
  setPomodoroPhase,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const realHours = String(currentTime.getHours()).padStart(2, "0");

  const realMinutes = String(currentTime.getMinutes()).padStart(2, "0");

  const realSeconds = String(currentTime.getSeconds()).padStart(2, "0");

  const isRealtimeClock =
    // BASIC TIMER IDLE
    (activeDisplay === "basicTimer" &&
      basicTimerHours === 0 &&
      basicTimerMinutes === 0 &&
      basicTimerSeconds === 0 &&
      !isBasicTimerRunning) ||
    // STOPWATCH IDLE
    (activeDisplay === "stopwatch" &&
      stopwatchHours === 0 &&
      stopwatchMinutes === 0 &&
      stopwatchSeconds === 0 &&
      !isStopwatchRunning) ||
    // POMODORO IDLE
    (activeDisplay === "pomodoro" &&
      pomodoroHours === 0 &&
      pomodoroMinutes === 0 &&
      pomodoroSeconds === 0 &&
      !isPomodoroRunning);
  return (
    <>
      <div
        className={
          isRealtimeClock
            ? "main-timer-wrapper realtime-mode"
            : "main-timer-wrapper timer-mode"
        }
      >
        <div className="main-timer-container">
          <div className="main-timer-display">
            {(activeDisplay === "basicTimer" || isRealtimeClock) && (
              <>
                <div className="clock-content">
                  {/* CLOCK + WIB */}
                  <div className="realtime-clock-row">
                    {/* CLOCK AREA */}
                    <div className="clock-time-wrapper">
                      {/* TIME */}
                      <span className="main-clock-text">
                        {basicTimerHours === 0 &&
                        basicTimerMinutes === 0 &&
                        basicTimerSeconds === 0 &&
                        !isBasicTimerRunning
                          ? `${realHours}:${realMinutes}:${realSeconds}`
                          : `${String(basicTimerHours).padStart(2, "0")}:${String(
                              basicTimerMinutes,
                            ).padStart(2, "0")}:${String(
                              basicTimerSeconds,
                            ).padStart(2, "0")}`}
                      </span>

                      {/* SUBTITLE */}
                      {isRealtimeClock ? (
                        <div className="pomodoro-phase-text">Local Time</div>
                      ) : (
                        (basicTimerHours > 0 ||
                          basicTimerMinutes > 0 ||
                          basicTimerSeconds > 0) && (
                          <div className="pomodoro-phase-text">Basic Timer</div>
                        )
                      )}
                    </div>

                    {/* WIB */}
                    {isRealtimeClock && (
                      <span className="timezone-text">WIB</span>
                    )}
                  </div>
                </div>
              </>
            )}
            {activeDisplay === "stopwatch" && !isRealtimeClock && (
              <>
                <div>
                  {String(stopwatchHours).padStart(2, "0")}:
                  {String(stopwatchMinutes).padStart(2, "0")}:
                  {String(stopwatchSeconds).padStart(2, "0")}
                </div>

                {(stopwatchHours > 0 ||
                  stopwatchMinutes > 0 ||
                  stopwatchSeconds > 0) && (
                  <div className="pomodoro-phase-text">Stopwatch</div>
                )}
              </>
            )}

            {activeDisplay === "pomodoro" && !isRealtimeClock && (
              <>
                <div>
                  {String(pomodoroHours).padStart(2, "0")}:
                  {String(pomodoroMinutes).padStart(2, "0")}:
                  {String(pomodoroSeconds).padStart(2, "0")}
                </div>
                {(pomodoroHours > 0 ||
                  pomodoroMinutes > 0 ||
                  pomodoroSeconds > 0) && (
                  <div className="pomodoro-phase-text">
                    {pomodoroPhase === "focus" ? "Focus Time" : "Break Time"}
                  </div>
                )}
              </>
            )}
          </div>
          {/* TIMER CONTROLS */}
          {activeDisplay === "basicTimer" &&
            (basicTimerHours > 0 ||
              basicTimerMinutes > 0 ||
              basicTimerSeconds > 0) && (
              <>
                <button
                  className="timer-control-button"
                  onClick={() => setIsBasicTimerRunning(!isBasicTimerRunning)}
                >
                  <img
                    src={isBasicTimerRunning ? PauseIcon : ResumeIcon}
                    alt="Timer Control"
                    className="timer-control-icon"
                  />
                </button>

                <button
                  className="timer-control-button"
                  onClick={() => {
                    setBasicTimerHours(0);
                    setBasicTimerMinutes(0);
                    setBasicTimerSeconds(0);

                    setIsBasicTimerRunning(false);
                  }}
                >
                  <img
                    src={StopIcon}
                    alt="Stop"
                    className="timer-control-icon"
                  />
                </button>
              </>
            )}

          {/* STOPWATCH CONTROLS */}
          {activeDisplay === "stopwatch" &&
            (stopwatchHours > 0 ||
              stopwatchMinutes > 0 ||
              stopwatchSeconds > 0) && (
              <>
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
                  <img
                    src={StopIcon}
                    alt="Stop"
                    className="timer-control-icon"
                  />
                </button>
              </>
            )}

          {/* POMODORO CONTROLS */}
          {activeDisplay === "pomodoro" &&
            (pomodoroHours > 0 ||
              pomodoroMinutes > 0 ||
              pomodoroSeconds > 0) && (
              <>
                <button
                  className="timer-control-button"
                  onClick={() => setIsPomodoroRunning(!isPomodoroRunning)}
                >
                  <img
                    src={isPomodoroRunning ? PauseIcon : ResumeIcon}
                    alt="Pomodoro Control"
                    className="timer-control-icon"
                  />
                </button>

                <button
                  className="timer-control-button"
                  onClick={() => {
                    // STOP
                    setIsPomodoroRunning(false);

                    // RESET TIME
                    setPomodoroHours(0);
                    setPomodoroMinutes(0);
                    setPomodoroSeconds(0);

                    // RESET SESSION
                    setCurrentPomodoroSession(1);

                    // RESET PHASE
                    setPomodoroPhase("focus");
                  }}
                >
                  <img
                    src={StopIcon}
                    alt="Stop"
                    className="timer-control-icon"
                  />
                </button>
              </>
            )}
        </div>
      </div>
    </>
  );
}

export default TimerDisplay;
