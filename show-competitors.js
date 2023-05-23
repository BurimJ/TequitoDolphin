"use strict";

const endpoint = "https://semesterprojekt-790e8-default-rtdb.europe-west1.firebasedatabase.app";

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
            <h3>First Name: ${competitors.firstName}<h3>
            <h3>Last Name: ${competitors.class}<h3>
            <h3>Age: ${competitors.age}<h3>
            <h3>Team: ${competitors.myTeam}<h3>
            <h3>Payment: ${competitors.myPayment}<h3>
            <h3>Distance: ${competitors.myDistance}<h3>
            ${assignCoach(competitor)}
            <button id="btn-update-competitor" class="btn__style">Update competitor</button>
            <button id="btn-delete-competitor" class="btn__style">Delete competitor</button>
        </article>
    `;

   function assignCoach(competitor) {
      let html1 = "";
      if (competitor.myTeam === "Junior") {
         html += `<h3>Coach: Coach Valde</h3>`;
      } else {
         html1 += `<h3>Coach: Coach Burim</h3>`;
      }
      return html1;
   }

   document.querySelector("#competitorsInsert").insertAdjacentHTML("beforeend", html);

   //event listeners to btns
   document.querySelector("#competitorsInsert article:last-child #btn-update-competitor").addEventListener("click", () => updateClicked(competitor));
   document.querySelector("#competitorsInsert article:last-child #btn-delete-competitor").addEventListener("click", () => deleteClicked(competitor));
}

function showcompetitors(allcompetitors) {
   document.querySelector("#competitorsInsert").innerHTML = "";

   for (const competitor of allcompetitors) {
      showCompetitor(competitor);
   }
}

// put all of them in comp tab, with 1 button
