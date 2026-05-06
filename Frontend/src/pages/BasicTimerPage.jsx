import { useState } from "react";

function BasicTimerPage({ setPage }) {
  // TIMER SELECTION STATE
  const [selectedPart, setSelectedPart] = useState(null);

  // TIMER VALUE STATE
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // INCREMENT TIMER VALUE
  function incrementTime(part) {
    setSelectedPart(part);
    // HOURS
    if (part === "hours") {
      if (hours < 99) {
        setHours(hours + 1);
      } else {
        setHours(0);
      }
    }

    // MINUTES
    if (part === "minutes") {
      if (minutes < 59) {
        setMinutes(minutes + 1);
      } else {
        setMinutes(0);
      }
    }

    // SECONDS
    if (part === "seconds") {
      if (seconds < 59) {
        setSeconds(seconds + 1);
      } else {
        setSeconds(0);
      }
    }
  }

  // DECREMENT TIMER VALUE
  function decrementTime(part) {
    setSelectedPart(part);
    // HOURS
    if (part === "hours") {
      if (hours > 0) {
        setHours(hours - 1);
      } else {
        setHours(99);
      }
    }

    // MINUTES
    if (part === "minutes") {
      if (minutes > 0) {
        setMinutes(minutes - 1);
      } else {
        setMinutes(59);
      }
    }

    // SECONDS
    if (part === "seconds") {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setSeconds(59);
      }
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

      {/* TIMER LAYOUT */}
      <div className="menu-wrapper">
        {/* TIMER PANEL */}
        <div className="timer-panel">
          {/* TIMER DISPLAY */}
          <div className="timer-display">
            {/* HOURS */}
            <div className="time-column">
              {/* INCREMENT */}
              <button
                className="arrow-button"
                onClick={() => incrementTime("hours")}
              >
                ▲
              </button>

              {/* HOURS VALUE */}
              <button
                className={
                  selectedPart === "hours" ? "time-part selected" : "time-part"
                }
                onClick={() =>
                  setSelectedPart(selectedPart === "hours" ? null : "hours")
                }
              >
                {String(hours).padStart(2, "0")}
              </button>

              {/* DECREMENT */}
              <button
                className="arrow-button"
                onClick={() => decrementTime("hours")}
              >
                ▼
              </button>
            </div>

            <span className="time-separator">:</span>

            {/* MINUTES */}
            <div className="time-column">
              {/* INCREMENT */}
              <button
                className="arrow-button"
                onClick={() => incrementTime("minutes")}
              >
                ▲
              </button>

              {/* MINUTES VALUE */}
              <button
                className={
                  selectedPart === "minutes"
                    ? "time-part selected"
                    : "time-part"
                }
                onClick={() =>
                  setSelectedPart(selectedPart === "minutes" ? null : "minutes")
                }
              >
                {String(minutes).padStart(2, "0")}
              </button>

              {/* DECREMENT */}
              <button
                className="arrow-button"
                onClick={() => decrementTime("minutes")}
              >
                ▼
              </button>
            </div>

            <span className="time-separator">:</span>

            {/* SECONDS */}
            <div className="time-column">
              {/* INCREMENT */}
              <button
                className="arrow-button"
                onClick={() => incrementTime("seconds")}
              >
                ▲
              </button>

              {/* SECONDS VALUE */}
              <button
                className={
                  selectedPart === "seconds"
                    ? "time-part selected"
                    : "time-part"
                }
                onClick={() =>
                  setSelectedPart(selectedPart === "seconds" ? null : "seconds")
                }
              >
                {String(seconds).padStart(2, "0")}
              </button>

              {/* DECREMENT */}
              <button
                className="arrow-button"
                onClick={() => decrementTime("seconds")}
              >
                ▼
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicTimerPage;
