import { useTasks } from '../context/TaskContext';

function Statistics() {
    const { tasks } = useTasks();
    const completed = tasks.filter(task => task.completed).length;
    const active = tasks.length - completed;

    return (
        <section>
            <h2>Task Statistics</h2>
            <p>Total: {tasks.length}</p>
            <p>Completed: {completed}</p>
            <p>Active: {active}</p>
        </section>
    );
}

export default Statistics;