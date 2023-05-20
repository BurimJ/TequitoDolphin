"use strict";

window.addEventListener("load", start);

// end point

const endpoint = "https://semesterprojekt-790e8-default-rtdb.europe-west1.firebasedatabase.app";

function prepareData(dataObject) {
  const array = [];
  for (const key in dataObject) {
    const object = dataObject[key];
    object.id = key;
    array.push(object);
  }
  return array;
}

function start() {
  showCompetitorGrid();

  document.querySelector("#btn__add-competitor").addEventListener("click", showAddCompetitorDialog);
  document.querySelector("#form-for-competitor").addEventListener("submit", addCompetitorClicked);
  // document.querySelector("#form-update-competitor").addEventListener("submit", updateCompetitorClicked);
}

let competitors;

async function getCompetitors() {
  const response = await fetch(`${endpoint}/competitors.json`);
  const data = await response.json();
  const competitors = prepareData(data);
  return competitors;
}

function showCompetitor(competitor) {
  const html = /* html */ `
        <article class="competitors__item">
            <p>First Name: ${competitor.firstName}<p>
            <p>Last Name: ${competitor.class}<p>
            <p>Age: ${competitor.age}<p>
            <p>Team: ${competitor.myTeam}<p>
            <p>Payment: ${competitor.myPayment}<p>
            <p>Distance: ${competitor.myDistance}<p>
            <button id="btn-update-competitor" class="btn__style">Update competitor</button>
            <button id="btn-delete-competitor" class="btn__style">Delete competitor</button>
        </article>
    `;

  document.querySelector("#competitors").insertAdjacentHTML("beforeend", html);

  //event listeners to btns
  document.querySelector("#competitors article:last-child #btn-update-competitor").addEventListener("click", () => updateClicked(competitor));
  document.querySelector("#competitors article:last-child #btn-delete-competitor").addEventListener("click", () => deleteClicked(competitor));
}

function showCompetitors(competitors) {
  document.querySelector("#competitors").innerHTML = "";

  for (const competitor of competitors) {
    showCompetitor(competitor);
  }
}

async function showCompetitorGrid() {
  competitors = await getCompetitors();
  showCompetitors(competitors);
}

// create comp

async function addCompetitor() {
  const elements = document.querySelector("#form-for-competitor").elements;

  const competitor = {
    firstName: elements.firstName.value,
    lastName: elements.lastName.value,
    myTeam: elements.myTeam.value,
    myPayment: elements.myPayment.value,
    myDistance: elements.myDistance.value,
  };
  const json = JSON.stringify(competitor);
  const response = await fetch(`${endpoint}/competitors.json`, {
    method: "POST",
    body: json,
  });

  if (response.ok) {
    console.log("new comp added!");
    showCompetitorGrid();
  }

  console.log(competitor);
}

function addCompetitorClicked(event) {
  event.preventDefault();
  console.log("add Competitor clicked");
  const form = document.querySelector("#form-for-competitor");

  if (event.submitter.innerHTML === "Close") {
    document.querySelector("#dialog-for-competitor").close();
    return;
  }

  addCompetitor();
  form.reset();
  document.querySelector("#dialog-for-competitor").close();
  modalOpen = false;
}

function showAddCompetitorDialog() {
  document.querySelector("#dialog-for-competitor").showModal();
}
