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

  document.querySelector("#dialog-delete-member").addEventListener("submit", deleteClicked);
  document.querySelector("#form-update-member").addEventListener("submit", updateClicked);
  // document.querySelector("#form-update-member").addEventListener("submit", updatememberClicked);
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
        <article class="members__item">
            <h3>First Name: ${member.firstName}<h3>
            <h3>Last Name: ${member.class}<h3>
            <h3>Age: ${member.age}<h3>
            <h3>Team: ${member.myTeam}<h3>
            <h3>Payment: ${member.myPayment}<h3>
            <button id="btn-update-member" class="btn__style">Update Member</button>
            <button id="btn-delete-member" class="btn__style">Delete Member</button>
        </article>
    `;

  document.querySelector("#members").insertAdjacentHTML("beforeend", html);

  //event listeners to btns
  document.querySelector("#members article:last-child #btn-update-member").addEventListener("click", () => updateClicked(member));
  document.querySelector("#members article:last-child #btn-delete-member").addEventListener("click", () => deleteClicked(member));
}

function showMembers(members) {
  document.querySelector("#members").innerHTML = "";

  for (const member of members) {
    showMember(member);
  }
}

async function showMemberGrid() {
  members = await getMembers();
  showMembers(members);
}

// add member
async function addMember() {
  const elements = document.querySelector("#form-for-member").elements;

  const member = {
    firstName: elements.memberFirstName.value,
    lastName: elements.memberLastName.value,
    age: elements.memberAge.value,
    //bithdate: elements.memberBirthdate.value,
    myTeam: elements.memberTeam.value,
    myPayment: elements.memberPayment.value,
  };
  const json = JSON.stringify(member);
  const response = await fetch(`${endpoint}/members.json`, {
    method: "POST",
    body: json,
  });

  if (response.ok) {
    console.log("new member added!");
    showMemberGrid();
  }

  console.log(member);
}

//

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
}

function showAddMemberDialog() {
  document.querySelector("#dialog-for-member").showModal();
}

// delete

function deleteMemberClicked(member) {
  const deleteMember = document.querySelector("#form-delete-member");

  deleteMember.setAttribute("data-id", member.id);
  document.querySelector("#dialog-delete-member").showModal();
}

function deleteClicked(event) {
  const id = event.target.getAttribute("data-id");

  if (event.submitter.innerHTML === "Yes") {
    deleteMember(id);
  }

  document.querySelector("#dialog-delete-member").close();
}

async function deleteMember(id) {
  const response = await fetch(`${endpoint}/members/${id}.json`, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("member deleted!");
    showMemberGrid();
  }
}

function updateMemberClicked(member) {
  const update = document.querySelector("#form-update-member");
  console.log("update", update);
  update.memberUpdateFirstName.value = member.firstName;
  update.memberUpdateLastName.value = member.lastName;
  update.memberUpdateAge.value = member.age;
  update.memberUpdateTeam.value = member.myTeam;
  update.memberUpdatePayment.value = member.myPayment;
  // update.memberUpdateBirthdate.value = members.birthdate;
  update.setAttribute("data-id", member.id);
  document.querySelector("#dialog-update-member").showModal();
}

function updateClicked(event) {
  event.preventDefault();
  const form = event.target;
  const id = form.getAttribute("data-id");
  if (event.submitter.innerHTML === "Update Member") {
    updateMember(id);
  }
  document.querySelector("#dialog-update-member").close();
}

async function updateMember(id) {
  const elements = document.querySelector("#form-update-member").elements;
  console.log("elements", elements);

  const member = {
    firstName: elements.memberUpdateFirstName.value,
    lastName: elements.memberUpdateLastName.value,
    age: elements.memberUpdateAge.value,
    //bithdate: elements.memberUpdateBirthdate.value,
    myTeam: elements.memberUpdateTeam.value,
    myPayment: elements.memberUpdatePayment.value,
  };
  console.log("member", member);
  const json = JSON.stringify(member);
  const response = await fetch(`${endpoint}/members/${id}.json`, {
    method: "PUT",
    body: json,
  });

  if (response.ok) {
    console.log("member updated!");
    showMemberGrid();
  }
  console.log(member);
}
