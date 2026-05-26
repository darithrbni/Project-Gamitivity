import { useEffect, useState } from "react";

function TimerDisplayLogic() {
  // GLOBAL BASIC TIMER STATE
  const [basicTimerHours, setBasicTimerHours] = useState(0);
  const [basicTimerMinutes, setBasicTimerMinutes] = useState(0);
  const [basicTimerSeconds, setBasicTimerSeconds] = useState(0);
  const [isBasicTimerRunning, setIsBasicTimerRunning] = useState(false);

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

  // BASIC TIMER COUNTDOWN
  useEffect(() => {
    if (!isBasicTimerRunning) {
      return;
    }

    const interval = setInterval(() => {
      // HOURS : MINUTES : SECONDS

      if (basicTimerSeconds > 0) {
        setBasicTimerSeconds(basicTimerSeconds - 1);
      } else if (basicTimerMinutes > 0) {
        setBasicTimerMinutes(basicTimerMinutes - 1);
        setBasicTimerSeconds(59);
      } else if (basicTimerHours > 0) {
        setBasicTimerHours(basicTimerHours - 1);
        setBasicTimerMinutes(59);
        setBasicTimerSeconds(59);
      } else {
        setIsBasicTimerRunning(false);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [
    isBasicTimerRunning,
    basicTimerHours,
    basicTimerMinutes,
    basicTimerSeconds,
  ]);

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
        // LAST SECOND
        if (
          pomodoroHours === 0 &&
          pomodoroMinutes === 0 &&
          pomodoroSeconds === 1
        ) {
          // FOCUS FINISHED
          if (pomodoroPhase === "focus") {
            // LAST SESSION
            if (currentPomodoroSession === pomodoroSessionCount) {
              setPomodoroSeconds(0);

              setIsPomodoroRunning(false);

              // RESET STATE
              setCurrentPomodoroSession(1);

              setPomodoroPhase("focus");
            }

            // GO TO BREAK
            else {
              setPomodoroPhase("break");

              setPomodoroHours(Math.floor(pomodoroBreakMinutes / 60));

              setPomodoroMinutes(pomodoroBreakMinutes % 60);

              setPomodoroSeconds(0);
            }
          }

          // BREAK FINISHED
          else {
            setCurrentPomodoroSession(currentPomodoroSession + 1);

            setPomodoroPhase("focus");

            setPomodoroHours(Math.floor(pomodoroSessionMinutes / 60));

            setPomodoroMinutes(pomodoroSessionMinutes % 60);

            setPomodoroSeconds(0);
          }
        }

        // NORMAL COUNTDOWN
        else {
          setPomodoroSeconds(pomodoroSeconds - 1);
        }
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
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [
    isPomodoroRunning,
    pomodoroHours,
    pomodoroMinutes,
    pomodoroSeconds,
    pomodoroPhase,
    pomodoroBreakMinutes,
    pomodoroSessionMinutes,
    currentPomodoroSession,
    pomodoroSessionCount,
  ]);

  return {
    // BASIC TIMER
    basicTimerHours,
    basicTimerMinutes,
    basicTimerSeconds,

    setBasicTimerHours,
    setBasicTimerMinutes,
    setBasicTimerSeconds,

    isBasicTimerRunning,
    setIsBasicTimerRunning,

    // STOPWATCH
    stopwatchHours,
    stopwatchMinutes,
    stopwatchSeconds,

    setStopwatchHours,
    setStopwatchMinutes,
    setStopwatchSeconds,

    isStopwatchRunning,
    setIsStopwatchRunning,

    // POMODORO
    pomodoroHours,
    pomodoroMinutes,
    pomodoroSeconds,

    setPomodoroHours,
    setPomodoroMinutes,
    setPomodoroSeconds,

    pomodoroSessionMinutes,
    setPomodoroSessionMinutes,
    pomodoroBreakMinutes,
    setPomodoroBreakMinutes,
    pomodoroSessionCount,
    setPomodoroSessionCount,
    currentPomodoroSession,
    setCurrentPomodoroSession,
    pomodoroPhase,
    setPomodoroPhase,
    isPomodoroRunning,
    setIsPomodoroRunning,
  };
}

export default TimerDisplayLogic;
