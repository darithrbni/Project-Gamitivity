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
  );
}

export default MenuPage;
