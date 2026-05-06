import { useEffect, useState } from "react";

function BasicTimerPage({
  setPage,

  mainHours,
  setMainHours,

  mainMinutes,
  setMainMinutes,

  mainSeconds,
  setMainSeconds,

  setIsTimerRunning,
}) {
  // TIMER SELECTION STATE
  const [selectedPart, setSelectedPart] = useState(null);

  // LOCAL TIMER EDITOR STATE
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

  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key;

      if (key === "Backspace") {
        if (selectedPart === "hours") {
          setHours(0);
        }

        if (selectedPart === "minutes") {
          setMinutes(0);
        }

        if (selectedPart === "seconds") {
          setSeconds(0);
        }

        return;
      }

      if (key < "0" || key > "9") {
        return;
      }

      if (selectedPart === "hours") {
        const currentValue = String(hours).padStart(2, "0");

        const newValueString = currentValue[1] + key;

        setHours(Number(newValueString));
      }

      if (selectedPart === "minutes") {
        const currentValue = String(minutes).padStart(2, "0");

        const newValueString = currentValue[1] + key;

        let newValue = Number(newValueString);

        if (newValue > 59) {
          newValue = Number("0" + key);
        }

        setMinutes(newValue);
      }

      if (selectedPart === "seconds") {
        const currentValue = String(seconds).padStart(2, "0");

        const newValueString = currentValue[1] + key;

        let newValue = Number(newValueString);

        if (newValue > 59) {
          newValue = Number("0" + key);
        }

        setSeconds(newValue);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPart, hours, minutes, seconds]);

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

          <button
            className="set-timer-button"
            onClick={() => {
              setMainHours(hours);
              setMainMinutes(minutes);
              setMainSeconds(seconds);

              setIsTimerRunning(true);

              setPage("main");
            }}
          >
            SET TIMER
          </button>
        </div>
      </div>
    </>
  );
}

export default BasicTimerPage;
