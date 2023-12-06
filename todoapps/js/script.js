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
  console.log(todos);
});
