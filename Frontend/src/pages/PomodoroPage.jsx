import { useEffect, useState } from "react";

function PomodoroPage({
  setPage,

  setActiveDisplay,

  setPomodoroHours,
  setPomodoroMinutes,
  setPomodoroSeconds,

  setPomodoroSessionMinutes,
  setPomodoroBreakMinutes,
  setPomodoroSessionCount,

  setCurrentPomodoroSession,

  setPomodoroPhase,

  setIsPomodoroRunning,

  setHours,
  setMinutes,
  setSeconds,

  setIsTimerRunning,

  setStopwatchHours,
  setStopwatchMinutes,
  setStopwatchSeconds,

  setIsStopwatchRunning,
}) {
  // POMODORO SETTINGS STATE
  const [sessionMinutes, setSessionMinutes] = useState(60);
  const [breakMinutes, setBreakMinutes] = useState(15);
  const [sessionCount, setSessionCount] = useState(4);
  const [selectedPart, setSelectedPart] = useState(null);
  const [inputBuffer, setInputBuffer] = useState("");

  // INCREMENT
  function incrementValue(type) {
    if (type === "session") {
      if (sessionMinutes < 90) {
        setSessionMinutes(sessionMinutes + 1);
      }
    }

    if (type === "break") {
      if (breakMinutes < 60) {
        setBreakMinutes(breakMinutes + 1);
      }
    }

    if (type === "count") {
      if (sessionCount < 10) {
        setSessionCount(sessionCount + 1);
      }
    }
  }

  // DECREMENT
  function decrementValue(type) {
    if (type === "session" && sessionMinutes > 1) {
      setSessionMinutes(sessionMinutes - 1);
    }

    if (type === "break" && breakMinutes > 1) {
      setBreakMinutes(breakMinutes - 1);
    }

    if (type === "count" && sessionCount > 1) {
      setSessionCount(sessionCount - 1);
    }
  }

  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key;

      // BACKSPACE
      if (key === "Backspace") {
        if (selectedPart === "session") {
          setSessionMinutes(0);
        }
        if (selectedPart === "break") {
          setBreakMinutes(0);
        }
        if (selectedPart === "count") {
          setSessionCount(0);
        }
        setInputBuffer("");
        return;
      }

      // ONLY NUMBER
      if (key < "0" || key > "9") {
        return;
      }

      const newBuffer = (inputBuffer + key).slice(-2);

      const newValue = Number(newBuffer);

      // SESSION
      if (selectedPart === "session") {
        if (newValue <= 90) {
          setSessionMinutes(newValue);

          setInputBuffer(newBuffer);
        }
      }

      // BREAK
      if (selectedPart === "break") {
        if (newValue <= 60) {
          setBreakMinutes(newValue);

          setInputBuffer(newBuffer);
        }
      }

      // COUNT
      if (selectedPart === "count") {
        if (newValue <= 10) {
          setSessionCount(newValue);

          setInputBuffer(newBuffer);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPart, sessionMinutes, breakMinutes, sessionCount, inputBuffer]);

  return (
    <>
      {/* OVERLAY */}
      <div className="menu-overlay" onClick={() => setPage("main")} />

      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => setPage("timerMenu")}>
        BACK
      </button>

      {/* POMODORO LAYOUT */}
      <div className="menu-wrapper">
        <div className="pomodoro-panel">
          {/* TOP SETTINGS */}
          <div className="pomodoro-top-row">
            {/* SESSION */}
            <div className="pomodoro-setting">
              <p className="pomodoro-label">Session</p>

              <div className="pomodoro-control">
                <button
                  className="pomodoro-arrow"
                  onClick={() => decrementValue("session")}
                >
                  ❮
                </button>

                <button
                  className={
                    selectedPart === "session"
                      ? "pomodoro-value-box selected"
                      : "pomodoro-value-box"
                  }
                  onClick={() => {
                    setSelectedPart(
                      selectedPart === "session" ? null : "session",
                    );

                    setInputBuffer("");
                  }}
                >
                  {sessionMinutes}
                </button>

                <button
                  className="pomodoro-arrow"
                  onClick={() => incrementValue("session")}
                >
                  ❯
                </button>
              </div>

              <p className="pomodoro-subtext">Minutes</p>
            </div>

            {/* BREAK */}
            <div className="pomodoro-setting">
              <p className="pomodoro-label">Break</p>

              <div className="pomodoro-control">
                <button
                  className="pomodoro-arrow"
                  onClick={() => decrementValue("break")}
                >
                  ❮
                </button>

                <button
                  className={
                    selectedPart === "break"
                      ? "pomodoro-value-box selected"
                      : "pomodoro-value-box"
                  }
                  onClick={() => {
                    setSelectedPart(selectedPart === "break" ? null : "break");

                    setInputBuffer("");
                  }}
                >
                  {breakMinutes}
                </button>

                <button
                  className="pomodoro-arrow"
                  onClick={() => incrementValue("break")}
                >
                  ❯
                </button>
              </div>

              <p className="pomodoro-subtext">Minutes</p>
            </div>
          </div>

          {/* SESSION COUNT */}
          <div className="pomodoro-setting pomodoro-session-count">
            <div className="pomodoro-control">
              <button
                className="pomodoro-arrow"
                onClick={() => decrementValue("count")}
              >
                ❮
              </button>

              <button
                className={
                  selectedPart === "count"
                    ? "pomodoro-value-box selected"
                    : "pomodoro-value-box"
                }
                onClick={() => {
                  setSelectedPart(selectedPart === "count" ? null : "count");

                  setInputBuffer("");
                }}
              >
                {sessionCount}
              </button>

              <button
                className="pomodoro-arrow"
                onClick={() => incrementValue("count")}
              >
                ❯
              </button>
            </div>

            <p className="pomodoro-subtext">Number of Sessions</p>
          </div>

          <button
            className="pomodoro-start-button"
            onClick={() => {
              // INVALID SETTINGS
              if (
                sessionMinutes === 0 ||
                breakMinutes === 0 ||
                sessionCount === 0
              ) {
                return;
              }

              // SWITCH DISPLAY
              setActiveDisplay("pomodoro");

              // STOP TIMER
              setIsTimerRunning(false);

              setHours(0);
              setMinutes(0);
              setSeconds(0);

              // STOP STOPWATCH
              setIsStopwatchRunning(false);

              setStopwatchHours(0);
              setStopwatchMinutes(0);
              setStopwatchSeconds(0);

              // SAVE SETTINGS
              setPomodoroSessionMinutes(sessionMinutes);
              setPomodoroBreakMinutes(breakMinutes);
              setPomodoroSessionCount(sessionCount);

              // INITIALIZE RUNTIME
              setPomodoroHours(Math.floor(sessionMinutes / 60));
              setPomodoroMinutes(sessionMinutes % 60);
              setPomodoroSeconds(0);
              setCurrentPomodoroSession(1);
              setPomodoroPhase("focus");

              // START
              setIsPomodoroRunning(true);

              // BACK TO MAIN
              setPage("main");
            }}
          >
            START
          </button>
        </div>
      </div>
    </>
  );
}

export default PomodoroPage;
