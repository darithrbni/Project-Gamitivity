import { useState } from "react";

import idleImage from "../assets/placeholderIdle.png";
import hoverImage from "../assets/placeholderHover.png";
import clickImage from "../assets/placeholderClick.png";

function Corkboard() {
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

      onClick={() => {
        console.log("Corkboard diklik");
      }}
    />
  );
}

export default Corkboard;