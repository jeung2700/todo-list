import logoSrc from "./assets/logo-img.svg";
//import { projects, createProject, deleteProject, createTodo } from logic.js;

const sidebar = (projects) => {
  const container = document.createElement("div");
  container.classList.add("sidebar-container");
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");
  const logo = document.createElement("img");
  logo.alt = "logo-img";
  logo.src = logoSrc;
  logo.classList.add("logo");
  titleContainer.appendChild(logo);
  const titleText = document.createElement("h2");
  titleText.textContent = "Tasked";
  titleContainer.appendChild(titleText);
  container.appendChild(titleContainer);

  const headerDescription = document.createElement("h3");
  headerDescription.textContent = "PROJECTS";
  headerDescription.classList.add("header-description");
  container.appendChild(headerDescription);

  const tabContainer = document.createElement("div");
  tabContainer.classList.add("tab-container");

  for (const project of projects) {
    const tab = document.createElement("div");
    tab.classList.add("project-tab");

    const tabColor = document.createElement("div");
    tabColor.classList.add("tab-color");
    tab.style.backgroundColor = project.getColor();
    tab.appendChild(tabColor);

    const projectName = document.createElement("p");
    projectName.textContent = project.getProjectTitle();
    projectName.classList.add("tab-project-name");
    tab.appendChild(projectName);

    tabContainer.appendChild(tab);
  }

  container.appendChild(tabContainer);

  return container;
};

export default sidebar;
