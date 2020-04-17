let today = document.getElementById("currentDay");
let lastModified = "";
let tasks = [];

function initializeTasksArray() {
    // plan to use hour 0 for last modified date.
    for (let hour = 0; hour <= 12; hour++) {
        tasks.push(" ");
    }
    console.log("dT: "+tasks);
    console.log("J.s(dT): "+JSON.stringify(tasks));
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
  console.log("load t len: "+tasks.length);
  lastModified = tasks[0];

  for (let hour = 1; hour <= 12; hour++) {

      let text = tasks[hour];
      console.log("lT t: "+text);
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
  console.log(hourButtonClass);
  let hourKey = "hour"+hour;
  console.log(hourKey);

  $(hourButtonClass).on("click" , function() {
      console.log("event t len: "+tasks.length);
      console.log("event: "+document.getElementById(hourKey).value);
      tasks[hour] = document.getElementById(hourKey).value.trim();
      localStorage.setItem("dailyTasks", JSON.stringify(tasks));
  });
}

retrieveToday();
loadTasks();
