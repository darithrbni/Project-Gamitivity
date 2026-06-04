import { useEffect, useState } from "react";

import auth from "../firebase/auth";

import { db } from "../firebase/config";

import { doc, getDoc, setDoc } from "firebase/firestore";

import TaskCard from "../components/TaskCard";
import TaskBoard from "../assets/TaskBoard.svg";
import AddTaskButton from "../assets/TambahTugas.png";

import IconBackMenu from "../assets/IconBackMenu.png";

import { AnimatePresence, Reorder } from "framer-motion";

function TugasMenuPage({ setPage, currentUser, tasks, setTasks, setCoins }) {
  // MODAL
  const [isAddingTask, setIsAddingTask] = useState(false);

  // INPUT
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  // TASK LIST
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteTargetTask, setDeleteTargetTask] = useState(null);

  // ADD TASK
  function handleAddTask() {
    if (taskTitle.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),

      title: taskTitle,

      deadline: taskDeadline,

      description: taskDescription,

      createdAt: new Date().toLocaleDateString("en-GB"),
    };

    setTasks([...tasks, newTask]);

    // RESET
    setTaskTitle("");
    setTaskDeadline("");
    setTaskDescription("");

    setIsAddingTask(false);
  }

  function handleCompleteTask(taskId) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );

    // REWARD
    setCoins((prev) => prev + 999999);
  }

  function handleDeleteTask(taskId) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );

    setDeleteTargetTask(null);

    // JIKA TASK YANG DIBUKA IKUT DIHAPUS
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
  }

  return (
    <>
      {/* OVERLAY */}
      <div
        className="menu-overlay"
        onClick={() => {
          // JIKA MODAL TERBUKA
          if (selectedTask || isAddingTask) {
            return;
          }

          setPage("main");
        }}
      />

      {/* BACK BUTTON */}
      <button className="back-button" onClick={() => setPage("menu")}>
        <img src={IconBackMenu} alt="Back" className="back-button-icon" />
      </button>

      {/* TASK BOARD */}
      <div className="taskboard-wrapper">
        {/* BOARD */}
        <img src={TaskBoard} alt="Task Board" className="taskboard-image" />

        {/* CONTENT */}
        <div className="taskboard-content">
          {/* TITLE */}
          <h1 className="taskboard-title">Tugas Saya</h1>

          {/* TASK LIST */}
          <Reorder.Group
            axis="y"
            values={tasks}
            onReorder={setTasks}
            className="task-list"
          >
            <AnimatePresence>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  setSelectedTask={setSelectedTask}
                  handleCompleteTask={handleCompleteTask}
                  setDeleteTargetTask={setDeleteTargetTask}
                />
              ))}
            </AnimatePresence>
          </Reorder.Group>

          {/* ADD BUTTON */}
          <button
            className="add-task-button"
            onClick={() => {
              setSelectedTask(null);

              setIsAddingTask(true);
            }}
          >
            <img
              src={AddTaskButton}
              alt="Tambah Tugas"
              className="add-task-button-image"
            />
          </button>

          {/* TASK DETAIL PANEL */}
          {selectedTask && (
            <>
              <div className="task-detail-panel">
                {/* CLOSE BUTTON */}
                <button
                  className="task-detail-close"
                  onClick={() => setSelectedTask(null)}
                >
                  ✕
                </button>
                <h2>Informasi Tugas</h2>

                <div className="task-detail-section">
                  <span>Nama Tugas</span>

                  <p>{selectedTask.title}</p>
                </div>

                <div className="task-detail-section">
                  <span>Deadline</span>

                  <p>{selectedTask.deadline}</p>
                </div>

                <div className="task-detail-section">
                  <span>Created At</span>

                  <p>{selectedTask.createdAt}</p>
                </div>

                <div className="task-detail-section">
                  <span>Deskripsi</span>

                  <p>{selectedTask.description || "-"}</p>
                </div>
              </div>
            </>
          )}

          {/* DELETE CONFIRMATION MODAL */}
          {deleteTargetTask && (
            <>
              {/* OVERLAY */}
              <div className="delete-modal-overlay" />

              {/* MODAL */}
              <div className="delete-modal">
                <h2>Hapus Tugas?</h2>

                <p>Apakah Anda yakin ingin menghapus tugas ini?</p>

                <div className="delete-modal-buttons">
                  {/* CANCEL */}
                  <button
                    className="delete-cancel-button"
                    onClick={() => setDeleteTargetTask(null)}
                  >
                    Batal
                  </button>

                  {/* DELETE */}
                  <button
                    className="delete-confirm-button"
                    onClick={() => handleDeleteTask(deleteTargetTask.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ADD TASK MODAL */}
          {isAddingTask && (
            <>
              <div
                className="task-modal-overlay"
                onClick={() => setIsAddingTask(false)}
              />

              <div className="task-modal">
                <h2 className="task-modal-title">Tambah Tugas</h2>

                {/* TITLE FIELD */}
                <div className="task-field">
                  <label>Judul Tugas</label>

                  <input
                    type="text"
                    placeholder="Masukkan judul tugas"
                    value={taskTitle}
                    onChange={(event) => setTaskTitle(event.target.value)}
                  />
                </div>

                {/* DEADLINE FIELD */}
                <div className="task-field">
                  <label>Deadline</label>

                  <input
                    type="date"
                    value={taskDeadline}
                    onChange={(event) => setTaskDeadline(event.target.value)}
                  />
                </div>

                {/* DESCRIPTION FIELD */}
                <div className="task-field">
                  <label>Deskripsi</label>

                  <textarea
                    placeholder="Maksimal 50 karakter"
                    maxLength={50}
                    value={taskDescription}
                    onChange={(event) => setTaskDescription(event.target.value)}
                  />

                  <span className="task-character-count">
                    {taskDescription.length}/50
                  </span>
                </div>

                {/* BUTTONS */}
                <div className="task-modal-buttons">
                  <button
                    className="task-cancel-button"
                    onClick={() => setIsAddingTask(false)}
                  >
                    Batal
                  </button>

                  <button className="task-save-button" onClick={handleAddTask}>
                    Simpan
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TugasMenuPage;
