import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

function TaskItem({ task }) {
  const { toggleTask, removeTask } = useTasks();
  async function handleToggle() {
    try {
      await toggleTask(task.id, !task.completed);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  }

  async function handleDelete() {
    try {
      await removeTask(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
        />

        <span className={task.completed ? 'completed' : ''}>
          <Link to={`/tasks/${task.id}`}>
            {task.title}
          </Link>
        </span>
      </label>

      <button onClick={handleDelete}>
        Delete Task
      </button>
    </li>
  );
}

export default TaskItem;
