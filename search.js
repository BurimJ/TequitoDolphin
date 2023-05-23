// function search_animal() {
//   let input = document.getElementById("searchbar").value;
//   input = input.toLowerCase();
//   let x = document.getElementsByClassName("animals");

//   for (i = 0; i < x.length; i++) {
//     if (!x[i].innerHTML.toLowerCase().includes(input)) {
//       x[i].style.display = "none";
//     } else {
//       x[i].style.display = "list-item";
//     }
//   }
// }

// HTML //  <input id="searchBar" type="text" name="search" placeholder="Search members.." />;
const searchInput = document.getElementById("searchBar");
const namesFromDOM = document.getElementsByClassName("members__item");

searchInput.addEventListener("keyup", (event) => {
  const { value } = event.target;

  const searchQuery = value;

  for (const nameElement of namesFromDOM) {
    let name = nameElement.textContent.toLowerCase();
    if (name.includes(searchQuery)) {
      nameElement.style.display = "block";
    } else {
      nameElement.style.display = "none";
    }
  }
});
