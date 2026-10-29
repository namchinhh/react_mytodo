function isValidTasks(value) {
    return Array.isArray(value) &&
      value.every(task =>
        task !== null &&
        typeof task === 'object' &&
        !Array.isArray(task) &&
        typeof task.id === 'number' &&
        Number.isFinite(task.id) &&
        typeof task.title === 'string' &&
        task.title.trim().length > 0 &&
        typeof task.completed === 'boolean'
      );
  }

  export default isValidTasks;