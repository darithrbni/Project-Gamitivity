import { useEffect, useState } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
import MiniTaskBoard from "../components/MiniTaskBoard";

import ProfileDropdown from "../components/ProfileDropdown";
import TimerDisplay from "../components/TimerDisplay";
import TimerDisplayLogic from "../components/TimerDisplayLogic";
import CustomizationButton from "../components/CustomizationButton";
import SceneRenderer from "../components/SceneRenderer";

import Corkboard from "../components/Corkboard";

function MainScene() {
  // PAGE STATE
  const [page, setPage] = useState("main");
  // PROFILE DROPDOWN
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  // CURRENT USER
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isCustomizationLoaded, setIsCustomizationLoaded] = useState(false);
  // PROFILE PICTURE
  const [profileImage, setProfileImage] = useState("");
  const [tasks, setTasks] = useState([]);
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

  // EQUIPPED CUSTOMIZATION
  const [equippedItems, setEquippedItems] = useState({
    hair: "default",
    clothes: "default",
    wallpaper: "default",
    windowView: "default",
    desk: "default",
  });

  async function handleLogout() {
    try {
      setIsLoggingOut(true);

      await signOut(auth);

      setPage("main");

      setIsProfileDropdownOpen(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoggingOut(false);
    }
  }
  // FIREBASE AUTH LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsAuthLoading(true);

      if (user) {
        setIsCustomizationLoaded(false);

        try {
          const docRef = doc(db, "users", user.uid);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setTasks(data.tasks || []);

            setProfileImage(data.photoURL || "");

            setEquippedItems(
              data.equippedItems || {
                hair: "default",
                clothes: "default",
                wallpaper: "default",
                windowView: "default",
                desk: "default",
              },
            );

            setIsCustomizationLoaded(true);
          } else {
            // USER DOC DOESN'T EXIST
            setProfileImage("");

            setEquippedItems({
              hair: "default",
              clothes: "default",
              wallpaper: "default",
              windowView: "default",
              desk: "default",
            });

            setIsCustomizationLoaded(true);
          }
        } catch (error) {
          console.error("FAILED LOAD CUSTOMIZATION:", error);
        }
      } else {
        // LOGOUT RESET
        setTasks([]);

        setProfileImage("");

        setEquippedItems({
          hair: "default",
          clothes: "default",
          wallpaper: "default",
          windowView: "default",
          desk: "default",
        });

        setIsCustomizationLoaded(false);
      }

      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // AUTO SAVE CUSTOMIZATION
  useEffect(() => {
    async function saveCustomization() {
      if (!currentUser || isLoggingOut || !isCustomizationLoaded) {
        return;
      }

      try {
        await setDoc(
          doc(db, "users", currentUser.uid),
          {
            equippedItems,
          },
          { merge: true },
        );
      } catch (error) {
        console.error("FAILED SAVE CUSTOMIZATION:", error);
      }
    }

    const timeout = setTimeout(() => {
      saveCustomization();
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentUser, isLoggingOut, isCustomizationLoaded, equippedItems]);

  useEffect(() => {
    async function saveTasks() {
      if (!currentUser || isLoggingOut) {
        return;
      }

      try {
        await setDoc(
          doc(db, "users", currentUser.uid),

          {
            tasks,
          },

          {
            merge: true,
          },
        );
      } catch (error) {
        console.error("FAILED SAVE TASKS:", error);
      }
    }

    const timeout = setTimeout(() => {
      saveTasks();
    }, 500);

    return () => clearTimeout(timeout);
  }, [tasks, currentUser, isLoggingOut]);

  if (isAuthLoading) {
    return null;
  }

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
        <SceneRenderer equippedItems={equippedItems} />

        <Corkboard onClick={() => setPage("menu")} />

        <div className="top-right-ui">
          {currentUser && <CustomizationButton setPage={setPage} />}

          <ProfileDropdown
            currentUser={currentUser}
            profileImage={profileImage}
            setPage={setPage}
            handleLogout={handleLogout}
            isProfileDropdownOpen={isProfileDropdownOpen}
            setIsProfileDropdownOpen={setIsProfileDropdownOpen}
          />
        </div>

        {tasks.length > 0 && (
          <MiniTaskBoard tasks={tasks} setTasks={setTasks} />
        )}

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

      {page === "tugasMenu" && (
        <TugasMenuPage
          setPage={setPage}
          currentUser={currentUser}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}

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
          equippedItems={equippedItems}
          setEquippedItems={setEquippedItems}
        />
      )}
    </div>
  );
}

export default MainScene;
