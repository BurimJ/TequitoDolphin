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
  document.querySelector("#dialog-delete-competitor").addEventListener("submit", deleteClicked);
  document.querySelector("#form-update-competitor").addEventListener("submit", updateClicked);
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
            <p>Last Name: ${competitor.lastName}<p>
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
  document.querySelector("#competitors article:last-child #btn-update-competitor").addEventListener("click", () => updateCompetitorClicked(competitor));
  document.querySelector("#competitors article:last-child #btn-delete-competitor").addEventListener("click", () => deleteCompetitorClicked(competitor));
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
    firstName: elements.competitorFirstName.value,
    lastName: elements.competitorLastName.value,
    age: elements.competitorAge.value,
    //bithdate: elements.competitorBirthdate.value,
    myTeam: elements.competitorTeam.value,
    myPayment: elements.competitorPayment.value,
    myDistance: elements.competitorDistance.value,
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
}

function showAddCompetitorDialog() {
  document.querySelector("#dialog-for-competitor").showModal();
}

// delete comp

function deleteCompetitorClicked(competitor) {
  const deleteCompetitor = document.querySelector("#form-delete-competitor");

  deleteCompetitor.setAttribute("data-id", competitor.id);
  document.querySelector("#dialog-delete-competitor").showModal();
}

function deleteClicked(event) {
  const id = event.target.getAttribute("data-id");

  if (event.submitter.innerHTML === "Yes") {
    deleteCompetitor(id);
  }

  document.querySelector("#dialog-delete-competitor").close();
}

async function deleteCompetitor(id) {
  const response = await fetch(`${endpoint}/competitors/${id}.json`, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("competitor deleted!");
    showCompetitorGrid();
  }
}

function updateCompetitorClicked(competitor) {
  const update = document.querySelector("#form-update-competitor");
  console.log("update", update);
  update.competitorUpdateFirstName.value = competitor.firstName;
  update.competitorUpdateLastName.value = competitor.lastName;
  update.competitorUpdateAge.value = competitor.age;
  update.competitorUpdateTeam.value = competitor.myTeam;
  update.competitorUpdatePayment.value = competitor.myPayment;
  // update.competitorUpdateBirthdate.value = competitors.birthdate;
  update.competitorUpdateDistance.value = competitor.myDistance;

  update.setAttribute("data-id", competitor.id);
  document.querySelector("#dialog-update-competitor").showModal();
}

function updateClicked(event) {
  event.preventDefault();
  const form = event.target;
  const id = form.getAttribute("data-id");
  if (event.submitter.innerHTML === "Update Competitor") {
    updateCompetitor(id);
  }
  document.querySelector("#dialog-update-competitor").close();
}

async function updateCompetitor(id) {
  const elements = document.querySelector("#form-update-competitor").elements;
  console.log("elements", elements);

  const competitor = {
    firstName: elements.competitorUpdateFirstName.value,
    lastName: elements.competitorUpdateLastName.value,
    age: elements.competitorUpdateAge.value,
    //bithdate: elements.competitorUpdateBirthdate.value,
    myTeam: elements.competitorUpdateTeam.value,
    myPayment: elements.competitorUpdatePayment.value,
    myDistance: elements.competitorUpdateDistance.value,
  };
  console.log("competitor", competitor);
  const json = JSON.stringify(competitor);
  const response = await fetch(`${endpoint}/competitors/${id}.json`, {
    method: "PUT",
    body: json,
  });

  if (response.ok) {
    console.log("competitor updated!");
    showCompetitorGrid();
  }
  console.log(competitor);
}
