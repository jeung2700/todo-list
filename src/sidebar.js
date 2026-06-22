import logoSrc from "./assets/logo-img.svg";

const el = (tag, cls, attrs = {}) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "text") e.textContent = v;
    else e.setAttribute(k, v);
  });
  return e;
};

const showAddForm = (container, onAddProject) => {
  container.innerHTML = "";
  const input = el("input", "input", { placeholder: "Project Name" });
  container.appendChild(input);
  const btnDiv = el("div", "btn-div");
  const addBtn = el("button", "add-btn", { text: "Add" });
  const cancelBtn = el("button", "cancel-btn", { text: "Cancel" });
  btnDiv.append(addBtn, cancelBtn);
  container.appendChild(btnDiv);

  addBtn.addEventListener("click", () => {
    if (input.value.trim()) {
      onAddProject(input.value.trim());
    }
  });

  cancelBtn.addEventListener("click", () => {
    container.innerHTML = "";
    const text = el("div", "add-project-text", { text: "+ New Project" });
    text.addEventListener("click", () => showAddForm(container, onAddProject));
    container.appendChild(text);
  });
};

const sidebar = (projects, currentProject, onAddProject, onSelectProject) => {
  let selectedTab = null;

  const container = el("div", "sidebar-container");

  const titleRow = el("div", "title-container");
  const logo = el("img", "logo", { alt: "logo-img", src: logoSrc });
  titleRow.append(logo, el("h2", "", { text: "Tasked" }));
  container.appendChild(titleRow);

  container.appendChild(el("h3", "header-description", { text: "PROJECTS" }));

  const tabContainer = el("div", "tab-container");
  projects.forEach((project) => {
    const tab = el("div", "project-tab");
    if (project === currentProject) {
      tab.classList.add("project-tab--selected");
      selectedTab = tab;
    }
    tab.addEventListener("click", () => {
      if (selectedTab) selectedTab.classList.remove("project-tab--selected");
      tab.classList.add("project-tab--selected");
      selectedTab = tab;
      onSelectProject(project);
    });

    const color = el("div", "tab-color");
    color.style.backgroundColor = project.getColor();
    tab.append(
      color,
      el("p", "tab-project-name", { text: project.getProjectTitle() }),
    );
    tabContainer.appendChild(tab);
  });
  container.appendChild(tabContainer);

  const addSection = el("div", "add-project-container");
  const addText = el("div", "add-project-text", { text: "+ New Project" });
  addText.addEventListener("click", () =>
    showAddForm(addSection, onAddProject),
  );
  addSection.appendChild(addText);
  container.appendChild(addSection);

  return container;
};

export default sidebar;
