# Struktur Folder
src/
├── assets/
│
├── components/
│   ├── Corkboard.jsx
│   ├── MenuCard.jsx
│   ├── ProfileDropdown.jsx
│   ├── TimerDisplay.jsx
│   └── TimerDisplayLogic.js
│
├── firebase/
│   ├── auth.js
│   └── config.js
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
│   ├── StopwatchPage.jsx
│   ├── PomodoroPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── ProfilePage.jsx
│
├── styles/
│   ├── App.css
│   ├── Button.css
│   ├── LoginRegister.css
│   ├── Menu.css
│   ├── Profile.css
│   ├── Timer.css
│   └── index.css
│
├── App.jsx
└── main.jsx



# Components
## Corkboard.jsx
import corkboardImage from "../assets/Corkboard.png";

function Corkboard({ onClick }) {
  return (
    <img
      className="corkboard"
      src={corkboardImage}
      alt="Corkboard"
      onClick={onClick}
      draggable={false}
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




## ProfileDropdown.jsx
import ProfilePlaceholder from "../assets/ProfilePlaceholder.png";
import TriangleIconBrown from "../assets/TriangleIconBrown.png";

function ProfileDropdown({
  currentUser,
  profileImage,
  setPage,
  handleLogout,
  isProfileDropdownOpen,
  setIsProfileDropdownOpen,
}) {
  function toggleDropdown() {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  }

  return (
    <>
      {currentUser ? (
        <div
          className="profile-menu-container"
          onClick={(event) => event.stopPropagation()}
        >
          <button className="profile-button" onClick={toggleDropdown}>
            <img
              src={profileImage || ProfilePlaceholder}
              alt="Profile"
              className="profile-image"
            />

            <span className="profile-username">
              {currentUser?.displayName || "User"}
            </span>

            <img
              src={TriangleIconBrown}
              alt="Dropdown"
              className={`profile-arrow-icon ${
                isProfileDropdownOpen ? "profile-arrow-open" : ""
              }`}
            />
          </button>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <button
                className="profile-dropdown-item"
                onClick={() => {
                  setPage("profile");

                  setIsProfileDropdownOpen(false);
                }}
              >
                My Account
              </button>

              <button className="profile-dropdown-item">Tutorial</button>

              <button className="profile-dropdown-item">Settings</button>

              <button
                className="profile-dropdown-item-logout"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="auth-buttons">
          <button
            className="register-button"
            onClick={() => setPage("register")}
          >
            REGISTER
          </button>

          <button className="login-button" onClick={() => setPage("login")}>
            LOGIN
          </button>
        </div>
      )}
    </>
  );
}

export default ProfileDropdown;





## TimerDisplay.jsx
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
  return (
    <>
      <div className="main-timer-container">
        <div className="main-timer-display">
          {activeDisplay === "basicTimer" && (
            <>
              <div>
                {String(basicTimerHours).padStart(2, "0")}:
                {String(basicTimerMinutes).padStart(2, "0")}:
                {String(basicTimerSeconds).padStart(2, "0")}
              </div>

              {(basicTimerHours > 0 ||
                basicTimerMinutes > 0 ||
                basicTimerSeconds > 0) && (
                <div className="pomodoro-phase-text">Basic Timer</div>
              )}
            </>
          )}

          {activeDisplay === "stopwatch" && (
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

          {activeDisplay === "pomodoro" && (
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
                <img src={StopIcon} alt="Stop" className="timer-control-icon" />
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
                <img src={StopIcon} alt="Stop" className="timer-control-icon" />
              </button>
            </>
          )}

        {/* POMODORO CONTROLS */}
        {activeDisplay === "pomodoro" &&
          (pomodoroHours > 0 || pomodoroMinutes > 0 || pomodoroSeconds > 0) && (
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
                <img src={StopIcon} alt="Stop" className="timer-control-icon" />
              </button>
            </>
          )}
      </div>
    </>
  );
}

export default TimerDisplay;



## TimerDisplayLogic.js
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





## CustomizationButton.jsx
import HangerIcon from "../assets/HangerIcon.png";

function CustomizationButton({ setPage }) {
  return (
    <button
      className="customization-button"
      onClick={() => setPage("customization")}
    >
      <img
        src={HangerIcon}
        alt="Customization"
        className="customization-icon"
      />
    </button>
  );
}

export default CustomizationButton;



## ItemCard.jsx
function ItemCard({ image, name, owned, equipped, selected, onClick }) {
  return (
    <button
      className={`item-card ${selected ? "item-card-selected" : ""}`}
      onClick={onClick}
    >
      {/* IMAGE */}
      <div className="item-card-image-wrapper">
        <img src={image} alt={name} className="item-card-image" />
      </div>

      {/* NAME */}
      <p className="item-card-name">{name}</p>

      {/* STATUS */}
      <div className="item-card-status">
        {equipped ? (
          <div className="item-card-equipped">Dipakai</div>
        ) : owned ? (
          <div className="item-card-owned">Dimiliki</div>
        ) : (
          <div className="item-card-locked">Belum dimiliki</div>
        )}
      </div>
    </button>
  );
}

export default ItemCard;






# firebase
## auth.js
import { getAuth } from "firebase/auth";

import app from "./config";

const auth = getAuth(app);

export default auth;





## config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEmn2P_0WFFb-RzejZ3UVEfzVC1fpmto4",
  authDomain: "gamitivity.firebaseapp.com",
  projectId: "gamitivity",
  storageBucket: "gamitivity.firebasestorage.app",
  messagingSenderId: "1065595999695",
  appId: "1:1065595999695:web:6b7927a21066f46b792eba",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

export default app;







# pages
## BasicTimerPage.jsx
import { useEffect, useState } from "react";

function BasicTimerPage({
  setPage,

  setBasicTimerHours,
  setBasicTimerMinutes,
  setBasicTimerSeconds,
  setIsBasicTimerRunning,

  setStopwatchHours,
  setStopwatchMinutes,
  setStopwatchSeconds,
  setIsStopwatchRunning,

  setActiveDisplay,

  setPomodoroHours,
  setPomodoroMinutes,
  setPomodoroSeconds,
  setIsPomodoroRunning,
}) {
  // BASIC TIMER SELECTION STATE
  const [selectedPart, setSelectedPart] = useState(null);

  // LOCAL BASIC TIMER EDITOR STATE
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // INCREMENT BASIC TIMER VALUE
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

  // DECREMENT BASIC TIMER VALUE
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

      {/* BASIC TIMER LAYOUT */}
      <div className="menu-wrapper">
        {/* BASIC TIMER PANEL */}
        <div className="timer-panel">
          {/* BASIC TIMER DISPLAY */}
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
              // INVALID TIME
              if (hours === 0 && minutes === 0 && seconds === 0) {
                return;
              }

              // STOP STOPWATCH
              setIsStopwatchRunning(false);
              setStopwatchHours(0);
              setStopwatchMinutes(0);
              setStopwatchSeconds(0);
              setActiveDisplay("basicTimer");
              setBasicTimerHours(hours);
              setBasicTimerMinutes(minutes);
              setBasicTimerSeconds(seconds);

              // STOP POMODORO
              setIsPomodoroRunning(false);

              // START BASIC TIMER
              setIsBasicTimerRunning(true);
              setPomodoroHours(0);
              setPomodoroMinutes(0);
              setPomodoroSeconds(0);

              // BACK TO MAIN
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





## LoginPage.jsx
import { useState } from "react";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import auth from "../firebase/auth";

import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase/config";

const provider = new GoogleAuthProvider();

import PasswordVisible from "../assets/PasswordVisible.png";

import PasswordInvisible from "../assets/PasswordInvisible.png";

import GoogleIcon from "../assets/GoogleIcon.png";

function LoginPage({ setPage }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login berhasil!");

      setPage("main");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleGoogleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const userRef = doc(db, "users", user.uid);

      const userSnap = await getDoc(userRef);

      // USER BARU
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          username: user.displayName || "User",
          motto: "Let's study with me!",
          photoURL: "",
          createdAt: serverTimestamp(),
        });
      }

      alert("Login Google berhasil!");

      setPage("main");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        return;
      }
      alert(error.message);
    }
  }

  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <button className="back-button" onClick={() => setPage("main")}>
        BACK
      </button>

      <div className="login-wrapper">
        <div className="login-panel">
          {/* TITLE */}
          <h1 className="login-title">LOG IN</h1>

          <p className="login-subtitle">
            Selamat datang! Silakan masuk untuk melanjutkan.
          </p>

          {/* GOOGLE LOGIN */}
          <p className="google-label">Masuk dengan</p>

          <button className="google-login-button" onClick={handleGoogleLogin}>
            <img className="google-logo" src={GoogleIcon} alt="Google" />

            <span>Lanjutkan dengan Google</span>
          </button>

          {/* DIVIDER */}
          <div className="login-divider">
            <div className="divider-line"></div>

            <p>atau</p>

            <div className="divider-line"></div>
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <p className="input-label">Email</p>

            <input
              type="text"
              placeholder="Masukkan email"
              className="login-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <p className="input-label">Password</p>

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className="login-input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button
                className="password-visibility-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? PasswordVisible : PasswordInvisible}
                  alt="toggle password"
                  className="password-visibility-icon"
                />
              </button>
            </div>
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="login-options-row">
            <label className="remember-me">
              <input type="checkbox" />

              <span>Ingat saya</span>
            </label>

            <button className="forgot-password-button">Lupa password?</button>
          </div>

          {/* LOGIN BUTTON */}
          <button className="login-submit-button" onClick={handleLogin}>
            Masuk
          </button>

          {/* REGISTER */}
          <p className="login-register-text">
            Belum punya akun?
            <span
              className="login-register-link"
              onClick={() => setPage("register")}
            >
              {" "}
              Buat akun
            </span>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;







## MainScene.jsx
import { useEffect, useState } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

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
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProfilePage from "./ProfilePage";
import CustomizationPage from "./CustomizationPage";

import Corkboard from "../components/Corkboard";
import ProfileDropdown from "../components/ProfileDropdown";
import TimerDisplay from "../components/TimerDisplay";
import TimerDisplayLogic from "../components/TimerDisplayLogic";
import CustomizationButton from "../components/CustomizationButton";

function MainScene() {
  // PAGE STATE
  const [page, setPage] = useState("main");
  // PROFILE DROPDOWN
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  // CURRENT USER
  const [currentUser, setCurrentUser] = useState(null);
  // PROFILE PICTURE
  const [profileImage, setProfileImage] = useState("");
  // TIMER DISPLAY LOGIC
  const {
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
  } = TimerDisplayLogic();
  const [activeDisplay, setActiveDisplay] = useState("basicTimer");

  const [isClosingCustomization, setIsClosingCustomization] = useState(false);

  async function handleLogout() {
    try {
      await signOut(auth);

      setPage("main");

      setIsProfileDropdownOpen(false);
    } catch (error) {
      alert(error.message);
    }
  }

  // FIREBASE AUTH LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const docRef = doc(db, "users", user.uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setProfileImage(data.photoURL || "");
        }
      } else {
        setProfileImage("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      className={
        page === "login" ||
        page === "register" ||
        page === "profile" ||
        page === "menu" ||
        page === "timerMenu" ||
        page === "basicTimer" ||
        page === "stopwatch" ||
        page === "pomodoro" ||
        page === "grafikMenu" ||
        page === "tugasMenu" ||
        page === "memoMenu" ||
        page === "jadwalMenu" ||
        page === "tokoMenu"
          ? "scene modal-open"
          : "scene"
      }
      onClick={() => setIsProfileDropdownOpen(false)}
    >
      <>
        <Corkboard onClick={() => setPage("menu")} />

        <div className="top-right-ui">
          <CustomizationButton setPage={setPage} />

          <ProfileDropdown
            currentUser={currentUser}
            profileImage={profileImage}
            setPage={setPage}
            handleLogout={handleLogout}
            isProfileDropdownOpen={isProfileDropdownOpen}
            setIsProfileDropdownOpen={setIsProfileDropdownOpen}
          />
        </div>

        <TimerDisplay
          activeDisplay={activeDisplay}
          basicTimerHours={basicTimerHours}
          basicTimerMinutes={basicTimerMinutes}
          basicTimerSeconds={basicTimerSeconds}
          isBasicTimerRunning={isBasicTimerRunning}
          setIsBasicTimerRunning={setIsBasicTimerRunning}
          setBasicTimerHours={setBasicTimerHours}
          setBasicTimerMinutes={setBasicTimerMinutes}
          setBasicTimerSeconds={setBasicTimerSeconds}
          stopwatchHours={stopwatchHours}
          stopwatchMinutes={stopwatchMinutes}
          stopwatchSeconds={stopwatchSeconds}
          isStopwatchRunning={isStopwatchRunning}
          setIsStopwatchRunning={setIsStopwatchRunning}
          setStopwatchHours={setStopwatchHours}
          setStopwatchMinutes={setStopwatchMinutes}
          setStopwatchSeconds={setStopwatchSeconds}
          pomodoroHours={pomodoroHours}
          pomodoroMinutes={pomodoroMinutes}
          pomodoroSeconds={pomodoroSeconds}
          pomodoroPhase={pomodoroPhase}
          isPomodoroRunning={isPomodoroRunning}
          setIsPomodoroRunning={setIsPomodoroRunning}
          setPomodoroHours={setPomodoroHours}
          setPomodoroMinutes={setPomodoroMinutes}
          setPomodoroSeconds={setPomodoroSeconds}
          setCurrentPomodoroSession={setCurrentPomodoroSession}
          setPomodoroPhase={setPomodoroPhase}
        />
      </>

      {page === "menu" && <MenuPage setPage={setPage} />}

      {page === "timerMenu" && <TimerMenuPage setPage={setPage} />}

      {page === "basicTimer" && (
        <BasicTimerPage
          setPage={setPage}
          setBasicTimerHours={setBasicTimerHours}
          setBasicTimerMinutes={setBasicTimerMinutes}
          setBasicTimerSeconds={setBasicTimerSeconds}
          setIsBasicTimerRunning={setIsBasicTimerRunning}
          setStopwatchHours={setStopwatchHours}
          setStopwatchMinutes={setStopwatchMinutes}
          setStopwatchSeconds={setStopwatchSeconds}
          setIsStopwatchRunning={setIsStopwatchRunning}
          setActiveDisplay={setActiveDisplay}
          setPomodoroHours={setPomodoroHours}
          setPomodoroMinutes={setPomodoroMinutes}
          setPomodoroSeconds={setPomodoroSeconds}
          setIsPomodoroRunning={setIsPomodoroRunning}
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
          setBasicTimerHours={setBasicTimerHours}
          setBasicTimerMinutes={setBasicTimerMinutes}
          setBasicTimerSeconds={setBasicTimerSeconds}
          setIsBasicTimerRunning={setIsBasicTimerRunning}
          setActiveDisplay={setActiveDisplay}
          setPomodoroHours={setPomodoroHours}
          setPomodoroMinutes={setPomodoroMinutes}
          setPomodoroSeconds={setPomodoroSeconds}
          setIsPomodoroRunning={setIsPomodoroRunning}
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
          setBasicTimerHours={setBasicTimerHours}
          setBasicTimerMinutes={setBasicTimerMinutes}
          setBasicTimerSeconds={setBasicTimerSeconds}
          setIsBasicTimerRunning={setIsBasicTimerRunning}
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

      {page === "login" && <LoginPage setPage={setPage} />}

      {page === "register" && <RegisterPage setPage={setPage} />}

      {page === "profile" && (
        <ProfilePage
          setPage={setPage}
          currentUser={currentUser}
          handleLogout={handleLogout}
          setProfileImage={setProfileImage}
        />
      )}

      {page === "customization" && (
        <CustomizationPage
          setPage={setPage}
          isClosingCustomization={isClosingCustomization}
          setIsClosingCustomization={setIsClosingCustomization}
        />
      )}
    </div>
  );
}

export default MainScene;






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




## PomodoroPage.jsx
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

  setBasicTimerHours,
  setBasicTimerMinutes,
  setBasicTimerSeconds,
  setIsBasicTimerRunning,

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

              // STOP BASIC TIMER
              setIsBasicTimerRunning(false);
              setBasicTimerHours(0);
              setBasicTimerMinutes(0);
              setBasicTimerSeconds(0);

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





## ProfilePage.jsx
import { useEffect, useState } from "react";

import ProfilePlaceholder from "../assets/ProfilePlaceholder.png";

import UserIcon from "../assets/UserIcon.png";
import EmailIcon from "../assets/EmailIcon.png";
import CalendarIcon from "../assets/CalendarIcon.png";
import MottoIcon from "../assets/MottoIcon.png";

import TotalFocusIcon from "../assets/TotalFocusIcon.png";
import TotalCoinIcon from "../assets/TotalCoinIcon.png";
import TotalTaskIcon from "../assets/TotalTaskIcon.png";
import StreakIcon from "../assets/StreakIcon.png";
import AchievementPlaceholder from "../assets/AchievementPlaceholder.png";
import BackButton2 from "../assets/BackButton2.png";
import UploadIcon from "../assets/UploadIcon.png";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db } from "../firebase/config";

function ProfilePage({ setPage, currentUser, handleLogout, setProfileImage }) {
  const [activeProfileTab, setActiveProfileTab] = useState("overview");
  const [hasProfileChanges, setHasProfileChanges] = useState(false);
  const [username, setUsername] = useState("");
  const [motto, setMotto] = useState("");
  const [savedUsername, setSavedUsername] = useState("");
  const [savedMotto, setSavedMotto] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const [originalMotto, setOriginalMotto] = useState("");
  const isUsernameEmpty = username.trim() === "";
  const isUsernameTooLong = username.length > 20;
  const isMottoTooLong = motto.length > 80;
  const isProfileInvalid =
    isUsernameEmpty || isUsernameTooLong || isMottoTooLong;
  const [previewProfileImage, setPreviewProfileImage] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [originalPhotoURL, setOriginalPhotoURL] = useState("");
  const [memberSince, setMemberSince] = useState("-");

  useEffect(() => {
    async function loadProfileData() {
      if (!currentUser) return;

      const docRef = doc(db, "users", currentUser.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setUsername(data.username || "");
        setMotto(data.motto || "Let's study with me!");

        setSavedUsername(data.username || "");
        setSavedMotto(data.motto || "Let's study with me!");

        setPreviewProfileImage(data.photoURL || "");
        setOriginalPhotoURL(data.photoURL || "");

        if (data.createdAt) {
          const formattedDate = data.createdAt
            .toDate()
            .toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

          setMemberSince(formattedDate);
        }

        setOriginalUsername(data.username || "");
        setOriginalMotto(data.motto || "Let's study with me!");
      }
    }

    loadProfileData();
  }, [currentUser]);

  useEffect(() => {
    const hasChanges =
      username !== originalUsername ||
      motto !== originalMotto ||
      previewProfileImage !== originalPhotoURL;

    setHasProfileChanges(hasChanges && !isProfileInvalid);
  }, [
    username,
    motto,
    previewProfileImage,
    originalUsername,
    originalMotto,
    originalPhotoURL,
    isProfileInvalid,
  ]);

  function handleCancelEditProfile() {
    setUsername(savedUsername);
    setMotto(savedMotto);
    setActiveProfileTab("overview");
  }

  async function handleSaveProfile() {
    if (!currentUser) return;

    try {
      let photoURL = previewProfileImage;

      if (selectedImageFile) {
        const formData = new FormData();

        formData.append("file", selectedImageFile);

        formData.append("upload_preset", "gamitivity_profile_pic");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dohfdsrho/image/upload",
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await response.json();

        photoURL = data.secure_url;
      }
      await updateProfile(currentUser, {
        displayName: username,
      });

      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          username,
          motto,
          photoURL,
        },
        { merge: true },
      );

      setOriginalUsername(username);
      setOriginalMotto(motto);

      setSavedUsername(username);
      setSavedMotto(motto);
      setOriginalPhotoURL(photoURL);
      setPreviewProfileImage(photoURL);
      setProfileImage(photoURL);

      alert("Profile updated!");
      setActiveProfileTab("overview");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <div className="profilepage-wrapper">
        <div className="profilepage-container">
          {/* CLOSE BUTTON */}
          {activeProfileTab !== "editProfile" && (
            <button
              className="profilepage-close-button"
              onClick={() => setPage("main")}
            >
              ✕
            </button>
          )}

          {/* SIDEBAR */}
          <div className="profilepage-sidebar">
            <img
              src={originalPhotoURL || ProfilePlaceholder}
              alt="Profile"
              className="profilepage-avatar"
            />

            <h2 className="profilepage-username">{savedUsername || "User"}</h2>

            <p className="profilepage-email">{currentUser?.email}</p>

            <div className="profilepage-badge">✨ Focus Explorer</div>

            <div className="profilepage-sidebar-menu">
              <button
                className={
                  activeProfileTab === "overview" ||
                  activeProfileTab === "editProfile"
                    ? "profilepage-sidebar-item active"
                    : "profilepage-sidebar-item"
                }
                onClick={() => setActiveProfileTab("overview")}
              >
                Overview
              </button>

              <button className="profilepage-sidebar-item">Stats</button>

              <button
                className={
                  activeProfileTab === "achievements"
                    ? "profilepage-sidebar-item active"
                    : "profilepage-sidebar-item"
                }
                onClick={() => setActiveProfileTab("achievements")}
              >
                Achievements
              </button>

              <button className="profilepage-sidebar-item">
                Customization
              </button>

              <button className="profilepage-sidebar-item">
                Profile Settings
              </button>

              <button className="profilepage-sidebar-item">App Settings</button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="profilepage-content">
            {activeProfileTab === "overview" && (
              <>
                <h1 className="profilepage-title">My Profile</h1>
                <p className="profilepage-subtitle">
                  Here's your productivity journey! ✨
                </p>
              </>
            )}

            {activeProfileTab === "overview" && (
              <>
                {/* PROFILE INFO */}
                <div className="profilepage-info-box">
                  <div className="profilepage-info-row">
                    <img
                      src={UserIcon}
                      alt=""
                      className="profilepage-info-icon"
                    />

                    <span>Username</span>

                    <p>{savedUsername || "-"}</p>
                  </div>

                  <div className="profilepage-info-row">
                    <img
                      src={EmailIcon}
                      alt=""
                      className="profilepage-info-icon"
                    />

                    <span>Email</span>

                    <p>{currentUser?.email || "-"}</p>
                  </div>

                  <div className="profilepage-info-row">
                    <img
                      src={CalendarIcon}
                      alt=""
                      className="profilepage-info-icon"
                    />

                    <span>Member Since</span>

                    <p>{memberSince}</p>
                  </div>

                  <div className="profilepage-info-row">
                    <img
                      src={MottoIcon}
                      alt=""
                      className="profilepage-info-icon"
                    />

                    <span>Motto</span>

                    <p>{savedMotto.trim() ? `"${savedMotto}"` : "-"}</p>
                  </div>
                </div>

                {/* STATS */}
                <h2 className="profilepage-section-title">
                  Productivity Stats
                </h2>

                <div className="profilepage-stats">
                  <div className="profilepage-stat-card">
                    <img
                      src={TotalFocusIcon}
                      alt=""
                      className="profilepage-stat-icon"
                    />

                    <h3>Focus Time</h3>

                    <p>-</p>

                    <span>Total</span>
                  </div>

                  <div className="profilepage-stat-card">
                    <img
                      src={TotalCoinIcon}
                      alt=""
                      className="profilepage-stat-icon"
                    />

                    <h3>Coins Earned</h3>

                    <p>-</p>

                    <span>Sessions</span>
                  </div>

                  <div className="profilepage-stat-card">
                    <img
                      src={TotalTaskIcon}
                      alt=""
                      className="profilepage-stat-icon"
                    />

                    <h3>Tasks Done</h3>

                    <p>-</p>

                    <span>Completed</span>
                  </div>

                  <div className="profilepage-stat-card">
                    <img
                      src={StreakIcon}
                      alt=""
                      className="profilepage-stat-icon"
                    />

                    <h3>Streak</h3>

                    <p>-</p>

                    <span>Days</span>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="profilepage-bottom-buttons">
                  <button
                    className="profilepage-edit-button"
                    onClick={() => setActiveProfileTab("editProfile")}
                  >
                    Edit Profile
                  </button>

                  <button
                    className="profilepage-logout-button"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              </>
            )}
            {activeProfileTab === "achievements" && (
              <>
                <div className="profilepage-achievement-header">
                  <h1 className="profilepage-title">Achievements</h1>
                </div>

                <div className="profilepage-achievement-box">
                  <img
                    src={AchievementPlaceholder}
                    alt=""
                    className="profilepage-achievement-placeholder"
                  />

                  <p>No achievements yet.</p>

                  <span>Keep focusing and earn your first achievement!</span>
                </div>
              </>
            )}
            {activeProfileTab === "editProfile" && (
              <>
                <div className="editprofile-header">
                  <button
                    className="editprofile-back-button"
                    onClick={handleCancelEditProfile}
                  >
                    <img src={BackButton2} alt="Back" />
                  </button>

                  <div>
                    <h1 className="profilepage-title">Edit Profile</h1>

                    <p className="profilepage-subtitle">
                      Update your profile information ✨
                    </p>
                  </div>

                  <button
                    className={
                      hasProfileChanges
                        ? "editprofile-save-header-button active"
                        : "editprofile-save-header-button"
                    }
                    onClick={handleSaveProfile}
                    disabled={!hasProfileChanges}
                  >
                    Save Changes
                  </button>
                </div>

                <div className="editprofile-grid">
                  {/* USERNAME */}
                  <div className="editprofile-card">
                    <h2>Username</h2>

                    <p>This is your display name.</p>

                    <input
                      type="text"
                      className="editprofile-input"
                      placeholder="Enter username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />

                    {isUsernameEmpty && (
                      <p className="profilepage-warning-text">
                        * Username cannot be empty
                      </p>
                    )}

                    {isUsernameTooLong && (
                      <p className="profilepage-warning-text">
                        * Username cannot exceed 20 characters
                      </p>
                    )}
                  </div>

                  {/* MOTTO */}
                  <div className="editprofile-card">
                    <h2>Motto</h2>

                    <p>Your profile motto.</p>

                    <textarea
                      className="editprofile-textarea"
                      placeholder="Write your motto..."
                      value={motto}
                      onChange={(event) => setMotto(event.target.value)}
                    />

                    {isMottoTooLong && (
                      <p className="profilepage-warning-text">
                        * Motto cannot exceed 80 characters
                      </p>
                    )}
                  </div>

                  {/* PROFILE PICTURE */}
                  <div className="editprofile-picture-card">
                    <div className="editprofile-picture-header">
                      <h2>Profile Picture</h2>

                      <p>Upload and update your profile picture.</p>
                    </div>

                    <div className="editprofile-picture-content">
                      {/* PREVIEW */}
                      <div className="editprofile-picture-preview">
                        <img
                          src={previewProfileImage || ProfilePlaceholder}
                          alt="Preview"
                          className="editprofile-picture-preview-image"
                        />
                      </div>

                      {/* UPLOAD */}
                      <div className="editprofile-upload-box">
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          className="editprofile-file-input"
                          onChange={(event) => {
                            const file = event.target.files[0];

                            if (!file) return;

                            setSelectedImageFile(file);

                            setPreviewProfileImage(URL.createObjectURL(file));
                          }}
                        />
                        <img
                          src={UploadIcon}
                          alt="Upload"
                          className="editprofile-upload-icon"
                        />
                        <p>Click to upload image</p>
                        <span>JPG, PNG up to 2MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;








## RegisterPage.jsx
import { useState } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import auth from "../firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

import PasswordVisible from "../assets/PasswordVisible.png";

import PasswordInvisible from "../assets/PasswordInvisible.png";

function RegisterPage({ setPage }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleRegister() {
    const trimmedUsername = username.trim();

    if (trimmedUsername === "") {
      alert("Username tidak boleh kosong");
      return;
    }

    if (trimmedUsername.length > 20) {
      alert("Username tidak boleh lebih dari 20 karakter");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password tidak sama");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: trimmedUsername,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: trimmedUsername,
        motto: "Let's study with me!",
        photoURL: "",
        createdAt: serverTimestamp(),
      });

      alert("Register berhasil!");

      setPage("main");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <button className="back-button" onClick={() => setPage("main")}>
        BACK
      </button>

      <div className="login-wrapper">
        <div className="register-panel">
          <h1 className="register-title">REGISTER</h1>

          <p className="register-subtitle">
            Buat akun baru untuk memulai perjalananmu!
          </p>

          {/* USERNAME */}
          <div className="register-input-group">
            <p className="register-label">Username</p>

            <input
              type="text"
              placeholder="Masukkan username"
              className="login-input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="register-input-group">
            <p className="register-label">Email</p>

            <input
              type="text"
              placeholder="Masukkan email"
              className="login-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="register-input-group">
            <p className="register-label">Password</p>

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className="login-input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button
                className="password-visibility-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? PasswordVisible : PasswordInvisible}
                  alt="toggle password"
                  className="password-visibility-icon"
                />
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="register-input-group">
            <p className="register-label">Konfirmasi Password</p>

            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Masukkan password lagi"
                className="login-input"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />

              <button
                className="password-visibility-button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <img
                  src={
                    showConfirmPassword ? PasswordVisible : PasswordInvisible
                  }
                  alt="toggle password"
                  className="password-visibility-icon"
                />
              </button>
            </div>
          </div>

          <button className="register-submit-button" onClick={handleRegister}>
            Daftar
          </button>

          <p className="register-login-text">
            Sudah punya akun?
            <span
              className="register-login-link"
              onClick={() => setPage("login")}
            >
              {" "}
              Masuk di sini
            </span>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;








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

  setBasicTimerHours,
  setBasicTimerMinutes,
  setBasicTimerSeconds,
  setActiveDisplay,
  setIsBasicTimerRunning,

  setPomodoroHours,
  setPomodoroMinutes,
  setPomodoroSeconds,
  setIsPomodoroRunning,
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
                // STOP BASIC TIMER
                setIsBasicTimerRunning(false);
                setBasicTimerHours(0);
                setBasicTimerMinutes(0);
                setBasicTimerSeconds(0);
                setActiveDisplay("stopwatch");

                // STOP POMODORO
                setIsPomodoroRunning(false);
                setPomodoroHours(0);
                setPomodoroMinutes(0);
                setPomodoroSeconds(0);

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





## CustomizationPage.jsx
import { useState } from "react";

import HairIcon from "../assets/HairIcon.svg";
import ClothesIcon from "../assets/ClothesIcon.svg";
import WallpaperIcon from "../assets/WallpaperIcon.svg";
import WindowViewIcon from "../assets/WindowView.svg";
import DeskSetIcon from "../assets/DeskSet.svg";
import ItemCard from "../components/ItemCard";

import ArrowDownIcon from "../assets/ArrowDownIcon.png";

function CustomizationPage({
  setPage,
  isClosingCustomization,
  setIsClosingCustomization,
}) {
  const [selectedCategory, setSelectedCategory] = useState("Rambut");
  const categories = [
    {
      name: "Rambut",
      icon: HairIcon,
    },
    {
      name: "Baju",
      icon: ClothesIcon,
    },
    {
      name: "Dinding",
      icon: WallpaperIcon,
    },
    {
      name: "View",
      icon: WindowViewIcon,
    },
    {
      name: "Meja",
      icon: DeskSetIcon,
    },
  ];

  const [selectedItemId, setSelectedItemId] = useState(1);

  const dummyItems = [
    {
      id: 1,
      name: "Rambut Default",
      image: "https://placehold.co/120x120",
      owned: true,
      equipped: true,
    },
    {
      id: 2,
      name: "Rambut Silver",
      image: "https://placehold.co/120x120",
      owned: true,
      equipped: false,
    },
    {
      id: 3,
      name: "Rambut Biru",
      image: "https://placehold.co/120x120",
      owned: false,
      equipped: false,
    },
  ];

  return (
    <>
      {/* CUSTOMIZATION SIDEBAR */}
      <div className="customization-wrapper">
        <div
          className={`customization-sidebar ${
            isClosingCustomization
              ? "customization-sidebar-close"
              : "customization-sidebar-open"
          }`}
        >
          <button
            className="customization-close-button"
            onClick={() => {
              setIsClosingCustomization(true);

              setTimeout(() => {
                setPage("main");

                setIsClosingCustomization(false);
              }, 300);
            }}
          >
            <img
              src={ArrowDownIcon}
              alt="Close"
              className="customization-close-icon"
            />
          </button>
          <div className="customization-categories">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`customization-category-button ${
                  selectedCategory === category.name
                    ? "customization-category-button-active"
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="customization-category-icon"
                />

                <span className="customization-category-text">
                  {category.name}
                </span>
              </button>
            ))}
          </div>

          <div className="customization-divider" />

          <div className="customization-items-row">
            {dummyItems.map((item) => (
              <ItemCard
                key={item.id}
                image={item.image}
                name={item.name}
                owned={item.owned}
                equipped={item.equipped}
                selected={selectedItemId === item.id}
                onClick={() => setSelectedItemId(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomizationPage;





# Styles
## App.css
/* Global */

.scene {
  width: 100vw;
  height: 100vh;

  position: relative;

  background-image: url("../assets/Background.png");

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.corkboard {
  width: 350px;

  position: absolute;
  top: 150px;
  left: 120px;

  cursor: pointer;

  user-select: none;

  transition:
    transform 0.25s ease,
    filter 0.25s ease,
    box-shadow 0.25s ease;

  filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.2));
}

.corkboard:hover {
  transform: scale(1.05);

  filter: drop-shadow(0 14px 18px rgba(0, 0, 0, 0.28));
}

.corkboard:active {
  transform: scale(1);

  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.modal-open .corkboard {
  pointer-events: none;
}

.modal-open .main-timer-container {
  pointer-events: none;
}

.modal-open .login-button {
  pointer-events: none;
}

.modal-open .profile-menu-container {
  pointer-events: none;
}









## Button.css
/* Reuseable Buttons */

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

/* Profile Dropdown & Login Button */

.profile-menu-container {
  position: relative;

  z-index: 5;
}

.profile-button {
  border: none;
  border-radius: 28px;

  padding: 8px 14px 8px 8px;

  background: #342922;

  backdrop-filter: blur(8px);

  display: flex;
  align-items: center;

  gap: 12px;

  width: fit-content;

  cursor: pointer;

  box-shadow:
    0 6px 16px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);

  transition:
    filter 0.15s ease,
    transform 0.05s ease;
}

.profile-button:hover {
  filter: brightness(0.9);
}

.profile-button:active {
  filter: brightness(0.9);
}

.profile-image {
  width: 56px;
  height: 56px;

  border-radius: 50%;

  object-fit: cover;

  border: 2px solid #faebd8;

  flex-shrink: 0;
}

.profile-username {
  color: white;

  font-size: 1.1rem;
  font-weight: 500;

  white-space: nowrap;
}

.profile-arrow-icon {
  width: 20px;
  height: 20px;

  object-fit: contain;

  opacity: 0.85;

  transition: transform 0.15s ease;
}

.profile-arrow-open {
  transform: rotate(180deg);
}

.profile-dropdown {
  margin-top: 20px;

  width: 180px;

  background-color: white;

  border-radius: 16px;

  overflow: hidden;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;

  position: absolute;

  top: 70px;
  right: 0;
}

.profile-dropdown-item {
  border: none;

  background: white;

  padding: 14px;

  text-align: left;

  font-size: 1rem;

  cursor: pointer;

  transition: background-color 0.15s ease;
}

.profile-dropdown-item:hover {
  background-color: #f3f3f3;
}

.profile-dropdown-item-logout {
  border: none;

  background: white;

  padding: 14px;

  text-align: left;

  font-size: 1rem;

  cursor: pointer;

  transition: background-color 0.15s ease;

  color: #e45f5f;
}

.profile-dropdown-item-logout:hover {
  background-color: #f3f3f3;

  color: #e45f5f;
}

.login-button {
  padding: 14px 28px;

  min-width: 140px;

  border: none;
  border-radius: 18px;

  background-color: #f07c7c;

  color: white;

  font-size: 1.1rem;
  font-weight: bold;

  cursor: pointer;

  transition:
    filter 0.15s ease,
    transform 0.05s ease;
}

.login-button:hover {
  filter: brightness(0.94);
}

.login-button:active {
  filter: brightness(0.82);

  transform: scale(0.97);
}

.auth-buttons {
  position: absolute;

  top: 20px;
  right: 20px;

  display: flex;

  gap: 14px;

  z-index: 5;
}

.register-button {
  padding: 14px 28px;

  min-width: 140px;

  border: none;
  border-radius: 18px;

  background-color: #f07c7c;

  color: white;

  font-size: 1.1rem;
  font-weight: bold;

  cursor: pointer;

  transition:
    filter 0.15s ease,
    transform 0.05s ease;
}

.register-button:hover {
  filter: brightness(0.94);
}

.register-button:active {
  filter: brightness(0.82);

  transform: scale(0.97);
}

/* CUSTOMIZATION BUTTON */

.top-right-ui {
  position: absolute;

  top: 20px;
  right: 25px;

  display: flex;
  align-items: center;

  gap: 14px;

  z-index: 5;
}

.customization-button {
  width: 70px;
  height: 70px;

  border: 2px solid #342922;
  border-radius: 22px;

  background: #342922;

  backdrop-filter: blur(8px);

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);

  transition:
    transform 0.15s ease,
    filter 0.15s ease,
    background-color 0.15s ease;
}

.customization-button:hover {
  transform: scale(1.06);

  filter: brightness(1.1);
}

.customization-button:active {
  transform: scale(1);
}

.customization-icon {
  width: 40px;
  height: 40px;

  object-fit: contain;

  opacity: 0.92;
}








## LoginRegister.css
/* LoginRegister */

/* Reuseable */

.login-wrapper {
  position: absolute;
  inset: 0;

  z-index: 20;

  display: flex;
  justify-content: center;
  align-items: center;
}

.login-input {
  width: 100%;

  box-sizing: border-box;

  border-radius: 999px;
  border: 5px solid #f07c7c;

  outline: none;

  padding: 14px 22px;
  font-size: 1rem;

  margin-bottom: 20px;

  background-color: #f5f5f5;
}

/* LOGIN PAGE */

.login-panel {
  width: 380px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-title {
  font-size: 2.8rem;

  color: #d17b00;

  margin-bottom: 12px;
}

.login-subtitle {
  color: #e8e8e8;

  font-size: 1rem;

  text-align: center;

  margin-bottom: 18px;
}

.google-label {
  color: white;

  font-size: 1rem;
  font-weight: bold;

  margin-bottom: 8px;
}

.google-login-button {
  width: 100%;

  padding: 12px;
  font-size: 1rem;

  border: none;
  border-radius: 10px;

  background-color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;

  cursor: pointer;

  margin-bottom: 18px;

  transition: filter 0.15s ease;
}

.google-login-button:hover {
  filter: brightness(0.95);
}

.google-login-button:active {
  filter: brightness(0.9);
}

.google-logo {
  width: 22px;
  height: 22px;

  object-fit: contain;
}

.login-divider {
  width: 100%;

  display: flex;
  align-items: center;
  gap: 16px;

  color: white;

  font-size: 1rem;

  margin-bottom: 10px;
}

.divider-line {
  flex: 1;

  height: 2px;

  background-color: rgba(255, 255, 255, 0.5);
}

.input-group {
  width: 100%;

  margin-bottom: 0px;
}

.input-label {
  color: white;

  font-size: 1rem;

  margin-bottom: 10px;
}

.login-input {
  width: 100%;

  box-sizing: border-box;

  padding: 12px 20px;
  font-size: 1rem;

  border-radius: 999px;
  border: 5px solid #f07c7c;

  outline: none;

  background-color: #f5f5f5;
}

.login-options-row {
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 2px;
  margin-bottom: 18px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 10px;

  color: white;

  font-size: 1rem;
}

.remember-me input {
  width: 22px;
  height: 22px;
}

.forgot-password-button {
  border: none;
  background: transparent;

  color: #ff8b8b;

  font-size: 1rem;

  cursor: pointer;
}

.login-register-text {
  margin-top: 20px;

  color: white;

  font-size: 1rem;
}

.login-register-link {
  color: #4ea3ff;

  cursor: pointer;
}

.login-submit-button {
  align-self: center;

  border: none;
  border-radius: 20px;

  background-color: #f07c7c;

  color: white;

  font-size: 1.2rem;
  padding: 12px 42px;

  font-weight: bold;

  cursor: pointer;

  transition: filter 0.15s ease;
}

.login-submit-button:hover {
  filter: brightness(0.95);
}

.login-submit-button:active {
  filter: brightness(0.85);
}

/* Register Page */

.register-panel {
  width: 360px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-title {
  font-size: 2.8rem;

  color: #d17b00;

  margin-bottom: 10px;
}

.register-subtitle {
  color: #e0e0e0;

  font-size: 1rem;

  margin-bottom: 15px;
}

.register-input-group {
  width: 100%;

  margin-bottom: -8px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-label {
  width: 100%;

  color: #f0f0f0;

  font-size: 1rem;

  margin-bottom: 8px;
}

.register-submit-button {
  align-self: center;

  margin-top: 6px;

  font-size: 1.2rem;
  padding: 12px 42px;

  border: none;
  border-radius: 20px;

  background-color: #f07c7c;

  color: white;

  font-weight: bold;

  cursor: pointer;

  transition: filter 0.15s ease;
}

.register-submit-button:hover {
  filter: brightness(0.95);
}

.register-submit-button:active {
  filter: brightness(0.85);
}

.register-login-text {
  width: 100%;

  text-align: center;

  color: #f0f0f0;

  font-size: 1rem;

  margin-top: 20px;
}

.register-login-link {
  color: #4ea3ff;

  cursor: pointer;
}

/* Password Visibility */

.password-input-wrapper {
  position: relative;

  width: 100%;
}

.password-visibility-button {
  position: absolute;

  top: calc(50% - 10px);
  right: 28px;

  transform: translateY(-50%);

  border: none;
  background: transparent;

  padding: 0;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}

.password-visibility-icon {
  width: 28px;
  height: 28px;

  object-fit: contain;

  opacity: 0.7;

  transition: opacity 0.15s ease;
}

.password-visibility-button:hover .password-visibility-icon {
  opacity: 1;
}

/* =========================
   LOGIN & REGISTER RESPONSIVE
========================= */

/* Monitor besar */
@media (min-width: 1600px) {
  .login-panel,
  .register-panel {
    transform: scale(1.3);
  }
}

/* Monitor sangat besar */
@media (min-width: 2200px) {
  .login-panel,
  .register-panel {
    transform: scale(1.5);
  }
}

/* Laptop kecil */
@media (max-width: 900px) {
  .login-panel,
  .register-panel {
    transform: scale(0.95);
  }
}

/* Tablet / layar kecil */
@media (max-width: 700px) {
  .login-panel,
  .register-panel {
    transform: scale(0.85);
  }
}

/* HP */
@media (max-width: 500px) {
  .login-panel,
  .register-panel {
    transform: scale(0.75);
  }
}






## Menu.css
/* Menu */

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

  backdrop-filter: blur(2px);
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




## Profile.css
/* Profile Page */

.profilepage-wrapper {
  position: absolute;
  inset: 0;

  z-index: 20;

  display: flex;
  justify-content: center;
  align-items: center;
}

.profilepage-container {
  width: 900px;
  height: 550px;

  background-color: #f8efe5;

  border-radius: 36px;

  overflow: hidden;

  display: flex;

  position: relative;

  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

.profilepage-close-button {
  position: absolute;

  top: 7px;
  right: 30px;

  border: none;
  background: none;

  font-size: 42px;

  cursor: pointer;

  color: #3f2d20;

  z-index: 5;

  transition: filter 0.15s ease;
}

.profilepage-close-button:hover {
  filter: brightness(1.35);
}

.profilepage-sidebar {
  width: 240px;

  background: linear-gradient(to bottom, #f5e3cc, #efd9bb);

  padding: 32px 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.profilepage-avatar {
  width: 115px;
  height: 115px;

  border-radius: 50%;

  object-fit: cover;

  border: 3px solid white;

  margin-bottom: 14px;
}

.profilepage-username {
  font-size: 20px;

  color: #2f241d;

  margin-bottom: 10px;

  width: 100%;

  text-align: center;

  line-height: 1.1;

  word-break: break-word;
}

.profilepage-email {
  font-size: 14px;

  color: rgba(0, 0, 0, 0.6);

  margin-bottom: 24px;
}

.profilepage-badge {
  background-color: #ffe5a8;

  padding: 8px 18px;

  border-radius: 999px;

  font-size: 15px;
  font-weight: bold;

  color: #7c5a00;

  margin-top: -8px;
  margin-bottom: 22px;
}

.profilepage-sidebar-menu {
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 6px;

  margin-top: -6px;
}

.profilepage-sidebar-item {
  border: none;

  background: transparent;

  padding: 10px 14px;

  border-radius: 18px;

  text-align: left;

  font-size: 15px;

  cursor: pointer;

  transition: background-color 0.15s ease;
}

.profilepage-sidebar-item:hover {
  background-color: rgba(255, 255, 255, 0.45);
}

.profilepage-sidebar-item.active {
  background-color: white;
}

.profilepage-content {
  flex: 1;

  padding: 24px 32px 32px 32px;
}

.profilepage-title {
  font-size: 22px;

  color: #2f241d;

  margin-bottom: 4px;
}

.profilepage-subtitle {
  font-size: 13px;

  color: rgba(0, 0, 0, 0.65);

  margin-bottom: 8px;
}

.profilepage-info-box {
  border: 2px solid #e6d5c3;

  border-radius: 26px;

  padding: 20px;

  margin-bottom: 24px;
}

.profilepage-info-row {
  display: flex;
  align-items: center;

  gap: 14px;

  margin-bottom: 16px;

  font-size: 13px;
}

.profilepage-info-row:last-child {
  margin-bottom: 0;
}

.profilepage-info-icon {
  width: 20px;
  height: 20px;

  object-fit: contain;
}

.profilepage-info-row span {
  width: 180px;

  color: #5a5149;

  flex-shrink: 0;
}

.profilepage-info-row p {
  font-weight: bold;

  color: #2f241d;
  flex: 1;
  margin: 0;

  word-break: break-word;
}

.profilepage-section-title {
  font-size: 18px;

  color: #2f241d;

  margin-bottom: 10px;

  margin-top: -8px;
}

.profilepage-stats {
  display: flex;

  gap: 12px;

  margin-bottom: 24px;
}

.profilepage-stat-card {
  flex: 1;

  background-color: white;

  border-radius: 18px;

  padding: 16px;

  text-align: center;
}

.profilepage-stat-icon {
  width: 42px;
  height: 42px;

  object-fit: contain;

  margin-bottom: 16px;
}

.profilepage-stat-card h3 {
  font-size: 14px;

  color: #4a4037;

  margin-bottom: 10px;
}

.profilepage-stat-card p {
  font-size: 20px;
  font-weight: bold;

  color: #2f241d;

  margin-bottom: 6px;
}

.profilepage-stat-card span {
  font-size: 12px;

  color: rgba(0, 0, 0, 0.5);
}

.profilepage-achievement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 18px;
}

.profilepage-achievement-box {
  height: 120px;

  border: 2px dashed #d7c3ae;

  border-radius: 26px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  margin-bottom: 40px;
}

.profilepage-achievement-placeholder {
  width: 42px;

  margin-bottom: 16px;
}

.profilepage-achievement-box p {
  font-size: 16px;

  color: #2f241d;

  margin-bottom: 8px;
}

.profilepage-achievement-box span {
  font-size: 12px;

  color: rgba(0, 0, 0, 0.6);
}

.profilepage-bottom-buttons {
  display: flex;

  gap: 16px;

  margin-top: -8px;
}

.profilepage-edit-button,
.profilepage-logout-button {
  width: calc(50% - 8px);

  border: none;

  border-radius: 22px;

  padding: 12px;

  font-size: 14px;
  font-weight: bold;

  cursor: pointer;
}

.profilepage-edit-button {
  background-color: white;

  color: #2f241d;
}

.profilepage-logout-button {
  background-color: #f07c7c;

  color: white;
}

/* EDIT PROFILE */

.editprofile-grid {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 14px;

  margin-top: -5px;
}

.editprofile-card {
  border: 2px solid #e6d5c3;

  border-radius: 24px;

  padding: 16px;

  background-color: transparent;

  min-height: 185px;
}

.editprofile-card h2 {
  font-size: 18px;

  color: #2f241d;

  margin-bottom: 6px;
}

.editprofile-card p {
  font-size: 13px;

  color: rgba(0, 0, 0, 0.6);

  margin-bottom: 14px;
}

.editprofile-input {
  width: 100%;

  height: 48px;

  border-radius: 16px;

  border: 2px solid #e6d5c3;

  padding: 0 14px;

  font-size: 14px;

  background-color: white;

  outline: none;
}

.editprofile-textarea {
  width: 100%;
  height: 90px;

  border-radius: 16px;

  border: 2px solid #e6d5c3;

  padding: 14px;

  font-size: 14px;

  resize: none;

  background-color: white;

  outline: none;
}

.editprofile-header {
  display: flex;
  align-items: flex-start;

  gap: 14px;

  margin-bottom: 10px;
}

.editprofile-back-button {
  border: none;
  background: transparent;

  cursor: pointer;

  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: filter 0.15s ease;
}

.editprofile-back-button:hover {
  filter: brightness(1.2);
}

.editprofile-back-button img {
  width: 34px;
  height: 34px;

  object-fit: contain;

  margin-top: -5px;
}

.editprofile-save-header-button {
  margin-left: auto;

  border: none;

  border-radius: 14px;

  padding: 10px 18px;

  font-size: 14px;
  font-weight: bold;

  background-color: #d3d3d3;

  color: white;

  cursor: default;

  transition:
    background-color 0.15s ease,
    filter 0.15s ease;
}

.editprofile-save-header-button.active {
  background-color: #6dbb75;

  cursor: pointer;
}

.editprofile-save-header-button.active:hover {
  filter: brightness(1.08);
}

.editprofile-picture-card {
  grid-column: span 2;

  border: 2px solid #e6d5c3;

  border-radius: 24px;

  padding: 18px;

  background-color: transparent;
}

.editprofile-picture-header h2 {
  font-size: 18px;

  color: #2f241d;

  margin-bottom: 6px;
}

.editprofile-picture-header p {
  font-size: 13px;

  color: rgba(0, 0, 0, 0.6);

  margin-bottom: 18px;
}

.editprofile-picture-content {
  display: flex;
  align-items: center;

  gap: 18px;
}

.editprofile-picture-preview {
  width: 140px;
  height: 140px;

  border-radius: 20px;

  overflow: hidden;

  flex-shrink: 0;

  background-color: white;

  border: 2px solid #e6d5c3;
}

.editprofile-picture-preview-image {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.editprofile-upload-box {
  position: relative;
  overflow: hidden;

  flex: 1;

  height: 140px;

  border: 2px dashed #d7c3ae;

  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 8px;

  font-weight: bold;
  font-size: 20px;

  color: #7c5a00;

  background-color: rgba(255, 255, 255, 0.4);

  cursor: pointer;
}

.editprofile-upload-box span {
  font-size: 11px;
  font-weight: normal;

  color: rgba(0, 0, 0, 0.6);
}

.editprofile-upload-icon {
  width: 32px;
  height: 32px;

  object-fit: contain;

  margin-bottom: 4px;
}

.editprofile-upload-box p {
  font-size: 15px;
  font-weight: bold;

  color: #2f241d;
}

.profilepage-warning-text {
  color: #e45b5b !important;

  font-size: 12px;

  font-weight: 500;

  margin-top: 8px;
}

/* =========================
   PROFILE RESPONSIVE
========================= */

/* Monitor besar */
@media (min-width: 1600px) {
  .profilepage-container {
    transform: scale(1.35);
  }
}

/* Monitor sangat besar */
@media (min-width: 2200px) {
  .profilepage-container {
    transform: scale(1.55);
  }
}

/* Laptop kecil */
@media (max-width: 1200px) {
  .profilepage-container {
    transform: scale(0.9);
  }
}

/* Laptop lebih kecil */
@media (max-width: 1000px) {
  .profilepage-container {
    transform: scale(0.8);
  }
}

/* Tablet */
@media (max-width: 850px) {
  .profilepage-container {
    transform: scale(0.7);
  }
}

/* HP besar */
@media (max-width: 650px) {
  .profilepage-container {
    transform: scale(0.58);
  }
}

/* HP kecil */
@media (max-width: 500px) {
  .profilepage-container {
    transform: scale(0.48);
  }
}

.editprofile-file-input {
  position: absolute;

  inset: 0;

  opacity: 0;

  cursor: pointer;
}








## Timer.css
/* Timer */

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

  display: flex;
  flex-direction: column;

  align-items: center;
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

  border: none;

  cursor: pointer;

  transition: background-color 0.15s ease;
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

.pomodoro-value-box:hover {
  background-color: #8d8d8d;
}

.pomodoro-value-box.selected {
  background-color: #4a4a4a;
}

.pomodoro-phase-text {
  font-size: 1.5rem;

  margin-top: 5px;

  color: #d86d55;

  font-weight: bold;
}




## Customization.css
/* CUSTOMIZATION PAGE */

.customization-wrapper {
  position: absolute;

  inset: 0;

  z-index: 8;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  pointer-events: none;
}

.customization-sidebar {
  position: relative;

  pointer-events: auto;

  width: calc(100% - 36px);
  height: 300px;

  margin-bottom: 18px;

  border-radius: 26px;

  background: rgba(28, 18, 14, 0.92);

  backdrop-filter: blur(16px);

  border: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  padding: 0 26px 20px;

  display: flex;
  flex-direction: column;

  gap: 20px;

  transform: translateY(0);

  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

/* CATEGORY ROW */

.customization-categories {
  display: flex;
  align-items: center;

  gap: 0;

  overflow-x: auto;

  scrollbar-width: none;

  padding-bottom: 4px;
}

.customization-categories::-webkit-scrollbar {
  display: none;
}

/* CATEGORY BUTTON */

.customization-category-button {
  flex-shrink: 0;

  border: none;

  background: transparent;

  width: 96px;
  height: 74px;

  padding: 0;

  border-radius: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 5px;

  cursor: pointer;

  transition:
    background-color 0.15s ease,
    transform 0.15s ease;

  position: relative;
}

.customization-category-button:last-child {
  margin-right: 0;
}

.customization-category-button:hover {
  background-color: rgba(36, 22, 18, 0.75);
}

/* CATEGORY ICON */

.customization-category-icon {
  width: 22px;
  height: 22px;

  object-fit: contain;

  opacity: 0.9;

  filter: brightness(0) invert(1);

  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.customization-category-button:hover .customization-category-icon {
  opacity: 1;

  transform: scale(1.06);
}

/* CATEGORY TEXT */

.customization-category-text {
  color: white;

  font-size: 0.74rem;
  font-weight: 500;

  white-space: nowrap;
}

/* EMPTY ITEMS AREA */

.customization-items-empty {
  flex: 1;

  border-radius: 18px;

  border: 2px dashed rgba(255, 255, 255, 0.08);

  background: rgba(255, 255, 255, 0.02);

  display: flex;
  justify-content: center;
  align-items: center;

  color: rgba(255, 255, 255, 0.5);

  font-size: 1rem;
}

.customization-items-row {
  display: flex;

  gap: 16px;

  overflow-x: auto;

  scrollbar-width: none;

  padding-bottom: 4px;
}

.customization-items-row::-webkit-scrollbar {
  display: none;
}

/* OPEN/CLOSE ANIMATION */

.customization-sidebar-open {
  animation: customizationSlideUp 0.3s ease;
}

.customization-sidebar-close {
  transform: translateY(120%);

  opacity: 0;
}

/* KEYFRAMES */

@keyframes customizationSlideUp {
  from {
    transform: translateY(120%);

    opacity: 0;
  }

  to {
    transform: translateY(0);

    opacity: 1;
  }
}

/* CLOSE BUTTON */

.customization-close-button {
  position: absolute;

  top: -22px;
  left: 50%;

  transform: translateX(-50%);

  width: 52px;
  height: 52px;

  border: none;
  border-radius: 18px;

  background: rgba(28, 18, 14, 0.96);

  backdrop-filter: blur(12px);

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  box-shadow:
    0 8px 18px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  transition:
    transform 0.15s ease,
    filter 0.15s ease;

  z-index: 50;
}

.customization-close-button:hover {
  transform: translateX(-50%) scale(1.06);

  filter: brightness(1.08);
}

.customization-close-button:active {
  transform: translateX(-50%) scale(0.94);
}

.customization-close-icon {
  width: 22px;
  height: 22px;

  object-fit: contain;

  filter: brightness(0) invert(1);

  opacity: 0.9;
}

/* ACTIVE CATEGORY */

.customization-category-button-active {
  position: relative;

  background-color: rgba(24, 14, 12, 0.96);
}

.customization-category-button-active .customization-category-text {
  color: #ff8c7a;
}

.customization-category-button-active .customization-category-icon {
  filter: brightness(0) saturate(100%) invert(67%) sepia(32%) saturate(714%)
    hue-rotate(320deg) brightness(101%) contrast(101%);

  opacity: 1;
}

.customization-category-button-active::after {
  content: "";

  position: absolute;

  bottom: 2px;
  left: 0;

  width: 100%;
  height: 3px;

  background-color: #ff8c7a;
}

/* DIVIDER */

.customization-divider {
  width: calc(100% + 52px);

  height: 1px;

  background: rgba(255, 255, 255, 0.08);

  margin-left: -26px;

  margin-top: -28px;
}

/* ITEM CARD */

.item-card {
  width: 150px;
  min-height: 160px;

  border: none;
  border-radius: 22px;

  background: rgba(255, 255, 255, 0.06);

  padding: 14px 12px;

  display: flex;
  flex-direction: column;
  align-items: center;

  cursor: pointer;

  transition:
    background-color 0.15s ease,
    transform 0.15s ease,
    border-color 0.15s ease;

  flex-shrink: 0;
}

.item-card:hover {
  background: rgba(255, 255, 255, 0.1);

  transform: translateY(-2px);
}

/* SELECTED */

.item-card-selected {
  background: rgba(255, 255, 255, 0.14);
}

/* IMAGE */

.item-card-image-wrapper {
  width: 100%;
  height: 90px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 14px;
}

.item-card-image {
  max-width: 100%;
  max-height: 100%;

  object-fit: contain;
}

/* NAME */

.item-card-name {
  color: white;

  font-size: 0.95rem;
  font-weight: 500;

  text-align: center;

  margin-bottom: 12px;
}

/* STATUS */

.item-card-status {
  margin-top: auto;
}

/* EQUIPPED */

.item-card-equipped {
  background: #6cc46c;

  color: white;

  font-size: 0.82rem;
  font-weight: 600;

  padding: 6px 12px;

  border-radius: 999px;
}

/* OWNED */

.item-card-owned {
  color: #ffd27a;

  font-size: 0.82rem;
  font-weight: 600;
}

/* LOCKED */

.item-card-locked {
  color: rgba(255, 255, 255, 0.55);

  font-size: 0.8rem;
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
import MainScene from "./pages/MainScene";
import "./styles/App.css";
import "./styles/Menu.css";
import "./styles/Button.css";
import "./styles/Profile.css";
import "./styles/Timer.css";
import "./styles/LoginRegister.css";
import "./styles/Customization.css";

function App() {
  return <MainScene />;
}

export default App;




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


