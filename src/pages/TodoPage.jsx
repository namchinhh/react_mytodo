import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useTasks } from '../context/TaskContext';

function TodoPage() {
    const { tasks, dispatch } = useTasks();

    const toggleTask = (id) => {
        dispatch({ type: 'TOGGLE_TASK', payload: id });
    };

    const deleteTask = (id) => {
        dispatch({ type: 'DELETE_TASK', payload: id });
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

        dispatch({
            type: 'ADD_TASK',
            payload: newTask
        });
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