const accessKey = "viTyzDbsYKzFNB-ZOS5-SvP5-8lcvBHoxdL1Smkfn6c";

const formEml = document.querySelector("form");
const input = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = input.value.trim(); // Trim any extra spaces

  if (!inputData) {
    alert("Please enter a search term.");
    return;
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data from Unsplash API.");
    }

    const data = await response.json();
    const results = data.results;

    if (page === 1) {
      searchResults.innerHTML = ""; // Clear previous results on a new search
    }

    results.forEach((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");

      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description || "Image";
      image.classList.add("w-[100%]", "h-[200px]", "object-cover");

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description || "View Image";

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResults.appendChild(imageWrapper);
    });

    if (results.length > 0) {
      page++; // Increment the page number for pagination
      showMore.style.display = "block"; // Show the "Show More" button
    } else {
      if (page === 1) {
        searchResults.innerHTML = "<p>No results found.</p>";
      }
      showMore.style.display = "none"; // Hide the "Show More" button if no results
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching images. Please try again later.");
  }
}

formEml.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1; // Reset page number for a new search
  searchImages();
});

showMore.addEventListener("click", (event) => {
  event.preventDefault();
  searchImages();
});
