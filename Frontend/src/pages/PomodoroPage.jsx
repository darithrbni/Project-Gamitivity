import { useEffect, useState } from "react";

function PomodoroPage({ setPage }) {
  // POMODORO SETTINGS STATE
  const [sessionMinutes, setSessionMinutes] = useState(60);

  const [breakMinutes, setBreakMinutes] = useState(15);

  const [sessionCount, setSessionCount] = useState(4);

  const [selectedPart, setSelectedPart] = useState(null);

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

  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key;

      // ONLY NUMBER
      if (key < "0" || key > "9") {
        return;
      }

      // SESSION
      if (selectedPart === "session") {
        const currentValue = String(sessionMinutes).padStart(2, "0");

        const newValueString = currentValue[1] + key;

        setSessionMinutes(Number(newValueString));
      }

      // BREAK
      if (selectedPart === "break") {
        const currentValue = String(breakMinutes).padStart(2, "0");

        const newValueString = currentValue[1] + key;

        setBreakMinutes(Number(newValueString));
      }

      // SESSION COUNT
      if (selectedPart === "count") {
        const currentValue = String(sessionCount).padStart(2, "0");

        const newValueString = currentValue[1] + key;

        setSessionCount(Number(newValueString));
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPart, sessionMinutes, breakMinutes, sessionCount]);

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
                  onClick={() =>
                    setSelectedPart(
                      selectedPart === "session" ? null : "session",
                    )
                  }
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
                  onClick={() =>
                    setSelectedPart(selectedPart === "break" ? null : "break")
                  }
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
                onClick={() =>
                  setSelectedPart(selectedPart === "count" ? null : "count")
                }
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

          <button className="pomodoro-start-button">START</button>
        </div>
      </div>
    </>
  );
}

export default PomodoroPage;
