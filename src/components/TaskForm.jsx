import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

function TaskForm({ isTaskExist }) {
  const { addTask } = useTasks();

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const title = inputValue.trim();

    if (!title) {
      setError('Please enter a task title.');
      return;
    }

    if (isTaskExist(title)) {
      setError('This task already exists.');
      return;
    }

    try {
      setError('');
      setSubmitting(true);

      await addTask(title);

      setInputValue('');
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Task'}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TaskForm;