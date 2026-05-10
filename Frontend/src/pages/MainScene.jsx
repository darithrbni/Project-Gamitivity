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

  // GLOBAL POMODORO STATE
  const [pomodoroHours, setPomodoroHours] = useState(0);
  const [pomodoroMinutes, setPomodoroMinutes] = useState(0);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(0);
  const [pomodoroSessionMinutes, setPomodoroSessionMinutes] = useState(25);
  const [pomodoroBreakMinutes, setPomodoroBreakMinutes] = useState(5);
  const [pomodoroSessionCount, setPomodoroSessionCount] = useState(4);
  const [currentPomodoroSession, setCurrentPomodoroSession] = useState(1);
  const [pomodoroPhase, setPomodoroPhase] = useState("focus");
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);

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

  // POMODORO COUNTDOWN
  useEffect(() => {
    if (!isPomodoroRunning) {
      return;
    }

    const interval = setInterval(() => {
      // SECONDS
      if (pomodoroSeconds > 0) {
        setPomodoroSeconds(pomodoroSeconds - 1);
      }

      // MINUTES
      else if (pomodoroMinutes > 0) {
        setPomodoroMinutes(pomodoroMinutes - 1);

        setPomodoroSeconds(59);
      }

      // HOURS
      else if (pomodoroHours > 0) {
        setPomodoroHours(pomodoroHours - 1);

        setPomodoroMinutes(59);

        setPomodoroSeconds(59);
      }

      // FINISHED
      else {
        setIsPomodoroRunning(false);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPomodoroRunning, pomodoroHours, pomodoroMinutes, pomodoroSeconds]);

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
              {activeDisplay === "pomodoro" && (
                <>
                  <div>
                    {String(pomodoroHours).padStart(2, "0")}:
                    {String(pomodoroMinutes).padStart(2, "0")}:
                    {String(pomodoroSeconds).padStart(2, "0")}
                  </div>
                  <div className="pomodoro-phase-text">
                    {pomodoroPhase === "focus" ? "Focus Time" : "Break Time"}
                  </div>
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

      {page === "pomodoro" && (
        <PomodoroPage
          setPage={setPage}
          setActiveDisplay={setActiveDisplay}
          setPomodoroHours={setPomodoroHours}
          setPomodoroMinutes={setPomodoroMinutes}
          setPomodoroSeconds={setPomodoroSeconds}
          setPomodoroSessionMinutes={setPomodoroSessionMinutes}
          setPomodoroBreakMinutes={setPomodoroBreakMinutes}
          setPomodoroSessionCount={setPomodoroSessionCount}
          setCurrentPomodoroSession={setCurrentPomodoroSession}
          setPomodoroPhase={setPomodoroPhase}
          setIsPomodoroRunning={setIsPomodoroRunning}
          setHours={setHours}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
          setIsTimerRunning={setIsTimerRunning}
          setStopwatchHours={setStopwatchHours}
          setStopwatchMinutes={setStopwatchMinutes}
          setStopwatchSeconds={setStopwatchSeconds}
          setIsStopwatchRunning={setIsStopwatchRunning}
        />
      )}

      {page === "grafikMenu" && <GrafikMenuPage setPage={setPage} />}

      {page === "tugasMenu" && <TugasMenuPage setPage={setPage} />}

      {page === "memoMenu" && <MemoMenuPage setPage={setPage} />}

      {page === "jadwalMenu" && <JadwalMenuPage setPage={setPage} />}

      {page === "tokoMenu" && <TokoMenuPage setPage={setPage} />}
    </div>
  );
}

export default MainScene;
