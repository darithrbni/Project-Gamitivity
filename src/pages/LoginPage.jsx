import { useState } from "react";
import IconBackMenu from "../assets/IconBackMenu.png";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import auth from "../firebase/auth";

import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase/config";

const provider = new GoogleAuthProvider();

import PasswordVisible from "../assets/PasswordVisible.png";

import PasswordInvisible from "../assets/PasswordInvisible.png";

import GoogleIcon from "../assets/GoogleIcon.png";

function LoginPage({ setPage }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login berhasil!");

      setPage("main");
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleGoogleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const userRef = doc(db, "users", user.uid);

      const userSnap = await getDoc(userRef);

      // USER BARU
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          username: user.displayName || "User",
          motto: "Let's study with me!",
          photoURL: "",

          equippedItems: {
            hair: "default",
            clothes: "default",
            wallpaper: "default",
            desk: "default",
            windowView: "default",
          },

          createdAt: serverTimestamp(),
        });
      }

      alert("Login Google berhasil!");

      setPage("main");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        return;
      }
      alert(error.message);
    }
  }

  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <button className="back-button" onClick={() => setPage("main")}>
        <img src={IconBackMenu} alt="Back" className="back-button-icon" />
      </button>

      <div className="login-wrapper">
        <div className="login-panel">
          {/* TITLE */}
          <h1 className="login-title">LOG IN</h1>

          <p className="login-subtitle">
            Selamat datang! Silakan masuk untuk melanjutkan.
          </p>

          {/* GOOGLE LOGIN */}
          <p className="google-label">Masuk dengan</p>

          <button className="google-login-button" onClick={handleGoogleLogin}>
            <img className="google-logo" src={GoogleIcon} alt="Google" />

            <span>Lanjutkan dengan Google</span>
          </button>

          {/* DIVIDER */}
          <div className="login-divider">
            <div className="divider-line"></div>

            <p>atau</p>

            <div className="divider-line"></div>
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <p className="input-label">Email</p>

            <input
              type="text"
              placeholder="Masukkan email"
              className="login-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <p className="input-label">Password</p>

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className="login-input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button
                className="password-visibility-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? PasswordVisible : PasswordInvisible}
                  alt="toggle password"
                  className="password-visibility-icon"
                />
              </button>
            </div>
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="login-options-row">
            <label className="remember-me">
              <input type="checkbox" />

              <span>Ingat saya</span>
            </label>

            <button className="forgot-password-button">Lupa password?</button>
          </div>

          {/* LOGIN BUTTON */}
          <button className="login-submit-button" onClick={handleLogin}>
            Masuk
          </button>

          {/* REGISTER */}
          <p className="login-register-text">
            Belum punya akun?
            <span
              className="login-register-link"
              onClick={() => setPage("register")}
            >
              {" "}
              Buat akun
            </span>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
