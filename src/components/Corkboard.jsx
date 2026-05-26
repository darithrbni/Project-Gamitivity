import corkboardImage from "../assets/Corkboard.png";

function Corkboard({ onClick }) {
  return (
    <img
      className="corkboard"
      src={corkboardImage}
      alt="Corkboard"
      onClick={onClick}
      draggable={false}
    />
  );
}

export default Corkboard;
