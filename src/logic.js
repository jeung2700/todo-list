const projects = [];

const createProject = (title) => {
  const _id = crypto.randomUUID();
  const getProjectId = () => _id;
  let _title = title || "Untitled";
  const getProjectTitle = () => _title;

  const setProjectTitle = (newTitle) => {
    _title = newTitle.trim() || "Untitled";
  };
  let toDos = [];
  const addToDo = (toDo) => {
    toDos.push(toDo);
  };
  const deleteTodo = (toDoId) => {
    const index = toDos.findIndex((toDo) => toDo.getTodoId() === toDoId);
    if (index !== -1) toDos.splice(index, 1);
  };

  const getTodos = () => toDos;

  return { getProjectId, getProjectTitle, setProjectTitle, addToDo, getTodos };
};

const deleteProject = (projectId) => {
  const index = projects.findIndex(
    (project) => project.getProjectId() === projectId,
  );
  if (index !== -1) projects.splice(index, 1);
};

const createTodo = (title, date, priority, notes) => {
  const _id = crypto.randomUUID();
  const getTodoId = () => _id;
  let _title = title || "Untitled";
  const getTitle = () => _title;
  const setTitle = (newTitle) => {
    _title = newTitle.trim() || "Untitled";
  };

  return {
    getTitle,
    setTitle,
    getTodoId,
    date: date || null,
    priority: priority || "low",
    notes: notes || null,
    completed: false,
  };
};

export { projects, createProject, deleteProject, createTodo };
