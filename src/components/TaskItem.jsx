import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

function TaskItem({ task }) {
  const { toggleTask, removeTask } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  async function handleToggle() {
    try {
      setIsToggling(true);
      await toggleTask(task.id, !task.completed);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    } finally {
      setIsToggling(false);
    }
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);
      await removeTask(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
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
        />

        <span className={task.completed ? 'completed' : ''}>
          <Link to={`/tasks/${task.id}`}>
            {task.title}
          </Link>
        </span>
      </label>

      <button onClick={handleDelete} disabled={isToggling || isDeleting}>
        Delete Task
      </button>
    </li>
  );
}

export default TaskItem;
