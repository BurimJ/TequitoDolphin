"use strict";

console.log("yo");

function showAddCompetitorDialog() {
  modalOpen = true;
  document.querySelector("#dialog-for-competitor").showModal();
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
    console.log("new competitor added!");
    showCompetitorGrid();
  }
  console.log(competitor);
}
