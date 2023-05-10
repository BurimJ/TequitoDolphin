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
