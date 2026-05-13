function LoginPage({ setPage }) {
  return (
    <>
      <div className="menu-overlay"></div>

      <div className="menu-wrapper">
        <div className="timer-panel">
          <button className="back-button" onClick={() => setPage("main")}>
            BACK
          </button>

          <h1>LOGIN PAGE</h1>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
