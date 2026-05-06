# Struktur Folder
src/
├── assets/
│
├── components/
│   ├── Corkboard.jsx
│   └── MenuCard.jsx
│
├── pages/
│   ├── MainScene.jsx
│   ├── MenuPage.jsx
│   ├── TimerMenuPage.jsx
│   ├── GrafikMenuPage.jsx
│   ├── TugasMenuPage.jsx
│   ├── MemoMenuPage.jsx
│   ├── JadwalMenuPage.jsx
│   └── TokoMenuPage.jsx
│
├── styles/
│   ├── App.css
│   └── index.css
│
├── App.jsx
└── main.jsx






# components
## Corkboard.jsx
import { useState } from "react";

import idleImage from "../assets/placeholderIdle.png";
import hoverImage from "../assets/placeholderHover.png";
import clickImage from "../assets/placeholderClick.png";

function Corkboard({ onClick }) {
  const [boardState, setBoardState] = useState("idle");

  function getCurrentImage() {
    if (boardState === "hover") return hoverImage;
    if (boardState === "click") return clickImage;

    return idleImage;
  }

  return (
    <img
      className="corkboard"
      src={getCurrentImage()}
      alt="Corkboard"

      onMouseEnter={() => setBoardState("hover")}
      onMouseLeave={() => setBoardState("idle")}
      onMouseDown={() => setBoardState("click")}
      onMouseUp={() => setBoardState("hover")}

      onClick={onClick}
    />
  );
}

export default Corkboard;







## MenuCard.jsx
function MenuCard({ title, icon, onClick }) {
  return (
    <button
      className="menu-card"
      onClick={onClick}
    >
      <img
        className="menu-card-icon"
        src={icon}
        alt={title}
      />

      <p className="menu-card-title">
        {title}
      </p>
    </button>
  );
}

export default MenuCard;






# pages
## MainScene.jsx
import { useState } from "react";

import Corkboard from "../components/Corkboard";

import MenuPage from "./MenuPage";
import TimerMenuPage from "./TimerMenuPage";
import GrafikMenuPage from "./GrafikMenuPage";
import TugasMenuPage from "./TugasMenuPage";
import MemoMenuPage from "./MemoMenuPage";
import JadwalMenuPage from "./JadwalMenuPage";
import TokoMenuPage from "./TokoMenuPage";

function MainScene() {
  const [page, setPage] = useState("main");

  return (
    <div className="scene">
      {page === "main" && <Corkboard onClick={() => setPage("menu")} />}

      {page === "menu" && <MenuPage setPage={setPage} />}

      {page === "timerMenu" && <TimerMenuPage setPage={setPage} />}

      {page === "grafikMenu" && <GrafikMenuPage setPage={setPage} />}

      {page === "tugasMenu" && <TugasMenuPage setPage={setPage} />}

      {page === "memoMenu" && <MemoMenuPage setPage={setPage} />}

      {page === "jadwalMenu" && <JadwalMenuPage setPage={setPage} />}

      {page === "tokoMenu" && <TokoMenuPage setPage={setPage} />}
    </div>
  );
}

export default MainScene;







## MenuPage.jsx
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






## TimerMenuPage.jsx
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






## GrafikMenuPage.jsx
function GrafikMenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay"></div>

      <button className="back-button" onClick={() => setPage("menu")}>
        BACK
      </button>
    </>
  );
}

export default GrafikMenuPage;








## JadwalMenuPage.jsx
function JadwalMenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay"></div>

      <button className="back-button" onClick={() => setPage("menu")}>
        BACK
      </button>
    </>
  );
}

export default JadwalMenuPage;





## TugasMenuPage.jsx
function TugasMenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay"></div>

      <button className="back-button" onClick={() => setPage("menu")}>
        BACK
      </button>
    </>
  );
}

export default TugasMenuPage;







## MemoMenuPage.jsx
function MemoMenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay"></div>

      <button className="back-button" onClick={() => setPage("menu")}>
        BACK
      </button>
    </>
  );
}

export default MemoMenuPage;





## TokoMenuPage.jsx
function TokoMenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay"></div>

      <button className="back-button" onClick={() => setPage("menu")}>
        BACK
      </button>
    </>
  );
}

export default TokoMenuPage;









# styles
## App.css
.scene {
  width: 100vw;
  height: 100vh;

  background-color: #d8c7aa;

  position: relative;
}

.corkboard {
  width: 350px;

  position: absolute;
  top: 100px;
  left: 80px;

  cursor: pointer;

  user-select: none;
}

.menu-card {
  width: 260px;
  height: 260px;

  border-radius: 40px;
  border: 6px solid #f07c7c;

  background-color: #f5f5f5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  cursor: pointer;

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  box-shadow: 0 8px 0 rgba(0, 0, 0, 0.15);
}

.menu-card:hover {
  transform: scale(1.05);

  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}

.menu-card:active {
  transform: scale(0.97);

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.menu-card-icon {
  width: 120px;
  height: 120px;

  object-fit: contain;
}

.menu-card-title {
  font-size: 2rem;
  color: #d17b00;

  font-weight: bold;
}

.menu-overlay {
  position: absolute;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.55);

  z-index: 10;
}

.menu-wrapper {
  position: absolute;
  inset: 0;

  z-index: 20;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
}

.menu-grid {
  display: grid;

  grid-template-columns: repeat(3, 260px);

  gap: 40px;

  transform: scale(0.9);
}

.back-button {
  position: absolute;

  top: 20px;
  left: 20px;

  z-index: 30;

  padding: 12px 20px;

  font-size: 1rem;
  font-weight: bold;

  cursor: pointer;
}

@media (min-width: 1600px) {
  .menu-grid {
    transform: scale(1.1);
  }
}

@media (max-width: 1200px) {
  .menu-grid {
    transform: scale(0.8);
  }
}

@media (max-width: 900px) {
  .menu-grid {
    transform: scale(0.7);
  }
}






## index.css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow: hidden;
  font-family: sans-serif;
}








# App.jsx
import MainScene from "./pages/MainScene"
import "./styles/App.css";

function App() {
  return <MainScene />
}

export default App







# main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)





# index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>project-gamitivity</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

