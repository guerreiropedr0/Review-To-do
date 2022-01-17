/* eslint import/no-cycle: [2, { maxDepth: 1 }] */
/* eslint no-use-before-define: ["error", { "functions": false }] */

export const TASK_LIST = JSON.parse(localStorage.getItem('savedTasks'))
  ? JSON.parse(localStorage.getItem('savedTasks'))
  : [];

export default class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
    this.index = TASK_LIST.length + 1;
  }
}

const FORM = document.querySelector('form');

export function display(TASK_LIST) {
  FORM.innerHTML = '<div class="heading"><textarea id="title">Things to do</textarea><i class="fas fa-sync"></i></div><input type="text" placeholder="Add to your list..."><button type="button">Clear all completed</button>';
  for (let i = 0; i < TASK_LIST.length; i += 1) {
    FORM.innerHTML += `<div id="each-task"><input type="checkbox" id="${TASK_LIST[i].index}"><textarea id="${TASK_LIST[i].index}">${TASK_LIST[i].description}</textarea><i id="${TASK_LIST[i].index}" class="far fa-trash-alt"></i></div>`;
  }
  selectTask(TASK_LIST);
  selectIcon(TASK_LIST);
  selectCheck(TASK_LIST);
}

export function loadTasks(TASK_LIST) {
  if (localStorage.getItem('savedTasks') != null) {
    TASK_LIST = JSON.parse(localStorage.getItem('savedTasks'));
    display(TASK_LIST);
  }
}

export function saveTasks(TASK_LIST) {
  localStorage.setItem('savedTasks', JSON.stringify(TASK_LIST));
}

export function addTask(task, TASK_LIST) {
  TASK_LIST = JSON.parse(localStorage.getItem('savedTasks'))
    ? JSON.parse(localStorage.getItem('savedTasks'))
    : [];
  task.index = TASK_LIST.length + 1;
  TASK_LIST.push(task);
  saveTasks(TASK_LIST);
  display(TASK_LIST);
}

export function createTask(TASK_LIST) {
  FORM.addEventListener('submit', (e) => {
    const INPUT = document.querySelector("input[type='text']");
    e.preventDefault();
    if (INPUT.value !== '') {
      const t = new Task(INPUT.value);
      addTask(t, TASK_LIST);
    }
  });
}

export function removeTask(index, TASK_LIST) {
  TASK_LIST.splice(index, 1);
  for (let i = index; i < TASK_LIST.length; i += 1) {
    TASK_LIST[i].index -= 1;
  }
  saveTasks(TASK_LIST);
  display(TASK_LIST);
}

export function editTask(index, newDescription, TASK_LIST) {
  TASK_LIST[index].description = newDescription;
  saveTasks(TASK_LIST);
  display(TASK_LIST);
}

function selectIcon(TASK_LIST) {
  const ICON = document.querySelectorAll('.fa-trash-alt');
  ICON.forEach((removeIcon) => {
    removeIcon.addEventListener('click', () => {
      removeTask(removeIcon.id - 1, TASK_LIST);
    });
  });
}

export function selectTask(TASK_LIST) {
  const TEXTAREA = document.querySelectorAll('#each-task textarea');
  TEXTAREA.forEach((text) => {
    text.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        editTask(text.id - 1, text.value, TASK_LIST);
      }
    });
  });
}

export function removeCheck(TASK_LIST) {
  TASK_LIST = TASK_LIST.filter((t) => t.completed === false);
  TASK_LIST.forEach((task, index) => {
    task.index = index + 1;
  });
  saveTasks(TASK_LIST);
  display(TASK_LIST);
}

function selectCheck(TASK_LIST) {
  const INPUT_CHECKBOX = document.querySelectorAll('input[type="checkbox"]');
  INPUT_CHECKBOX.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      updateCheck(checkbox.checked, checkbox.id - 1, TASK_LIST);
    });
  });
  const BUTTON = document.querySelector('button');
  BUTTON.addEventListener('click', () => {
    removeCheck(TASK_LIST);
  });
}

function updateCheck(checked, index, TASK_LIST) {
  const task = TASK_LIST[index];
  task.completed = checked;
  saveTasks(TASK_LIST);
}
