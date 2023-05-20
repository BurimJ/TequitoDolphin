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
  showMemberGrid();

  document.querySelector("#btn__add-member").addEventListener("click", showAddMemberDialog);
  document.querySelector("#form-for-member").addEventListener("submit", addMemberClicked);
  // document.querySelector("#form-update-competitor").addEventListener("submit", updateCompetitorClicked);
}

let members;

async function getMembers() {
  const response = await fetch(`${endpoint}/members.json`);
  const data = await response.json();
  const members = prepareData(data);
  return members;
}

function showMember(member) {
  const html = /* html */ `
        <article class="competitors__item">
            <h3>First Name: ${members.firstName}<h3>
            <h3>Last Name: ${members.class}<h3>
            <h3>Age: ${members.age}<h3>
            <h3>Team: ${members.myTeam}<h3>
            <h3>Payment: ${members.myPayment}<h3>
            <h3>Distance: ${members.myDistance}<h3>
            <button id="btn-update-member" class="btn__style">Update Member</button>
            <button id="btn-delete-member" class="btn__style">Delete Member</button>
        </article>
    `;

  document.querySelector("#members").insertAdjacentHTML("beforeend", html);

  //event listeners to btns
  document.querySelector("#members article:last-child #btn-update-member").addEventListener("click", () => updateClicked(member));
  document.querySelector("#members article:last-child #btn-delete-member").addEventListener("click", () => deleteClicked(members));
}

function showmembers(members) {
  document.querySelector("#members").innerHTML = "";

  for (const member of members) {
    showMember(member);
  }
}

async function showMemberGrid() {
  members = await getMembers();
  showMember(members);
}

function addMemberClicked(event) {
  event.preventDefault();
  console.log("add member clicked");
  const form = document.querySelector("#form-for-member");

  if (event.submitter.innerHTML === "Close") {
    document.querySelector("#dialog-for-member").close();
    return;
  }

  addMember();
  form.reset();
  document.querySelector("#dialog-for-member").close();
  modalOpen = false;
}

async function addMember() {
  const elements = document.querySelector("#form-for-member").elements;

  const competitor = {
    firstName: elements.firstName.value,
    lastName: elements.lastName.value,
    myTeam: elements.myTeam.value,
    myPayment: elements.myPayment.value,
    myDistance: elements.myDistance.value,
  };
}
function showAddMemberDialog() {
  document.querySelector("#dialog-for-member").showModal();
}
