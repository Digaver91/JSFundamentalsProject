const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const button = document.querySelector(".btn");

button.addEventListener("click", addTask);

function addTask() {
  if (inputBox.value === "") {
    alert("You must type something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value + " - " + getCurrentDate();
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
  localStorage.setItem("lastSaved", getCurrentDate());
}

function loadData() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
  const lastSaved = localStorage.getItem("lastSaved");
  if (lastSaved) {
    console.log("Last saved:", lastSaved);
  }
}

function getCurrentDate() {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return `${date}/${month}/${year}`;
}

loadData();

const timeNow = document.querySelector("h3");

function updateTime() {
  const currentDate = new Date();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  timeNow.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);

const clearButton = document.querySelector(".clear");

clearButton.addEventListener("click", () => {
  listContainer.innerHTML = "";
  saveData();
});
