"use strict";
console.log("page loading");

window.addEventListener("load", func);

function func() {
  document.getElementById("buttonLogin").addEventListener("click", loginCheck);
}

function loginCheck() {
  let inputValueE = document.getElementById("loginEmail").value;
  let inputValueP = document.getElementById("loginPassword").value;
  if (inputValueE === "one" && inputValueP === "one") {
    loginComplete();
  } else {
    const errorLogin = document.getElementById("loginError");
    errorLogin.innerText = "Login Failed. Please try again";
    errorLogin.style.display = "block";
  }
}

function loginComplete() {
  window.location.href = "index.html";
}
