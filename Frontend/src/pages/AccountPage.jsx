import ProfilePlaceholder from "../assets/ProfilePlaceholder.png";

function AccountPage({ setPage, currentUser, handleLogout }) {
  return (
    <div className="accountpage-overlay">
      <div className="accountpage-container">
        <button
          className="accountpage-close-button"
          onClick={() => setPage("main")}
        >
          ✕
        </button>

        <h1 className="accountpage-title">My Profile</h1>

        <div className="accountpage-header">
          <img
            src={ProfilePlaceholder}
            alt="Profile"
            className="accountpage-avatar"
          />

          <div className="accountpage-userinfo">
            <h2>{currentUser?.displayName || "User"}</h2>

            <p>{currentUser?.email}</p>
          </div>
        </div>

        <div className="accountpage-stats">
          <div className="accountpage-stat-card">
            <h3>Focus Time</h3>

            <p>0 Hours</p>
          </div>

          <div className="accountpage-stat-card">
            <h3>Pomodoro</h3>

            <p>0 Sessions</p>
          </div>

          <div className="accountpage-stat-card">
            <h3>Tasks Done</h3>

            <p>0 Tasks</p>
          </div>
        </div>

        <button className="accountpage-logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
