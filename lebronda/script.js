// Function to set or increase the Suspicion level
function adjustSuspicion(amount) {
  let currentSuspicion = parseInt(localStorage.getItem("Suspicion")) || 0;
  let newSuspicion = currentSuspicion + amount;
  
  // Keep suspicion level within bounds (optional: adjust as needed)
  if (newSuspicion < 0) newSuspicion = 0;
  if (newSuspicion > 6) newSuspicion = 6; // Max suspicion cap

  localStorage.setItem("Suspicion", newSuspicion);
}

// Function to get the Suspicion level
function getSuspicion() {
  return parseInt(localStorage.getItem("Suspicion")) || 0;
}

// Function to update the page based on Suspicion level
function updatePage() {
  let suspicionLevel = getSuspicion();

  // Loss condition
  if (suspicionLevel >= 6) {
    window.location.href = "https://cassiehaas.github.io/lebronda/thisisloss.html";
    return; 
  }
    
  // Update text display
  document.getElementById("suspicionDisplay").innerText = "Suspicion Level: " + suspicionLevel;
  
  // Update progress bar
  let progressBar = document.getElementById("suspicionBar");
  let progressPercentage = (suspicionLevel / 6) * 100; // Convert to percentage
  progressBar.style.width = progressPercentage + "%";

  // Remove old color classes
  progressBar.classList.remove("low", "medium", "high");

  // Apply new color class based on suspicion level
  if (suspicionLevel <= 2) {
      progressBar.classList.add("low");  // Green for low suspicion
  } else if (suspicionLevel <= 4) {
      progressBar.classList.add("medium"); // Yellow for medium suspicion
  } else {
      progressBar.classList.add("high"); // Red for high suspicion
  }

  // Show elements based on suspicion level
  // <audio data-threshold="3"> only shows if suspicion is 3 or higher
  document.querySelectorAll("[data-threshold]").forEach(el => {
      let threshold = parseInt(el.getAttribute("data-threshold"));
      el.style.display = suspicionLevel >= threshold ? "block" : "none";
  });

  // <audio data-max-threshold="2"> only shows if suspicion is below 2
  document.querySelectorAll("[data-max-threshold]").forEach(el => {
      let maxThreshold = parseInt(el.getAttribute("data-max-threshold"));
      el.style.display = suspicionLevel < maxThreshold ? "block" : "none";
  });
}

// Run updatePage when the page loads
document.addEventListener("DOMContentLoaded", function() {
  // Check if an <audio> element with the attribute data-raise-suspicion exists
  let raise = document.querySelector("audio[raise-suspicion]");
  let reset = document.querySelector("[reset-suspicion]")
  let lower = document.querySelector("audio[lower-suspicion]")

  if (reset) {
    localStorage.setItem("Suspicion", 1)
  }

  if (raise) {
      adjustSuspicion(1); // Increase suspicion only if the <audio> tag has the attribute
  }

  if (lower) {
    adjustSuspicion(-1)
  }

  updatePage();
});