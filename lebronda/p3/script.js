// Function to set or increase the Suspicion level
function adjustSuspicion(amount) {
    let currentSuspicion = parseInt(localStorage.getItem("Suspicion")) || 0;
    let newSuspicion = currentSuspicion + amount;
    
    // Keep suspicion level within bounds (optional: adjust as needed)
    if (newSuspicion < 0) newSuspicion = 0;
    if (newSuspicion > 7) newSuspicion = 7; // Max suspicion cap
  
    localStorage.setItem("Suspicion", newSuspicion);
  }
  
  // Function to get the Suspicion level
  function getSuspicion() {
    return parseInt(localStorage.getItem("Suspicion")) || 0;
  }
  
  // Function to update the page based on Suspicion level
  function updatePage() {
    let suspicionLevel = getSuspicion();
  
    // No loss condition for final section
    // if (suspicionLevel >= 7) {
    //   window.location.href = "https://cassiehaas.github.io/lebronda/thisisloss.html";
    //   return; 
    // }
      
    // Update text display
    document.getElementById("suspicionDisplay").innerText = "Suspicion Level: " + suspicionLevel;
    
    // Update progress bar
    let progressBar = document.getElementById("suspicionBar");
    let progressPercentage = (suspicionLevel / 7) * 100; // Convert to percentage
    progressBar.style.width = progressPercentage + "%";
  
    // Remove old color classes
    progressBar.classList.remove("low", "medium", "high");
  
    // Apply new color class based on suspicion level
    if (suspicionLevel <= 3) {
        progressBar.classList.add("low");  // Green for low suspicion
    } else if (suspicionLevel <= 5) {
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
  document.addEventListener("DOMContentLoaded", function () {
    let suspicionLevel = getSuspicion(); // Get suspicion before making changes

    // Get all audio elements
    let raise = document.querySelectorAll("audio[raise-suspicion]");
    let reset = document.querySelector("[reset-suspicion]");
    let lower = document.querySelectorAll("audio[lower-suspicion]");

    // Reset suspicion if needed
    if (reset) {
        localStorage.setItem("Suspicion", 1);
    }

    // Adjust suspicion based on the number of raise/lower elements
    raise.forEach(() => adjustSuspicion(1));
    lower.forEach(() => adjustSuspicion(-1));

    // Get updated suspicion level after changes
    suspicionLevel = getSuspicion(); 

    // Debugging: Log the updated suspicion level
    console.log(`Updated Suspicion Level: ${suspicionLevel}`);

    // Control audio playback based on suspicion level
    let audioElements = document.querySelectorAll("audio");

    audioElements.forEach(audio => {
        if (audio.hasAttribute("data-threshold")) {
            let threshold = parseInt(audio.getAttribute("data-threshold"));
            console.log(`Audio found with threshold: ${threshold} - Source: ${audio.src}`);

            if (suspicionLevel >= threshold) {
                audio.play();
            } else {
                audio.pause();
                audio.currentTime = 0;
            }
        }

        if (audio.hasAttribute("data-max-threshold")) {
            let maxThreshold = parseInt(audio.getAttribute("data-max-threshold"));
            console.log(`Audio found with max threshold: ${maxThreshold} - Source: ${audio.src}`);

            if (suspicionLevel < maxThreshold) {
                audio.play();
            } else {
                audio.pause();
                audio.currentTime = 0;
            }
        }
    });

    updatePage();  // Now correctly updates suspicion after adjustments
});