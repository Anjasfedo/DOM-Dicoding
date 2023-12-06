const todos = [];

const RENDER_EVENT = "render-todo";

const generetedId = () => +new Date();

const generateToDoObject = (id, task, timestamp, isCompleted) => {
  return {
    id,
    task,
    timestamp,
    isCompleted,
  };
};

const makeToDo = (toDoObject) => {
  const textTitle = document.createElement("h2");
  textTitle.innerText = toDoObject.task;

  const textTimeStamp = document.createElement("p");
  textTimeStamp.innerText = toDoObject.timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textTimeStamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `todo-${toDoObject.id}`);

  if (toDoObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", () => {
      undoTaskFromComplete(toDoObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", () => {
      removeTaskFromComplete(toDoObject.id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", () => {
      addTaskToCompleted(toDoObject.id);
    });

    container.append(checkButton);
  }

  return container;
};

const addTaskToCompleted = (toDoId) => {
  const toDoTarget = findToDo(toDoId);

  if (toDoTarget == null) return;

  toDoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const removeTaskFromComplete = (toDoId) => {
  const toDoTarget = findIndexToDo(toDoId);

  if (toDoTarget === -1) return;

  todos.splice(toDoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const undoTaskFromComplete = (toDoId) => {
  const toDoTarget = findToDo(toDoId);

  if (toDoTarget == null) return;

  toDoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const findToDo = (todoId) => {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
};

const findIndexToDo = (todoId) => {
    for (const index in todos) {
      if (todos[index].id === todoId) {
        return index;
      }
    }
    return -1;
  };

document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addToDo();
  });
});

const addToDo = () => {
  const textToDo = document.getElementById("title").value;
  const timeStamp = document.getElementById("date").value;

  const generetedID = generetedId();

  const toDoObject = generateToDoObject(
    generetedID,
    textToDo,
    timeStamp,
    false
  );
  todos.push(toDoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
};

document.addEventListener(RENDER_EVENT, function () {
  //   console.log(todos);
  const uncompletedToDo = document.getElementById("todos");
  uncompletedToDo.innerHTML = "";

  const completedToDo = document.getElementById("completed-todos");
  completedToDo.innerHTML = "";

  for (const data of todos) {
    const toDoElement = makeToDo(data);
    if (!data.isCompleted) {
      uncompletedToDo.append(toDoElement);
    } else {
      completedToDo.append(toDoElement);
    }
  }
});
