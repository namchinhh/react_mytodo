import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
// import { useTasks } from '../context/TaskContext';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

function TodoPage() {
    // const { tasks, dispatch } = useTasks();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [actionError, setActionError] = useState(null);

    async function loadTasks() {
        try {
            setLoading(true);
            setLoadError(null);

            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            setLoadError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);

    async function toggleTask(id) {
        setActionError(null);

        const task = tasks.find(task => task.id === id);

        if (!task) return;

        try {
            const updatedTask = await updateTask(
                id,
                !task.completed
            );

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === id ? updatedTask : task
                )
            );
        } catch (error) {
            setActionError(error.message);
        }
    }

    async function handleDeleteTask(id) {
        setActionError(null);

        try {
            await deleteTask(id);

            setTasks(prevTasks =>
                prevTasks.filter(task => task.id !== id)
            );
        } catch (error) {
            setActionError(error.message);
        }
    }

    function isTaskExist(title) {
        return tasks.some(
            (task) =>
                task.title.toLowerCase() === title.toLowerCase()
        );
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (loadError) {
        return (
            <>
                <p>Error: {loadError}</p>
                <button onClick={loadTasks}>
                    Retry
                </button>
            </>
        );
    }

    return (
        <>
            <h1>MyTodo</h1>
            {actionError && (
                <p role="alert">
                    Operation failed: {actionError}
                </p>
            )}
            <TaskForm
                isTaskExist={isTaskExist}
            />
            <p>
                Completed: {tasks.filter((task) => task.completed).length}
                {' / '}
                {tasks.length}
            </p>

            <p>
                Uncompleted: {tasks.filter((task) => !task.completed).length}
                {' / '}
                {tasks.length}
            </p>

            <TaskList
                tasks={tasks}
                onToggle={toggleTask}
                onDelete={handleDeleteTask}
            />
        </>
    )
}

export default TodoPage