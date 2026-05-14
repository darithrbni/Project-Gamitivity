import ProfilePlaceholder from "../assets/ProfilePlaceholder.png";

function ProfileDropdown({
  currentUser,
  setPage,
  handleLogout,
  isProfileDropdownOpen,
  setIsProfileDropdownOpen,
}) {
  return (
    <>
      {currentUser ? (
        <div
          className="profile-menu-container"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            className="profile-button"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <img
              src={ProfilePlaceholder}
              alt="Profile"
              className="profile-image"
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

              <button className="profile-dropdown-item" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button className="login-button" onClick={() => setPage("login")}>
          LOGIN
        </button>
      )}
    </>
  );
}

export default ProfileDropdown;
