let today = document.getElementById("currentDay");
let lastModified = "";
let tasks = [];

function initializeTasksArray() {
    // plan to use hour 0 for last modified date.
    for (let hour = 0; hour <= 12; hour++) {
        tasks.push(" ");
    }
    localStorage.setItem("dailyTasks", JSON.stringify(tasks));

    return JSON.parse(localStorage.getItem("dailyTasks"));
}


function retrieveToday() {
  let current = moment();
  today.textContent = current;
}

function loadTasks() {
  console.log("LOAD TASKS");

  tasks = JSON.parse(localStorage.getItem("dailyTasks")) || initializeTasksArray();
  lastModified = tasks[0];
  document.querySelector(".footer").textContent = "Last Modified: "+lastModified;

  for (let hour = 1; hour <= 12; hour++) {

      let text = tasks[hour];
      document.getElementById("hour"+hour).value = text;
  
      dynamicallyCreateEventListener(hour);

      if (hour === 5) {
          // skip hours 6 and 7
          hour = 7;
      }
  }
}

function dynamicallyCreateEventListener(hour) {
  let hourButtonClass = ".hour"+hour+"btn";
  let hourKey = "hour"+hour;

  $(hourButtonClass).on("click" , function() {
      tasks[hour] = document.getElementById(hourKey).value.trim();
      tasks[0] = moment();
      lastModified = tasks[0];
      localStorage.setItem("dailyTasks", JSON.stringify(tasks));

      document.querySelector(".footer").textContent = "Last Modified: "+lastModified;
  });
}

retrieveToday();
loadTasks();
