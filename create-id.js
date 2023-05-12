"use strict";

function createID(firstName, lastName, team) {
   return extractThree(firstName) + extractThree(lastName) + randomNumber() + "-" + team;
}

function extractThree(string) {
   return string.slice(0, 3).toUpperCase();
}

function randomNumber() {
   return Math.floor(Math.random() * 99) + 1;
}

// jeg tænkte at man som konkurrence svømmer fik genereret et ID
// som man kunne tilføje sine tider med
// så gennem idet kan den automatisk finde ens navn når man skriver
// noget ind i tabellen.
// men kun en ide
// det er for at undgå at skrive alle ens tider ind i formen.
// dermed kunne man også hurtigt slette sine egne tider,
// hvis man ville, så kunne man bruge sit id som kode.
// hvis det giver mening. en authenticator af en form.

console.log(extractThree("frederikke"));
console.log(createID("frederikke", "vammen", "UA"));

const numbersArray = [10.52, 13.59, 16.67, 11.84, 11.84, 15.94, 19.56, 17.53, 12.23, 18.12];
const numbersArray1 = [10.52, 10.53, 10.54, 11.22, 13.59, 16.67, 11.84, 11.84, 15.94, 19.56, 17.53, 12.23, 18.12];

const sortedArray = numbersArray.sort((a, b) => a - b);

function sortByValue(array) {
   const sortedArray = array.sort((a, b) => a - b);

   if (sortedArray[4] === sortedArray[5]) {
      return sortedArray.slice(0, 6);
   } else {
      return sortedArray.slice(0, 5);
   }
}

console.log(sortedArray);
console.log(sortByValue(numbersArray));
console.log(sortByValue(numbersArray1));

// filter funktioner

const madeUpArray = [
   { discipline: "Crawl", time: 10.11 },
   { discipline: "Butterfly", time: 10.12 },
   { discipline: "Ryg-crawl", time: 10.13 },
   { discipline: "Brystsvømning", time: 10.14 },
   { discipline: "Crawl", time: 10.15 },
   { discipline: "Ryg-crawl", time: 10.16 },
   { discipline: "Crawl", time: 10.17 },
   { discipline: "Crawl", time: 10.18 },
   { discipline: "Butterfly", time: 10.19 },
   { discipline: "Crawl", time: 10.2 },
];

function isCrawl(array) {
   const sortedArray = [];
   for (let i = 0; i < array.length; i++) {
      if (array[i].discipline === "Crawl") {
         sortedArray.push(array[i]);
      }
   }
   return sortedArray;
}

console.log(isCrawl(madeUpArray));

const tider = [
   { minuts: 14, seconds: 10, milliseconds: 10 },
   { minuts: 10, seconds: 10, milliseconds: 10 },
   { minuts: 12, seconds: 10, milliseconds: 10 },
   { minuts: 11, seconds: 10, milliseconds: 10 },
   { minuts: 11, seconds: 10, milliseconds: 10 },
   { minuts: 11, seconds: 10, milliseconds: 10 },
   { minuts: 12, seconds: 10, milliseconds: 10 },
   { minuts: 15, seconds: 10, milliseconds: 10 },
   { minuts: 16, seconds: 10, milliseconds: 10 },
   { minuts: 13, seconds: 10, milliseconds: 10 },
];

function timeSort(array) {
   const sortedArray = array.sort((a, b) => a.minuts - b.minuts);

   console.log(sortedArray);
   const minutsSortedArray = [];

   for (let i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i].minuts <= sortedArray[4].minuts) {
         minutsSortedArray.push(sortedArray[i]);
      }
   }
   return minutsSortedArray;
}

// return sortedArray.slice(0, 5);
console.log(timeSort(tider));
