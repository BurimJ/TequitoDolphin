"use strict";

console.log("yo");
let modalOpen = false;

function showAddMemberDialog() {
  modalOpen = true;
  document.querySelector("#dialog-for-member").showModal();
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

  const member = {
    firstName: elements.firstName.value,
    lastName: elements.lastName.value,
    myTeam: elements.myTeam.value,
    myPayment: elements.myPayment.value,
    myDistance: elements.myDistance.value,
  };

  const json = JSON.stringify(member);
  const response = await fetch(`${endpoint}/members.json`, {
    method: "POST",
    body: json,
  });

  if (response.ok) {
    console.log("new Member added!");
    showMemberGrid();
  }
  console.log(member);
}
