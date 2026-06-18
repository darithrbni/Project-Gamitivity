import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

import CoinDisplay from "../components/CoinDisplay";

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
  const [memos, setMemos] = useState([]);
  // PLAYER COINS
  //const [coins, setCoins] = useState(0);
  // PLAYER COINS CHEAT
  const [coins, setCoins] = useState(999999);
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
    accessory: "default",
    wallpaper: "default",
    window: "default",
    windowView: "forest",
    desk: "default",
  });

  // OWNED CUSTOMIZATION ITEMS
  const [ownedItems, setOwnedItems] = useState({
    hair: ["default"],
    clothes: ["default"],
    accessory: ["default"],
    wallpaper: ["default"],
    window: ["default"],
    windowView: ["forest"],
    desk: ["default"],
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
            setCoins(data.coins || 99999);
            setMemos(data.memos || []);

            setProfileImage(data.photoURL || "");

            setEquippedItems(
              data.equippedItems || {
                hair: "default",
                clothes: "default",
                accessory: "default",
                wallpaper: "default",
                window: "default",
                windowView: "forest",
                desk: "default",
              },
            );

            setIsCustomizationLoaded(true);
          } else {
            // USER DOC DOESN'T EXIST
            setCoins(99999);
            setProfileImage("");

            setEquippedItems({
              hair: "default",
              clothes: "default",
              accessory: "default",
              wallpaper: "default",
              window: "default",
              windowView: "forest",
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
        setCoins(999999);
        setProfileImage("");
        setMemos([]);

        setEquippedItems({
          hair: "default",
          clothes: "default",
          accessory: "default",
          wallpaper: "default",
          window: "default",
          windowView: "forest",
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

  useEffect(() => {
    async function saveCoins() {
      if (!currentUser || isLoggingOut) {
        return;
      }

      try {
        await setDoc(
          doc(db, "users", currentUser.uid),

          {
            coins,
          },

          {
            merge: true,
          },
        );
      } catch (error) {
        console.error("FAILED SAVE COINS:", error);
      }
    }

    const timeout = setTimeout(() => {
      saveCoins();
    }, 500);

    return () => clearTimeout(timeout);
  }, [coins, currentUser, isLoggingOut]);

  useEffect(() => {
    async function saveMemos() {
      if (!currentUser || isLoggingOut) {
        return;
      }

      try {
        await setDoc(
          doc(db, "users", currentUser.uid),

          {
            memos,
          },

          {
            merge: true,
          },
        );
      } catch (error) {
        console.error("FAILED SAVE MEMOS:", error);
      }
    }

    const timeout = setTimeout(() => {
      saveMemos();
    }, 500);

    return () => clearTimeout(timeout);
  }, [memos, currentUser, isLoggingOut]);

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
          {currentUser && <CoinDisplay coins={coins} />}
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

        <AnimatePresence>
          {tasks.length > 0 && (
            <MiniTaskBoard
              tasks={tasks}
              setTasks={setTasks}
              setCoins={setCoins}
            />
          )}
        </AnimatePresence>

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
          setCoins={setCoins}
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
          setCoins={setCoins}
        />
      )}

      {page === "grafikMenu" && <GrafikMenuPage setPage={setPage} />}

      {page === "tugasMenu" && (
        <TugasMenuPage
          setPage={setPage}
          currentUser={currentUser}
          tasks={tasks}
          setTasks={setTasks}
          setCoins={setCoins}
        />
      )}

      {page === "memoMenu" && (
        <MemoMenuPage setPage={setPage} memos={memos} setMemos={setMemos} />
      )}

      {page === "jadwalMenu" && (
        <JadwalMenuPage setPage={setPage} 
          setPage={setPage}
          
        />
        
      )}

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
          coins={coins}
          setCoins={setCoins}
          ownedItems={ownedItems}
          setOwnedItems={setOwnedItems}
        />
      )}
    </div>
  );
}

export default MainScene;
