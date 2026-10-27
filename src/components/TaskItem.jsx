
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <span className={task.completed ? 'completed' : ''}>
          {task.title}
        </span>
      </label>

      <button onClick={() => onDelete(task.id)}>
        Delete Task
      </button>
    </li>
  );
}

export default TaskItem;
