import { useState } from "react";

function PomodoroPage({ setPage }) {
  // POMODORO SETTINGS STATE
  const [sessionMinutes, setSessionMinutes] = useState(60);

  const [breakMinutes, setBreakMinutes] = useState(15);

  const [sessionCount, setSessionCount] = useState(4);

  // INCREMENT
  function incrementValue(type) {
    if (type === "session") {
      setSessionMinutes(sessionMinutes + 1);
    }

    if (type === "break") {
      setBreakMinutes(breakMinutes + 1);
    }

    if (type === "count") {
      setSessionCount(sessionCount + 1);
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

                <div className="pomodoro-value-box">{sessionMinutes}</div>

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

                <div className="pomodoro-value-box">{breakMinutes}</div>

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

              <div className="pomodoro-value-box">{sessionCount}</div>

              <button
                className="pomodoro-arrow"
                onClick={() => incrementValue("count")}
              >
                ❯
              </button>
            </div>

            <p className="pomodoro-subtext">Number of Sessions</p>
          </div>

          <button className="pomodoro-start-button">START</button>
        </div>
      </div>
    </>
  );
}

export default PomodoroPage;
