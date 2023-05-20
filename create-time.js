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
}

let times;
let competitors;

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
        <p>hej ${time.firstName}</p>
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

async function showTimeTable() {
   times = await getTimes();
   //    const times = testArray;
   showTimes(times);
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

// test array

const testArray = [
   { firstName: "Crawl", time: 10.11 },
   { firstName: "Butterfly", time: 10.12 },
   { firstName: "Ryg-crawl", time: 10.13 },
   { firstName: "Brystsvømning", time: 10.14 },
   { firstName: "Crawl", time: 10.15 },
   { firstName: "Ryg-crawl", time: 10.16 },
   { firstName: "Crawl", time: 10.17 },
   { firstName: "Crawl", time: 10.18 },
   { firstName: "Butterfly", time: 10.19 },
   { firstName: "Crawl", time: 10.2 },
];

const testObjectID = [
   {
      firstName: "Frederikke",
      lastName: "Vammen",
      age: "21",
      id: "frevam23-S",
   },
   {
      firstName: "Frederikke",
      lastName: "Andersen",
      age: "21",
      id: "frevam24-J",
   },
];

// virker;

function findID(idCompetitor) {
   for (let i = 0; i < testObjectID.length; i++) {
      if (idCompetitor === testObjectID[i].id) {
         return testObjectID[i];
      }
   }
}

function competitorInformation(idCompetitor) {
   const competitor = findID(idCompetitor);
   return `${competitor.firstName}`;
}

// console.log(findID1("frevam23-S"));
console.log(competitorInformation("frevam23-S"));
