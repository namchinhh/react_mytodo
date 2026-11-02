function taskReducer(state, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return [
                ...state,
                action.payload
            ];

        case 'DELETE_TASK':
            return state.filter(
                task => task.id !== action.payload
            );

        case 'TOGGLE_TASK':
            return state.map(task =>
                task.id === action.payload
                    ? { ...task, completed: !task.completed }
                    : task
            );

        case 'UPDATE_TASK':
            const { id, ...updates } = action.payload;

            return state.map(task =>
                task.id === id
                    ? { ...task, ...updates }
                    : task
            );

        default:
            return state;
    }
}

export default taskReducer;