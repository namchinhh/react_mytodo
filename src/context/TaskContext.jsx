import { createContext, useContext } from 'react';

export const TaskContext = createContext(null);

export function useTasks() {
    return useContext(TaskContext);
}