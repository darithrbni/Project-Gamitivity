import ProfilePlaceholder from "../assets/ProfilePlaceholder.png";
import TriangleIconBrown from "../assets/TriangleIconBrown.png";

function ProfileDropdown({
  currentUser,
  profileImage,
  setPage,
  handleLogout,
  isProfileDropdownOpen,
  setIsProfileDropdownOpen,
}) {
  function toggleDropdown() {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  }

  return (
    <>
      {currentUser ? (
        <div
          className="profile-menu-container"
          onClick={(event) => event.stopPropagation()}
        >
          <button className="profile-button" onClick={toggleDropdown}>
            <img
              src={profileImage || ProfilePlaceholder}
              alt="Profile"
              className="profile-image"
            />

            <span className="profile-username">
              {currentUser?.displayName || "User"}
            </span>

            <img
              src={TriangleIconBrown}
              alt="Dropdown"
              className={`profile-arrow-icon ${
                isProfileDropdownOpen ? "profile-arrow-open" : ""
              }`}
            />
          </button>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <button
                className="profile-dropdown-item"
                onClick={() => {
                  setPage("profile");

                  setIsProfileDropdownOpen(false);
                }}
              >
                My Account
              </button>

              <button className="profile-dropdown-item">Tutorial</button>

              <button className="profile-dropdown-item">Settings</button>

              <button
                className="profile-dropdown-item-logout"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="auth-buttons">
          <button
            className="register-button"
            onClick={() => setPage("register")}
          >
            REGISTER
          </button>

          <button className="login-button" onClick={() => setPage("login")}>
            LOGIN
          </button>
        </div>
      )}
    </>
  );
}

export default ProfileDropdown;
