// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Fetch the images from the images.json file
  fetch("images.json")
    .then(response => {
      // Check if the response is okay
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      // Parse the JSON data
      return response.json();
    })
    .then(data => {
      // Get the gallery element from the DOM
      const gallery = document.getElementById("gallery");
      // Use a document fragment to improve performance by minimizing reflows and repaints
      const fragment = document.createDocumentFragment();

      // Iterate over the images array and create img elements
      data.images.forEach((image, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = image;
        imgElement.classList.add("gallery-image");
        imgElement.alt = `Image ${index + 1}`;
        imgElement.loading = "lazy"; // Lazy load images
        fragment.appendChild(imgElement);
      });

      // Append the fragment to the gallery element
      requestAnimationFrame(() => {
        gallery.appendChild(fragment);
        setupGallery(); // Set up event listeners for the gallery images
      });
    })
    .catch(error => {
      // Log any errors to the console
      console.error("There was a problem with the fetch operation:", error);
    });
});

// Function to set up event listeners for the gallery images
function setupGallery() {
  // Add click event listener to each gallery image
  document.querySelectorAll(".gallery-image").forEach((item) => {
    item.addEventListener("click", function () {
      // Get the modal and modal image elements
      const modal = document.getElementById("modal");
      const modalImg = document.getElementById("modal-img");

      // Display the modal and set the source of the modal image to the clicked image's source
      modal.style.display = "block";
      modalImg.src = this.src;

      // Remove active class from all gallery images
      document.querySelectorAll(".gallery-image").forEach((img) => img.classList.remove("active"));
      // Add active class to the clicked image
      item.classList.add("active");
    });
  });

  // Get the modal and close button elements
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close");

  // Add click event listener to the close button to hide the modal
  closeBtn.onclick = function() { 
    modal.style.display = "none";
    // Remove active class from all gallery images
    document.querySelectorAll(".gallery-image").forEach((img) => img.classList.remove("active"));
  }

  // Add click event listener to the window to hide the modal when clicking outside of it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      // Remove active class from all gallery images
      document.querySelectorAll(".gallery-image").forEach((img) => img.classList.remove("active"));
    }
  }
}