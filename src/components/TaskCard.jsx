import { motion, Reorder } from "framer-motion";

function TaskCard({
  task,
  setSelectedTask,
  handleCompleteTask,
  setDeleteTargetTask,
}) {
  return (
    <Reorder.Item
      layout={false}
      value={task}
      dragElastic={0}
      dragMomentum={false}
      whileDrag={{
        zIndex: 10,
      }}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 120,
        rotate: 6,
      }}
      transition={{
        opacity: {
          duration: 0.2,
        },

        y: {
          duration: 0.25,
          ease: "easeOut",
        },

        rotate: {
          duration: 0.2,
        },
      }}
      className="task-card"
      onClick={() => {
        setSelectedTask(task);
      }}
    >
      {/* DELETE BUTTON */}
      <button
        className="task-delete-button"
        onClick={(event) => {
          event.stopPropagation();

          setDeleteTargetTask(task);
        }}
      >
        ✕
      </button>
      {/* CHECKBOX */}
      <button
        className="task-card-checkbox"
        onClick={(event) => {
          event.stopPropagation();

          handleCompleteTask(task.id);
        }}
      ></button>

      <div className="task-card-content">
        <h3 className="task-card-title">{task.title}</h3>

        <p className="task-card-deadline">Deadline: {task.deadline}</p>
      </div>
    </Reorder.Item>
  );
}

export default TaskCard;
