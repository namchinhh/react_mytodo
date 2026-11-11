import { useReducer, useEffect, useCallback } from 'react';
import taskReducer, { initialState } from '../reducers/taskReducer';
import { TaskContext } from './TaskContext';
import { useAuth } from './AuthContext';

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from '../services/taskService';

function TaskProvider({ children }) {
    const [state, dispatch] = useReducer(taskReducer, initialState);
    const { user, loading: authLoading } = useAuth();
    const loadTasks = useCallback(async () => {
        dispatch({ type: 'FETCH_START' });

        try {
            const data = await getTasks();

            dispatch({
                type: 'FETCH_SUCCESS',
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: 'FETCH_ERROR',
                payload: error.message,
            });
        }
    }, []);

    const addTask = async (title) => {
        const newTask = await createTask({
            title,
            completed: false,
        });

        dispatch({
            type: 'ADD_TASK',
            payload: newTask,
        });

        return newTask;
    };

    const toggleTask = async (id, completed) => {
        const updatedTask = await updateTask(id, completed);

        dispatch({
            type: 'UPDATE_TASK',
            payload: updatedTask,
        });

        return updatedTask;
    };

    const removeTask = async (id) => {
        await deleteTask(id);

        dispatch({
            type: 'DELETE_TASK',
            payload: id,
        });
    };

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            dispatch({ type: 'RESET_TASKS' });
            return;
        }
        loadTasks();
    }, [user?.id, authLoading, loadTasks]);

    return (
        <TaskContext.Provider value={{ ...state, addTask, toggleTask, removeTask }}>
            {children}
        </TaskContext.Provider>
    );
}

export default TaskProvider;