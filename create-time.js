"use strict";

// load

window.addEventListener("load", start);

// end point

const endpoint = "https://semesterprojekt-790e8-default-rtdb.europe-west1.firebasedatabase.app";

// prepare data

function prepareData(dataObject) {
  const array = [];
  for (const key in dataObject) {
    const object = dataObject[key];
    object.id = key;
    array.push(object);
  }
  return array;
}

// start

function start() {
  showTimeTable();

  document.querySelector("#btn-add-time").addEventListener("click", showAddTimeModal);
  document.querySelector("#form-for-time").addEventListener("submit", addTimeClicked);
  document.querySelector("#dialog-delete-time").addEventListener("submit", deleteTimeClicked);
  //filters
  document.querySelector("#btn-reset-filters").addEventListener("click", showTimeTable);
  document.querySelector("#distanceSort").addEventListener("change", selectDistance);
  document.querySelector("#disciplineSort").addEventListener("change", selectDiscipline);
  document.querySelector("#top-five").addEventListener("change", showTopFive);
}

let times;

// fetch

async function getTimes() {
  const response = await fetch(`${endpoint}/times.json`);
  const data = await response.json();
  const times = prepareData(data);
  return times;
}

// show times

function showTime(time) {
  const html = /*html*/ `
    <table width="100%">
      <tr>
         <th width="16.6%">${time.firstName} ${time.lastName}</th>
         <th width="16.6%">${time.age}</th>
         <th width="16.6%">${time.distance}</th>
         <th width="16.6%">${time.discipline}</th>
         ${showCompetitiveTime(time)}
         <th width="16.6%"><button id="btn-delete-time" class="btn__style">Delete</button></th>
        </tr>
    </table>
    `;

  document.querySelector("#times").insertAdjacentHTML("beforeend", html);
  // delete click
  document.querySelector("#times tr:last-child #btn-delete-time").addEventListener("click", () => deleteClicked(time));
}

function showTimes(times) {
  document.querySelector("#times").innerHTML = "";

  for (const time of times) {
    showTime(time);
  }
}

function showCompetitiveTime(time) {
  let html1 = "";
  if (time.minuts === "") {
    html1 += `<th width="16.6%">${time.seconds}:${time.milliseconds}</th>`;
  } else {
    html1 += `<th width="16.6%">
         ${time.minuts}:${time.seconds}:${time.milliseconds}
      </th>`;
  }

  return html1;
}

async function showTimeTable() {
  times = await getTimes();
  showTimes(times);
}

async function selectDistance(event) {
  times = await getTimes();
  const distance = event.target.value;
  const distanceArray = isDistance(times, distance);
  showTimes(distanceArray);
}

async function selectDiscipline(event) {
  times = await getTimes();
  const discipline = event.target.value;
  const disciplineArray = isDiscipline(times, discipline);
  showTimes(disciplineArray);
}

async function showTopFive(event) {
  times = await getTimes();

  if (event.target.value === "50c") {
    showTimes(await timeSort(isDistance(isDiscipline(times, "Crawl"), "50 m")));
  } else if (event.target.value === "200c") {
    showTimes(await timeSort(isDistance(isDiscipline(times, "Crawl"), "200 m")));
  } else if (event.target.value === "1000c") {
    showTimes(await timeSort(isDistance(isDiscipline(times, "Crawl"), "1000 m")));
  } else if (event.target.value === "50ba") {
    showTimes(await timeSort(isDistance(isDiscipline(times, "Backstroke"), "50 m")));
  } else if (event.target.value === "200ba") {
    showTimes(await timeSort(isDistance(isDiscipline(times, "Backstroke"), "200 m")));
  } else if (event.target.value === "1000ba") {
    showTimes(await timeSort(isDistance(isDiscipline(times, "Backstroke"), "1000 m")));
  } else if (event.target.value === "50br") {
    showTimes(await timeSort(isDistance(isDiscipline(times, "Breaststroke"), "50 m")));
  } else if (event.target.value === "200br") {
    showTimes(await timeSort(isDistance(isDiscipline(times, "Breaststroke"), "200 m")));
  } else if (event.target.value === "1000br") {
    showTimes(await timeSort(isDistance(isDiscipline(times, "Breaststroke"), "1000 m")));
  } else if (event.target.value === "50bu") {
    showTimes(await timeSort(isDistance(isDiscipline(times, "Butterfly"), "50 m")));
  } else if (event.target.value === "200bu") {
    showTimes(await timeSort(isDistance(isDiscipline(times, "Butterfly"), "200 m")));
  } else if (event.target.value === "1000bu") {
    showTimes(await timeSort(isDistance(isDiscipline(times, "Butterfly"), "1000 m")));
  } else {
    console.log("failure");
  }
}

// create time

async function addTime() {
  const elements = document.querySelector("#form-for-time").elements;

  //spørg chatgpt hvordan man henviser til ider med bindestreg.

  const time = {
    firstName: elements.firstNameTime.value,
    lastName: elements.lastNameTime.value,
    age: elements.ageTime.value,
    distance: elements.distanceTime.value,
    discipline: elements.disciplineTime.value,
    minuts: elements.minutsTime.value,
    seconds: elements.secondsTime.value,
    milliseconds: elements.millisecondsTime.value,
  };

  const json = JSON.stringify(time);
  const response = await fetch(`${endpoint}/times.json`, {
    method: "POST",
    body: json,
  });

  if (response.ok) {
    console.log("new time added!");
    showTimeTable();
  }

  console.log(time);
}

function addTimeClicked(event) {
  event.preventDefault();

  const form = document.querySelector("#form-for-time");

  if (event.submitter.innerHTML === "Close") {
    document.querySelector("#dialog-for-time").close();
    return;
  }

  addTime();
  form.reset();
  document.querySelector("#dialog-for-time").close();
}

function showAddTimeModal() {
  document.querySelector("#dialog-for-time").showModal();
}

// delete time

function deleteClicked(time) {
  const deleteTime = document.querySelector("#form-delete-time");

  deleteTime.setAttribute("data-id", time.id);
  document.querySelector("#dialog-delete-time").showModal();
}

function deleteTimeClicked(event) {
  const id = event.target.getAttribute("data-id");

  if (event.submitter.innerHTML === "Yes") {
    deleteTime(id);
  }

  document.querySelector("#dialog-delete-time").close();
}

async function deleteTime(id) {
  const response = await fetch(`${endpoint}/times/${id}.json`, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("time deleted!");
    showTimeTable();
  }
}

// top 5 filter

async function timeSort(array) {
  const sortedArray = array.sort((a, b) => a.minuts - b.minuts);

  const minutsSortedArray = [];

  for (let i = 0; i < sortedArray.length; i++) {
    if (sortedArray[i].minuts <= sortedArray[4].minuts) {
      minutsSortedArray.push(sortedArray[i]);
    }
  }

  if (minutsSortedArray.length === 5) {
    return minutsSortedArray;
  }

  const secondsSortedArray = [];

  for (let i = 0; i < minutsSortedArray.length; i++) {
    if (minutsSortedArray[i].seconds <= minutsSortedArray[4].seconds) {
      secondsSortedArray.push(minutsSortedArray[i]);
    }
  }

  if (secondsSortedArray.length === 5) {
    return secondsSortedArray;
  }

  const millisecondsSortedArray = secondsSortedArray.sort((a, b) => a.milliseconds - b.milliseconds);
  return millisecondsSortedArray.slice(0, 5);
}

function isDiscipline(array, discipline) {
  const sortedArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].discipline === discipline) {
      sortedArray.push(array[i]);
    }
  }
  return sortedArray;
}

function isDistance(array, distance) {
  const sortedArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].distance === distance) {
      sortedArray.push(array[i]);
    }
  }
  return sortedArray;
}

// test array
