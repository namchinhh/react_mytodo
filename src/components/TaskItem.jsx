import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

function TaskItem({ task }) {
  const { toggleTask, removeTask } = useTasks();

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id, !task.completed)}
        />

        <span className={task.completed ? 'completed' : ''}>
          <Link to={`/tasks/${task.id}`}>
            {task.title}
          </Link>
        </span>
      </label>

      <button onClick={() => removeTask(task.id)}>
        Delete Task
      </button>
    </li>
  );
}

export default TaskItem;
