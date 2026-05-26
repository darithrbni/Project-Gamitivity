import HangerIcon from "../assets/HangerIcon.png";

function CustomizationButton({ setPage }) {
  return (
    <button
      className="customization-button"
      onClick={() => setPage("customization")}
    >
      <img
        src={HangerIcon}
        alt="Customization"
        className="customization-icon"
      />
    </button>
  );
}

export default CustomizationButton;
