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
   document.querySelector("#btn-top-five").addEventListener("click", showTopFive);
   document.querySelector("#btn-reset-filters").addEventListener("click", showTimeTable);
   document.querySelector("#distanceSort").addEventListener("change", selectDistance);
   document.querySelector("#disciplineSort").addEventListener("change", selectDiscipline);
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
    <article>
      <tr>
         <td>${time.firstName} ${time.lastName}</td>
         <td>${time.age}</td>
         <td>${time.distance} ${time.discipline}</td>
         ${showCompetitiveTime(time)}
      </tr>
        <button id="btn-delete-time" class="btn__style">Delete</button>
    </article>
    `;

   document.querySelector("#times").insertAdjacentHTML("beforeend", html);
   // delete click
   document.querySelector("#times article:last-child #btn-delete-time").addEventListener("click", () => deleteClicked(time));
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
      html1 += `<td>${time.seconds}:${time.milliseconds}</td>`;
   } else {
      html1 += `<td>
         ${time.minuts}:${time.seconds}:${time.milliseconds}
      </td>`;
   }

   return html1;
}

async function showTimeTable() {
   times = await getTimes();
   showTimes(times);
}

async function showTopFive() {
   times = await getTimes();
   const topFive = await timeSort(times);
   showTimes(topFive);
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
