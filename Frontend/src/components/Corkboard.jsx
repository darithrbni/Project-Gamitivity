import { useState } from "react";

import idleImage from "../assets/PlaceholderIdle.png";
import hoverImage from "../assets/PlaceholderHover.png";
import clickImage from "../assets/PlaceholderClick.png";

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
