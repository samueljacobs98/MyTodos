const submitNameBtn = document.querySelector(".main__submit-name");
const nameInput = document.querySelector(".main__input--name");
const welcome = document.querySelector(".main__welcome");
const main = document.querySelector(".main");

const tasks = [];
let numberTaskToComplete = tasks.length;

const dealWithTaskSubmit = () => {
  console.log("yep");
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
  console.log(numberTaskToComplete);
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
