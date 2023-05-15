import { initViews } from "./view-router.js";

window.addEventListener("load", initApp);

const endpoint = "https://semesterprojekt-790e8-default-rtdb.europe-west1.firebasedatabase.app/";

function initApp() {

  
  console.log("app.js is running 🎉");
  initViews();
  document.querySelector("#btn__add-member").addEventListener("click", showAddMemberDialog);
  document.querySelector("#btn__add-competitor").addEventListener("click", showAddCompetitorDialog);
  document.querySelector("#form-for-member").addEventListener("submit", addMemberClicked);
  document.querySelector("#form-for-competitor").addEventListener("submit", addCompetitorClicked);
  document.querySelector("#form-update-member").addEventListener("submit", updateMemberClicked);
  document.querySelector("#form-update-competitor").addEventListener("submit", updateCompetitorClicked);
  document.querySelector("#form-delete-post").addEventListener("submit", deletePostClicked);
}
