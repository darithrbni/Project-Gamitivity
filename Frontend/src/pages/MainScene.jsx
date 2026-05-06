import { useState } from "react";

import Corkboard from "../components/Corkboard";
import MenuCard from "../components/MenuCard";

import GrafikIcon from "../assets/GrafikIcon.png"
import TugasIcon from "../assets/TugasIcon.png"
import MemoIcon from "../assets/MemoIcon.png"
import TimerIcon from "../assets/TimerIcon.png"
import JadwalIcon from "../assets/JadwalIcon.png"
import TokoIcon from "../assets/TokoIcon.png"

function MainScene() {
  const [page, setPage] = useState("main");

  return (
    <div className="scene">

      {/* MAIN PAGE */}
      {page === "main" && (
        <>
          <Corkboard
            onClick={() => setPage("menu")}
          />
        </>
      )}

      {/* MENU PAGE */}
      {page === "menu" && (
        <>
          <div className="menu-overlay"></div>

          <button
            className="back-button"
            onClick={() => setPage("main")}
          >
            BACK
          </button>

          <div className="menu-wrapper">

            <div className="menu-grid">

                <MenuCard
                title="GRAFIK"
                icon={GrafikIcon}
                />

                <MenuCard
                title="TUGAS"
                icon={TugasIcon}
                />

                <MenuCard
                title="MEMO"
                icon={MemoIcon}
                />

                <MenuCard
                title="TIMER"
                icon={TimerIcon}
                />

                <MenuCard
                title="JADWAL"
                icon={JadwalIcon}
                />

                <MenuCard
                title="TOKO"
                icon={TokoIcon}
                />

            </div>
        </div>
        </>
      )}

    </div>
  );
}

export default MainScene;