import { useEffect, useState } from "react";

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

import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db } from "../firebase/config";

function ProfilePage({ setPage, currentUser, handleLogout }) {
  const [activeProfileTab, setActiveProfileTab] = useState("overview");
  const [hasProfileChanges, setHasProfileChanges] = useState(false);
  const [username, setUsername] = useState("");
  const [motto, setMotto] = useState("");
  const [savedUsername, setSavedUsername] = useState("");
  const [savedMotto, setSavedMotto] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const [originalMotto, setOriginalMotto] = useState("");

  useEffect(() => {
    async function loadProfileData() {
      if (!currentUser) return;

      const docRef = doc(db, "users", currentUser.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setUsername(data.username || "");
        setMotto(data.motto || "Let's study with me!");

        setSavedUsername(data.username || "");
        setSavedMotto(data.motto || "Let's study with me!");

        setOriginalUsername(data.username || "");
        setOriginalMotto(data.motto || "Let's study with me!");
      }
    }

    loadProfileData();
  }, [currentUser]);

  useEffect(() => {
    if (username !== originalUsername || motto !== originalMotto) {
      setHasProfileChanges(true);
    } else {
      setHasProfileChanges(false);
    }
  }, [username, motto, originalUsername, originalMotto]);

  function handleCancelEditProfile() {
    setUsername(savedUsername);
    setMotto(savedMotto);
    setActiveProfileTab("overview");
  }

  async function handleSaveProfile() {
    if (!currentUser) return;

    try {
      await updateProfile(currentUser, {
        displayName: username,
      });

      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          username,
          motto,
        },
        { merge: true },
      );

      setOriginalUsername(username);
      setOriginalMotto(motto);

      setSavedUsername(username);
      setSavedMotto(motto);

      alert("Profile updated!");
      setActiveProfileTab("overview");
    } catch (error) {
      alert(error.message);
    }
  }

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

            <h2 className="profilepage-username">{savedUsername || "User"}</h2>

            <p className="profilepage-email">{currentUser?.email}</p>

            <div className="profilepage-badge">✨ Focus Explorer</div>

            <div className="profilepage-sidebar-menu">
              <button
                className={
                  activeProfileTab === "overview" ||
                  activeProfileTab === "editProfile"
                    ? "profilepage-sidebar-item active"
                    : "profilepage-sidebar-item"
                }
                onClick={() => setActiveProfileTab("overview")}
              >
                Overview
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

                    <p>{savedUsername || "-"}</p>
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

                    <p>{savedMotto}</p>
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
                    onClick={handleCancelEditProfile}
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
                    onClick={handleSaveProfile}
                    disabled={!hasProfileChanges}
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
                      type="text"
                      className="editprofile-input"
                      placeholder="Enter username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </div>

                  {/* MOTTO */}
                  <div className="editprofile-card">
                    <h2>Motto</h2>

                    <p>Your profile motto.</p>

                    <textarea
                      className="editprofile-textarea"
                      placeholder="Write your motto..."
                      value={motto}
                      onChange={(event) => setMotto(event.target.value)}
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
