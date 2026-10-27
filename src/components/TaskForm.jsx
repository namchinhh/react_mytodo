
import { useState } from 'react';

function TaskForm({ onAddTask, isTaskExist }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const title = inputValue.trim();

    if (!title) {
      setError('Task name is required.');
      return;
    }

    if (isTaskExist(title)) {
      setError('This task already exists.');
      return;
    }

    onAddTask(title);
    setInputValue('');
    setError('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <button type="submit">Add Task</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TaskForm;
