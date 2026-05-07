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

          <MenuCard title="POMODORO" icon={PomodoroIcon} />
        </div>
      </div>
    </>
  );
}

export default TimerMenuPage;
