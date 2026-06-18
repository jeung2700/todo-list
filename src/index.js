import "./styles.css";
import createSidebar from "./sidebar.js";
import createMain from "./main.js";
import { projects, createProject, deleteProject, createTodo } from "./logic";

const dummyProjects = [
  {
    id: 0,
    name: "Inbox",
    color: "#7c5cff", // PROJECT_COLORS[0]
    todos: [
      {
        id: 0,
        title: "Welcome! Click a task to expand and edit it",
        priority: "high",
        notes:
          "Every todo can hold notes, a due date and a priority. Try editing this one.",
        done: false,
      },
      {
        id: 0,
        title: "Add a new task using the bar above",
        priority: "medium",
        notes: "",
        done: false,
      },
      {
        id: 0,
        title: "Create a project in the sidebar →",
        priority: "low",
        notes: "",
        done: false,
      },
      {
        id: 0,
        title: "Check something off",
        priority: "medium",
        notes: "",
        done: true,
      },
    ],
  },
  {
    id: 0,
    name: "Work",
    color: "#ff7eb6", // PROJECT_COLORS[1]
    todos: [
      {
        id: 0,
        title: "Finalise Q3 roadmap",
        priority: "high",
        notes: "",
        done: false,
      },
      {
        id: 0,
        title: "Review design handoff",
        priority: "medium",
        notes: "",
        done: false,
      },
    ],
  },
];

dummyProjects.forEach((d) => projects.push(createProject(d.name)));
const container = document.querySelector(".container");
container.appendChild(createSidebar(projects));
container.appendChild(createMain());
