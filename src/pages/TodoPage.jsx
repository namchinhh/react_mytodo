import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useCallback } from 'react';
import { useTasks } from '../context/TaskContext';

function TodoPage() {
    const { tasks, setTasks } = useTasks();

    const toggleTask = useCallback((id) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    }, []);


    const deleteTask = useCallback((id) => {
        setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== id)
        );
    }, []);


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

        setTasks((currentTasks) => [...currentTasks, newTask]);
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