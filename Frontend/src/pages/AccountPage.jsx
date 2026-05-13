import ProfilePlaceholder from "../assets/ProfilePlaceholder.png";

import UserIcon from "../assets/UserIcon.png";
import EmailIcon from "../assets/EmailIcon.png";
import CalendarIcon from "../assets/CalendarIcon.png";
import MottoIcon from "../assets/MottoIcon.png";

import TotalFocusIcon from "../assets/TotalFocusIcon.png";
import TotalCoinIcon from "../assets/TotalCoinIcon.png";
import TotalTaskIcon from "../assets/TotalTaskIcon.png";
import StreakIcon from "../assets/StreakIcon.png";

import AchievementPlaceholder from "../assets/AchievementPlaceholder.png";

function AccountPage({ setPage, currentUser, handleLogout }) {
  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <div className="accountpage-wrapper">
        <div className="accountpage-container">
          {/* CLOSE BUTTON */}
          <button
            className="accountpage-close-button"
            onClick={() => setPage("main")}
          >
            ✕
          </button>

          {/* SIDEBAR */}
          <div className="accountpage-sidebar">
            <img
              src={ProfilePlaceholder}
              alt="Profile"
              className="accountpage-avatar"
            />

            <h2 className="accountpage-username">
              {currentUser?.displayName || "User"}
            </h2>

            <p className="accountpage-email">{currentUser?.email}</p>

            <div className="accountpage-badge">✨ Focus Explorer</div>

            <div className="accountpage-sidebar-menu">
              <button className="accountpage-sidebar-item active">
                Overview
              </button>

              <button className="accountpage-sidebar-item">Stats</button>

              <button className="accountpage-sidebar-item">Achievements</button>

              <button className="accountpage-sidebar-item">
                Customization
              </button>

              <button className="accountpage-sidebar-item">
                Account Settings
              </button>

              <button className="accountpage-sidebar-item">App Settings</button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="accountpage-content">
            <h1 className="accountpage-title">My Profile</h1>

            <p className="accountpage-subtitle">
              Here's your productivity journey! ✨
            </p>

            {/* PROFILE INFO */}
            <div className="accountpage-info-box">
              <div className="accountpage-info-row">
                <img src={UserIcon} alt="" className="accountpage-info-icon" />

                <span>Username</span>

                <p>{currentUser?.displayName || "-"}</p>
              </div>

              <div className="accountpage-info-row">
                <img src={EmailIcon} alt="" className="accountpage-info-icon" />

                <span>Email</span>

                <p>{currentUser?.email || "-"}</p>
              </div>

              <div className="accountpage-info-row">
                <img
                  src={CalendarIcon}
                  alt=""
                  className="accountpage-info-icon"
                />

                <span>Member Since</span>

                <p>-</p>
              </div>

              <div className="accountpage-info-row">
                <img src={MottoIcon} alt="" className="accountpage-info-icon" />

                <span>Motto</span>

                <p>One step at a time.</p>
              </div>
            </div>

            {/* STATS */}
            <h2 className="accountpage-section-title">Productivity Stats</h2>

            <div className="accountpage-stats">
              <div className="accountpage-stat-card">
                <img
                  src={TotalFocusIcon}
                  alt=""
                  className="accountpage-stat-icon"
                />

                <h3>Focus Time</h3>

                <p>-</p>

                <span>Total</span>
              </div>

              <div className="accountpage-stat-card">
                <img
                  src={TotalCoinIcon}
                  alt=""
                  className="accountpage-stat-icon"
                />

                <h3>Coins Earned</h3>

                <p>-</p>

                <span>Sessions</span>
              </div>

              <div className="accountpage-stat-card">
                <img
                  src={TotalTaskIcon}
                  alt=""
                  className="accountpage-stat-icon"
                />

                <h3>Tasks Done</h3>

                <p>-</p>

                <span>Completed</span>
              </div>

              <div className="accountpage-stat-card">
                <img
                  src={StreakIcon}
                  alt=""
                  className="accountpage-stat-icon"
                />

                <h3>Streak</h3>

                <p>-</p>

                <span>Days</span>
              </div>
            </div>

            {/* ACHIEVEMENTS */}
            <div className="accountpage-achievement-header">
              <h2 className="accountpage-section-title">Achievements</h2>

              <button className="accountpage-viewall-button">View All</button>
            </div>

            <div className="accountpage-achievement-box">
              <img
                src={AchievementPlaceholder}
                alt=""
                className="accountpage-achievement-placeholder"
              />

              <p>No achievements yet.</p>

              <span>Keep focusing and earn your first achievement!</span>
            </div>

            {/* BUTTONS */}
            <div className="accountpage-bottom-buttons">
              <button className="accountpage-edit-button">Edit Profile</button>

              <button
                className="accountpage-logout-button"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPage;
