import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

function TaskItem({ task }) {
  const { toggleTask, removeTask } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState(null);

  async function handleToggle() {
    try {
      setError(null);
      setIsToggling(true);
      await toggleTask(task.id, !task.completed);
    } catch (error) {
      console.error('Failed to toggle task:', error);
      setError('Failed to toggle task: ' + error.message);
    } finally {
      setIsToggling(false);
    }
  }

  async function handleDelete() {
    try {
      setError(null);
      setIsDeleting(true);
      await removeTask(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
      setError('Failed to delete task: ' + error.message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          disabled={isToggling || isDeleting}
        />{isToggling ? 'Updating...' : ''}

        <span className={task.completed ? 'completed' : ''}>
          <Link to={`/tasks/${task.id}`}>
            {task.title}
          </Link>
        </span>
      </label>

      <button onClick={handleDelete} disabled={isToggling || isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete Task'}
      </button>
      {error && (
        <p role="alert">{error}</p>
      )}
    </li>
  );
}

export default TaskItem;
