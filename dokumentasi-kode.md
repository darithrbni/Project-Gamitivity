# Struktur Folder
src/
├── assets/
│
├── components/
│   ├── Corkboard.jsx
│   └── MenuCard.jsx
│
├── pages/
│   ├── MainScene.jsx
│   ├── MenuPage.jsx
│   ├── TimerMenuPage.jsx
│   ├── GrafikMenuPage.jsx
│   ├── TugasMenuPage.jsx
│   ├── MemoMenuPage.jsx
│   ├── JadwalMenuPage.jsx
│   ├── TokoMenuPage.jsx
│   ├── BasicTimerPage.jsx
│   └── StopwatchPage.jsx
│
├── styles/
│   ├── App.css
│   └── index.css
│
├── App.jsx
└── main.jsx






# components
## Corkboard.jsx
import { useState } from "react";

import idleImage from "../assets/placeholderIdle.png";
import hoverImage from "../assets/placeholderHover.png";
import clickImage from "../assets/placeholderClick.png";

function Corkboard({ onClick }) {
  const [boardState, setBoardState] = useState("idle");

  function getCurrentImage() {
    if (boardState === "hover") return hoverImage;
    if (boardState === "click") return clickImage;

    return idleImage;
  }

  return (
    <img
      className="corkboard"
      src={getCurrentImage()}
      alt="Corkboard"

      onMouseEnter={() => setBoardState("hover")}
      onMouseLeave={() => setBoardState("idle")}
      onMouseDown={() => setBoardState("click")}
      onMouseUp={() => setBoardState("hover")}

      onClick={onClick}
    />
  );
}

export default Corkboard;







## MenuCard.jsx
function MenuCard({ title, icon, onClick }) {
  return (
    <button
      className="menu-card"
      onClick={onClick}
    >
      <img
        className="menu-card-icon"
        src={icon}
        alt={title}
      />

      <p className="menu-card-title">
        {title}
      </p>
    </button>
  );
}

export default MenuCard;






# pages
## MainScene.jsx
import { useEffect, useState } from "react";

import Corkboard from "../components/Corkboard";
import PauseIcon from "../assets/PauseIcon.png";
import ResumeIcon from "../assets/ResumeIcon.png";
import StopIcon from "../assets/StopIcon.png";

import MenuPage from "./MenuPage";
import TimerMenuPage from "./TimerMenuPage";
import GrafikMenuPage from "./GrafikMenuPage";
import TugasMenuPage from "./TugasMenuPage";
import MemoMenuPage from "./MemoMenuPage";
import JadwalMenuPage from "./JadwalMenuPage";
import TokoMenuPage from "./TokoMenuPage";
import BasicTimerPage from "./BasicTimerPage";
import StopwatchPage from "./StopwatchPage";
import PomodoroPage from "./PomodoroPage";

function MainScene() {
  // PAGE STATE
  const [page, setPage] = useState("main");

  // ACTIVE DISPLAY
  const [activeDisplay, setActiveDisplay] = useState("timer");

  // GLOBAL TIMER STATE
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // GLOBAL STOPWATCH STATE
  const [stopwatchHours, setStopwatchHours] = useState(0);
  const [stopwatchMinutes, setStopwatchMinutes] = useState(0);
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  // TIMER COUNTDOWN
  useEffect(() => {
    if (!isTimerRunning) {
      return;
    }

    const interval = setInterval(() => {
      // HOURS : MINUTES : SECONDS

      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else {
        setIsTimerRunning(false);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning, hours, minutes, seconds]);

  // STOPWATCH COUNTUP
  useEffect(() => {
    if (!isStopwatchRunning) {
      return;
    }

    const interval = setInterval(() => {
      if (stopwatchSeconds < 59) {
        setStopwatchSeconds(stopwatchSeconds + 1);
      } else if (stopwatchMinutes < 59) {
        setStopwatchSeconds(0);

        setStopwatchMinutes(stopwatchMinutes + 1);
      } else {
        setStopwatchSeconds(0);

        setStopwatchMinutes(0);

        setStopwatchHours(stopwatchHours + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isStopwatchRunning, stopwatchHours, stopwatchMinutes, stopwatchSeconds]);

  return (
    <div className="scene">
      {page === "main" && (
        <>
          <Corkboard onClick={() => setPage("menu")} />

          <div className="main-timer-container">
            <div className="main-timer-display">
              {activeDisplay === "timer" && (
                <>
                  {String(hours).padStart(2, "0")}:
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </>
              )}

              {activeDisplay === "stopwatch" && (
                <>
                  {String(stopwatchHours).padStart(2, "0")}:
                  {String(stopwatchMinutes).padStart(2, "0")}:
                  {String(stopwatchSeconds).padStart(2, "0")}
                </>
              )}
            </div>
            {/* TIMER CONTROLS */}
            {activeDisplay === "timer" &&
              (hours > 0 || minutes > 0 || seconds > 0) && (
                <>
                  <button
                    className="timer-control-button"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                  >
                    <img
                      src={isTimerRunning ? PauseIcon : ResumeIcon}
                      alt="Timer Control"
                      className="timer-control-icon"
                    />
                  </button>

                  <button
                    className="timer-control-button"
                    onClick={() => {
                      setHours(0);
                      setMinutes(0);
                      setSeconds(0);

                      setIsTimerRunning(false);
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
          </div>
        </>
      )}

      {page === "menu" && <MenuPage setPage={setPage} />}

      {page === "timerMenu" && <TimerMenuPage setPage={setPage} />}

      {page === "basicTimer" && (
        <BasicTimerPage
          setPage={setPage}
          setMainHours={setHours}
          setMainMinutes={setMinutes}
          setMainSeconds={setSeconds}
          setIsTimerRunning={setIsTimerRunning}
          setStopwatchHours={setStopwatchHours}
          setStopwatchMinutes={setStopwatchMinutes}
          setStopwatchSeconds={setStopwatchSeconds}
          setIsStopwatchRunning={setIsStopwatchRunning}
          setActiveDisplay={setActiveDisplay}
        />
      )}

      {page === "stopwatch" && (
        <StopwatchPage
          setPage={setPage}
          stopwatchHours={stopwatchHours}
          stopwatchMinutes={stopwatchMinutes}
          stopwatchSeconds={stopwatchSeconds}
          isStopwatchRunning={isStopwatchRunning}
          setIsStopwatchRunning={setIsStopwatchRunning}
          setStopwatchHours={setStopwatchHours}
          setStopwatchMinutes={setStopwatchMinutes}
          setStopwatchSeconds={setStopwatchSeconds}
          setHours={setHours}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
          setIsTimerRunning={setIsTimerRunning}
          setActiveDisplay={setActiveDisplay}
        />
      )}

      {page === "pomodoro" && <PomodoroPage setPage={setPage} />}

      {page === "grafikMenu" && <GrafikMenuPage setPage={setPage} />}

      {page === "tugasMenu" && <TugasMenuPage setPage={setPage} />}

      {page === "memoMenu" && <MemoMenuPage setPage={setPage} />}

      {page === "jadwalMenu" && <JadwalMenuPage setPage={setPage} />}

      {page === "tokoMenu" && <TokoMenuPage setPage={setPage} />}
    </div>
  );
}

export default MainScene;













## MenuPage.jsx
import MenuCard from "../components/MenuCard";

import GrafikIcon from "../assets/GrafikIcon.png";
import TugasIcon from "../assets/TugasIcon.png";
import MemoIcon from "../assets/MemoIcon.png";
import TimerIcon from "../assets/TimerIcon.png";
import JadwalIcon from "../assets/JadwalIcon.png";
import TokoIcon from "../assets/TokoIcon.png";

function MenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <button className="back-button" onClick={() => setPage("main")}>
        BACK
      </button>

      <div className="menu-wrapper">
        <div className="menu-grid">
          <MenuCard
            title="GRAFIK"
            icon={GrafikIcon}
            onClick={() => setPage("grafikMenu")}
          />

          <MenuCard
            title="TUGAS"
            icon={TugasIcon}
            onClick={() => setPage("tugasMenu")}
          />

          <MenuCard
            title="MEMO"
            icon={MemoIcon}
            onClick={() => setPage("memoMenu")}
          />

          <MenuCard
            title="TIMER"
            icon={TimerIcon}
            onClick={() => setPage("timerMenu")}
          />

          <MenuCard
            title="JADWAL"
            icon={JadwalIcon}
            onClick={() => setPage("jadwalMenu")}
          />

          <MenuCard
            title="TOKO"
            icon={TokoIcon}
            onClick={() => setPage("tokoMenu")}
          />
        </div>
      </div>
    </>
  );
}

export default MenuPage;









## TimerMenuPage.jsx
import MenuCard from "../components/MenuCard";

import BasicTimerIcon from "../assets/BasicTimerIcon.png";
import StopwatchIcon from "../assets/StopwatchIcon.png";
import PomodoroIcon from "../assets/PomodoroIcon.png";

function TimerMenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <button className="back-button" onClick={() => setPage("menu")}>
        BACK
      </button>

      <div className="menu-wrapper">
        <div className="menu-grid">
          <MenuCard
            title="BASIC TIMER"
            icon={BasicTimerIcon}
            onClick={() => {
              setPage("basicTimer");
            }}
          />

          <MenuCard
            title="STOPWATCH"
            icon={StopwatchIcon}
            onClick={() => {
              setPage("stopwatch");
            }}
          />

          <MenuCard
            title="POMODORO"
            icon={PomodoroIcon}
            onClick={() => {
              setPage("pomodoro");
            }}
          />
        </div>
      </div>
    </>
  );
}

export default TimerMenuPage;













## GrafikMenuPage.jsx
function GrafikMenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <button className="back-button" onClick={() => setPage("menu")}>
        BACK
      </button>
    </>
  );
}

export default GrafikMenuPage;









## JadwalMenuPage.jsx
function JadwalMenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <button className="back-button" onClick={() => setPage("menu")}>
        BACK
      </button>
    </>
  );
}

export default JadwalMenuPage;






## TugasMenuPage.jsx
function TugasMenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <button className="back-button" onClick={() => setPage("menu")}>
        BACK
      </button>
    </>
  );
}

export default TugasMenuPage;








## MemoMenuPage.jsx
function MemoMenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <button className="back-button" onClick={() => setPage("menu")}>
        BACK
      </button>
    </>
  );
}

export default MemoMenuPage;






## TokoMenuPage.jsx
function TokoMenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <button className="back-button" onClick={() => setPage("menu")}>
        BACK
      </button>
    </>
  );
}

export default TokoMenuPage;





## BasicTimerPage.jsx
import { useEffect, useState } from "react";

function BasicTimerPage({
  setPage,

  setMainHours,
  setMainMinutes,
  setMainSeconds,

  setIsTimerRunning,

  setStopwatchHours,
  setStopwatchMinutes,
  setStopwatchSeconds,

  setIsStopwatchRunning,

  setActiveDisplay,
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
              // STOP STOPWATCH
              setIsStopwatchRunning(false);
              setStopwatchHours(0);
              setStopwatchMinutes(0);
              setStopwatchSeconds(0);
              setActiveDisplay("timer");
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







## StopwatchPage.jsx
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






## PomodoroPage.jsx
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







# styles
## App.css
.scene {
  width: 100vw;
  height: 100vh;

  background-color: #d8c7aa;

  position: relative;
}

.corkboard {
  width: 350px;

  position: absolute;
  top: 100px;
  left: 80px;

  cursor: pointer;

  user-select: none;
}

.menu-card {
  width: 260px;
  height: 260px;

  border-radius: 40px;
  border: 6px solid #f07c7c;

  background-color: #f5f5f5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  cursor: pointer;

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  box-shadow: 0 8px 0 rgba(0, 0, 0, 0.15);
}

.menu-card:hover {
  transform: scale(1.05);

  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

.menu-card:active {
  transform: scale(0.97);

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.menu-card-icon {
  width: 120px;
  height: 120px;

  object-fit: contain;
}

.menu-card-title {
  font-size: 2rem;
  color: #d17b00;

  font-weight: bold;
}

.menu-overlay {
  position: absolute;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.55);

  z-index: 10;
}

.menu-wrapper {
  pointer-events: none;

  position: absolute;
  inset: 0;

  z-index: 20;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
}

.menu-grid {
  pointer-events: auto;

  display: grid;

  grid-template-columns: repeat(3, 260px);

  gap: 40px;

  transform: scale(0.9);
}

.back-button {
  position: absolute;

  top: 20px;
  left: 20px;

  z-index: 30;

  padding: 12px 20px;

  font-size: 1rem;
  font-weight: bold;

  cursor: pointer;
}

.timer-panel {
  pointer-events: auto;

  width: 750px;
  height: 400px;

  border-radius: 50px;
  border: 6px solid #f07c7c;

  background-color: #f5f5f5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 20;
}

.timer-display {
  display: flex;
  align-items: center;
  gap: 20px;
}

.time-part {
  border: none;
  background: transparent;

  font-size: 6rem;
  font-weight: bold;

  color: #d86d55;

  cursor: pointer;

  padding: 25px 30px;

  border-radius: 20px;

  transition: background-color 0.15s ease;
}

.time-separator {
  font-size: 6rem;
  font-weight: bold;

  color: #d86d55;
}

.time-part:hover {
  background-color: rgba(0, 0, 0, 0.06);
}

.time-part.selected {
  background-color: rgba(0, 0, 0, 0.14);
}

@media (min-width: 1600px) {
  .menu-grid {
    transform: scale(1.1);
  }
}

@media (max-width: 1200px) {
  .menu-grid {
    transform: scale(0.8);
  }
}

@media (max-width: 900px) {
  .menu-grid {
    transform: scale(0.7);
  }
}

.time-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arrow-button {
  border: none;
  background: transparent;

  font-size: 2rem;

  cursor: pointer;

  color: #d86d55;
}

.main-timer-container {
  position: absolute;

  top: 20px;
  left: 20px;

  display: flex;
  align-items: center;

  gap: 20px;
}

.main-timer-display {
  font-size: 3rem;
  font-weight: bold;

  color: #d86d55;
}

.timer-control-button {
  border: none;
  outline: none;

  background-color: transparent;

  cursor: pointer;

  padding: 0;

  appearance: none;
}

.timer-control-button:hover {
  filter: brightness(1.15);
}

.timer-control-button:active {
  filter: brightness(0.9);
}

.timer-control-icon {
  width: 50px;
  height: 50px;

  object-fit: contain;

  transition: filter 0.15s ease;
}

.stopwatch-time-part {
  font-size: 6rem;
  font-weight: bold;

  color: #d86d55;

  padding: 25px 30px;
}

.stopwatch-controls {
  display: flex;

  gap: 20px;

  margin-top: 30px;
}

.set-timer-button {
  margin-top: 30px;

  padding: 12px 24px;

  font-size: 1.2rem;
  font-weight: bold;

  border: none;
  border-radius: 20px;

  background-color: #f07c7c;
  color: white;

  cursor: pointer;

  transition: filter 0.15s ease;
}

.set-timer-button:hover {
  filter: brightness(1.15);
}

.set-timer-button:active {
  filter: brightness(0.9);
}

.pomodoro-panel {
  pointer-events: auto;

  width: 850px;
  height: 500px;

  border-radius: 50px;
  border: 6px solid #f07c7c;

  background-color: #f5f5f5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 70px;

  padding-bottom: 10px;
}

.pomodoro-top-row {
  display: flex;

  gap: 120px;
}

.pomodoro-setting {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 15px;
}

.pomodoro-label {
  font-size: 2rem;
  font-weight: bold;

  color: #444;
}

.pomodoro-control {
  display: flex;
  align-items: center;

  gap: 25px;
}

.pomodoro-arrow {
  border: none;
  background: transparent;

  font-size: 3rem;

  cursor: pointer;

  color: #333;
}

.pomodoro-value-box {
  width: 120px;
  height: 90px;

  border-radius: 12px;

  background-color: #777;

  color: white;

  font-size: 3rem;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
}

.pomodoro-subtext {
  font-size: 1.5rem;

  color: #555;
}

.pomodoro-session-count {
  margin-top: -50px;
}

.pomodoro-start-button {
  margin-top: -20px;

  padding: 14px 32px;

  border: none;
  border-radius: 20px;

  background-color: #f07c7c;

  color: white;

  font-size: 1.3rem;
  font-weight: bold;

  cursor: pointer;

  transition: filter 0.15s ease;
}

.pomodoro-start-button:hover {
  filter: brightness(1.15);
}

.pomodoro-start-button:active {
  filter: brightness(0.9);
}








## index.css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow: hidden;
  font-family: sans-serif;
}








# App.jsx
import MainScene from "./pages/MainScene"
import "./styles/App.css";

function App() {
  return <MainScene />
}

export default App







# main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)






# index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>project-gamitivity</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

