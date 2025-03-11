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
  let suspicionLevel = getSuspicion();

  // Get all audio elements
  let raiseAudios = document.querySelectorAll("audio[raise-suspicion]");
  let reset = document.querySelector("[reset-suspicion]");
  let lowerAudios = document.querySelectorAll("audio[lower-suspicion]");

  // Reset suspicion if needed
  if (reset) {
      localStorage.setItem("Suspicion", 1);
  }

  // Adjust suspicion only if the conditions are met
  raiseAudios.forEach(audio => {
      let threshold = audio.hasAttribute("data-threshold") ? parseInt(audio.getAttribute("data-threshold")) : null;
      if (threshold !== null && suspicionLevel < threshold) {
          adjustSuspicion(1);
      }
  });

  lowerAudios.forEach(audio => {
      let maxThreshold = audio.hasAttribute("data-max-threshold") ? parseInt(audio.getAttribute("data-max-threshold")) : null;
      if (maxThreshold !== null && suspicionLevel >= maxThreshold) {
          adjustSuspicion(-1);
      }
  });

  // Only play audios that match their conditions
  raiseAudios.forEach(audio => {
      let threshold = audio.hasAttribute("data-threshold") ? parseInt(audio.getAttribute("data-threshold")) : null;
      if (threshold !== null && suspicionLevel >= threshold) {
          audio.play();
      } else {
          audio.pause();
          audio.currentTime = 0; // Reset playback
      }
  });

  lowerAudios.forEach(audio => {
      let maxThreshold = audio.hasAttribute("data-max-threshold") ? parseInt(audio.getAttribute("data-max-threshold")) : null;
      if (maxThreshold !== null && suspicionLevel < maxThreshold) {
          audio.play();
      } else {
          audio.pause();
          audio.currentTime = 0; // Reset playback
      }
  });

  updatePage();
});