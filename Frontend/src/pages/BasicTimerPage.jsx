import { useState } from "react";

function BasicTimerPage({ setPage }) {
  const [selectedPart, setSelectedPart] = useState(null);

  const [hours] = useState("00");
  const [minutes] = useState("00");
  const [seconds] = useState("00");

  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <button className="back-button" onClick={() => setPage("timerMenu")}>
        BACK
      </button>

      <div className="menu-wrapper">
        <div className="timer-panel">
          <div className="timer-display">
            <button
              className={
                selectedPart === "hours" ? "time-part selected" : "time-part"
              }
              onClick={() =>
                setSelectedPart(selectedPart === "hours" ? null : "hours")
              }
            >
              {hours}
            </button>

            <span className="time-separator">:</span>

            <button
              className={
                selectedPart === "minutes" ? "time-part selected" : "time-part"
              }
              onClick={() =>
                setSelectedPart(selectedPart === "minutes" ? null : "minutes")
              }
            >
              {minutes}
            </button>

            <span className="time-separator">:</span>

            <button
              className={
                selectedPart === "seconds" ? "time-part selected" : "time-part"
              }
              onClick={() =>
                setSelectedPart(selectedPart === "seconds" ? null : "seconds")
              }
            >
              {seconds}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasicTimerPage;
