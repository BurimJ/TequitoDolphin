"use strict";

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

async function getMembersPayment() {
  const response = await fetch(`${endpoint}/members.json`);
  const data = await response.json();
  const membersPayment = prepareData(data);
  return membersPayment;
}

async function logMembersPayment() {
  console.log(membersPayment);
}
const membersPayment = await getMembersPayment();

logMembersPayment();

async function getCompetitorsPayment() {
  const response = await fetch(`${endpoint}/competitors.json`);
  const data = await response.json();
  const membersCompetitors = prepareData(data);
  return membersCompetitors;
}

async function logCompetitorsPayment() {
  console.log(competitorsPayment);
}
const competitorsPayment = await getCompetitorsPayment();

logMembersPayment();

let mergedPayments = [].concat(membersPayment, competitorsPayment);
console.log(mergedPayments);

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
    sumPayments = calculateSum();
    sumCellP.textContent = "Total sum: " + sumPayments.toFixed(2);
  });

  buttonCell.appendChild(button);
}

let sumPayments = calculateSum();

function calculateSum() {
  let sum = 0;
  mergedPayments.forEach(function (rowData) {
    let price = parseFloat(rowData.price);
    if (!isNaN(price)) {
      sum += price;
    }
  });
  return sum;
}

let sumRowPayments = tablePayments.insertRow();
let emptyCellPayments = sumRowPayments.insertCell();
let emptyCell2Payments = sumRowPayments.insertCell();
let sumCellP = sumRowPayments.insertCell();
sumCellP.textContent = "Total sum: " + sumPayments.toFixed(2);

document.getElementById("sortButton").addEventListener("click", sortTableByPrice);

function sortTableByPrice() {
  console.log("sort button123");
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
