import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useTasks } from '../context/TaskContext';

function TodoPage() {
    // const { tasks, dispatch } = useTasks();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getTasks() {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/todos?_limit=5'
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return await response.json();
    }

    async function loadTasks() {
        try {
            setLoading(true);
            setError(null);

            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        loadTasks();
    }, []);

    const toggleTask = (id) => {
        // dispatch({ type: 'TOGGLE_TASK', payload: id });
    };

    const deleteTask = (id) => {
        // dispatch({ type: 'DELETE_TASK', payload: id });
    };

    function isTaskExist(title) {
        return tasks.some(
            (task) =>
                task.title.toLowerCase() === title.toLowerCase()
        );
    }

    function addTask(title) {
        const newTask = {
            id: Date.now(),
            title,
            completed: false,
        };

        // dispatch({
        //     type: 'ADD_TASK',
        //     payload: newTask
        // });
    }
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <>
                <p>Error: {error}</p>
                <button onClick={loadTasks}>
                    Retry
                </button>
            </>
        );
    }

    return (
        <>
            <h1>MyTodo</h1>
            <TaskForm
                onAddTask={addTask}
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
                onDelete={deleteTask}
            />
        </>
    )
}

export default TodoPage