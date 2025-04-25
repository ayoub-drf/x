function showModal(title, imageUrl, downloads, rating) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalImg").src = imageUrl;
  document.getElementById("modalDownloads").innerText = downloads;
  document.getElementById("modalRating").innerText = "⭐ " + rating;
  document.getElementById("gameModal").style.display = "flex";
}

let isProduction = true;



Array.from(document.querySelectorAll(".download-game")).forEach((element) => {
  element.addEventListener("click", async () => {
    let modalTitle = element.parentElement.parentElement.querySelector("#modalTitle");
    const gameName = modalTitle.innerText.trim();

    if (isProduction === true) {
      _jb();
    } 
    // else {
    //   const file = await generateFile(gameName)
    // }
  });
});

function closeModal() {
  document.getElementById("gameModal").style.display = "none";
}

// Add an event listener to the search input
document
  .querySelector(".search-bar #input input")
  .addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const gameCards = document.querySelectorAll(".game-card");

    // Loop through all game cards
    gameCards.forEach((card) => {
      // Get the game title from the card's h3 element
      const title = card.querySelector("h3").textContent.toLowerCase();

      // Show/hide cards based on whether they match the search term
      if (title.includes(searchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
// Add an event listener to the search input
document
  .querySelector(".search-bar input")
  .addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const gameCards = document.querySelectorAll(".game-card");
    let hasResults = false;

    // Loop through all game cards
    gameCards.forEach((card) => {
      // Get the game title from the card's h3 element
      const title = card.querySelector("h3").textContent.toLowerCase();

      // Show/hide cards based on whether they match the search term
      if (title.includes(searchTerm)) {
        card.style.display = "block";
        hasResults = true;
      } else {
        card.style.display = "none";
      }
    });

    // Show/hide no results message
    const noResults =
      document.getElementById("noResults") || createNoResultsElement();
    noResults.style.display = hasResults ? "none" : "block";
  });

// Create the "No results" element if it doesn't exist
function createNoResultsElement() {
  const noResults = document.createElement("div");
  noResults.id = "noResults";
  noResults.style.textAlign = "center";
  noResults.style.padding = "20px";
  noResults.style.color = "#fff";
  noResults.innerText = "No games found";

  // Insert after the search bar
  const searchBar = document.querySelector(".search-bar");
  searchBar.parentNode.insertBefore(noResults, searchBar.nextSibling);

  return noResults;
}



document.addEventListener('contextmenu', e => e.preventDefault());

// Disable common inspect shortcuts
document.addEventListener('keydown', e => {
  if (
    e.key === 'F12' || 
    (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) || 
    (e.ctrlKey && e.key === 'U')
  ) {
    e.preventDefault();
  }
});

