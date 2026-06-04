import { useState } from "react";
import IconBackMenu from "../assets/IconBackMenu.png";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import auth from "../firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

import PasswordVisible from "../assets/PasswordVisible.png";

import PasswordInvisible from "../assets/PasswordInvisible.png";

function RegisterPage({ setPage }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleRegister() {
    const trimmedUsername = username.trim();

    if (trimmedUsername === "") {
      alert("Username tidak boleh kosong");
      return;
    }

    if (trimmedUsername.length > 20) {
      alert("Username tidak boleh lebih dari 20 karakter");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password tidak sama");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: trimmedUsername,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: trimmedUsername,
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

      alert("Register berhasil!");

      setPage("main");
    } catch (error) {
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
        <div className="register-panel">
          <h1 className="register-title">REGISTER</h1>

          <p className="register-subtitle">
            Buat akun baru untuk memulai perjalananmu!
          </p>

          {/* USERNAME */}
          <div className="register-input-group">
            <p className="register-label">Username</p>

            <input
              type="text"
              placeholder="Masukkan username"
              className="login-input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="register-input-group">
            <p className="register-label">Email</p>

            <input
              type="text"
              placeholder="Masukkan email"
              className="login-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="register-input-group">
            <p className="register-label">Password</p>

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

          {/* CONFIRM PASSWORD */}
          <div className="register-input-group">
            <p className="register-label">Konfirmasi Password</p>

            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Masukkan password lagi"
                className="login-input"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />

              <button
                className="password-visibility-button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <img
                  src={
                    showConfirmPassword ? PasswordVisible : PasswordInvisible
                  }
                  alt="toggle password"
                  className="password-visibility-icon"
                />
              </button>
            </div>
          </div>

          <button className="register-submit-button" onClick={handleRegister}>
            Daftar
          </button>

          <p className="register-login-text">
            Sudah punya akun?
            <span
              className="register-login-link"
              onClick={() => setPage("login")}
            >
              {" "}
              Masuk di sini
            </span>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
