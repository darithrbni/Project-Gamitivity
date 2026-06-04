import IconBackMenu from "../assets/IconBackMenu.png";

function GrafikMenuPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <button className="back-button" onClick={() => setPage("menu")}>
        <img src={IconBackMenu} alt="Back" className="back-button-icon" />
      </button>
    </>
  );
}

export default GrafikMenuPage;
