import Corkboard from "../components/Corkboard";
import MenuCard from "../components/MenuCard";

import GrafikIcon from "../assets/GrafikIcon.png"
import TugasIcon from "../assets/TugasIcon.png"
import MemoIcon from "../assets/MemoIcon.png"
import TimerIcon from "../assets/TimerIcon.png"
import JadwalIcon from "../assets/JadwalIcon.png"
import TokoIcon from "../assets/TokoIcon.png"

function MainScene() {
  return (
    <div className="scene">
      <Corkboard />
      <MenuCard
        title="GRAFIK"
        icon={GrafikIcon}
        />
    </div>
  );
}

export default MainScene;