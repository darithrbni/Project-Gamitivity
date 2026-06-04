import { useState } from "react";

import TaskPaper from "../assets/TaskPaper.svg";
import IconBackMenu from "../assets/IconBackMenu.png";

function MemoMenuPage({ setPage, memos, setMemos }) {
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");

  function handleAddMemo() {
    if (!titleInput.trim() || !contentInput.trim()) {
      return;
    }

    const newMemo = {
      id: Date.now(),
      title: titleInput,
      content: contentInput,
    };

    setMemos((prev) => [newMemo, ...prev]);

    setTitleInput("");
    setContentInput("");
  }

  function handleDeleteMemo(id) {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
  }

  return (
    <>
      {/* OVERLAY */}
      <div className="menu-overlay" onClick={() => setPage("main")} />

      {/* BACK */}
      <button className="back-button" onClick={() => setPage("menu")}>
        <img src={IconBackMenu} alt="Back" className="back-button-icon" />
      </button>

      {/* PAGE */}
      <div className="memo-page-wrapper">
        {/* LEFT PAPER */}
        <div className="memo-paper-wrapper">
          <img src={TaskPaper} alt="Memo Paper" className="memo-paper-image" />

          <div className="memo-paper-content">
            <h1 className="memo-title">Memo</h1>

            {/* INPUTS */}
            <div className="memo-input-section">
              <input
                type="text"
                placeholder="Judul memo"
                value={titleInput}
                onChange={(event) => setTitleInput(event.target.value)}
                className="memo-input"
              />

              <textarea
                placeholder="Tulis memo..."
                value={contentInput}
                onChange={(event) => setContentInput(event.target.value)}
                className="memo-textarea"
              />

              <button className="memo-add-button" onClick={handleAddMemo}>
                Tambah Memo
              </button>
            </div>

            {/* MEMOS */}
            <div className="memo-list">
              {memos.map((memo) => (
                <div key={memo.id} className="memo-card">
                  <button
                    className="memo-delete-button"
                    onClick={() => handleDeleteMemo(memo.id)}
                  >
                    ✕
                  </button>

                  <h3>{memo.title}</h3>

                  <p>{memo.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemoMenuPage;
