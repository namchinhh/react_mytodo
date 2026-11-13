import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

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
          <Link to={`/tasks/${task.id}`}>
            {task.title}
          </Link>
        </span>
      </label>

      <button onClick={() => onDelete(task.id)}>
        Delete Task
      </button>
    </li>
  );
}

export default TaskItem;
