import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks } = useTasks();

    const task = tasks.find((t) => t.id === Number(id));

    if (!task) {
        return (
            <div>
                <h2>Task not found</h2>
                <button onClick={() => navigate('/')}>
                    Back to Todo
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2>Task Details</h2>
            <p>Task ID: {task.id}</p>
            <p>Title: {task.title}</p>
            <p>Status: {task.completed ? 'Completed' : 'Uncompleted'}</p>

            <button onClick={() => navigate('/')}>
                Back to Todo
            </button>
        </div>
    );
}

export default TaskDetails;