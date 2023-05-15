"use strict";

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
            <h3>First Name: ${members.firstName}<h3>
            <h3>Last Name: ${members.class}<h3>
            <h3>Age: ${members.age}<h3>
            <h3>Team: ${members.myTeam}<h3>
            <h3>Payment: ${members.myPayment}<h3>
            <h3>Distance: ${members.myDistance}<h3>
            <button id="btn-update-member" class="btn__style">Update member</button>
            <button id="btn-delete-member" class="btn__style">Delete member</button>
        </article>
    `;

  document.querySelector("#members").insertAdjacentHTML("beforeend", html);

  //event listeners to btns
  document.querySelector("#members article:last-child #btn-update-member").addEventListener("click", () => updateClicked(member));
  document.querySelector("#members article:last-child #btn-delete-member").addEventListener("click", () => deleteClicked(member));
}

function showMembers(allMembers) {
  document.querySelector("#members").innerHTML = "";

  for (const member of allMembers) {
    showMember(member);
  }
}

// put all of them in members tab, with 1 button
