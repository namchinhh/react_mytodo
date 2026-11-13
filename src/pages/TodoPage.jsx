
import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useTasks } from '../context/TaskContext';

function TodoPage() {
    const {
        tasks,
        loading,
        error,
        toggleTask,
        removeTask,
    } = useTasks();

    const [actionError, setActionError] = useState(null);

    function isTaskExist(title) {
        return tasks.some(
            task => task.title.toLowerCase() === title.toLowerCase()
        );
    }

    return (
        <>
            <h1>MyTodo</h1>

            {loading && <p>Loading tasks...</p>}
            {error && <p role="alert">Error: {error}</p>}
            {actionError && (
                <p role="alert">
                    Operation failed: {actionError}
                </p>
            )}

            <TaskForm isTaskExist={isTaskExist} />

            <p>
                Completed: {tasks.filter(task => task.completed).length}
                {' / '}
                {tasks.length}
            </p>

            <p>
                Uncompleted: {tasks.filter(task => !task.completed).length}
                {' / '}
                {tasks.length}
            </p>

            <TaskList />
        </>
    );
}

export default TodoPage;
