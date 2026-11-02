
import { useState, memo } from 'react';
import TaskItem from './TaskItem';

const TaskList = memo(function TaskList({ tasks, onToggle, onDelete }) {
  console.log('TaskList rendered');
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed;
    }

    if (filter === 'completed') {
      return task.completed;
    }

    return true;
  });

  return (
    <section>
      <div className="task-filters">
        <button
          type="button"
          onClick={() => setFilter('all')}
        >
          All
        </button>

        <button
          type="button"
          onClick={() => setFilter('active')}
        >
          Active
        </button>

        <button
          type="button"
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>

      {filteredTasks.length === 0 && (
        <p>No tasks found.</p>
      )}
    </section>
  );
});

export default TaskList;
