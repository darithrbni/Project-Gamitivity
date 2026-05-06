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
