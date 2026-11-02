import { createContext, useContext } from 'react';

export const TaskContext = createContext(null);

export function useTasks() {
    const context = useContext(TaskContext);

    if (context === null) {
        throw new Error('useTasks must be used within TaskProvider');
    }

    return context;
}