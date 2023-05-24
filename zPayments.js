import { showCompetitor } from "./create-competitor.js";
import { showMember } from "./create-member.js";

// <table id="myTable">
//   <thead>
//     <tr>
//       <th>Name</th>
//       <th>Age</th>
//       <th>Arrears</th>
//       <button id="sortButton">Sort by Price</button>
//     </tr>
//   </thead>
// </table>
// <script src="app2.js"></script>

// let competitors = [
//   { id: 1, name: "John", age: 72, myPayment: "Passive" },
//   { id: 2, name: "Jake", age: 59, myPayment: "Senior team" },
//   { id: 3, name: "James", age: 17, myPayment: "Junior team" },
// ];

// let members = [
//   { id: 4, name: "Kevin", age: 65, myPayment: "Senior team" },
//   { id: 5, name: "Kim", age: 15, myPayment: "Junior team" },
//   { id: 6, name: "Mark", age: 15, myPayment: "Passive" },
// ];

let mergedPayments = [].concat(member, competitor);

for (let i = 0; i < mergedPayments.length; i++) {
  let array = mergedPayments[i];

  if (array.age >= 60 && array.myPayment === "Senior team") {
    array.price = "1200";
  }
  if (array.age <= 18 && array.myPayment === "Junior team") {
    array.price = "1000";
  }
  if (array.myPayment === "Passive") {
    array.price = "500";
  }
  if (array.age < 60 && array.age > 18 && array.myPayment === "Senior team") {
    array.price = "1600";
  }
}

const tablePayments = document.getElementById("myTable");

for (let i = 0; i < mergedPayments.length; i++) {
  let rowData = mergedPayments[i];

  let row = tablePayments.insertRow(i + 1);

  let nameCell = row.insertCell(0);
  let ageCell = row.insertCell(1);
  let priceCell = row.insertCell(2);
  let buttonCell = row.insertCell(3);

  nameCell.textContent = rowData.name;
  ageCell.textContent = rowData.age;
  priceCell.textContent = rowData.price;

  if (rowData.price === "0") {
    row.classList.add("green-row");
  } else {
    row.classList.add("red-row");
  }

  let button = document.createElement("button");
  button.textContent = "Set Arrears to 0";

  button.addEventListener("click", function () {
    rowData.price = "0";
    priceCell.textContent = rowData.price;
    row.classList.remove("red-row");
    row.classList.add("green-row");
    calculateSum();
    sumCellP.textContent = "Total sum: " + sumPayments.toFixed(2);
  });

  buttonCell.appendChild(button);
}

document
  .getElementById("sortButton")
  .addEventListener("click", sortTableByPrice);

function sortTableByPrice() {
  let table = document.getElementById("myTable");
  let rows = Array.from(table.rows).slice(1);
  rows.sort(function (a, b) {
    let priceA = parseFloat(a.cells[2].innerText);
    let priceB = parseFloat(b.cells[2].innerText);
    return priceA - priceB;
  });

  rows.forEach(function (row) {
    table.appendChild(row);
  });
}

let sumPayments = 0;

function calculateSum() {
  let sumPayments = 0;
  mergedPayments.forEach(function (rowData) {
    let price = parseFloat(rowData.price);
    if (!isNaN(price)) {
      sumPayments += price;
    }
  });
}

let sumRowPayments = tablePayments.insertRow();
let emptyCellPayments = sumRowPayments.insertCell();
let emptyCell2Payments = sumRowPayments.insertCell();
let sumCellP = sumRowPayments.insertCell();
calculateSum();
sumCellP.textContent = "Total sum: " + sumPayments.toFixed(2);
