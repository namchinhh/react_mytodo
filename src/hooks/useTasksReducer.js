import { useReducer, useEffect } from 'react';
import taskReducer from '../reducers/taskReducer';
import isValidTasks from '../utils/isValidTasks';

function useTasksReducer() {
    const [tasks, dispatch] = useReducer(
        taskReducer,
        [],
        () => {
            try {
                const savedTasks = localStorage.getItem('tasks');

                if (!savedTasks) {
                    return [];
                }

                const parsedTasks = JSON.parse(savedTasks);

                return isValidTasks(parsedTasks)
                    ? parsedTasks
                    : [];
            } catch {
                return [];
            }
        }
    );

    useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Failed to save tasks:', error);
        }
    }, [tasks]);

    return [tasks, dispatch];
}

export default useTasksReducer;