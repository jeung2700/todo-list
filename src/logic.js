const projects = [];
let hueIndex = 0;

const createProject = (title) => {
  const id = crypto.getRandomValues(new Uint32Array(1))[0].toString();
  let name = title || "Untitled";
  const color = `hsl(${hueIndex * 30}, 60%, 70%)`;
  hueIndex++;
  const todos = [];

  return {
    getProjectId: () => id,
    getProjectTitle: () => name,
    setProjectTitle: (t) => {
      name = t.trim() || "Untitled";
    },
    getColor: () => color,
    addToDo: (todo) => todos.push(todo),
    deleteTodo: (todoId) => {
      const i = todos.findIndex((t) => t.getTodoId() === todoId);
      if (i !== -1) todos.splice(i, 1);
    },
    getTodos: () => todos,
  };
};

const createTodo = (title, date, priority, notes) => {
  const id = crypto.getRandomValues(new Uint32Array(1))[0].toString();
  let todoTitle = title || "Untitled";
  let todoDate = date || null;
  let todoPriority = priority || "low";
  let todoNotes = notes || null;
  let completed = false;

  return {
    getTodoId: () => id,
    getTitle: () => todoTitle,
    setTitle: (t) => {
      todoTitle = t.trim() || "Untitled";
    },
    getDate: () => todoDate,
    setDate: (d) => {
      todoDate = d;
    },
    getPriority: () => todoPriority,
    setPriority: (p) => {
      todoPriority = p;
    },
    getNotes: () => todoNotes,
    setNotes: (n) => {
      todoNotes = n;
    },
    getCompleted: () => completed,
    setCompleted: (v) => {
      completed = v;
    },
    toggleCompleted: () => {
      completed = !completed;
    },
  };
};

const saveToStorage = () => {
  const data = projects.map((project) => ({
    title: project.getProjectTitle(),
    color: project.getColor(),
    todos: project.getTodos().map((todo) => ({
      id: todo.getTodoId(),
      title: todo.getTitle(),
      date: todo.getDate(),
      priority: todo.getPriority(),
      notes: todo.getNotes(),
      completed: todo.getCompleted(),
    })),
  }));
  localStorage.setItem("todoData", JSON.stringify(data));
};

const loadFromStorage = () => {
  const saved = localStorage.getItem("todoData");
  if (!saved) return null;

  const data = JSON.parse(saved);
  projects.length = 0;
  hueIndex = data.length;
  data.forEach((d) => {
    const project = createProject(d.title);
    d.todos.forEach((t) => {
      const todo = createTodo(t.title, t.date, t.priority, t.notes);
      todo.setCompleted(t.completed);
      project.addToDo(todo);
    });
    projects.push(project);
  });
  return projects[0];
};
export { projects, createProject, createTodo, saveToStorage, loadFromStorage };
