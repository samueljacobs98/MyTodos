const submitNameBtn = document.querySelector(".main__submit-name");
const nameInput = document.querySelector(".main__input--name");
const welcome = document.querySelector(".main__welcome");
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const footerText = document.querySelector(".footer__text");

const tasks = [];
let numberTaskToComplete = tasks.length;
let firstSubmit = true;

const toggleActive = (checkbox) => {
  checkbox.classList.toggle("active-checkbox");
};

const activeCheckboxCount = () => {
  const checkboxes = document.querySelectorAll(".active-checkbox");
  return checkboxes.length;
};

const dealWithCheckBox = (checkbox) => {
  toggleActive(checkbox);
  const activeBoxes = activeCheckboxCount();
  console.log(activeBoxes);
  if (activeBoxes) {
    footer.style.display = "flex";
    footerText.innerText = `${activeBoxes} Task(s) Selected`;
  } else {
    footer.style.display = "none";
  }
};

const printTasks = () => {
  if (firstSubmit) {
    const completedMsg = document.querySelector(
      ".task-container__tasks-completed"
    );
    completedMsg.remove();
    firstSubmit = false;
  } else {
    const previousTasks = document.querySelectorAll(".task-container__task");
    previousTasks.forEach((task) => task.remove());
  }

  const tasksContainer = document.querySelector(".main__task-container");

  tasks.forEach((task, index) => {
    // Create container
    const taskElementsContainer = document.createElement("div");
    taskElementsContainer.classList.add(`task-container__task`);
    taskElementsContainer.classList.add(`task-container__task--${index}`);
    tasksContainer.appendChild(taskElementsContainer);
    // Create tickbox
    const taskCheckBox = document.createElement("input");
    taskCheckBox.setAttribute("type", "checkbox");
    taskCheckBox.classList.add("task__checkbox");
    taskCheckBox.classList.add(`task__checkbox--${index}`);
    taskCheckBox.setAttribute("onclick", "dealWithCheckBox(this)");
    taskElementsContainer.appendChild(taskCheckBox);
    // Create task
    const taskElement = document.createElement("p");
    taskElement.classList.add("task__details");
    taskElement.innerText = `${task}`;
    taskElementsContainer.appendChild(taskElement);
    // Create edit symbol
    const editButton = document.createElement("img");
    editButton.setAttribute("src", "./assets/svgs/edit.svg");
    editButton.classList.add("task__edit");
    editButton.classList.add(`task__edit--${index}`);
    taskElementsContainer.appendChild(editButton);
  });
};

const createTasksToComplete = () => {
  const tasksToComplete = document.createElement("p");
  tasksToComplete.classList.add("task__count");
  const tasksContainer = document.querySelector(".main__task-container");
  tasksContainer.appendChild(tasksToComplete);
};

const updateTasksToComplete = () => {
  if (tasks.length === 1) {
    createTasksToComplete();
  }
  const tasksToCompleteP = document.querySelector(".task__count");
  tasksToCompleteP.innerText = `Tasks to Complete: ${tasks.length}`;
};

const dealWithTaskSubmit = () => {
  const task = document.querySelector(".main__input--task").value;
  tasks.push(task);
  printTasks();
  updateTasksToComplete();
};

const checkValidName = (name) => {
  if (!name) return false;
  return !name.match(/[^a-zA-Z]/g) ? true : false;
};

const updateWelcome = (name) => {
  welcome.innerText = `Welcome back ${name}!`;
};

const hideNameInput = () => {
  nameInput.style.display = "none";
  submitNameBtn.style.display = "none";
};

const addWelcomePara = () => {
  const welcomePara = document.createElement("p");
  main.appendChild(welcomePara);
  welcomePara.classList.add("main__intro");
  welcomePara.innerText +=
    "Let's enter the tasks we need to complete for this upcoming week. Just use the input below to create a todo.";
};

const addTaskInput = () => {
  const input = document.createElement("input");
  main.appendChild(input);
  input.classList.add("main__input");
  input.classList.add("main__input--task");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Add your task here");
};

const addTaskSubmitBtn = () => {
  const submit = document.createElement("button");
  main.appendChild(submit);
  submit.classList.add("main__submit-task");
  submit.innerText = "Add task";
  submit.setAttribute("onclick", "dealWithTaskSubmit()");
};

const addTaskAdder = () => {
  addTaskInput();
  addTaskSubmitBtn();
};

const addTasksContainer = () => {
  const htmlToInput = [
    "<div class='main__task-container'>",
    "<p class='task-container__title'>Tasks</p>",
    "</div>",
  ];
  const htmlToInputString = htmlToInput.join("");
  main.innerHTML += htmlToInputString;
};

const tasksToComplete = () => {
  const taskContainer = document.querySelector(".main__task-container");
  if (numberTaskToComplete) {
    printTasks();
  } else {
    taskContainer.innerHTML +=
      "<p class='task-container__tasks-completed'>All tasks have been completed. Great job!</p>";
  }
};

const updateDom = () => {
  addWelcomePara();
  addTaskAdder();
  addTasksContainer();
  tasksToComplete();
};

const dealWithSubmit = () => {
  const name = nameInput.value;
  if (checkValidName(name)) {
    updateWelcome(name);
    hideNameInput();
    updateDom();
  } else {
    alert("Please enter valid name");
  }
};

submitNameBtn.addEventListener("click", dealWithSubmit);
