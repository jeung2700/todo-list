const projects = [];
let hueIndex = 0;

const createProject = (title) => {
  const _id = crypto.getRandomValues(new Uint32Array(1))[0].toString();
  const getProjectId = () => _id;
  let _title = title || "Untitled";
  const getProjectTitle = () => _title;
  const _color = `hsl(${hueIndex * 30}, 60%, 70%)`;
  hueIndex++;
  const getColor = () => _color;
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

  return {
    getColor,
    getProjectId,
    getProjectTitle,
    setProjectTitle,
    addToDo,
    getTodos,
  };
};

const deleteProject = (projectId) => {
  const index = projects.findIndex(
    (project) => project.getProjectId() === projectId,
  );
  if (index !== -1) projects.splice(index, 1);
};

const createTodo = (title, date, priority, notes) => {
  const _id = crypto.getRandomValues(new Uint32Array(1))[0].toString();
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
