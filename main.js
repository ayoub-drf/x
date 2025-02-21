function showModal(title, imageUrl, downloads, rating) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalImg").src = imageUrl;
  document.getElementById("modalDownloads").innerText = downloads;
  document.getElementById("modalRating").innerText = "⭐ " + rating;
  document.getElementById("gameModal").style.display = "flex";
}

Array.from(document.querySelectorAll('.download-game')).forEach((element) => {
  element.addEventListener('click', () => {
    let text = element.parentElement.parentElement.querySelector('#modalTitle').innerText.trim();
    
    // Replace spaces with dashes and append .apk
    let fileName = text.replace(/\s+/g, '-') + ".apk";

    // Generate a random file size between 20MB and 30MB
    let fileSizeMB = Math.floor(Math.random() * (30 - 20 + 1)) + 20; // Random number between 20 and 30
    let fileSizeBytes = fileSizeMB * 1024 * 1024; // Convert MB to bytes

    // Create an empty array to hold chunks of random data
    let chunks = [];
    let chunkSize = 65536; // 64KB max limit per getRandomValues call

    for (let i = 0; i < fileSizeBytes; i += chunkSize) {
      let size = Math.min(chunkSize, fileSizeBytes - i); // Ensure last chunk is correct size
      let chunk = new Uint8Array(size);
      window.crypto.getRandomValues(chunk);
      chunks.push(chunk);
    }

    // Create Blob from all chunks
    const blob = new Blob(chunks, { type: "application/vnd.android.package-archive" });

    // Trigger download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
