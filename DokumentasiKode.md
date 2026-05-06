// Struktur Folder
src/
├── assets/
│ ├── images/
│ └── icons/
│
├── components/
│ └── Corkboard.jsx
│
├── pages/
│ └── MainScene.jsx
│
├── styles/
│ ├── App.css
│ └── index.css
│
├── App.jsx
└── main.jsx

// Corkboard.jsx
function Corkboard() {
return (
<div className="corkboard"></div>
);
}
export default Corkboard;

// MainScene.jsx
import Corkboard from "../components/Corkboard";
function MainScene() {
return (
<div className="scene">
<Corkboard />
</div>
);
}
export default MainScene;

// App.css
.scene {
width: 100vw;
height: 100vh;

background-color: #d8c7aa;

position: relative;
}

.corkboard {
width: 350px;
height: 250px;

background-color: #b98d58;
border: 12px solid #5e3c1b;

position: absolute;
top: 100px;
left: 80px;
}

// index.css

- {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }

body {
overflow: hidden;
font-family: sans-serif;
}

App.jsx
import MainScene from "./pages/MainScene"
import "./styles/App.css";

function App() {
return <MainScene />
}

export default App

main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
<StrictMode>
<App />
</StrictMode>,
)
