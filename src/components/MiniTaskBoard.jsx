import MiniTaskPaper from "../assets/TaskPaper.svg";
import { motion } from "framer-motion";

function MiniTaskBoard({ tasks, setTasks }) {
  function handleCompleteTask(taskId) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );
  }

  return (
    <motion.div
      className="mini-taskboard"
      drag
      dragMomentum={false}
      initial={{
        opacity: 0,
        y: 40,
        rotate: -4,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: 0,
      }}
      exit={{
        opacity: 0,
        y: 220,
        rotate: 12,
      }}
      transition={{
        duration: 0.45,
        ease: "easeInOut",
      }}
      whileDrag={{
        cursor: "grabbing",
      }}
    >
      {/* PAPER */}
      <img
        src={MiniTaskPaper}
        alt="Mini Task Board"
        className="mini-taskboard-image"
      />

      {/* CONTENT */}
      <div className="mini-taskboard-content">
        <h3>Daftar Tugas</h3>

        <div className="mini-task-list">
          {tasks.slice(0, 5).map((task) => (
            <div key={task.id} className="mini-task-item">
              {/* CHECKBOX */}
              <button
                className="mini-task-checkbox"
                onClick={() => handleCompleteTask(task.id)}
              />

              {/* TITLE */}
              <span>{task.title}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default MiniTaskBoard;
