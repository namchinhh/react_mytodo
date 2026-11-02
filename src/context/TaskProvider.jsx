import { TaskContext } from './TaskContext';
import useLocalStorage from '../hooks/useLocalStorage';
import isValidTasks from '../utils/isValidTasks';

function TaskProvider({ children }) {
    const [tasks, setTasks] = useLocalStorage(
        'tasks',
        [],
        isValidTasks
    );

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
}

export default TaskProvider;