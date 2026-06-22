import { createTodo } from "./logic.js";

const priorities = [
  { value: "low", color: "#56c05a", label: "Low" },
  { value: "medium", color: "#f1b442", label: "Medium" },
  { value: "high", color: "#f3675d", label: "High" },
];

const priorityColors = { high: "#f3675d", medium: "#f1b442", low: "#56c05a" };
const priorityOrder = { high: 0, medium: 1, low: 2 };

const el = (tag, cls, attrs = {}) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "text") e.textContent = v;
    else if (k === "html") e.innerHTML = v;
    else e.setAttribute(k, v);
  });
  return e;
};

const createProgressSection = (project) => {
  const todos = project.getTodos();
  const total = todos.length;
  const done =
    total > 0
      ? todos.reduce((acc, t) => (t.getCompleted() ? acc + 1 : acc), 0)
      : 0;

  const textContainer = el("div", "progress-text-container");
  textContainer.appendChild(
    el("p", "progress-text", { text: `${done} of ${total} done` }),
  );
  textContainer.appendChild(
    el("p", "progress-percentage", {
      text: total > 0 ? `${Math.ceil((done * 100) / total)} %` : "0 %",
    }),
  );

  const bar = el("div", "progress-bar-container");
  const fill = el("div", "progress-bar", { id: "progress" });
  fill.style.width = "0%";
  bar.appendChild(fill);

  const container = el("div", "");
  container.appendChild(textContainer);
  container.appendChild(bar);
  return container;
};

const createAddForm = (project, render) => {
  const form = el("form", "", { id: "project-form" });

  const titleInput = el("input", "title-input", {
    type: "text",
    name: "name",
    required: "",
    placeholder: "Add task to this project...",
  });
  form.appendChild(titleInput);

  const dateInput = el("input", "date-input", { type: "date" });
  form.appendChild(dateInput);

  const prioWrap = el("div", "prio-selection-container");
  priorities.forEach((p) => {
    const label = el("label", "priority-btn");
    const radio = el("input", "", {
      type: "radio",
      name: "priority",
      value: p.value,
    });
    const dot = el("span", "color-dot");
    dot.style.backgroundColor = p.color;
    label.append(radio, dot);
    prioWrap.appendChild(label);
  });
  prioWrap.querySelector('input[value="low"]').checked = true;
  form.appendChild(prioWrap);

  form.appendChild(
    el("button", "add-project-button", { text: "Add", type: "submit" }),
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    if (!title) return;
    const priority =
      prioWrap.querySelector('input[name="priority"]:checked')?.value || "low";
    const todo = createTodo(title, dateInput.value, priority);
    project.addToDo(todo);
    titleInput.value = "";
    dateInput.value = "";
    prioWrap.querySelector('input[value="low"]').checked = true;
    render();
  });

  return form;
};

const createEditForm = (todo, project, render) => {
  const container = el("div", "todo-details");

  const titleGroup = el("div", "todo-field-group");
  titleGroup.appendChild(el("p", "todo-edit-label", { text: "Title" }));
  const editTitle = el("input", "todo-edit-input", {
    value: todo.getTitle(),
    placeholder: "Task title",
  });
  titleGroup.appendChild(editTitle);
  container.appendChild(titleGroup);

  const row = el("div", "todo-edit-row");

  const dateGroup = el("div", "todo-field-group");
  dateGroup.style.flex = "1";
  dateGroup.appendChild(el("p", "todo-edit-label", { text: "Due Date" }));
  const editDate = el("input", "todo-edit-date", {
    type: "date",
    value: todo.getDate() || "",
  });
  dateGroup.appendChild(editDate);
  row.appendChild(dateGroup);

  const prioGroup = el("div", "todo-field-group");
  prioGroup.style.flex = "1";
  prioGroup.appendChild(el("p", "todo-edit-label", { text: "Priority" }));
  const prioWrap = el("div", "todo-edit-prio");
  priorities.forEach((p) => {
    const label = el("label", "todo-prio-text-btn");
    label.style.borderColor = p.color;
    label.style.backgroundColor = p.color + "20";
    label.style.color = p.color;
    const radio = el("input", "", {
      type: "radio",
      name: `prio-${todo.getTodoId()}`,
      value: p.value,
    });
    if (todo.getPriority() === p.value) radio.checked = true;
    label.append(radio, document.createTextNode(p.label));
    prioWrap.appendChild(label);
  });
  prioGroup.appendChild(prioWrap);
  row.appendChild(prioGroup);
  container.appendChild(row);

  const notesGroup = el("div", "todo-field-group");
  notesGroup.appendChild(el("p", "todo-edit-label", { text: "Notes" }));
  const editNotes = el("textarea", "todo-edit-notes", {
    placeholder: "Add notes...",
  });
  editNotes.value = todo.getNotes() || "";
  notesGroup.appendChild(editNotes);
  container.appendChild(notesGroup);

  const actionRow = el("div", "todo-action-row");
  const left = el("div", "todo-action-left");
  const right = el("div", "");

  const saveBtn = el("button", "todo-save-btn", { text: "Done" });
  saveBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    todo.setTitle(editTitle.value);
    todo.setDate(editDate.value);
    const sel = prioWrap.querySelector(
      `input[name="prio-${todo.getTodoId()}"]:checked`,
    );
    if (sel) todo.setPriority(sel.value);
    todo.setNotes(editNotes.value);
    render();
  });

  const deleteBtn = el("button", "todo-delete-btn", { text: "Delete" });
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    project.deleteTodo(todo.getTodoId());
    render();
  });

  left.appendChild(saveBtn);
  right.appendChild(deleteBtn);
  actionRow.append(left, right);
  container.appendChild(actionRow);

  return container;
};

const createTodoCard = (todo, project, render) => {
  const card = el("div", "todo-card");
  card.style.setProperty(
    "--prio-color",
    priorityColors[todo.getPriority()] || "#999",
  );

  const topRow = el("div", "todo-top-row");

  const checkbox = el("input", "", { type: "checkbox" });
  checkbox.checked = todo.getCompleted();
  checkbox.addEventListener("change", (e) => {
    e.stopPropagation();
    todo.setCompleted(checkbox.checked);
    render();
  });

  const todoTitle = el("span", "todo-title", { text: todo.getTitle() });
  const expandIcon = el("span", "todo-expand-icon", { text: "▾" });

  topRow.append(checkbox, todoTitle, expandIcon);

  const details = createEditForm(todo, project, render);

  card.addEventListener("click", (e) => {
    const t = e.target;
    if (
      t === checkbox ||
      t.tagName === "INPUT" ||
      t.tagName === "TEXTAREA" ||
      t.tagName === "BUTTON" ||
      t.closest(".todo-prio-text-btn")
    )
      return;
    card.classList.toggle("todo-card--expanded");
  });

  card.append(topRow, details);
  return card;
};

const sortTodos = (todos) => {
  return [...todos].sort((a, b) => {
    if (a.getCompleted() !== b.getCompleted()) return a.getCompleted() ? 1 : -1;
    return priorityOrder[a.getPriority()] - priorityOrder[b.getPriority()];
  });
};

const main = (projects, currentProject, render) => {
  const container = el("main", "main-container");
  const content = el("div", "content-container");

  const today = new Date();
  const dateDisplay = el("p", "date-display", {
    text: today.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
  });
  content.appendChild(dateDisplay);

  const titleWrap = el("div", "title-container");
  const titleColor = el("div", "title-color");
  titleColor.style.backgroundColor = currentProject.getColor();
  titleWrap.append(
    titleColor,
    el("h1", "", {
      text: currentProject
        ? currentProject.getProjectTitle()
        : "No project selected",
    }),
  );
  content.appendChild(titleWrap);

  content.appendChild(createProgressSection(currentProject));
  content.appendChild(createAddForm(currentProject, render));

  const list = el("div", "todo-list-container");
  if (currentProject) {
    sortTodos(currentProject.getTodos()).forEach((todo) => {
      list.appendChild(createTodoCard(todo, currentProject, render));
    });
  }
  content.appendChild(list);

  container.appendChild(content);
  return container;
};

export default main;
