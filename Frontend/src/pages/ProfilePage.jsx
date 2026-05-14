import { useState } from "react";

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
import BackButton2 from "../assets/BackButton2.png";
import UploadIcon from "../assets/UploadIcon.png";

function ProfilePage({ setPage, currentUser, handleLogout }) {
  const [activeProfileTab, setActiveProfileTab] = useState("overview");
  const [hasProfileChanges, setHasProfileChanges] = useState(false);
  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <div className="profilepage-wrapper">
        <div className="profilepage-container">
          {/* CLOSE BUTTON */}
          {activeProfileTab !== "editProfile" && (
            <button
              className="profilepage-close-button"
              onClick={() => setPage("main")}
            >
              ✕
            </button>
          )}

          {/* SIDEBAR */}
          <div className="profilepage-sidebar">
            <img
              src={ProfilePlaceholder}
              alt="Profile"
              className="profilepage-avatar"
            />

            <h2 className="profilepage-username">
              {currentUser?.displayName || "User"}
            </h2>

            <p className="profilepage-email">{currentUser?.email}</p>

            <div className="profilepage-badge">✨ Focus Explorer</div>

            <div className="profilepage-sidebar-menu">
              <button
                className={
                  activeProfileTab === "editProfile"
                    ? "profilepage-sidebar-item active"
                    : "profilepage-sidebar-item"
                }
                onClick={() => setActiveProfileTab("editProfile")}
              >
                Edit Profile
              </button>

              <button className="profilepage-sidebar-item">Stats</button>

              <button
                className={
                  activeProfileTab === "achievements"
                    ? "profilepage-sidebar-item active"
                    : "profilepage-sidebar-item"
                }
                onClick={() => setActiveProfileTab("achievements")}
              >
                Achievements
              </button>

              <button className="profilepage-sidebar-item">
                Customization
              </button>

              <button className="profilepage-sidebar-item">
                Profile Settings
              </button>

              <button className="profilepage-sidebar-item">App Settings</button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="profilepage-content">
            {activeProfileTab === "overview" && (
              <>
                <h1 className="profilepage-title">My Profile</h1>
                <p className="profilepage-subtitle">
                  Here's your productivity journey! ✨
                </p>
              </>
            )}

            {activeProfileTab === "overview" && (
              <>
                {/* PROFILE INFO */}
                <div className="profilepage-info-box">
                  <div className="profilepage-info-row">
                    <img
                      src={UserIcon}
                      alt=""
                      className="profilepage-info-icon"
                    />

                    <span>Username</span>

                    <p>{currentUser?.displayName || "-"}</p>
                  </div>

                  <div className="profilepage-info-row">
                    <img
                      src={EmailIcon}
                      alt=""
                      className="profilepage-info-icon"
                    />

                    <span>Email</span>

                    <p>{currentUser?.email || "-"}</p>
                  </div>

                  <div className="profilepage-info-row">
                    <img
                      src={CalendarIcon}
                      alt=""
                      className="profilepage-info-icon"
                    />

                    <span>Member Since</span>

                    <p>-</p>
                  </div>

                  <div className="profilepage-info-row">
                    <img
                      src={MottoIcon}
                      alt=""
                      className="profilepage-info-icon"
                    />

                    <span>Motto</span>

                    <p>One step at a time.</p>
                  </div>
                </div>

                {/* STATS */}
                <h2 className="profilepage-section-title">
                  Productivity Stats
                </h2>

                <div className="profilepage-stats">
                  <div className="profilepage-stat-card">
                    <img
                      src={TotalFocusIcon}
                      alt=""
                      className="profilepage-stat-icon"
                    />

                    <h3>Focus Time</h3>

                    <p>-</p>

                    <span>Total</span>
                  </div>

                  <div className="profilepage-stat-card">
                    <img
                      src={TotalCoinIcon}
                      alt=""
                      className="profilepage-stat-icon"
                    />

                    <h3>Coins Earned</h3>

                    <p>-</p>

                    <span>Sessions</span>
                  </div>

                  <div className="profilepage-stat-card">
                    <img
                      src={TotalTaskIcon}
                      alt=""
                      className="profilepage-stat-icon"
                    />

                    <h3>Tasks Done</h3>

                    <p>-</p>

                    <span>Completed</span>
                  </div>

                  <div className="profilepage-stat-card">
                    <img
                      src={StreakIcon}
                      alt=""
                      className="profilepage-stat-icon"
                    />

                    <h3>Streak</h3>

                    <p>-</p>

                    <span>Days</span>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="profilepage-bottom-buttons">
                  <button
                    className="profilepage-edit-button"
                    onClick={() => setActiveProfileTab("editProfile")}
                  >
                    Edit Profile
                  </button>

                  <button
                    className="profilepage-logout-button"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              </>
            )}
            {activeProfileTab === "achievements" && (
              <>
                <div className="profilepage-achievement-header">
                  <h1 className="profilepage-title">Achievements</h1>
                </div>

                <div className="profilepage-achievement-box">
                  <img
                    src={AchievementPlaceholder}
                    alt=""
                    className="profilepage-achievement-placeholder"
                  />

                  <p>No achievements yet.</p>

                  <span>Keep focusing and earn your first achievement!</span>
                </div>
              </>
            )}
            {activeProfileTab === "editProfile" && (
              <>
                <div className="editprofile-header">
                  <button
                    className="editprofile-back-button"
                    onClick={() => setActiveProfileTab("overview")}
                  >
                    <img src={BackButton2} alt="Back" />
                  </button>

                  <div>
                    <h1 className="profilepage-title">Edit Profile</h1>

                    <p className="profilepage-subtitle">
                      Update your profile information ✨
                    </p>
                  </div>

                  <button
                    className={
                      hasProfileChanges
                        ? "editprofile-save-header-button active"
                        : "editprofile-save-header-button"
                    }
                  >
                    Save Changes
                  </button>
                </div>

                <div className="editprofile-grid">
                  {/* USERNAME */}
                  <div className="editprofile-card">
                    <h2>Username</h2>

                    <p>This is your display name.</p>

                    <input
                      onChange={() => setHasProfileChanges(true)}
                      type="text"
                      className="editprofile-input"
                      placeholder="Enter username"
                    />
                  </div>

                  {/* MOTTO */}
                  <div className="editprofile-card">
                    <h2>Motto</h2>

                    <p>Your profile motto.</p>

                    <textarea
                      onChange={() => setHasProfileChanges(true)}
                      className="editprofile-textarea"
                      placeholder="Write your motto..."
                    />
                  </div>

                  {/* PROFILE PICTURE */}
                  <div className="editprofile-picture-card">
                    <div className="editprofile-picture-header">
                      <h2>Profile Picture</h2>

                      <p>Upload and update your profile picture.</p>
                    </div>

                    <div className="editprofile-picture-content">
                      {/* PREVIEW */}
                      <div className="editprofile-picture-preview">
                        <img
                          src={ProfilePlaceholder}
                          alt="Preview"
                          className="editprofile-picture-preview-image"
                        />
                      </div>

                      {/* UPLOAD */}
                      <div className="editprofile-upload-box">
                        <img
                          src={UploadIcon}
                          alt="Upload"
                          className="editprofile-upload-icon"
                        />
                        <p>Click to upload image</p>
                        <span>JPG, PNG up to 2MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
