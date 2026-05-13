import { useState } from "react";

import PasswordVisible from "../assets/PasswordVisible.png";

import PasswordInvisible from "../assets/PasswordInvisible.png";

function LoginPage({ setPage }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <div className="login-wrapper">
        <div className="modern-login-panel">
          {/* TITLE */}
          <h1 className="modern-login-title">LOG IN</h1>

          <p className="modern-login-subtitle">
            Selamat datang! Silakan masuk untuk melanjutkan.
          </p>

          {/* GOOGLE LOGIN */}
          <p className="modern-google-label">Masuk dengan</p>

          <button className="google-login-button">
            <span className="google-logo">G</span>

            <span>Lanjutkan dengan Google</span>
          </button>

          {/* DIVIDER */}
          <div className="login-divider">
            <div className="divider-line"></div>

            <p>atau</p>

            <div className="divider-line"></div>
          </div>

          {/* EMAIL */}
          <div className="modern-input-group">
            <p className="modern-input-label">Email</p>

            <input
              type="text"
              placeholder="Masukkan email"
              className="modern-login-input"
            />
          </div>

          {/* PASSWORD */}
          <div className="modern-input-group">
            <p className="modern-input-label">Password</p>

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className="modern-login-input"
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
          <button className="modern-login-button">Masuk</button>

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
