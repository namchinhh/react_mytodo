import { TaskContext } from './TaskContext';
import useTasksReducer from '../hooks/useTasksReducer';

function TaskProvider({ children }) {
    const [tasks, dispatch] = useTasksReducer();

    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}

export default TaskProvider;