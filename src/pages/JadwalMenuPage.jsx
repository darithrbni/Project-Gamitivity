import { useState } from "react";
function JadwalMenuPage({ setPage }) {
  const [view, setView] = useState("month");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Data Structure Assignment",
      date: "2026-05-28",
      time: "19:00",
      priority: "High",
      completed: false,
    },
    {
      id: 2,
      title: "Study Database Normalization",
      date: "2026-05-29",
      time: "15:00",
      priority: "Medium",
      completed: true,
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const addTask = () => {
    if (!newTask || !newDate || !newTime) return;

    const task = {
      id: Date.now(),
      title: newTask,
      date: newDate,
      time: newTime,
      priority: "Low",
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
    setNewDate("");
    setNewTime("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalXP = completedTasks * 50;
  const level = Math.floor(totalXP / 100) + 1;

  return (
    <>
      <div className="menu-overlay" onClick={() => setPage("main")} />

      <div className="min-h-screen bg-gradient-to-br from-[#1b1028] via-[#231437] to-[#12081c] text-white p-6 relative overflow-hidden">
        <button
          className="back-button bg-[#ffb3c7] text-black px-5 py-2 rounded-xl font-bold shadow-lg hover:scale-105 transition"
          onClick={() => setPage("menu")}
        >
          BACK
        </button>

        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          {/* LEFT PANEL */}
          <div className="w-full lg:w-[30%] bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/10 shadow-2xl">
            <h1 className="text-3xl font-bold mb-4 text-[#ffd166]">
              Gamitivity Schedule
            </h1>

            <div className="bg-[#2f1b4d] rounded-2xl p-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">Gamification Stats</h2>

              <div className="space-y-2 text-sm">
                <p>⭐ XP Points: {totalXP}</p>
                <p>🏆 Level: {level}</p>
                <p>🔥 Completed Tasks: {completedTasks}</p>
                <p>🎯 Productivity Streak: 5 Days</p>
              </div>

              <div className="mt-4">
                <div className="w-full h-3 bg-[#4a2b74] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ffd166]"
                    style={{ width: `${(totalXP % 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#2f1b4d] rounded-2xl p-4">
              <h2 className="text-xl font-semibold mb-3">Add Study Task</h2>

              <input
                type="text"
                placeholder="Task Title"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full mb-3 px-4 py-3 rounded-xl bg-[#1f1233] border border-white/10 outline-none"
              />

              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full mb-3 px-4 py-3 rounded-xl bg-[#1f1233] border border-white/10 outline-none"
              />

              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full mb-3 px-4 py-3 rounded-xl bg-[#1f1233] border border-white/10 outline-none"
              />

              <button
                onClick={addTask}
                className="w-full py-3 rounded-xl bg-[#ffd166] text-black font-bold hover:scale-[1.02] transition"
              >
                Add Task + Reminder
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full lg:w-[70%] bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/10 shadow-2xl">
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                "year",
                "month",
                "week",
                "day",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setView(item)}
                  className={`px-5 py-2 rounded-xl capitalize font-semibold transition ${
                    view === item
                      ? "bg-[#ffd166] text-black"
                      : "bg-[#2f1b4d] text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* CALENDAR SECTION */}
            <div className="bg-[#1d102d] rounded-2xl p-5 min-h-[500px] border border-white/10">
              <h2 className="text-2xl font-bold mb-4 capitalize">
                {view} Schedule View
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-2xl p-4 border transition-all ${
                      task.completed
                        ? "bg-green-500/20 border-green-400"
                        : "bg-[#2f1b4d] border-white/10"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {task.title}
                        </h3>

                        <p className="text-sm text-gray-300 mt-1">
                          📅 {task.date}
                        </p>

                        <p className="text-sm text-gray-300">
                          ⏰ {task.time}
                        </p>

                        <p className="text-sm mt-2 text-[#ffd166]">
                          Priority: {task.priority}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => toggleComplete(task.id)}
                          className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                            task.completed
                              ? "bg-green-400 text-black"
                              : "bg-[#ffd166] text-black"
                          }`}
                        >
                          {task.completed ? "Done" : "Complete"}
                        </button>

                        <button
                          onClick={() => deleteTask(task.id)}
                          className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REMINDER SECTION */}
            <div className="mt-6 bg-[#2f1b4d] rounded-2xl p-5 border border-white/10">
              <h2 className="text-xl font-bold mb-3">
                Upcoming Reminders
              </h2>

              <div className="space-y-3">
                {tasks
                  .filter((task) => !task.completed)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between bg-[#1f1233] rounded-xl px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold">{task.title}</p>
                        <p className="text-sm text-gray-400">
                          Reminder at {task.time}
                        </p>
                      </div>

                      <span className="text-[#ffd166] text-sm font-bold">
                        Active
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JadwalMenuPage;
