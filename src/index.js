import "./styles.css";
import createSidebar from "./sidebar.js";
import createMain from "./main.js";
import { projects, createProject, createTodo } from "./logic.js";

const dummyProjects = [
  {
    name: "Inbox",
    todos: [
      {
        title: "Welcome! Click a task to expand and edit it",
        priority: "high",
        date: "2024-12-01",
        notes:
          "Every todo can hold notes, a due date and a priority. Try editing this one.",
        done: false,
      },
      {
        title: "Add a new task using the bar above",
        priority: "medium",
        notes: "",
        done: false,
      },
      {
        title: "Create a project in the sidebar →",
        priority: "low",
        notes: "",
        done: false,
      },
      {
        title: "Check something off",
        priority: "medium",
        notes: "",
        done: true,
      },
    ],
  },
  {
    name: "Work",
    todos: [
      {
        title: "Finalise Q3 roadmap",
        priority: "high",
        notes: "",
        done: false,
      },
      {
        title: "Review design handoff",
        priority: "medium",
        notes: "",
        done: false,
      },
    ],
  },
];

dummyProjects.forEach((d) => {
  const project = createProject(d.name);
  d.todos.forEach((t) => {
    const todo = createTodo(t.title, t.date, t.priority, t.notes);
    todo.setCompleted(t.done);
    project.addToDo(todo);
  });
  projects.push(project);
});

let currentProject = projects[0];
let prevProgressPct = 0;

const getProgressPct = () => {
  const todos = currentProject.getTodos();
  if (todos.length === 0) return 0;
  const done = todos.reduce((acc, t) => (t.getCompleted() ? acc + 1 : acc), 0);
  return Math.ceil((done * 100) / todos.length);
};

const animateProgressBar = () => {
  const bar = document.getElementById("progress");
  if (!bar) return;
  bar.style.transition = "none";
  bar.style.width = `${prevProgressPct}%`;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      bar.style.transition = "";
      const pct = getProgressPct();
      prevProgressPct = pct;
      bar.style.width = `${pct}%`;
    });
  });
};

const render = () => {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  container.appendChild(
    createSidebar(
      projects,
      currentProject,
      (name) => {
        projects.push(createProject(name));
        render();
      },
      (project) => {
        currentProject = project;
        render();
      },
    ),
  );
  container.appendChild(createMain(projects, currentProject, render));
  animateProgressBar();
};

render();
