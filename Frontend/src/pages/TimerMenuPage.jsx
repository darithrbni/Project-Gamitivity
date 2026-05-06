import MenuCard from "../components/MenuCard";

import TimerIcon from "../assets/TimerIcon.png";

function TimerMenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay"></div>

      <button className="back-button" onClick={() => setPage("menu")}>
        BACK
      </button>

      <div className="menu-wrapper">
        <div className="menu-grid">
          <MenuCard title="TIMER" icon={TimerIcon} />

          <MenuCard title="POMODORO" icon={TimerIcon} />

          <MenuCard title="STOPWATCH" icon={TimerIcon} />
        </div>
      </div>
    </>
  );
}

export default TimerMenuPage;
