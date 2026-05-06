import { useState } from "react";

import Corkboard from "../components/Corkboard";
import MenuCard from "../components/MenuCard";

import GrafikIcon from "../assets/GrafikIcon.png";
import TugasIcon from "../assets/TugasIcon.png";
import MemoIcon from "../assets/MemoIcon.png";
import TimerIcon from "../assets/TimerIcon.png";
import JadwalIcon from "../assets/JadwalIcon.png";
import TokoIcon from "../assets/TokoIcon.png";

function MainScene() {
  const [page, setPage] = useState("main");

  return (
    <div className="scene">
      {/* MAIN PAGE */}
      {page === "main" && (
        <>
          <Corkboard onClick={() => setPage("menu")} />
        </>
      )}

      {/* MENU PAGE */}
      {page === "menu" && (
        <>
          <div className="menu-overlay"></div>

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
      )}

      {/* TIMER MENU */}
      {page === "timerMenu" && (
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
      )}

      {/* GRAFIK MENU */}
      {page === "grafikMenu" && (
        <>
          <div className="menu-overlay"></div>

          <button className="back-button" onClick={() => setPage("menu")}>
            BACK
          </button>
        </>
      )}

      {/* TUGAS MENU */}
      {page === "tugasMenu" && (
        <>
          <div className="menu-overlay"></div>

          <button className="back-button" onClick={() => setPage("menu")}>
            BACK
          </button>
        </>
      )}

      {/* MEMO MENU */}
      {page === "memoMenu" && (
        <>
          <div className="menu-overlay"></div>

          <button className="back-button" onClick={() => setPage("menu")}>
            BACK
          </button>
        </>
      )}

      {/* JADWAL MENU */}
      {page === "jadwalMenu" && (
        <>
          <div className="menu-overlay"></div>

          <button className="back-button" onClick={() => setPage("menu")}>
            BACK
          </button>
        </>
      )}

      {/* TOKO MENU */}
      {page === "tokoMenu" && (
        <>
          <div className="menu-overlay"></div>

          <button className="back-button" onClick={() => setPage("menu")}>
            BACK
          </button>
        </>
      )}
    </div>
  );
}

export default MainScene;
