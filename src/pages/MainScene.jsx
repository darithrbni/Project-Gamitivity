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
  const [equippedHair, setEquippedHair] = useState("default");

  const [equippedClothes, setEquippedClothes] = useState("default");

  const [equippedWallpaper, setEquippedWallpaper] = useState("default");

  const [equippedDesk, setEquippedDesk] = useState("default");

  const [equippedChair, setEquippedChair] = useState("default");

  const [equippedWindowView, setEquippedWindowView] = useState("default");

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

            setProfileImage(data.photoURL || "");

            setEquippedHair(data.equippedHair || "default");

            setEquippedClothes(data.equippedClothes || "default");

            setEquippedWallpaper(data.equippedWallpaper || "default");

            setEquippedDesk(data.equippedDesk || "default");

            setEquippedChair(data.equippedChair || "default");

            setEquippedWindowView(data.equippedWindowView || "default");

            setIsCustomizationLoaded(true);
          } else {
            // USER DOC DOESN'T EXIST
            setProfileImage("");

            setEquippedHair("default");

            setEquippedClothes("default");

            setEquippedWallpaper("default");

            setEquippedDesk("default");

            setEquippedChair("default");

            setEquippedWindowView("default");

            setIsCustomizationLoaded(true);
          }
        } catch (error) {
          console.error("FAILED LOAD CUSTOMIZATION:", error);
        }
      } else {
        // LOGOUT RESET
        setProfileImage("");

        setEquippedHair("default");

        setEquippedClothes("default");

        setEquippedWallpaper("default");

        setEquippedDesk("default");

        setEquippedChair("default");

        setEquippedWindowView("default");

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
            equippedHair,
            equippedClothes,
            equippedWallpaper,
            equippedDesk,
            equippedChair,
            equippedWindowView,
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
  }, [
    currentUser,
    isLoggingOut,
    isCustomizationLoaded,

    equippedHair,
    equippedClothes,
    equippedWallpaper,
    equippedDesk,
    equippedChair,
    equippedWindowView,
  ]);

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
        <SceneRenderer
          equippedHair={equippedHair}
          equippedClothes={equippedClothes}
          equippedWallpaper={equippedWallpaper}
          equippedDesk={equippedDesk}
          equippedChair={equippedChair}
          equippedWindowView={equippedWindowView}
        />

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
          equippedHair={equippedHair}
          setEquippedHair={setEquippedHair}
          equippedClothes={equippedClothes}
          setEquippedClothes={setEquippedClothes}
          equippedWallpaper={equippedWallpaper}
          setEquippedWallpaper={setEquippedWallpaper}
          equippedDesk={equippedDesk}
          setEquippedDesk={setEquippedDesk}
          equippedChair={equippedChair}
          setEquippedChair={setEquippedChair}
          equippedWindowView={equippedWindowView}
          setEquippedWindowView={setEquippedWindowView}
        />
      )}
    </div>
  );
}

export default MainScene;
