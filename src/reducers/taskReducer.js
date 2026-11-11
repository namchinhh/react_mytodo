export const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

function taskReducer(state, action) {
    switch (action.type) {
        case 'FETCH_START':
            return {
                ...state,
                loading: true,
                error: null,
            };

        case 'FETCH_SUCCESS':
            return {
                ...state,
                tasks: action.payload,
                loading: false,
                error: null
            };

        case 'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // TODO: ADD_TASK
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                loading: false,
                error: null
            };
        // TODO: UPDATE_TASK
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? { ...task, ...action.payload } : task
                ),
                loading: false,
                error: null
            };
        // TODO: DELETE_TASK
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
                loading: false,
                error: null
            };
        case 'RESET_TASKS':
            return {
                ...initialState,
            };
        default:
            return state;
    }
}

export default taskReducer;