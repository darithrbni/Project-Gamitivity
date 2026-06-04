import MenuCard from "../components/MenuCard";

import IconBackMenu from "../assets/IconBackMenu.png";
import BasicTimerIcon from "../assets/BasicTimerIcon.png";
import StopwatchIcon from "../assets/StopwatchIcon.png";
import PomodoroIcon from "../assets/PomodoroIcon.png";

function TimerMenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <button className="back-button" onClick={() => setPage("menu")}>
        <img src={IconBackMenu} alt="Back" className="back-button-icon" />
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
